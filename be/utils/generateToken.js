import jwt from "jsonwebtoken";

const genToken = (payload) => {
  return jwt.sign({ payload }, { expiresIn: 6 * 60 * 60 });
};

export default genToken