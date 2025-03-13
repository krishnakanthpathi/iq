/**
 * User Schema 
 * @module model/user.model
 * 
 * @typedef {Object} User
 * 
 * @property {String} username - The username of the user
 * @property {String} email - The email of the user
 * @property {String} password - The password of the user
 * @property {String} bio - The bio of the user
 * @property {Number} rating - The rating of the user
 * @property {Problem[]} solved - Array of solved problem ids
 * @property {Doubt[]} doubts_created - Array of created doubt ids
 * @property {Doubt[]} doubts_assigned - Array of assigned doubt ids
 * @property {Date} createdAt - The date when the user was created
 * @property {Date} updatedAt - The date when the user was last updated
 */

import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://www.gravatar.com/avatar/"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    solved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem"
    }],
    doubts_created: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doubt"
    }],
    doubts_assigned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doubt"
    }]
}, { timestamps: true });

const User = mongoose.model("User", user_schema);

export default User;
