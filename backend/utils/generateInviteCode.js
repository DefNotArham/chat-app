import crypto from "crypto";

const generateInviteCode = () => {
  return crypto.randomBytes(4).toString("hex");
};

export default generateInviteCode;
