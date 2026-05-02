import User from "../../model/user.model.js";

const getServersController = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("servers")
      .populate("servers");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res
      .status(200)
      .json({ success: true, message: "User servers", servers: user.servers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default getServersController;
