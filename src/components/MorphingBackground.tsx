
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- Configuration ---
const PARTICLE_COUNT = 4000;
const RADIUS = 4;
const ANIMATION_SPEED = 0.05; // Lerp factor

type ShapeMode = 'orb' | 'grid' | 'flow';

interface MorphingBackgroundProps {
    mode: ShapeMode;
}

const MorphingParticles = ({ mode }: { mode: ShapeMode }) => {
    const pointsRef = useRef<THREE.Points>(null!);

    // 1. Generate Target Positions for each Shape
    const { orbPositions, gridPositions, flowPositions } = useMemo(() => {
        const orb = new Float32Array(PARTICLE_COUNT * 3);
        const grid = new Float32Array(PARTICLE_COUNT * 3);
        const flow = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;

            // --- Orb (Sphere) ---
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = Math.cbrt(Math.random()) * RADIUS;
            orb[i3] = r * Math.sin(phi) * Math.cos(theta);
            orb[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            orb[i3 + 2] = r * Math.cos(phi);

            // --- Grid (Plane) ---
            // Create a 2D grid layout centered at origin
            const gridSize = Math.ceil(Math.sqrt(PARTICLE_COUNT));
            const spacing = 8 / gridSize; // Cover roughly 8 units width
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;

            grid[i3] = (col - gridSize / 2) * spacing;     // x
            grid[i3 + 1] = (row - gridSize / 2) * spacing; // y
            grid[i3 + 2] = (Math.random() - 0.5) * 0.5;    // z (slight depth noise)

            // --- Flow (Tunnel / Upward Cylinder) ---
            // Cylinder with upward movement simulation intent
            const flowRadius = 2 + Math.random();
            const flowTheta = Math.random() * Math.PI * 2;
            const flowY = (Math.random() - 0.5) * 10;

            flow[i3] = flowRadius * Math.cos(flowTheta);
            flow[i3 + 1] = flowY;
            flow[i3 + 2] = flowRadius * Math.sin(flowTheta);
        }

        return { orbPositions: orb, gridPositions: grid, flowPositions: flow };
    }, []);

    // 2. Setup Geometry
    const particlesGeo = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        // Start with Orb positions
        geo.setAttribute('position', new THREE.BufferAttribute(Float32Array.from(orbPositions), 3));
        return geo;
    }, [orbPositions]);

    // 3. Animation Loop
    useFrame((state) => {
        if (!pointsRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        let target: Float32Array;

        // Select target array based on mode
        switch (mode) {
            case 'grid': target = gridPositions; break;
            case 'flow': target = flowPositions; break;
            case 'orb': default: target = orbPositions; break;
        }

        // Lerp current positions to target
        let needsUpdate = false;

        // Add subtle rotation to the whole group for liveliness
        pointsRef.current.rotation.y += 0.001;
        if (mode === 'flow') {
            pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1; // Gentle sway
        } else {
            // Reset rotation Z slowly
            pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, 0, 0.05);
        }

        for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
            const current = positions[i];
            const dest = target[i] + (mode === 'flow' && i % 3 === 1 ? Math.sin(state.clock.elapsedTime + i) * 0.5 : 0); // Add Wave to flow Y

            // Standard Lerp
            const dist = dest - current;
            if (Math.abs(dist) > 0.001) {
                positions[i] += dist * ANIMATION_SPEED;
                needsUpdate = true;
            }
        }

        if (needsUpdate) {
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        // @ts-ignore
        <Points ref={pointsRef} geometry={particlesGeo}>
            {/* @ts-ignore */}
            <PointMaterial
                transparent
                vertexColors={false}
                color="#5F9B8C"
                size={0.04}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </Points>
    );
};

// --- Main Component ---
const MorphingBackground = ({ mode }: MorphingBackgroundProps) => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#0A0A0A]">
            {/* @ts-ignore */}
            <Canvas
                dpr={[1, 2]} // Optimization
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ antialias: false, alpha: false }} // Optimization
            >
                {/* @ts-ignore */}
                <color attach="background" args={["#0A0A0A"]} />
                {/* @ts-ignore */}
                <fog attach="fog" args={["#0A0A0A", 5, 20]} />
                <MorphingParticles mode={mode} />
            </Canvas>
            {/* Gradient Overlay to fade edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10" />
        </div>
    );
};

export default MorphingBackground;
