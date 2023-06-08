/** @format */

const express = require("express");
const cors = require("cors");
const callOpenAPI = require("./index");
const getOpenai = require("./openaiApi");

const app = express();
app.use(cors());
app.use(express.static("gpt-web"));
app.use(express.json());
app.use(express.urlencoded());

app.post("/gpt", async (req, res) => {
  // console.log(req.body.content);
  try {
    // const msg = await callOpenAPI(req.query.content);
    const msg = await getOpenai(req.body.content);
    res.status(200).json(msg.choices[0].message);
  } catch (error) {
    res.status(500).json("服务器出错了");
  }
});

app.listen(5067, () => {
  console.log("http://127.0.0.1:5067");
});
