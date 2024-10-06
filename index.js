import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rootRoutes from "./src/routers/root.router.js";

const app = express();

// Allow all origins
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

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

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
