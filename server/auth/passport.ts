require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
import { GraphQLLocalStrategy } from "graphql-passport";
// import { PrismaClient } from "@prisma/client";
import { prisma } from "../index";
import { User } from "@prisma/client";


passport.use(
    new GraphQLLocalStrategy(async (username : any, password, done) => {
      const user =  await prisma.user.findFirst({
        where : {
            email: username
        }
      })
      console.log("authorize fxn hit")
    //   const matchingUser = users.find(user => email === user.email && password === user.password);
      const error = user ? null : new Error('no matching user');
      done(error, user);
    }),
  );

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback',
//     scope: ["profile", "email"],
//     passReqToCallback: true
//   },
//   (request: any, accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => void) => {
//     // Process the user data obtained from Google OAuth
//     // You can customize this logic based on your needs
//     // const user = {
//     //   googleId: profile.id,
//     //   displayName: profile.displayName,
//     //   email: profile.emails[0].value,
//     //   // Add any other relevant user data
//     // };
//     // console.log("accessToken", accessToken)
//     // console.log("refreshToken", refreshToken)
//     // console.log("profile", profile)
//     // Pass the user data to the done() callback
//     done(null, profile);
//   }
// ));

// passport.serializeUser(function(user: { id: any; username: any; name: any; }, cb: (arg0: null, arg1: { id: any; username: any; name: any; }) => void) 
passport.serializeUser((user:any, done : (_:any, userId:string) => void) => {
    // process.nextTick(function() {
        console.log("serialize hit", user)
      done(null, user.id);
    // });
  });
  
  passport.deserializeUser(async(id : string, done: (_:any, user: User | null) => void) => {
    // process.nextTick(function() {    
        console.log("deserialize hit")
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })
        
     done(null, user);
    // });
  });

// Initialize Passport.js middleware

