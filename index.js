const express = require('express');

const dotenv = require("dotenv");

//database connection
const DbConnection = require('./databaseConnection')

//data import
// const { users } = require('./data/users.json');

//importing routes
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

dotenv.config();


const app = express();

DbConnection();

const PORT  = 8081;

app.use(express.json());

app.get("/", (req,res) => {
    res.status(202).json({
        message:"server is up and running"
    })
})


app.use("/users", usersRouter);
app.use("/books", booksRouter);



//all other request come here
app.get("*",(req,res) => {
    res.status(200).json({
        message:"server is running"
    })
});

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});




















// //all user get req
// app.get("/users" ,(req,res) => {
//     res.status(201).json({
//         success: true,
//         data : users
//     });
// });


// /// user by id

// /*
// route: /users/:id
// method : get
// description: get single user by id
// access: public
// parameters: id
// use parameter like this -- :id
// */ 
// app.get("/users/:id", (req,res) => {
//     const { id } = req.params;
//     const user = users.find((each) => each.id === id);
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: "user not found"
//         })
//     }
//     return res.status(200).json({
//         success: true,
//         data: user
//     })
// });

// /*
// route: /users
// method : post
// description: create new user
// access: public
// parameters: none
// date should be mm/dd/yyyy
// */

// app.post("/users", (req, res) =>{

//     const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;

//     const user = users.find((each) => each.id === id);

    
//     if(user){
//         return res.status(404).json({
//             success: false,
//             message: "User exits with this id"
//         })
//     }
//     users.push({
//         id,
//         name,
//         email,
//         surname,
//         subscriptionType,
//         subscriptionDate
//     })
//     return res.status(201).json({
//         success: true,
//         data: users,
//     })
// });

// /*
// route: /users/:id
// method : put
// description: updating user data
// access: public
// parameters: id
// date should be mm/dd/yyyy
// */
// app.put("/users/:id" , (req, res) => {

//     const { id } = req.params;
//     const { data } = req.body;

//     const user = users.find((each) => each.id === id );

//     if(!user) return res.status(404).json({
//         success: false,
//         message: "User not found"
//     });

//     const updateUser = users.map((each) => {
//         if(each.id === id ){
//             return {
//                 ...each,
//                 ...data,
//             }
//         };
//         return each;
//     })

//     return res.status(201).json({
//         success: true,
//         data: updateUser,
//     })
// });

// /*
// route: /users/:id
// method : delete
// description: delete data using id
// access: public
// parameters: id
// */

// app.delete("/users/:id" , (req, res) => {
//     const { id } = req.params;
//     const user = users.find((each) => each.id === id);

//     if(!user) {
//         return res.status(404).json({
//             success:false,
//             message:"user to be deleted was not found",
//         })
//     }

//     const index = users.indexOf(user);
//     console.log(index);
//     users.splice(index,1);

//     return res.status(202).json({
//         success: true,
//         data: users
//     })
// });