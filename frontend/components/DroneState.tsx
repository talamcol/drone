import React, { FC, useEffect, useState } from "react";
import socket from "../lib/socket";

interface DroneState {
  bat?: number;
}

const DroneState: FC = () => {
  const [droneState, setDroneState] = useState<DroneState>({});
  const [droneStatus, setDroneStatus] = useState("DISCONNECTED");

  useEffect(() => {
    socket.on("dronestate", (newDroneState) => {
      console.log(newDroneState);
      setDroneState(newDroneState);
    });
    return () => socket.removeListener("dronestate") as never;
  }, []);

  useEffect(() => {
    socket.on("status", setDroneStatus);
    return () => socket.removeListener("status") as never;
  }, []);

  return (
    <div>
      <p>Status: {droneStatus}</p>
      <p>Battery level: {droneState.bat || 0}</p>
    </div>
  );
};

export default DroneState;
