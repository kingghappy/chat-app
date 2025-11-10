import User from "../models/user.js";
import { comparePass, hashPassword } from "../utils/hashPassword.js";
import genToken from "./../utils/generateToken.js";

export const singupController = async (req, res) => {
  const { username, fullName, password, confirmPassword, gender } = req.body;

  if (
    !username ||
    !fullName ||
    !password ||
    !confirmPassword ||
    !fullName ||
    !gender
  )
    return res.status(400).json({ message: "Missing credentital !!" });

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Invalid confirm password !!" });

  try {
    const user = await User.findOne({ username });
    if (user)
      return res.status(409).json({ message: "username already exist !!" });

    const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const hasshedPass = await hashPassword(password);

    const newUser = new User({
      username,
      fullName,
      password: hasshedPass,
      confirmPassword,
      gender,
      profilePic: gender === "male" ? boyPic : girlPic,
    });

    await newUser.save();

    res.status(200).json({ message: "Create new user success" });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Missing credentital !!" });

  try {
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(404).json({ message: "User not found !!" });

    const isUser = await comparePass(password, user.password);
    if (!isUser) return res.status(400).json({ message: "Wrong pass !!" });

    const payload = {
      sub: user._id.toString(),
      fullName: user.fullName,
      profilePic: user.profilePic,
    };

    const token = genToken(payload);

    res.cookie("at", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 15 * 60 * 1000, // 15 phút
    });
    res.status(200).json({ ok: true, payload });
  } catch (error) {
    console.log("🚀 auth.controller.js:69 - error:", error);
  }
};

export const logoutController = (req, res) => {
  res.json({ message: "Logout success !!" });
};
