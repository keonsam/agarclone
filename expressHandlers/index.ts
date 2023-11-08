import { app } from "../server";

app.get("/test", (req, res) => {
  console.log(req);
  res.json("Welcome");
});
