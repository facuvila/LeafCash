import { registerRootComponent } from 'expo';
import App from './App';
registerRootComponent(App);

/*const express = require("express");
const app = express();
const port = 3000;
const userDataRouter = require("./controller/userDataController");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })

);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/getUserData", userDataRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});*/