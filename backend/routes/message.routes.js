import express from "express";

import getMessagesController from "../controllers/MessageControllers/getMessages.controller.js";

const router = express.Router();

router.get("/getMessages/:channelId", getMessagesController);

export default router;
