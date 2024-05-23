import express from "express";
import userRoute from "./routes/userRoute.js"
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(({
  origin:true
})))
app.get("/", (req, res) => {
  console.log("printing");
  res.send("helllo user");
});

app.use("/api",userRoute)

const createConnect = async()=>{
  await mongoose
  .connect(process.env.MONGO_URL)
  .then((response) => console.log("connected"))
  .catch((error) => console.log(error));
}
app.listen(PORT,createConnect(), () => console.log("port is listening on", PORT));
