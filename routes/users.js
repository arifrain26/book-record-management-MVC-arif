const express = require("express");
const { getAllUsers, getSingleUserById, deleteUser, 
    updateUserById, createNewUser, getSubcriptionDetailById } = require("../controllers/user-controller");
const { users } = require("../data/users.json");

const router = express.Router();

router.use(express.json());

//all user get req
router.get("/" ,getAllUsers);


/// user by id

/*
route: /users/:id
method : get
description: get single user by id
access: public
parameters: id
use parameter like this -- :id
*/ 
router.get("/:id", getSingleUserById);

/*
route: /users
method : post
description: create new user
access: public
parameters: none
date should be mm/dd/yyyy
*/

router.post("/", createNewUser);

/*
route: /users/:id
method : put
description: updating user data
access: public
parameters: id
date should be mm/dd/yyyy
*/
router.put("/:id" , updateUserById);

/*
route: /users/:id
method : delete
description: delete data using id
access: public
parameters: id
*/

router.delete("/:id" , deleteUser);

/*
route: /users/subscription-details/:id
method : get
description: get all user subscriptions details
access: public
parameters: id
*/

router.get("/subscription-details/:id", getSubcriptionDetailById);

module.exports = router;