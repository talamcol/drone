import dgram from "dgram" // built in socket api from node
import express from "express"
import http from "http"
import io from "socket.io"
import throttle from "lodash/throttle"

const app = express()
const httpServer = new http.Server(app)
const myIo = new io.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
})

const sendCommandPort = 8889
const statePort = 8890
const host = "192.168.10.1"

const handleError = (error: Error | null) => {
  error && console.error(error)
}

const drone = dgram.createSocket("udp4")
drone.bind(sendCommandPort)

const droneState = dgram.createSocket("udp4")
droneState.bind(statePort)

drone.on("message", (message) => {
  myIo.sockets.emit("status", message.toString())
})

// puts drone in API mode, needs to be done before sending all other commands
drone.send("command", 0, "command".length, sendCommandPort, host, handleError)

myIo.on("connection", (socket) => {
  socket.on("command", (command) => {
    console.log("command from browser - ", command)
    drone.send(command, 0, command.length, sendCommandPort, host, handleError)
  })

  socket.emit("status", "CONNECTED")
})

/** State */
const parseDroneState = (state: string) => {
  return state
    .split(";")
    .map((x) => x.split(":"))
    .reduce((data: Record<string, string>, [key, value]) => {
      data[key] = value
      return data
    }, {})
}

droneState.on(
  "message",
  throttle((state) => {
    // example state "pitch:%d;roll:%d;yaw:%d;vgx:%d;vgy%d;vgz:%d;templ:%d;temph:%d;tof:%d;h:%d;bat:%d;baro:%.2f; time:%d;agx:%.2f;agy:%.2f;agz:%.2f;\r\n"
    const formattedState = parseDroneState(state.toString())
    myIo.sockets.emit("dronestate", formattedState)
  }, 100)
)

httpServer.listen(6767, () => {
  console.log("🚀 Socket server is up and running on port 6767")
})
