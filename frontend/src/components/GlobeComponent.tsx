import { useRef, useEffect, useState } from "react";
import Globe from "three-globe";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useWebSocket } from "../hooks/useWebSocket";
import { Session } from "../hooks/useWebSocket";
import { useCallback } from "react";

type GlobeRendererProps = {
  setLoaded: (val: boolean) => void;
  sessions: Session[];
};

const GlobeRenderer = ({ setLoaded, sessions }: GlobeRendererProps) => {
  const globeRef = useRef<Globe>(null);
  const { scene } = useThree();

  useEffect(() => {
    const globe = new Globe()
      .globeImageUrl("textures/earth-texture-high-res.jpg")
      .bumpImageUrl("textures/earth-topology.jpg")
      .onGlobeReady(() => setLoaded(true))
      .arcAltitude(0.3)
      .arcDashLength(1)
      .arcDashGap(1)
      .arcDashInitialGap(() => 1)
      .arcDashAnimateTime(1000)
      .arcStroke(1.2)
      .arcColor("color")
      .arcsData([]);

    globeRef.current = globe;
    scene.add(globe);
  }, [scene]);

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = globeRef.current;

    const arcs = sessions.map((session) => {
      return {
        startLat: session.lat_from,
        startLng: session.lon_from,
        endLat: session.lat_to,
        endLng: session.lon_to,
        color: [session.color, session.color],
      };
    });

    globe.arcsData([...arcs]);
  }, [sessions]);

  return null;
};

const GlobeComponent = () => {
  const [loaded, setLoaded] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);

  const onSessionsReceived = useCallback((sessions: Session[]) => {
    setSessions((currentSessions) => {
      const currentIds = new Set(currentSessions.map((s) => s.id));
      const newIds = new Set(sessions.map((s) => s.id));

      const added = sessions.filter((s) => !currentIds.has(s.id));
      const unchanged = currentSessions.filter((s) => newIds.has(s.id));

      return [...unchanged, ...added];
    });
  }, []);

  useWebSocket(`ws://${window.location.host}/ws`, onSessionsReceived);

  return (
    <div className="w-full h-screen bg-black">
      {!loaded && (
        <div className="absolute w-full h-full z-1 bg-black items-center justify-center flex flex-col">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-lime-500 border-solid" />
          <p className="text-white text-center text-3xl mt-10">
            Loading Earth...
          </p>
        </div>
      )}
      <Canvas camera={{ position: [0, 0, 400], fov: 34 }}>
        <ambientLight intensity={8} />
        <pointLight position={[200, 0, 0]} />
        <GlobeRenderer setLoaded={setLoaded} sessions={sessions} />
        <OrbitControls enableZoom={true} />
        <Stars radius={250} depth={60} count={2000} factor={7} fade />
      </Canvas>
    </div>
  );
};

export default GlobeComponent;
