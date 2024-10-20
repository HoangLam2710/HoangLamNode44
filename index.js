import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rootRoutes from "./src/routers/root.router.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { createChat } from "./src/controllers/chat.controller.js";

const app = express();

app.use(express.static("."));

// Allow all origins
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// ----------------------------
// socket.io
const server = createServer(app);
// io is object of socker server
// socket is object of socker client
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let number = 0;
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("increase", () => {
    number += 1;
    io.emit("send-new-number", number);
  });

  socket.on("decrease", () => {
    number -= 1;
    io.emit("send-new-number", number);
  });

  socket.on("send-message", ({ userId, message }) => {
    createChat({ userId, message });

    io.emit("receive-message", { userId, message });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

// ----------------------------

app.use(express.json());

app.use(cookieParser());

app.use(rootRoutes);

// app.get("/", (req, res) => {
//   res.status(200).json("Hello World");
// });

// // demo get query from url
// app.get("/test-query", (req, res) => {
//   let { query } = req;
//   res.send(query);
// });

// // demo get header from request
// app.get("/test-header", (req, res) => {
//   let { headers } = req;
//   res.send(headers);
// });

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
