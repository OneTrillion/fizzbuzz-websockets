import Express, { Request, Response } from "express";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import socket from "./socket";
import { InMemoryRepository } from "./repository/inMemDB";

const port = process.env.PORT ?? 3001;

const app = Express();
const server = createServer(app);

app.use(Express.static(__dirname + "./../../dist_client"));

app.use((_: Request, res: Response): void => {
  res.sendStatus(404);
});

const socketServer = new SocketServer(server, {
  path: "/chat",
  transports: ["websocket"],
});

const repository = new InMemoryRepository();

socket(socketServer, repository);

server.listen(port, () => console.log("fizzbuzz is listening on", port));
