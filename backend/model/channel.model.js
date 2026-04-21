import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "server",
      required: true,
    },
  },
  { timestamps: true },
);

const Channel = mongoose.model("channel", channelSchema);

export default Channel;
