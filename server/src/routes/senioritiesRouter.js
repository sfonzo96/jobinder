import express from "express";
import {
    getSeniorities,
    createSeniority,
} from "../controllers/senioritiesController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const senioritiesRouter = express.Router();

senioritiesRouter.get("/", isAuthenticated, getSeniorities);
senioritiesRouter.post("/", isAuthenticated, createSeniority);

export default senioritiesRouter;
