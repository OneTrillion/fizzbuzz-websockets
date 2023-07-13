import { Server, Socket } from "socket.io";
import { handleUserInput } from "./domain/game";
import { IGameDataRepository } from "./repository/IGameDataRepository";

const socket = (server: Server, repository: IGameDataRepository): void => {
  server.on("connection", (socket: Socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on("disconnect", () =>
      console.log(`Socket ${socket.id} disconnected`)
    );

    socket.on("make_play", (input: string, sessionID: string) => {
      const response = handleUserInput(input, sessionID, repository);

      socket.emit("response", response);
    });
  });
};

export default socket;
