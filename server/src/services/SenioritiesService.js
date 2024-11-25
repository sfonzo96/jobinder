class SenioritiesService {
    constructor(senioritiesRepository) {
        this.senioritiesRepository = senioritiesRepository;
    }

    async createSeniority(seniority) {
        return await this.senioritiesRepository.createSeniority(seniority);
    }

    async getSeniorities() {
        return await this.senioritiesRepository.getSeniorities();
    }

    async getSeniorityById(id) {
        return await this.senioritiesRepository.getSeniorityById(id);
    }

    async updateSeniority(id, updates) {
        return await this.senioritiesRepository.updateSeniority(id, updates);
    }

    async deleteSeniority(id) {
        return await this.senioritiesRepository.deleteSeniority(id);
    }
}

export default SenioritiesService;
