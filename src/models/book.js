const validator = require('validator')
const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
    isbn: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isISBN(value)) {
                throw new Error('The ISBN is not correct!')
            }
        }
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    published: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// bookSchema.methods.toJSON = function() {
//     const bookObject = this.toObject()
//     delete bookObject.owner

//     return bookObject
// }
const Book = mongoose.model('Book', bookSchema)
module.exports = Book