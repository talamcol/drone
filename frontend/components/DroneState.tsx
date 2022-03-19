import React, { FC, useEffect, useState } from "react";
import socket from "../lib/socket";
import styles from "./DroneState.module.css";

interface DroneState {
  bat?: number;
}

interface Props {
  travelDistance: number;
}

const DroneState: FC<Props> = ({ travelDistance }) => {
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
    <div className={styles.container}>
      <h2>Drone status</h2>
      <p>Status: {droneStatus}</p>
      <p>Travel distance: {travelDistance} cm</p>
      <div className={styles.batteryContainer}>
        <p>Battery level: </p>
        <p className={styles.batteryLevelFull}>
          <span className={styles.batteryLevelText}>
            {droneState.bat || 0} %
          </span>
          <span
            className={styles.batteryLevel}
            style={{
              width: `${droneState.bat || 0}%`,
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default DroneState;
