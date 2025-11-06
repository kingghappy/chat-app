import jwt from "jsonwebtoken";

export const jwt_secret = process.env.JWT_SECRET || "Fi123581321";

const genToken = (payload) => {
  return jwt.sign({ ...payload }, jwt_secret,{ expiresIn: 6 * 60 * 60 });
};

export default genToken