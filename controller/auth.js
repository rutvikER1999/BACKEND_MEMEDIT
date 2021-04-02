const User = require('../models/User');
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse');

 
//@desc         REGISTER USER
//@route        POST /api/v1/auth/register
//access        Private
exports.register = asyncHandler(async (req, res, next) => {

    const { name, email, password,role } = req.body;
    //create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });
    //create token
    sendTokenResponse(user, 200, res);
});

//@desc         LOGIN SINGLE USER
//@route        POST /api/v1/auth/login
//access        Public
exports.login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    //validate user
    if(!email || !password){
        return next(new ErrorResponse('please provide email and password', 400));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorResponse('invalid credentiale', 401));
    }
    //check if pass mathes
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return next(new ErrorResponse('invalid credentiale', 401)); 
    }

    // const token = user.getSignedjwtToken();
    // return res.status(200).json({ success: true, token});
    sendTokenResponse(user, 200, res);
});


//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    //create token
    const token = user.getSignedjwtToken();
    const option = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        option.secure = true;
    }

    res.status(statusCode)
    .cookie('token', token, option)
    .json({
        success: true,
        token
    });
}

//@desc         GET CURRENT LOGIN USER USER
//@route        POST /api/v1/auth/me
//access        Private

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    });
});