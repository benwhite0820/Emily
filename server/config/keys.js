// key.js - figure out what set of credentials to return
import {
    googleClientID as devGoogleClientID,
    googleClientSecret as devGoogleClientSecret,
    mongoURI as devMongoURI,
    cookieKey as devCookieKey,
} from './dev.js';

export let googleClientID = process.env.GOOGLE_CLIENT_ID || devGoogleClientID;
export let googleClientSecret =
    process.env.GOOGLE_CLIENT_SECRET || devGoogleClientSecret;
export let mongoURI = process.env.MONGO_URI || devMongoURI;
export let cookieKey = process.env.COOKIE_KEY || devCookieKey;
