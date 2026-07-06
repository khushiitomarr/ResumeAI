import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const registerUser = async (req, res) => {
  const { name, email, password} = req.body;

  if(!name|| !email || !password){
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    })
  }
  
  const existingUser = await User.findOne({ email})
  
  if(existingUser){
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  
  return res.status(201).json({
    success: true,
    message: 'User Registered Successfully',
    user
  });
};

const loginUser = async (req, res) => {
  const{email, password} = req.body;

   if(!email || !password){
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    })
  }

   
  const user = await User.findOne({ email })
  
  if(!user){
    return res.status(401).json({
      success: false,
      message: 'User not found'
    });
  }
const isMatch = await bcrypt.compare(password, user.password);

if(!isMatch){
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

const token = jwt.sign(
    {
        id: user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"7d"
    }
);

return res.status(200).json({
  success: true,
  message: "Login Successful",
  token,
});

}

export { registerUser, loginUser };
