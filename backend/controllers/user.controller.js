import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Internal server Error',
    });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist === null) {
      await User.create({
        name,
        email,
        password,
      });

      res.status(201).cookie('tempi', 'mycookie').json({
        success: true,
        message: 'User Registered succesfully',
      });
    } else {
      res.json({
        success: false,
        message: 'User is Aleardy Exist',
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: 'Internal server Error',
    });
  }
};
