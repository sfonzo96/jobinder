import SenioritiesService from "../services/SenioritiesService.js";
import SenioritiesRepository from "../repositories/SenioritiesRepository.js";
import SeniorityModel from "../models/Seniority.js";
import Result from "../utils/Result.js";
import HttpStatusCodes from "../utils/httpStatusCodes.js";

export const getSeniorities = async (req, res) => {
    const senioritiesService = new SenioritiesService(
        new SenioritiesRepository(SeniorityModel)
    );

    try {
        const seniorities = await senioritiesService.getSeniorities();
        res.handleResult(
            Result.Success(HttpStatusCodes.OK, "", { seniorities })
        );
    } catch (error) {
        res.handleResult(Result.Failure());
    }
};

export const createSeniority = async (req, res, next) => {
    const senioritiesService = new SenioritiesService(
        new SenioritiesRepository(SeniorityModel)
    );
    try {
        const seniorities = await senioritiesService.createSeniority(req.body);

        res.handleResult(
            Result.Success(HttpStatusCodes.CREATED, "", { seniorities })
        );
    } catch (error) {
        res.handleResult(Result.Failure());
    }
};
