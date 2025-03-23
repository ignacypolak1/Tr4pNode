import { useRef, useEffect, useState } from "react";
import Globe from "three-globe";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useWebSocket } from "../hooks/useWebSocket";
import { Attack } from "../hooks/useWebSocket";
import { useCallback } from "react";
import { color } from "three/tsl";

type GlobeRendererProps = {
  setLoaded: (val: boolean) => void;
  attacks: Attack[];
};

const GlobeRenderer = ({ setLoaded, attacks }: GlobeRendererProps) => {
  const globeRef = useRef<any>(null);
  const { scene } = useThree();

  useEffect(() => {
    const globe = new Globe()
      .globeImageUrl("textures/earth-texture-high-res.jpg")
      .bumpImageUrl("textures/earth-topology.jpg")
      .onGlobeReady(() => setLoaded(true))
      .arcAltitudeAutoScale(0.2)
      .arcDashLength(1)
      .arcDashGap(1)
      .arcDashInitialGap(() => 1)
      .arcDashAnimateTime(1000)
      .arcStroke(1)
      .arcColor("color")
      .arcsData([]);

    globeRef.current = globe;
    scene.add(globe);
  }, [scene]);

  useEffect(() => {
    if (!globeRef.current || attacks.length === 0) return;

    const globe = globeRef.current;

    const newArc = {
      startLat: attacks.at(-1)!.from.lat,
      startLng: attacks.at(-1)!.from.lng,
      endLat: attacks.at(-1)!.to.lat,
      endLng: attacks.at(-1)!.to.lng,
      color: [attacks.at(-1)!.from.color, attacks.at(-1)!.from.color],
    };

    const current = globe.arcsData();
    globe.arcsData([...current, newArc]);
  }, [attacks]);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return null;
};

const GlobeComponent = () => {
  const [loaded, setLoaded] = useState(false);
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const onAttack = useCallback((attack: Attack) => {
    setAttacks((prev) => [...prev, attack]);
  }, []);
  useWebSocket("ws://localhost:8000", onAttack);

  return (
    <div className="w-full h-screen bg-black">
      {!loaded && (
        <div className="absolute w-full h-full justify-center z-1 bg-black items-center justify-center flex flex-col">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-lime-500 border-solid" />
          <p className="mt-4 text-white text-center text-3xl mt-10">
            Loading Earth 21K...
          </p>
        </div>
      )}
      <Canvas camera={{ position: [0, 0, 400], fov: 34 }}>
        <ambientLight intensity={8} />
        <pointLight position={[200, 0, 0]} />
        <GlobeRenderer setLoaded={setLoaded} attacks={attacks} />
        <OrbitControls enableZoom={true} />
        <Stars radius={250} depth={60} count={2000} factor={7} fade />
      </Canvas>
    </div>
  );
};

export default GlobeComponent;
