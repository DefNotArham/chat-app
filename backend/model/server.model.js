import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  inviteCode: { type: mongoose.Schema.Types.ObjectId, unique: true },
  image: { type: String, default: "" },
});

const Server = mongoose.model("server", serverSchema);

export default Server;
