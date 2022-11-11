import { Router } from "express";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

//List Users
router.get("/user", async (req, res, next) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

// Create Users
router.post("/user/auth/signup", async (req, res, next) => {
  const { body } = req;

  let { name, email, password } = req.body;

  //check all fields
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required." });
  }
  //check valid email
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Your email is not valid." });
  }

  try {
    //check if user exists
    const foundedUser = await User.findOne({ email });
    if (foundedUser) {
      console.log(
        `A user with this email '${foundedUser.email}' alredy exists!`
      );
      return res.status(400).json({
        msg: `A user with this email '${foundedUser.email}' already exists!`,
      });
    }

    //generate password hash
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    //create new user
    const newUser = await User.create({ name, email, passwordHash });
    const { _id } = newUser;
    res.status(201).json({ name, email, _id });
    console.log(`User created sucessfully`, { name, email, _id });
  } catch (error) {
    res.status(400).json({ status: 400, msg: error });
    next(error);
  }
});

//Login
router.post("/auth/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //Look for user by email
    const user = await User.findOne({ email });

    //Check if email was found
    if (!user) {
      return res.status(400).json({ msg: "User not found!" });
    }

    //Compare the password if matchs
    const compareHash = bcrypt.compareSync(password, user.passwordHash);

    //Check if the password is wrong
    if (!compareHash) {
      console.log("Wrong password!");
      return res.status(400).json({ msg: "Wrong password!" });
    }

    //Create payload
    const payload = { id: user._id, email: user.email };

    //Create token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    res.status(200).json({ ...payload, token });
  } catch (error) {
    next(error);
  }
});
export default router;
