import express from 'express';
import authRouthes from './routes/authRoutes.js';
import mongoose from 'mongoose';
import { cookieKey, mongoURI } from './config/keys.js';
import cookieSession from 'cookie-session';
import passport from 'passport';
import './models/User.js';
import './services/passport.js';

mongoose.connect(mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRouthes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
