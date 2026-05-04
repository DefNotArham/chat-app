import Server from "../../model/server.model.js";
import Channel from "../../model/channel.model.js";
import User from "../../model/user.model.js";

const getChannelsController = async (req, res) => {
  const { serverId } = req.params;
  try {
    const server = await Server.findById(serverId).populate("channels");

    if (!server)
      return res
        .status(404)
        .json({ success: false, message: "Server not found" });

    const isMember = server.members.includes(req.userId);

    if (!isMember)
      return res.status(404).json({
        success: false,
        message: "You are not a member of this server",
      });

    res.status(200).json({ success: true, channels: server.channels });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default getChannelsController;
