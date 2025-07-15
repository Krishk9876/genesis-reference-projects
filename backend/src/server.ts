import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
import Message from "./models/Message";
import dotenv from "dotenv";

dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async ({ token, content }) => {
    try {
      // In production, parse userId from token!
      const fakeUserId = "000000000000000000000000";
      const message = new Message({
        sender: fakeUserId,
        content
      });
      await message.save();
      io.emit("receiveMessage", { content, sender: "anonymous" });
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));