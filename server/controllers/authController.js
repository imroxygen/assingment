const bcrypt=require('bcrypt');
const User = require('../Models/userModel');
const jwt=require('jsonwebtoken');
const AppError = require('../utils/appError');




//user login function
exports.login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        
        const user = await User.findOne({ email });
        if(!user){
            return next(new AppError('User not found', 404));
        }
        const isPasswordvalid=await bcrypt.compare(password,user.password);
        if(!isPasswordvalid)
            {
                return next(new AppError('Invalid username or passwor', 401));
            }

        const token=jwt.sign({id:user._id},'secretkey123',{expiresIn:'1d'});

        res.status(200).json({
            status:'success',
            token,
            message:"Logging successfully!!!",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        })
    } catch (error) {
      next(error);
    }
};

//user signup function

exports.signup=async(req,res,next)=>{
    try {
        
        const {name,email,password}=req.body;
  
        const user = await User.findOne({email:email});

        if(user){
            return next(new AppError('User already exist try to login', 404));
        }

        const hashedpassword=await bcrypt.hash(password,12);
        
        const newUser=await User.create({
            name,
            email,
            password:hashedpassword,
        });

        const token=jwt.sign({
            _id:newUser._id
        },'secretkey123',{expiresIn:'1d'});
        res.status(201).json({
            status:'success',
            message:"User register sucessfully",
            token,
            user:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role,
            },
        })

    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
  try {
    token=req.body.token;

    const { name, email } = req.body;

    const userId = req.user._id;

     const decoded = jwt.verify(token, 'secretkey123');
      
      const existingUser = await User.findById(decoded.id);
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      return next(new AppError('Email is already taken by another user', 400));
    }
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({

      status: 'success',
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};






  exports.protect = async (req, res, next) => {
    token=req.body.token;
  
    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
  
    try {
      const decoded = jwt.verify(token, 'secretkey123');
      

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(new AppError('The user belonging to this token no longer exists.', 401));
      }
  
      req.user = currentUser;
      next();
    } catch (error) {
      next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
  };
