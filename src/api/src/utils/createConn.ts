import mongoose from 'mongoose';
import 'dotenv-safe/config';

const createConn = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Connected to DB: ${conn.connection.host}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};
export default createConn;
