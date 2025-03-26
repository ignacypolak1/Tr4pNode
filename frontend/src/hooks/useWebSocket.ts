import { useEffect, useRef } from "react";

export type Session = {
  id: string;
  lat_from: number;
  lon_from: number;
  lat_to: number;
  lon_to: number;
  color: string;
};

export const useWebSocket = (
  url: string,
  onSessionsReceived: (data: Session[]) => void
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
        onSessionsReceived(data);
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
