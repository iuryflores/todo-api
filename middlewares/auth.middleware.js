import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  //Get Authorization
  const token = req.get("Authorization");

  //Check if token was provided
  if (!token) {
    return res.status(401).json({ msg: "Token is required!" });
  }

  //Remove Auth Type
  const tokenWithoutBearer = token.split(" ")[1];

  try {
    const decodedToken = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = { ...decodedToken };
    next();
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

export default auth;
