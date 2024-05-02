import WebSocket, { WebSocketServer } from "ws";

export const broadcastMessage = (
  webSocket: WebSocketServer,
  htmlText: string,
  markdownText: string
) => {
  webSocket.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ htmlText, markdownText }));
    }
  });
};
