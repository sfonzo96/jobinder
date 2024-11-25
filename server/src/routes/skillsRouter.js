import express from "express";
import { getSkills, createSkill } from "../controllers/skillsController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const skillsRouter = express.Router();

skillsRouter.get("/", isAuthenticated, getSkills);
skillsRouter.post("/", isAuthenticated, createSkill);

export default skillsRouter;
