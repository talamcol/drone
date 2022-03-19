# drone

[Documentation for the tello drone](https://dl-cdn.ryzerobotics.com/downloads/tello/20180910/Tello%20SDK%20Documentation%20EN_1.3.pdf)

## Development

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

entry point is the file `pages/index.tsx`

### Backend
1. `cd backend`
2. `npm install`
3. `npm start`

entry point is the file index.ts

## Fly the drone
1. `cd frontend`
2. `npm run dev`
3. power on the drone
4. connect to drone via wifi on your computer
5. `cd backend`
6. `npm start`
7. wait for the drone status to change on the UI

## Remarks

Tello works with UDP and Wifi connection must be established. 
To send commands, port **8889** must be used. To receive a new state, port **8890** must be used.

There are 3 types of commands [control, read, set]. Control and set will return `ok` or `error`. Read commands (e.g. battery state) return the value.

