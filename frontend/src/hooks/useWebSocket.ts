import { useEffect, useRef } from "react";

export type Attack = {
  from: { lat: number; lng: number; color: string };
  to: { lat: number; lng: number };
  color: string;
  timestamp: number;
};

export const useWebSocket = (
  url: string,
  onMessage: (data: Attack) => void
) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (wsRef.current) return;

    const ws = new WebSocket(url);
    console.log("Connecting to WebSocket", url);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "attack") {
          onMessage(data);
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message", err);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    ws.onclose = () => {
      console.warn("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [url, onMessage]);
};
