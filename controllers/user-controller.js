const { UserModel, BookModel } = require('../models/index');

exports.getAllUsers = async (req,res) => {
    const users = await UserModel.find(); // find user form db
    
    if(users.length === 0 ){
        return res.status(404).json({
            success:false,
            message:"No User found"
        })
    }

    res.status(201).json({
        success: true,
        data : users
    });
}

exports.getSingleUserById = async (req,res) => {
    const { id } = req.params;
                                    //or findById({_id: id})
    const user = await UserModel.findById(id); //get user from db

    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }
    return res.status(200).json({
        success: true,
        data: user
    })
}

exports.createNewUser = async (req, res) =>{

    const { data } = req.body;

    const newUser = await UserModel.create(data); 

    return res.status(201).json({
        success: true,
        data: newUser,
    });
}

exports.updateUserById = async (req, res) => {

    const { id } = req.params;
    const { data } = req.body;

    const updatedUserData = await UserModel.findOneAndUpdate({
        _id:id
    },
    {   $set:   { //operator for spread data
            ...data,},
    },{new:true,});

    return res.status(201).json({
        success: true,
        data: updatedUserData,
    })
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.deleteOne({_id:id});

    if(!user) {
        return res.status(404).json({
            success:false,
            message:"user to be deleted was not found",
        })
    }

    // const index = users.indexOf(user);
    // console.log(index);
    // users.splice(index,1);

    return res.status(202).json({
        success: true,
        message:"deleted user successfully",
    })
}

exports.getSubcriptionDetailById = async (req,res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message:"user not found"
        })
    }

    const getDateInDays = (data = "") => {
        let date;
        if(data === ""){
            // current date
            date = new Date();
        }else{
            // getting date on basis of data variable
            date = new Date(data);
        }

        let days = Math.floor(date / ( 1000 * 60 * 60 * 24));
        return days;
    };

    const subscriptionType = (date) => {

        if(user.subscriptionType === "Basic"){
            date = date + 90;
        }else if(user.subcriptionType === "Standard"){
            date = date + 180;
        }else if(user.subcriptionType === "Premium"){
            date = date + 365
        }

        return date;
    }

    //subscription expiration calculation
    //from 1 january , 1970, UTC in milisecond

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user._doc,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine: returnDate < currentDate ? 
            subscriptionExpiration <= currentDate ? 200 : 100
         : 0,
    }

    return res.status(200).json({
        success: true,
        data,
    })
}


///✅
