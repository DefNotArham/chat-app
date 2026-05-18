import mongoose from "mongoose";

const dmSchema = new mongoose.Schema(
  {
    to: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    from: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const DM = mongoose.model("dm", dmSchema);

export default DM;
