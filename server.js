const express = require('express')
const app = express()
require('dotenv').config()

const session = require('express-session')
const passport = require('passport')

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


//Middleware
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"


//Get the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from Google Developer Console
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID
const FACEBOOK_CLIENT_SECRET= process.env.FACEBOOK_CLIENT_SECRET

authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback   : true
  }, authUser));


//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback"
  }, /* function (accessToken, refreshToken, profile, done) {
    return done(null, profile); 
  }*/
  authUser
));

passport.serializeUser( (user, done) => { 
    done(null, user)
} )


passport.deserializeUser((user, done) => {
        done (null, user)
}) 


//Start the NODE JS server
app.listen(3001, () => console.log(`Server started on port 3001...`))

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope:
      [ 'public_profile', 'email'] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
}));

app.get('/auth/facebook/callback',
    passport.authenticate( 'facebook', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
}));

//Define the Login Route
app.get("/login", (req, res) => {
    res.render("login.ejs")
})

//Use the req.isAuthenticated() function to check if user is Authenticated
checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

//Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware
app.get("/dashboard", checkAuthenticated, (req, res) => {
  //res.render("dashboard.ejs", {name: req.user.displayName,
 res.json({name: req.user.displayName, email: req.user.email,
picture:req.user.picture, provider:req.user.provider,
providerid:req.user.id})  
})

//Define the Logout
app.post("/logout", (req,res) => {
    req.session = null;
    req.logOut()
    res.redirect("/login")
    console.log(`-------> User Logged out`)
})
