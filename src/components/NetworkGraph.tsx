import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

interface Node {
  id: string;
  position: [number, number, number];
  label: string;
  type: "project" | "skill";
}

const nodes: Node[] = [
  { id: "1", position: [0, 0, 0], label: "SIYA P P", type: "skill" },
  { id: "2", position: [2, 1, -1], label: "Penetration Testing", type: "skill" },
  { id: "3", position: [-2, -1, 1], label: "Bug Bounty", type: "skill" },
  { id: "4", position: [1, -2, 0], label: "Python", type: "skill" },
  { id: "5", position: [-1, 2, -2], label: "Burp Suite", type: "skill" },
  { id: "6", position: [3, 0, 2], label: "Marauder's Map", type: "project" },
  { id: "7", position: [-3, 1, 0], label: "FL-DP Framework", type: "project" },
  { id: "8", position: [0, -1, 2], label: "SubWhisper", type: "project" },
];

const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [1, 3], [2, 4], [5, 6], [3, 5], [1, 7],
];

function NetworkNode({ node, onClick }: { node: Node; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const color = node.type === "project" ? "#00ff41" : "#00bfff";

  return (
    <Sphere
      ref={meshRef}
      position={node.position}
      args={[0.15, 16, 16]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 2 : 1}
        toneMapped={false}
      />
    </Sphere>
  );
}

function ConnectionLines() {
  return (
    <>
      {connections.map(([start, end], i) => (
        <Line
          key={i}
          points={[nodes[start].position, nodes[end].position]}
          color="#00ff41"
          lineWidth={1}
          opacity={0.3}
          transparent
        />
      ))}
    </>
  );
}

function Scene({ onNodeClick }: { onNodeClick: (node: Node) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group ref={groupRef}>
        <ConnectionLines />
        {nodes.map((node) => (
          <NetworkNode key={node.id} node={node} onClick={() => onNodeClick(node)} />
        ))}
      </group>
      <OrbitControls enablePan={false} enableZoom={true} maxDistance={10} minDistance={3} autoRotate={false} />
    </>
  );
}

export const NetworkGraph = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <div className="relative w-full h-[60vh]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Scene onNodeClick={setSelectedNode} />
      </Canvas>

      {/* Node Info Popup - Rendered via Portal to avoid clipping */}
      {selectedNode && createPortal(
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card border-2 border-primary p-4 md:p-6 rounded-lg z-[9999] w-[90%] max-w-md pointer-events-auto shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-2 glow-green">{selectedNode.label}</h2>
          <p className="text-muted-foreground mb-4">
            {selectedNode.type === "project" ? "Project Dashboard" : "Skill Overview"}
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="text-primary">{selectedNode.type}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-accent">Active</span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNode(null);
            }}
            className="mt-4 w-full py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Close
          </button>
        </motion.div>,
        document.body
      )}

      {/* Data Stream Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 text-xs text-primary font-mono whitespace-pre animate-scan">
          {`[SYSTEM] Monitoring network activity...\n[INFO] 7 nodes active\n[SCAN] No threats detected\n[STATUS] All systems operational`}
        </div>
      </div>
    </div>
  );
};
