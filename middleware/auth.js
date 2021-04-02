const jwt = require('jsonwebtoken');
const async = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('./async');
const mongoose = require('mongoose');



//protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token ;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ){
            token = req.headers.authorization.split(' ')[1];
        } 
        // else if(req.cookies.token) {
        //     token = req.cookies.token
        // 
        //make sure cookies exist 
        if(!token) {
            return next(new ErrorResponse('NOT AUTHORIZED TO ACCESS THIS ROUTE',401));
        }
        try {
            //varify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = await User.findById(decoded.id);
            next();
        } catch (error) {
            return next(new ErrorResponse('NOT AUTHORIZED TO ACCESS THIS ROUTE',401));
        }
});