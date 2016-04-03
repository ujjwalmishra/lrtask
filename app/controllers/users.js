'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const wrap = require('co-express');
const User = mongoose.model('User');

/**
 * Load
 */

exports.load = wrap(function* (req, res, next, _id) {
  const criteria = { _id };
  req.profile = yield User.load({ criteria });
  if (!req.profile) return next(new Error('User not found'));
  next();
});

/**
 * Create user
 */

exports.create = wrap(function* (req, res) {
  const user = new User(req.body);
  user.provider = 'local';
  yield user.save();
  req.logIn(user, err => {
    if (err) req.flash('info', 'Sorry! We are not able to log you in!');
    return res.redirect('/');
  });
});

/**
 *  Show profile
 */

exports.show = function (req, res) {
  const user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user
  });
};

exports.signin = function () {};

/**
 * Auth callback
 */

exports.authCallback = login;

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('users/login', {
    title: 'Login',
    apikey: 'd9eb69bf-a0dd-4039-a160-f96f5c553cb8',
    appname: 'lr-assignment4' 

  });
};

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User(),
    apikey: 'd9eb69bf-a0dd-4039-a160-f96f5c553cb8',
    appname: 'lr-assignment4' 
  });
};

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/login');
};

/**
 * Session
 */

exports.session = login;

/**
 * Login
 */

function login (req, res) {
  const redirectTo = req.session.returnTo
    ? req.session.returnTo
    : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}


/**
 * Callback after login
 */

 exports.callback = function(lr){
    return function(req,res){
      var data = {};

      lr.getAccessToken( request.body.token ).then( function( accesstoken ) {
        
        data.token = accesstoken.access_token;

        return lr.getUserProfile( data.token );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( userprofile ){
        data.userprofile = userprofile;

        //To get user contacts
        return lr.getContacts( data.token, 0 );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( contacts ) {
        data.contacts = contacts;

        //To get user albums
        return lr.getAlbums( data.token );
          
      }).catch( function( error ) {

        console.log( error );

      }).then( function( albums ) {
        data.albums = albums;
        //To get user photo
        return lr.getPhotos( data.token, albums[0].ID );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( photos ) {
        data.photos = photos;
      
        //To get user check-ins
        return lr.getCheckins( data.token );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( checkins ) {
        data.checkins = checkins;

        //To get user audios
        return lr.getAudios( data.token );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( audios ) { 
        data.audios = audios;

        //To get user mentions
        return lr.getMentions( data.token );
          
      }).catch( function( error ) {

        console.log( error );

      }).then( function( mentions ) { 
        data.mentions = mentions;

        //To get user followings
        return lr.getFollowings( data.token );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( followings ) { 
        data.followings = followings;

        //To get user events
        return lr.getEvents( data.token );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( events ) {
        data.events = events;
        //To get user posts
        return lr.getPosts( data.token );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( posts ) {
        data.posts = posts;

        return lr.getCompanies( data.token );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( companies ) {
        data.companies = companies;

        //To get user groups
        return lr.getGroups( data.token );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( groups ) {

        data.groups = groups;

        //To get user statuses
        return lr.getStatuses( data.token );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( statuses ) {
        data.statuses = statuses;

        //To get user videos
        return lr.getVideos( data.token );

      }).catch( function( error ) {

        console.log( error );

      }).then( function( videos ) {
        data.videos = videos;

        //To get user likes
        return lr.getLikes( data.token );
          
      }).catch( function( error ) {

        console.log( error );

      }).then( function( likes ) {

        data.likes = likes;

        //To post status on facebook, twitter and linkedin
        return lr.postStatus( data.token, "", "", "I'm life Enjoying", "", "", "" ); 
        
      }).catch( function( error ) {

        console.log( error );

      }).then( function( poststatus ) {
        
        data.isposted = poststatus && poststatus.isPosted == true ? "successfully posted!!" : "Not posted!!";

        //To send direct message on twitter and linkedin
        return lr.postMessage( data.token, "1652632832", "Hello", "How r U?" );
      }).catch( function( error ) {

        console.log( error );

      }).then( function( postmsg ) {
        
        data.issent = postmsg && postmsg.isPosted == true ? "successfully sent!!" : "Not sent!!";

        response.render('sociallogin', {
          title: 'Welcome to Social Login User Profile Data',
          data: data
        });
      });
    }
 }