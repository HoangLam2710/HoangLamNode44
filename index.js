import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Hello World");
});

// demo params from url
app.post("/users/:id", (req, res) => {
  let { params, body } = req;
  let { id } = params;
  res.send({ id, ...body });
});

// demo get query from url
app.get("/test-query", (req, res) => {
  let { query } = req;
  res.send(query);
});

// demo get header from request
app.get("/test-header", (req, res) => {
  let { headers } = req;
  res.send(headers);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
