const express = require('express');
const app = express();
const ServerUserRouter = express.Router();

const User = require('../models/User');
const UserSession = require('../models/UserSession');

ServerUserRouter.route('/add').post(function (req, res) {
  const serveruser = new User(req.body);
  let {body} = req;
  const {
        firstName,
        lastName,
        password
    } = body;
    let {
        email
    } = body;

    if (!firstName) {
        return res.send({
            success: false,
            message: 'Error: First name cannot be blank.'
        })
    }

    if (!lastName) {
        return res.send({
            success: false,
            message: 'Error: Last name cannot be blank.'
        })
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password name cannot be blank.'
        })
    }

    console.log('here')

    email = email.toLowerCase();

    User.find({
        email: email
    }, (err, previousUsers) => {
        if(err){
            return res.send({
                success: false,
                message: 'Error: Server error.'
            })
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exists.'
            })

        }
        //Save the new user
        let newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
          serveruser.save()
    .then(serveruser => {
        res.json('User created successfully');
        console.log('here')
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
    });

})

    ServerUserRouter.route('/signin').post(function (req, res) {
        let {body} = req;
        const {
              password
          } = body;
          let {
              email
          } = body;
        
          if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            })
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password name cannot be blank.'
            })
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) =>{
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                })
            }
            console.log('Primer paso');
            if(users.length != 1){
                return res.send({
                    success: false,
                    message: 'Error: Invalid password'
                })
            }
            console.log('Segundo paso');
            const user = users[0];
            console.log(user.validPassword(password))
            if(!user.validPassword(password)){
                return res.send({
                    success: false,
                    message: 'Error: Invalid password'
                })
            }
            console.log('Tercer paso');
            //otherwise, correct user, create user session
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if(err){
                    return res.send({
                        success: false,
                        message: 'Error: server error.'
                    })   
                }
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                })
            })
        })

        });


        ServerUserRouter.route('/verify').get(function (req, res) {
            //Get the token 
            const { query } = req;
            const { token } = query;

            //Verify token is one of a kind and its not deleted
            UserSession.find({
                _id: token,
                isDeleted: false
            }, (err, sessions) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                
                if(sessions.length != 1){
                    return res.send({
                        success: false,
                        message: 'Error: Invalid'
                    });    
                } else {
                    return res.send({
                        success: true,
                        message: 'Valid session'
                    });
                }
            })
            
            });

        ServerUserRouter.route('/logout').get(function (req, res) {
            //Get the token 
            const { query } = req;
            const { token } = query;

            //Verify token is one of a kind and its not deleted
            UserSession.findOneAndUpdate({
                _id: token,
                isDeleted: false
            }, {
                $set: {
                    isDeleted: true
                }
            }, null, 
                (err, sessions) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                
               
                    return res.send({
                        success: true,
                        message: 'User logged out'
                    });
                
            })                
            });



module.exports = ServerUserRouter;