# drone

[Documentation for the tello drone](https://dl-cdn.ryzerobotics.com/downloads/tello/20180910/Tello%20SDK%20Documentation%20EN_1.3.pdf)

## Get started

For the frontend:

1. `cd frontend`
2. `npm install`
3. `npm run dev`

For the backend:

1. `cd backend`
2. `npm install`
3. connect to drone via wifi
4. `npm start`

## Remarks

Tello works with UDP and Wifi connection must be established. 
To send commands, port **8889** must be used. To receive a new state, port **8890** must be used.

There are 3 types of commands [control, read, set]. Control and set will return `ok` or `error`. Read commands (e.g. battery state) return the value.

