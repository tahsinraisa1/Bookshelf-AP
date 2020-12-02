const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Book = require('./book')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age cannot be negative!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    
}, {
    timestamps: true
})
userSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
    const userObject = this.toObject()
    
    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.authTokenGenerator = async function() {
    const token = jwt.sign({_id: this._id.toString()}, 'logintokenstring')

    this.tokens = this.tokens.concat({token})
    await this.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Wrong login information!')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) {
        throw new Error('Wrong login information!')
    }
    return user
}

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})
//FOR CASCADE DELETE
userSchema.pre('remove', async function(next) {
    await Book.deleteMany({owner: this._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User