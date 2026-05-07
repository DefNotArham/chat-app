import User from "../../model/user.model.js";
import Server from "../../model/server.model.js";
import Channel from "../../model/channel.model.js";

const deleteServerController = async (req, res) => {
  const { serverId } = req.params;
  const { serverName } = req.body;

  try {
    const server = await Server.findOne({
      _id: serverId,
      owner: req.userId,
    });

    if (!server)
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });

    if (serverName !== server.name)
      return res
        .status(400)
        .json({ success: false, message: "Enter the correct server name" });

    // Delete all channels
    await Channel.deleteMany({ server: serverId });

    // Remove server from all users
    await User.updateMany(
      { servers: serverId },
      { $pull: { servers: serverId } },
    );

    // Delete server
    await Server.findByIdAndDelete(serverId);

    res.status(200).json({
      success: true,
      message: "Server deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default deleteServerController;
