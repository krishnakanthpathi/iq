import Problem from "../models/problem.model.js";
import mongoose from "mongoose";

const create_problem = async (req, res) => {
    console.log("Entered create_problem");
    const {
        title,
        description,
        difficulty,
        tags,
        editorial,
        userId,
        usersSolved,
        doubts,
        createrId
    } = req.body;
    try {
        const problem = new Problem({
            title,
            description,
            difficulty,
            tags,
            createrId
        });
        if (!mongoose.Types.ObjectId.isValid(createrId)) {
            console.log("Invalid createrId");
            return res.status(400).json({ message: "Invalid createrId" });
        }
        await problem.save();
        console.log("Problem Successfully Created");
        return res.status(201).json({ message: "Problem Successfully Created", problem });
    } catch (error) {
        console.log("Error in Creating Problem", error.message);
        return res.status(500).json({ message: "Error in Creating Problem", error: error.message });
    }
    console.log("Exiting create_problem");
}

const create_problem_all = async (req, res) => {
    console.log("Entered create_problem_all");
    try {
        await Problem.insertMany(req.body);
        console.log("All Problems Successfully Created");
        return res.status(201).json({ message: "All Problems Successfully Created" });
    } catch (error) {
        console.log("Error in Creating All Problems", error.message);
        return res.status(500).json({ message: "Error in Creating All Problems", error: error.message });
    }
    console.log("Exiting create_problem_all");
}

const get_problems = async (req, res) => {
    console.log("Entered get_problems");
    try {
        const problems = await Problem.find({});
        console.log("All Problems Fetched");
        return res.status(200).json({ message: "All Problems", problems });
    } catch (error) {
        console.log("Error in Fetching Problems", error.message);
        return res.status(500).json({ message: "Error in Fetching Problems", error: error.message });
    }
    console.log("Exiting get_problems");
}

const get_problem_by_id = async (req, res) => {
    console.log("Entered get_problem_by_id");
    const { id } = req.params;
    try {
        const problem = await Problem.findById(id);
        if (problem) {
            console.log("Problem Found");
            return res.status(200).json({ message: "Problem", problem });
        }
        console.log("Problem Not Found");
        return res.status(404).json({ message: "Problem Not Found" });
    } catch (error) {
        console.log("Error in Fetching Problem", error.message);
        return res.status(500).json({ message: "Error in Fetching Problem", error: error.message });
    }
    console.log("Exiting get_problem_by_id");
}

const update_problem_by_id = async (req, res) => {
    console.log("Entered update_problem_by_id");
    const { id } = req.params;
    const {
        title,
        description,
        difficulty,
        tags,
        editorial,
        userId,
        usersSolved,
        doubts,
        createrId
    } = req.body;
    try {
        const problem = await Problem.findById(id);
        if (problem) {
            problem.title = title;
            problem.description = description;
            problem.difficulty = difficulty;
            problem.editorial = editorial;
            problem.tags = tags;
            problem.userId = userId;
            problem.usersSolved = usersSolved;
            problem.doubts = doubts;
            problem.createrId = createrId;
            await problem.save();
            console.log("Problem Successfully Updated");
            return res.status(200).json({ message: "Problem Successfully Updated", problem });
        }
        console.log("Problem Not Found");
        return res.status(404).json({ message: "Problem Not Found" });
    } catch (error) {
        console.log("Error in Updating Problem", error.message);
        return res.status(500).json({ message: "Error in Updating Problem", error: error.message });
    }
    console.log("Exiting update_problem_by_id");
}

const delete_problem_by_id = async (req, res) => {
    console.log("Entered delete_problem_by_id");
    const { id } = req.params;
    try {
        const problem = await Problem.findById(id);
        if (problem) {
            await problem.remove();
            console.log("Problem Successfully Deleted");
            return res.status(200).json({ message: "Problem Successfully Deleted", problem });
        }
        console.log("Problem Not Found");
        return res.status(404).json({ message: "Problem Not Found" });
    }
    catch (error) {
        console.log("Error in Deleting Problem", error.message);
        return res.status(500).json({ message: "Error in Deleting Problem", error: error.message });
    }
    console.log("Exiting delete_problem_by_id");
}

const add_problem_to_users = async (req, res) => {
    console.log("Entered add_problem_to_users");
    const { problemId, userId } = req.body;
    try {
        const problem = await Problem.findById(problemId);
        if (problem) {
            if (!problem.usersSolved.includes(userId)) {
                problem.usersSolved.push(userId);
                await problem.save();
                console.log("Problem Successfully Added to User");
                return res.status(200).json({ message: "Problem Successfully Added to User", problem });
            }
            console.log("Problem Already Added to User");
            return res.status(400).json({ message: "Problem Already Added to User" });
        }
        console.log("Problem Not Found");
        return res.status(404).json({ message: "Problem Not Found" });
    }
    catch (error) {
        console.log("Error in Adding Problem to User", error.message);
        return res.status(500).json({ message: "Error in Adding Problem to User", error: error.message });
    }
    console.log("Exiting add_problem_to_users");
}

export default {
    create_problem,
    get_problems,
    get_problem_by_id,
    update_problem_by_id,
    delete_problem_by_id,
    create_problem_all,
    add_problem_to_users
};
