import express from "express";
import createServerController from "../controllers/serverControllers/createServer.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create-server", verifyToken, createServerController);

export default router;
