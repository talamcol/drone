import React, { FC } from "react";
import socket from "../lib/socket";
import Button from "./Button";

const Commands: FC = () => {
  const sendCommand = (command: string) => {
    socket.emit("command", command);
  };

  return (
    <div>
      <Button label="Up" onClick={() => sendCommand("up 20")} />
      <div>
        <Button label="Take off" onClick={() => sendCommand("takeoff")} />
        <Button label="Forward" onClick={() => sendCommand("forward 20")} />
        <Button label="Land" onClick={() => sendCommand("land")} />
      </div>
      <div>
        <Button label="Left" onClick={() => sendCommand("left 20")} />
        <Button
          label="Emergency stop"
          onClick={() => sendCommand("emergency")}
        />
        <Button label="Right" onClick={() => sendCommand("right 20")} />
      </div>
      <div>
        <Button label="Flip left" onClick={() => sendCommand("flip l")} />
        <Button label="Back" onClick={() => sendCommand("back 20")} />
        <Button label="Flip right" onClick={() => sendCommand("flip r")} />
      </div>
      <Button label="Down" onClick={() => sendCommand("down 20")} />
    </div>
  );
};

export default Commands;
