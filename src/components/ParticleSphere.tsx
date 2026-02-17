
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Helper for random points in sphere
const generateParticles = (count: number, radius: number) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.cbrt(Math.random()) * radius; // distribute uniformly

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
};

interface ParticleSphereProps {
    color?: string;
    secondaryColor?: string;
    distort?: number;
}

const ParticleSphere = ({ color = "#5F9B8C", secondaryColor = "#A0C382", distort = 0.4 }: ParticleSphereProps) => {
    const nucleusRef = useRef<THREE.Mesh>(null!);
    const particlesRef = useRef<THREE.Points>(null!);
    const distortMaterialRef = useRef<any>(null!);
    const pointsMaterialRef = useRef<THREE.PointsMaterial>(null!);
    const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null!);

    // Create particle positions
    const particlePositions = useMemo(() => generateParticles(1500, 2.2), []);

    // Create target color objects for lerping
    const targetColor = useMemo(() => new THREE.Color(color), [color]);
    const targetSecondaryColor = useMemo(() => new THREE.Color(secondaryColor), [secondaryColor]);

    useFrame((state, delta) => {
        // Rotation
        if (nucleusRef.current) {
            nucleusRef.current.rotation.y += delta * 0.1;
            nucleusRef.current.rotation.z += delta * 0.05;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y -= delta * 0.05;
        }

        // Color & Distortion Lerping
        if (distortMaterialRef.current) {
            // Lerp color
            distortMaterialRef.current.color.lerp(targetColor, delta * 2);
            // Lerp distortion
            distortMaterialRef.current.distort = THREE.MathUtils.lerp(distortMaterialRef.current.distort, distort, delta * 2);
        }

        if (pointsMaterialRef.current) {
            pointsMaterialRef.current.color.lerp(targetSecondaryColor, delta * 2);
        }

        if (glowMaterialRef.current) {
            glowMaterialRef.current.color.lerp(targetColor, delta * 2);
        }

        // Mouse Interaction for Particles (Pulsating effect based on mouse distance)
        const { pointer } = state;
        const dist = Math.sqrt(pointer.x ** 2 + pointer.y ** 2);
        const time = state.clock.getElapsedTime();
        if (particlesRef.current) {
            // Breathing + subtle mouse reaction
            // If distort is high (like in "Pulse" mode), increase the breathing amplitude
            const breathAmp = 0.05 + (distort * 0.1);
            const scale = 1 + Math.sin(time * 0.5) * breathAmp + (1 - Math.min(dist, 1)) * 0.1;
            particlesRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group>
            {/* 1. The "Nucleus" - Distorted Wireframe Sphere to represent connections */}
            <Sphere ref={nucleusRef} args={[1.5, 64, 64]}> {/* Increased segments for smoother wireframe */}
                <MeshDistortMaterial
                    ref={distortMaterialRef}
                    color={color}
                    wireframe
                    transparent
                    opacity={0.3}
                    distort={distort}
                    speed={1.5}
                    roughness={0}
                    metalness={1}
                />
            </Sphere>

            {/* 2. Overlaid Points - The "Dots" */}
            <Points ref={particlesRef} positions={particlePositions} stride={3} frustumCulled={false}>
                <PointMaterial
                    ref={pointsMaterialRef}
                    transparent
                    color={secondaryColor}
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.8}
                />
            </Points>

            {/* 3. Core Glow - Optional inner sphere for "nucleus" feel */}
            <Sphere args={[0.8, 32, 32]}>
                <meshBasicMaterial ref={glowMaterialRef} color={color} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
            </Sphere>
        </group>
    );
};

export default ParticleSphere;
