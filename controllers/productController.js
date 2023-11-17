const express = require("express");
const productModel = require("../models/product");
const CryptoJS = require("crypto-js");

const getAllProduct = async(req, res) => {
    try{
        const product = await productModel.find();

        res.status(200).json({result : product, isSuccess : true})
    }catch(error){
        res.status(400).json({msg : error, isSuuccess : false})
    }
};

const getProductById = async(req, res) => {
    const productId = req.params.id;
    try{
        const product = await productModel.findById(productId);

        if(!product){
            return res.status(403).json({msg : "Product doesn't exists", isSuccess : false})
        }

        res.status(200).json({result : product, isSuccess : true})
    }catch(error){
        res.status(400).json({msg : error, isSuccess : false})
    }
};

const createProduct = async(req, res) => {
    const {productName, productType, price, rating, image} = req.body;

    if(!productName || !productType || !price || !rating || !image){
        return res.status(400).json({msg : "Please fill the details properly", isSuccess : false})
    }

    try{
        let product = new productModel({
            productName : productName,
            productType : productType,
            price : price,
            rating : rating,
            image : image
        });

        const result = await product.save();

        // const cipherText = CryptoJS.AES.encrypt(JSON.stringify(result), process.env.SECRET_KEY).toString();

        // console.log(cipherText);

        res.status(200).json({result : result, isSuccess : true})
    }catch(error){
        res.status(400).json({msg : error, isSuccess : false})
    }
};

const editProduct = async(req, res) => {
    try{
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, {new : true});

        if(!product){
            return res.status(400).json({msg : "Product not found", isSuccess : false})
        }

        res.status(200).json({result : product, isSuccess : true})

    }catch(error){
        res.status(200).json({msg : error, isSuccess : false})
    }
};

const deleteProduct = async(req, res) => {
    try{
        const product = await productModel.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(400).json({msg : "Product not found", isSuccess : false});
        }

        res.status(200).json({result : product, isSucces : true})

    }catch(error){
        console.log(error.message)
        res.status(400).json({msg : error.message, isSuccess : false})
    }
};

module.exports = {getAllProduct, getProductById, createProduct, editProduct, deleteProduct}