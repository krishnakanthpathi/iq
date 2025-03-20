import { Router } from "express";
import problem_controller from "../controllers/problem.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const problem_router = new Router();

problem_router.get("/all", problem_controller.get_problems);
problem_router.get("/:id", problem_controller.get_problem_by_id);

problem_router.put("/add/", protect ,problem_controller.add_problem_to_users);
problem_router.put("/update/:id", problem_controller.update_problem_by_id);

problem_router.post("/create", problem_controller.create_problem);
problem_router.post("/createall", problem_controller.create_problem_all);

problem_router.delete("/:id", problem_controller.delete_problem_by_id);


export default problem_router;