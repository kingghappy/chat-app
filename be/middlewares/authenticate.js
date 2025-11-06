// gateway/src/middlewares/authenticate.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Fi123581321";

const authenticate = async(req, res, next) => {
  const { at } = req.cookies;
  if (!at) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  try {
    // Verify JWT
    const payload = jwt.verify(at, JWT_SECRET);

    req.user = {
      sub: payload.sub,
    };

    return next();
  } catch (err) {
    const isExpired = err?.name === "TokenExpiredError";
    return res.status(401).json({
      message: isExpired ? "Token expired" : "Invalid token",
    });
  }
}

export default authenticate