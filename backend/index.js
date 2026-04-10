import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/auth", authRoutes);

connectDb();
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
