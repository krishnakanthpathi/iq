import User from '../models/user.model.js';
import Submission from '../models/submission.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// create a user
const create_user = async (req, res) => {
    console.log("create_user start");
    const { username, avatar , email, password, bio , isAdmin } = req.body;
    try{
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            avatar,
            email,
            password: hashedPassword,
            bio:bio,
            isAdmin
        });

        await user.save();
        console.log("User created successfully");
        return res.status(201).json({messege : "User created successfully" , data : user}); ;
    }catch(err){
        console.log("User creation failed", err);
        return res.status(400).json({messege : "User creation failed" , error : err.message});
    } finally {
        console.log("create_user end");
    }
}

const login_user = async (req, res) => {
    console.log("login_user start");
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log("token", token);
        console.log("User logged in successfully");
        return res.status(200).json({ 
            message: "User logged in successfully", 
            token , data : user 
        });
    }
    catch (err) {
        console.log("User login failed", err);
        return res.status(400).json({ message: "User login failed", error: err.message });
    } finally {
        console.log("login_user end");
    }
}

const create_user_all = async (req, res) => {
    console.log("create_user_all start");
    const users = req.body;
    try{
        await User.insertMany(users);
        console.log("Users created successfully");
        return res.status(201).json({messege : "Users created successfully" , data : users}); ;
    }catch(err){
        console.log("Users creation failed", err);
        return res.status(400).json({messege : "Users creation failed" , error : err.message});
    } finally {
        console.log("create_user_all end");
    }
}

const get_all_users = async (req, res) => {
    console.log("get_all_users start");
    try{
        const users = await User.find({});
        console.log("Users fetched successfully");
        return res.status(200).json({messege : "Users fetched successfully" , data : users}); ;
    }catch(err){
        console.log("Users fetch failed", err);
        return res.status(400).json({messege : "Users fetch failed" , error : err.message});
    } finally {
        console.log("get_all_users end");
    }
}

const get_user_by_id = async (req, res) => {
    console.log("get_user_by_id start");
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        console.log("User fetched successfully");
        return res.status(200).json({messege : "User fetched successfully" , data : user}); ;
    } catch(err){
        console.log("User fetch failed", err);
        return res.status(400).json({messege : "User fetch failed" , error : err.message});
    } finally {
        console.log("get_user_by_id end");
    }
}

const add_submission = async (req, res) => {
    console.log("add_submission start");
    const { userId, problemId, description } = req.body;
    console.log(userId, problemId, description, "-- submission");
    const submission = new Submission({
        userId,
        problemId,
        description
    });
    try {
        const savedSubmission = await submission.save();
        const submissionId = savedSubmission._id;
        const user = await User.findById(userId);

        // Check if the submission already exists in the user's solved array
        if (user.solved.includes(submissionId)) {
            console.log("Submission already added to user");
            return res.status(400).json({ message: "Submission already added to user" });
        }

        user.solved.push(submissionId);
        await user.save();

        console.log("Submission created successfully and added to user");
        return res.status(201).json({ message: "Submission created successfully and added to user", data: submission });
    } catch (err) {
        console.log("Submission creation failed", err);
        return res.status(400).json({ message: "Submission creation failed", error: err.message });
    } finally {
        console.log("add_submission end");
    }
}

const update_user_by_id = async (req, res) => {
    console.log("update_user_by_id start");
    const { id } = req.params;
    const { username, avatar, email, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { username, avatar, email, password },
            { new: true, runValidators: true }
        );
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        console.log("User updated successfully");
        return res.status(200).json({ message: "User updated successfully", data: user });
    } catch (err) {
        console.log("User update failed", err);
        return res.status(400).json({ message: "User update failed", error: err.message });
    } finally {
        console.log("update_user_by_id end");
    }
}

const delete_user_by_id = async (req, res) => {
    console.log("delete_user_by_id start");
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        console.log("User deleted successfully");
        return res.status(200).json({ message: "User deleted successfully", data: user });
    } catch (err) {
        console.log("User delete failed", err);
        return res.status(400).json({ message: "User delete failed", error: err.message });
    } finally {
        console.log("delete_user_by_id end");
    }   
}

export default { 
    create_user,
    create_user_all,
    login_user,
    get_all_users,
    get_user_by_id,
    update_user_by_id,
    delete_user_by_id,
    add_submission
};
