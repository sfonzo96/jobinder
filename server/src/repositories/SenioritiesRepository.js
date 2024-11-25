class SenioritiesRepository {
    constructor(seniorityModel) {
        this.seniorityModel = seniorityModel;
    }

    async createSeniority(seniority) {
        return this.seniorityModel.create(seniority);
    }

    async getSeniorities() {
        return this.seniorityModel.find().lean();
    }

    async getSeniorityById(id) {
        return this.seniorityModel.findById(id).lean();
    }

    async updateSeniority(id, updates) {
        return this.seniorityModel.findByIdAndUpdate(id, updates).lean();
    }

    async deleteSeniority(id) {
        return this.seniorityModel.findByIdAndDelete(id).lean();
    }
}

export default SenioritiesRepository;
