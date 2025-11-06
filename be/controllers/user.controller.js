import User from "../models/user.js";
import * as Pass from "../utils/hashPassword.js";

export const changPassController = async (req, res) => {
  const { currPass, newPass, username } = req.body;
  if (!currPass || !newPass)
    return res.status(400).json({ message: "Missing credentital !!" });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found !!" });

    const isUser = await Pass.comparePass(currPass, user.password);
    if (!isUser) return res.status(400).json({ message: "Wrong pass !!" });

    const hashedPass = await Pass.hashPassword(newPass);

    const updatedUser = await User.updateOne(
      { username },
      { $set: { password: hashedPass } }
    );
    res.json({ message: "update password success !!", updatedUser });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
