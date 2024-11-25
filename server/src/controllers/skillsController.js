import SkillsService from "../services/SkillsService.js";
import SkillsRepository from "../repositories/SkillsRepository.js";
import SkillModel from "../models/Skill.js";
import Result from "../utils/Result.js";
import HttpStatusCodes from "../utils/httpStatusCodes.js";

export const getSkills = async (req, res, next) => {
    const skillsService = new SkillsService(new SkillsRepository(SkillModel));

    try {
        const skills = await skillsService.getSkills();

        res.handleResult(Result.Success(HttpStatusCodes.OK, "", { skills }));
    } catch (error) {
        res.handleResult(Result.Failure());
    }
};

export const createSkill = async (req, res, next) => {
    const skillsService = new SkillsService(new SkillsRepository(SkillModel));

    try {
        const skill = await skillsService.createSkill(req.body);

        res.handleResult(
            Result.Success(HttpStatusCodes.CREATED, "", { skill })
        );
    } catch (error) {
        res.handleResult(Result.Failure());
    }
};
