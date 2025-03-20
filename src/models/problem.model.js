/**
 * Problem Schema
 * @module model/user.model
 * 
 * @typedef {Object} Problem ======
 * 
 * @property {String} title 
 * @property {String} description
 * @property {Number} difficulty
 * @property {String[]} tags
 * @property {String} Editorial ???
 * 
 * @property {User} userId - ObjectId of User
 * 
 * @property {User[]} usersSolved
 * @property {Doubt[]} doubts
 * 
 * @property {Teacher} createrId 
 * 
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * 
 * Additional properties Yet to be added: 
 * @property {Submissions} ??
 * 
 */

import mongoose from 'mongoose';

const problem_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    editorial: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    usersSolved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    doubts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doubt"
    }],
    createrId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // removed createrId required: true
    }
}, { timestamps: true });

const Problem = mongoose.model('Problem', problem_schema);
export default Problem;
