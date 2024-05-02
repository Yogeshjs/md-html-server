import express from "express";
import { createServer } from "http";
import WebSocket from "ws";
import { marked } from "marked";
import { broadcastMessage } from "./common/broadcastMessage";

let count = 0;

const app = express();
const port = 3001;

app.use(express.text());

const server = createServer(app);
const webSocket = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send("Healthy server");
});

webSocket.on("connection", (ws: WebSocket) => {
  console.log("Client connected ", ++count);

  ws.on("message", (message: string) => {
    const markdownText: string = message.toString();
    const htmlText = <string>marked(markdownText);
    broadcastMessage(webSocket, htmlText, markdownText);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
