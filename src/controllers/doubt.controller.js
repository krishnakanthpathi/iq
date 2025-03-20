import Doubt from '../models/doubt.model.js';

const create_doubt = async (req, res) => {
    console.log("Entering create_doubt");
    try {
        const { title, description, problemId , userId  } = req.body;
        const doubt = await Doubt.create({
            title,
            description,
            problemId,
            userId,
        });
        console.log("Successfully Created Doubt");
        return res.status(200).json({ Message: "Successfully Created Doubt", data: doubt });
    } catch (error) {
        console.error("Error Creating Doubt:", error.message);
        return res.status(500).json({ Message: "Error Creating Doubt", error: error.message });
    } finally {
        console.log("Exiting create_doubt");
    }
};

const get_doubt_all = async (req, res) => {
    console.log("Entering get_doubt_all");
    try {
        const doubts = await Doubt.find({});
        console.log("Successfully Retrieved Doubts");
        return res.status(200).json({ Message: "Successfully Retrieved Doubts", data: doubts });
    } catch (error) {
        console.error("Error Retrieving Doubts:", error.message);
        return res.status(500).json({ Message: "Error Retrieving Doubts", error: error.message });
    } finally {
        console.log("Exiting get_doubt_all");
    }
}

const get_doubt_by_id = async (req, res) => {
    console.log("Entering get_doubt_by_id");
    try {
        const { id } = req.params;
        const doubt = await Doubt.findById(id);
        if (doubt) {
            console.log("Successfully Retrieved Doubt");
            return res.status(200).json({ Message: "Successfully Retrieved Doubt", data: doubt });
        }
        console.log("Doubt with the specified ID does not exist");
        return res.status(404).json({ Message: "Doubt with the specified ID does not exist" });
    } catch (error) {
        console.error("Error Retrieving Doubt by ID:", error.message);
        return res.status(500).json({ Message: "Error Retrieving Doubt by ID", error: error.message });
    } finally {
        console.log("Exiting get_doubt_by_id");
    }
}

const update_doubt_by_id = async (req, res) => {
    console.log("Entering update_doubt_by_id");
    try {
        const { id } = req.params;
        const { title, description, active , problemId , userId } = req.body;
        const doubt = await Doubt.findByIdAndUpdate(id, {
            title,
            active,
            description,
            problemId,
            userId,
        }, { new: true });
        if (doubt) {
            console.log("Successfully Updated Doubt");
            return res.status(200).json({ Message: "Successfully Updated Doubt", data: doubt });
        }
        console.log("Doubt with the specified ID does not exist");
        return res.status(404).json({ Message: "Doubt with the specified ID does not exist" });
    } catch (error) {
        console.error("Error Updating Doubt:", error.message);
        return res.status(500).json({ Message: "Error Updating Doubt", error: error.message });
    } finally {
        console.log("Exiting update_doubt_by_id");
    }
}

const delete_doubt_by_id = async (req, res) => {
    console.log("Entering delete_doubt_by_id");
    try {
        const { id } = req.params;
        const doubt = await Doubt.findByIdAndDelete(id);
        if (doubt) {
            console.log("Successfully Deleted Doubt");
            return res.status(200).json({ Message: "Successfully Deleted Doubt", data: doubt });
        }
        console.log("Doubt with the specified ID does not exist");
        return res.status(404).json({ Message: "Doubt with the specified ID does not exist" });
    } catch (error) {
        console.error("Error Deleting Doubt:", error.message);
        return res.status(500).json({ Message: "Error Deleting Doubt", error: error.message });
    } finally {
        console.log("Exiting delete_doubt_by_id");
    }
}

const assign_doubt_to_student = async (req, res) => {
    console.log("Entering assign_doubt_to_student");
    try {
        const { id } = req.params;
        const { assignedId } = req.body;
        const doubt = await Doubt.findByIdAndUpdate(id, { assignedId }, { new: true });
        if (doubt) {
            console.log("Successfully Assigned Doubt to Student");
            return res.status(200).json({ Message: "Successfully Assigned Doubt to Student", data: doubt });
        }
        console.log("Doubt with the specified ID does not exist");
        return res.status(404).json({ Message: "Doubt with the specified ID does not exist" });
    }
    catch (error) {
        console.error("Error Assigning Doubt to Student:", error.message);
        return res.status(500).json({ Message: "Error Assigning Doubt to Student", error: error.message });
    } finally {
        console.log("Exiting assign_doubt_to_student");
    }
}

const answer_doubt = async (req, res) => {
    console.log("Entering answer_doubt");
    try {
        const { id } = req.params;
        const { answer } = req.body;
        const doubt = await Doubt.findById(id);
        
        if (doubt) {
            doubt.answer = answer;
            doubt.active = false;
            await doubt.save();
            console.log("Successfully Answered Doubt");
            return res.status(200).json({ Message: "Successfully Answered Doubt", data: doubt });
        }
        console.log("Doubt with the specified ID does not exist");
        return res.status(404).json({ Message: "Doubt with the specified ID does not exist" });
    }
    catch (error) {
        console.error("Error Answering Doubt:", error.message);
        return res.status(500).json({ Message: "Error Answering Doubt", error: error.message });
    } finally {
        console.log("Exiting answer_doubt");
    }
}

const update_doubt_resolve = async (req, res) => {
    console.log("Entering update_doubt_resolve");
    try {
        const { id } = req.params;
        const { active } = req.body;
        const doubt = await Doubt.findByIdAndUpdate(id, { active }, { new: true });
        if (doubt) {
            console.log("Successfully Updated Doubt Status");
            return res.status(200).json({ Message: "Successfully Updated Doubt Status", data: doubt });
        }
        console.log("Doubt with the specified ID does not exist");
        return res.status(404).json({ Message: "Doubt with the specified ID does not exist" });
    }
    catch (error) {
        console.error("Error Updating Doubt Status:", error.message);
        return res.status(500).json({ Message: "Error Updating Doubt Status", error: error.message });
    } finally {
        console.log("Exiting update_doubt_resolve");
    }
}

export default {
    create_doubt,
    get_doubt_by_id,
    update_doubt_by_id,
    delete_doubt_by_id,
    assign_doubt_to_student,
    answer_doubt,
    update_doubt_resolve,
    get_doubt_all
};
