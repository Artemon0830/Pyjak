import express from 'express';
import mongoose from 'mongoose';
import { adminRouter,  } from './routes/admin.router';
import { placeRouter } from './routes/place.router';
import { authRouter } from './routes/auth.router';
import { configs } from './configs/configs';
import { userRouter } from './routes/user.router';
import fileUpload from 'express-fileupload';
import { chatRouter } from './routes/chat.router';
import { newsRouter } from './routes/news.router';





const app = express();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true }));
app.use(fileUpload())
app.use('/admin',adminRouter)
app.use('/auth',authRouter);
app.use('/users', userRouter);
app.use('/places',placeRouter)
app.use('/chats',chatRouter)
app.use('/news',newsRouter)

async function start() {
  try {
    await mongoose.connect(configs.MONGO_DB);
    console.log('MongoDB connected');
    
    // await s3Service.initBucket();

    app.listen(configs.APP_PORT, () => {
      console.log(`Server run http://${configs.APP_HOST}:${configs.APP_PORT}`);
    });
   
  } catch (error) {
    console.log(error);
  }
}

start();