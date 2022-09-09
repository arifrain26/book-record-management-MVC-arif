const IssuedBook = require('../dtos/book-dto');
const { UserModel, BookModel } = require('../models');

exports.getAllBooks = async (req, res) => {
                    //get book from db
    const books = await BookModel.find();

    if (books.length === 0 ){
        return res.status(404).json({
            success: false,
            message:"no book found"
        });
    }
    res.status(202).json({
        success: true,
        data:books,
    })
};

exports.getSingleBookById = async (req,res) => {
    const { id } = req.params;

    const book = await BookModel.findById(id);

    if(!book) {
        return res.status(404).json({
            success:false,
            message: "book not found"
        })
    }

    return res.status(202).json({
        success:true,
        data: book
    })
};

exports.getSingleBookByName = async (req,res) => {
    const { name } = req.params;

    const book = await BookModel.findOne({name:name,});

    if(!book) {
        return res.status(404).json({
            success:false,
            message: "book not found"
        })
    }

    return res.status(202).json({
        success:true,
        data: book
    })
};

exports.getAllIssuedBooks = async (req,res) => {
    const users = await UserModel.find({
        issuedBook: { $exists: true }, //check this field in user db if this exits
    }).populate("issuedBook");

    //dto (data transform object) send require data 
    const issuedBooks = users.map((each) => {
        console.log(each);
        return new IssuedBook(each);
    });

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success:false,
            message:"no book issued yet"
        })
    }

    return res.status(200).json({
        success:true,
        data: issuedBooks
    })
};

exports.addNewBook = async (req, res) => {
    const { data } = req.body;

    if(!data){
        return res.status(404).json({
            success:false,
            message:"no data provided",
        });
    }

    // const book = books.find((each) => each.id === data.id);

    await BookModel.create(data);

    const allNewBooks = await BookModel.find();

    // if(book){
    //     return res.status(404).json({
    //         success:false,
    //         message: "Book already exits with thid id, pls use a unique id"
    //     })
    // }

    
    // const allBooks = [...books, data];

    return res.status(201).json({
        success:true,
        data: allNewBooks,
    })
};

exports.updateBookById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    // const book = books.find((each) => each.id === id);

    // if(!books){
    //     return res.status(404).json({
    //         success: false,
    //         message:"Books not found with this particular id"
    //     })
    // }

    // const updateData = books.map((each) => {
    //     if(each.id === id){
    //         return { ...each, ...data };
    //     }
    //     return each;
    // });

    const updatedBook = await BookModel.findOneAndUpdate({
        _id:id,
    },
    data,
    {new:true,});


    return res.status(202).json({
        success: true,
        data: updatedBook,
    })
};



