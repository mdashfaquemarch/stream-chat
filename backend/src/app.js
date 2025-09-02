import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import "./config/passport-config.js"
import passport from 'passport';
import { Config } from './config/server-config.js';
import {createServer} from 'http'
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

// common middlewares
// console.log(Config.BASE_URL);
app.use(cors({
    origin: Config.BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// importing routes
import apiRoutes from './routes/index.js';
import { roomSocketHandler,isDoneToggleSocketHandler, messageSocketHandler } from './controllers/socket.controller.js';



// use
app.use("/api", apiRoutes);

io.on("connection", (socket) => {
    roomSocketHandler(io, socket);
    isDoneToggleSocketHandler(io, socket);
    messageSocketHandler(io, socket);
});

app.get('/auth/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'], prompt: 'consent' }));

app.get('/auth/google/callback', 
  passport.authenticate('google', {session: false, failureRedirect: `${Config.BASE_URL}/signin` }),
  (req, res) => {
    // Successful authentication, redirect home.
    const {user, accessToken} = req.user;

    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 24*60*60*1000,
        sameSite: 'Lax'
      }
    res.cookie("accessToken", accessToken, options);

    // redirect to frontend here;

    res.redirect(`${process.env.BASE_URL}/dashboard`)

    // console.log("user ", user);
    // console.log("accessToken", accessToken);

    // res.json({user, accessToken});
  });


export {app, io};