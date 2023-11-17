const express = require("express");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const getAllUser = async(req, res) => {
    try{
        const user = await userModel.find();

        res.status(200).json({result : user, isSuccess : true})
    }catch(error){
        console.log(error.message);
        res.status(400).json({msg : error.message, isSuccess : false})
    }
};

const getUserById = async(req, res) => {
    const userId = req.params.id;
    try{
        const user = await userModel.findById(userId)

        if(!user){
            return res.status(403).json({msg : "User doesn't exists", isSuccess : false})
        }

        res.status(200).json({result : user, isSuccess : true})
    }catch(error){
        console.log(error.message);
        res.status(400).json({msg : error, isSuccess : false})
    }
};

const createUser = async(req, res) => {
    const {name, email, phone, address, zipcode, password, cpassword} = req.body;

    if(!name || !email || !phone || !password || !cpassword){
        return res.status(400).json({msg : "Please fill the details properly", isSuccess : false})
    }

    try{
        let user = await userModel.findOne({email : email});

        if(user){
            return res.status(403).json({msg : "User is already exists", isSuccess : false})
        }

        if(password !== cpassword){
            return res.status(403).json({msg : "Password doesn't match", isSuccess : true})
        }

        const newPassword = await bcrypt.hash(password, process.env.PASSWORD_HASH);
        const newCpassword = await bcrypt.hash(cpassword, process.env.PASSWORD_HASH);

        user = new userModel({
            name : name,
            email : email,
            phone : phone,
            address : address,
            zipcode : zipcode,
            password : newPassword,
            cpassword : newCpassword
        });

        const result = await user.save();

        res.status(200).json({result : result, isSuccess : true})

    }catch(error){
        console.log(error.message);
        res.status(400).json({msg : error.message, isSuccess : false})
    }
};

const editUser = async(req, res) => {
    try{
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {new : true});

        if(!user){
            return res.status(400).json({msg : "User not found", isSuccess : false})
        }

        res.status(200).json({result : user, isSuccess : true})
    }catch(error){
        res.status(400).json({msg : error, isSuccess : false})
    }
};

const deleteUser = async(req, res) => {
    try{
        const user = await userModel.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(400).json({msg : "User not found", isSuccess : false})
        }

        res.status(200).json({result : user, isSuccess : true});
    }catch(error){
        res.status(400).json({msg : error, isSuccess : false})
    }
};

const userLogin = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email : email});

        if(!user){
            return res.status(403).json({msg : "User doesn't exists", isSuccess : false})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg : "Please enter a valid password", isSuccess : false})
        }

        res.status(200).json({result : user, isSuccess : true});
    }catch(error){
        res.status(400).json({msg : error, isSuccess : false})
    }
}

module.exports = {getAllUser, getUserById, createUser, editUser, deleteUser, userLogin}