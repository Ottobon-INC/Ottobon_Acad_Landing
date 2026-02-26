# Presentation Script: The Sticky Scroll Pattern (10 Minutes)

**Target Audience:** Cross-team frontend developers
**Goal:** Explain the sticky scrolling effect from scratch, covering the "why," the architecture, detailed code walkthroughs, and how to avoid common pitfalls.

---

## Part 1: Introduction & The "Wow" Factor (0:00 - 1:30)

**[Slide: Title & Demo (Show the live landing page scrolling)]**

"Hi everyone. Today I want to walk you through a UI pattern we recently implemented for the Ottobon Academy Landing Page. We call it the **Sticky Scroll Stack**. 

If you look at the screen, you'll see how as I scroll down, the current full-screen card stays pinned to the top, and the next card slides up perfectly over it. It creates this beautiful, app-like 'deck of cards' illusion.

So, why did we build this instead of a normal scrolling list?
1. **Engagement:** It physically forces the user to slow down and consume the narrative, card by card.
2. **Visual Hierarchy:** It gives a highly premium, polished feel which builds trust.
3. **Efficiency:** Believe it or not, we didn't use any heavy third-party scrolling libraries to achieve this. It relies almost entirely on native CSS and the Framer Motion library, which we already use."

---

## Part 2: The Core Architecture Concept (1:30 - 3:00)

**[Slide: Architecture Diagram showing the ScrollContainer and Cards]**

"Let's break down how this works under the hood from an architectural standpoint. It's actually much simpler than it looks.

We have two main physical layers:
1. **The Scroll Container:** This is a very tall wrapper `div`. Its total height is determined by how many cards we have inside it. As the user scrolls down this massive container, we track exactly where they are—from 0% (the top) to 100% (the bottom).
2. **The Cards:** These are individual `divs` inside the container. We use the CSS property `position: sticky; top: 0;` on every single card. 

Because they are sticky, when a card hits the top of your screen, it stops moving. But the *container* keeps scrolling. As the container keeps scrolling, the *next* card eventually hits the top of the screen and stacks on top of the previous one."

---

## Part 3: Code Walkthrough - The Container (3:00 - 5:30)

**[Slide: StickyScrollStack.tsx Code Snippet]**

"Now, let's look at the actual code that makes this happen, starting with the parent wrapper, the `StickyScrollStack`.

```tsx
export function StickyScrollStack({ items }: { items: CardItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
```

Here, we attach a `ref` to our tall container. We feed that `ref` into Framer Motion's `useScroll` hook. This gives us a reactive variable called `scrollYProgress`. 

Look at the `offset: ['start start', 'end end']`. This simply tells Framer Motion: 'Start tracking the scroll progress (0.0) when the *top* of our container hits the *top* of the viewport, and finish tracking (1.0) when the *bottom* of our container hits the *bottom* of the viewport.'

```tsx
  return (
    <div ref={containerRef} className="relative w-full">
      {items.map((item, index) => {
        const targetScale = Math.max(0.85, 1 - (items.length - index - 1) * 0.05);

        return (
          <StickyCard
            key={item.id}
            item={item}
            index={index}
            scrollProgress={scrollYProgress}
            range={[index * (1 / items.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
      
      <div className="h-[20vh]" />
    </div>
  );
}
```
Next, we map over our items. For each item, we calculate a `targetScale`. The very last card stays at a scale of `1.0`. But earlier cards need to shrink as they get buried. This formula ensures the first card shrinks to `0.85`, the next to `0.90`, and so on.

We then pass this data, along with our global `scrollYProgress`, into each individual `StickyCard`.

Notice that empty `div` at the very bottom with `height: 20vh`? **This is critical.** Because `position: sticky` relies on the parent container extending past the children, if you don't add extra space at the bottom, the final card will get cut off and never fully reach the center of the screen."

---

## Part 4: Code Walkthrough - The Card (5:30 - 7:30)

**[Slide: StickyCard.tsx Code Snippet]**

"Now let's look at the `StickyCard` component, which receives that global scroll progress.

```tsx
export function StickyCard({ item, index, scrollProgress, range, targetScale }) {
  const scale = useTransform(scrollProgress, range, [1, targetScale]);
```

Here we use our second core hook: `useTransform`. What this does is map our scroll progress to a visual state. 
We tell Framer Motion: *'When the global scroll progress is exactly within this card's specific range, smoothly animate its CSS `scale` from 1 down to our shrunk `targetScale`.'*

Because Framer Motion maps this directly to the scroll wheel rather than a fixed time duration, the animation feels incredibly responsive.

```tsx
  return (
    <div className="sticky top-0 flex items-center justify-center h-screen">
      <motion.div
        style={{
          scale,
          top: `calc(5% + ${index * 35}px)`,
        }}
        className="relative w-[95%] max-w-6xl h-[650px] rounded-[32px] overflow-hidden origin-top transition-all"
      >
        {/* Card Content Here */}
      </motion.div>
    </div>
  );
}
```

This acts as the physical frame. 
1. The outer `div` has `sticky top-0 h-screen`. This forces the card to fill the viewport and physically pin itself to the top of the browser as you scroll.
2. The inner `motion.div` receives our dynamic `scale` property from `useTransform`.
3. We add a subtle `top` offset calculation (`index * 35px`). This slightly staggers each card downward, so the top edge of the previous card 'peeks' out from behind, cementing the illusion of a physical deck of cards."

---

## Part 5: Usage & Smooth Scrolling Pitfalls (7:30 - 9:00)

**[Slide: Page.tsx & Lenis config snippets]**

"So how do we use this? It's incredibly simple.

```tsx
import { StickyScrollStack } from './StickyScrollStack';

export default function Page() {
  return (
    <main>
      <header> Hero Section </header>
      <StickyScrollStack items={featuresArray} />
      <footer> Footer </footer>
    </main>
  );
}
```
Because we've totally decoupled the scroll logic from the data, you just drop the stack component anywhere in your page and hand it an array of items. That's it. It's fully self-contained.

**A quick warning about smooth scrolling:**
If your project uses a smooth-scrolling library like Lenis, you might notice the scaling animations feel laggy or jittery. 

```tsx
const lenis = new Lenis({ lerp: 0.1 });
```
This happens because Lenis intercepts the native scroll events before Framer Motion can read them. If you see this, make sure your bounding offsets in `useScroll` are perfectly accurate, or temporarily disable Lenis for the sticky section container."

---

## Part 6: Q&A (9:00 - 10:00)

**[Slide: Reference Links & Q&A]**

"To recap, three things make this work:
1. Native `position: sticky` on full-screen containers.
2. `useScroll` to track the parent container.
3. `useTransform` to bind that scroll progress to the CSS `scale` property of each card.

You can find all of these components documented line-by-line in our shared `docs/sticky-scroll-pattern.md` file. We are currently running this in production on the Landing Page under `src/components/OfferingsStack.tsx`.

Thank you! I've got a minute left for any questions."
