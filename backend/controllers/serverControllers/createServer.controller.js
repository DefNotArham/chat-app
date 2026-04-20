import User from "../../model/user.model.js";
import Server from "../../model/server.model.js";

import generateInviteCode from "../../utils/generateInviteCode.js";

const createServerController = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    if (!name)
      return res.status(400).json({
        success: false,
        message: "Server name is required",
      });

    const newServer = new Server({
      name,
      description,
      owner: req.userId,
      members: [req.userid],
      inviteCode: generateInviteCode(),
    });
    await newServer.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default createServerController;
