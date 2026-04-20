import express from "express";
import createServerController from "../controllers/serverControllers/createServer.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import loadServerController from "../controllers/serverControllers/loadServer.controller.js";

const router = express.Router();

router.post("/create-server", verifyToken, createServerController);
router.get("/load-server/:serverId", verifyToken, loadServerController);

export default router;
