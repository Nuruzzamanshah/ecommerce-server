const User = require("../models/UserModel");
const jwt  = require("jsonwebtoken");

// Registration
exports.signup = (req, res) =>{
    User.findOne({email: req.body.email})
        .exec((error,user)=>{
            if (user)return res.status(400).json({
                message: 'User Already Registered'
            });
            const {firstName, lastName, email, password} = req.body;
            const _user = new User ({firstName, lastName, email, password, userName:Math.random().toString()});

            _user.save((error,data)=> {
                if (error){
                    return res.status(400).json({
                        message: 'Something Went Wrong'
                    });
                }
                if (data){
                    return res.status(201).json({
                        message: 'User Created Successfully...!'
                    })
                }
            })
        });
};

//Login

exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
        .exec((error, user) =>{
            if (error) return res.status(400).json({error});
            if (user){
                if (user.authenticate(req.body.password)){
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'});
                    const {_id, firstName, lastName, email, role, fullName} = user;
                    res.status(200).json({
                        token,
                        user: {
                           _id, firstName, lastName, email, role, fullName
                        }
                    })
                }else {
                    return res.status(400).json({
                        message: 'Invalid Password'
                    })
                }
            }else {
                return res.status(400).json({message: 'Something Went Wrong'});
            }

        })
}