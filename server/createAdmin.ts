import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    const userExists = await User.findOne({ email: 'ishtdevxia6958@gmail.com' });
    if (!userExists) {
      await User.create({
        name: 'Isht Dev',
        email: 'ishtdevxia6958@gmail.com',
        password: '12345@',
        role: 'admin'
      });
      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
