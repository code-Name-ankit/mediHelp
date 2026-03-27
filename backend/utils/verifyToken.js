import jwt from "jsonwebtoken";

const verifyToken = (req) => {
  try {
    const header = req.headers.authorization;

    if (!header) return null;

    const token = header.split(" ")[1];

    return jwt.verify(token, process.env.JWT_SECRET);

  } catch (err) {
    return null;
  }
};

export default verifyToken;