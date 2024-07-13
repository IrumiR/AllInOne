import User from "../models/UserSchema.js";
import ServiceProvider from "../models/ServiceProviderSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { userRoles } from "../constants/index.js";

const generateToken = (payload) => {
  // const payload = { id: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '15d' });
};

// customer resgiter route
export const register = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    // user info
    firstName,
    lastName,
    email,
    phone,
    address_line_1,
    address_line_2,
    city,
    district,
    province,
    postal_code,
    password,

    // data info
    role,
  } = req.body


  try {


    let user = await User.findOne({ email })

    // else if (role === 'service-provider') {
    //     user = await ServiceProvider.findOne({ email })
    // }

    //check whether the user exists
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // set role name
    const roleName = userRoles[role];

    user = new User({
      firstName,
      lastName,
      email,
      phone,
      address_line_1,
      address_line_2,
      city,
      district,
      province,
      postal_code,
      password: hashedPassword,
      roleName,
    })



    await user.save()

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const token = generateToken(payload);

    res.json({ token, userId: user.userId });


  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

// service provider register route
export const registerServiceProvider = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const {
      firstName,
      lastName,
      email,
      phone,
      address_line_1,
      address_line_2,
      city,
      district,
      province,
      postal_code,
      password,
      role,
      businessName,
      businessAddress,
      businessLogo,
      workingHours,
      workingAreas,
      serviceCategories,
      businessContactNumbers,
      businessEmail,
      businessWebsite
  } = req.body;

  try {
      let user = await User.findOne({ email });

      if (user) {
          return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // set role name
      const roleName = userRoles[role];


      user = new User({
          firstName,
          lastName,
          email,
          phone,
          address_line_1,
          address_line_2,
          city,
          district,
          province,
          postal_code,
          password: hashedPassword,
          role: roleName
      });

      await user.save();


      const serviceProvider = new ServiceProvider({
          userId: user._id,
          businessName,
          businessAddress,
          businessLogo,
          workingHours,
          workingAreas,
          serviceCategories,
          businessContactNumbers,
          businessEmail,
          businessWebsite
      });

      await serviceProvider.save();

      const payload = {
        user: {
          id: user._id,
          role: user.role,
        },
      };
  
      const token = generateToken(payload);

      res.status(201).json({ type: 'sucess', data: { token, userId: user.userId }});

  } catch (error) {
      res.status(500).json({ type: 'error', message: error.message });
  }
};

// login
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    const token = generateToken(payload);

    res.json({ token, userId: user._id, role: user.role, email: user.email });


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};