import Server from "../../model/server.model.js";
import Channel from "../../model/channel.model.js";

const createChannelController = async (req, res) => {
  const { serverId } = req.params;
  const { channelName } = req.body;

  try {
    const server = await Server.findOne({
      _id: serverId,
      owner: req.userId,
    });

    if (!channelName || !channelName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Channel name is required",
      });
    }

    if (!server)
      return res.status(400).json({
        success: false,
        message: "You are not the owner of the server",
      });

    const newChannel = new Channel({
      name: channelName,
      server: serverId,
    });
    await newChannel.save();

    server.channels.push(newChannel._id);
    await server.save();

    res.status(200).json({
      success: true,
      message: "Channel created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default createChannelController;
