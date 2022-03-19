import React, { FC } from "react";
import socket from "../lib/socket";
import Button from "./Button";

import styles from "./Commands.module.css";

interface Props {
  travelDistance: number;
}

const Commands: FC<Props> = ({ travelDistance }) => {
  const sendCommand = (command: string) => {
    socket.emit("command", command);
  };

  return (
    <>
      <div className={styles.commandsContainer}>
        <div className={[styles.row, styles.group].join(" ")}>
          <Button
            label="Left"
            onClick={() => sendCommand(`left ${travelDistance}`)}
            rowHeight={2}
          />
          <div className={styles.stacked}>
            <Button
              label="Up"
              onClick={() => sendCommand(`up ${travelDistance}`)}
            />
            <Button
              label="Down"
              onClick={() => sendCommand(`down ${travelDistance}`)}
            />
          </div>
          <Button
            label="Right"
            onClick={() => sendCommand(`right ${travelDistance}`)}
            rowHeight={2}
          />
        </div>
        <div className={[styles.stacked, styles.group].join(" ")}>
          <Button
            label="Take off"
            onClick={() => sendCommand("takeoff")}
            type="takeOff"
          />
          <Button
            label="Land"
            onClick={() => sendCommand("land")}
            type="land"
          />
        </div>
        <div className={[styles.stacked, styles.group].join(" ")}>
          <Button
            label="Forward"
            onClick={() => sendCommand(`forward ${travelDistance}`)}
          />
          <Button
            label="Back"
            onClick={() => sendCommand(`back ${travelDistance}`)}
          />
        </div>
      </div>
      <div className={styles.fullWidthButton}>
        <Button
          label="Emergency stop"
          onClick={() => sendCommand("emergency")}
          type="emergency"
        />
      </div>
    </>
  );
};

export default Commands;
