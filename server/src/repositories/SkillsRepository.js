class SkillsRepository {
	constructor(skillModel) {
		this.skillModel = skillModel;
	}

	async createSkill(skill) {
		return this.skillModel.create(skill);
	}

	async getSkills() {
		return this.skillModel.find().lean();
	}

	async getSkillById(id) {
		return this.skillModel.findById(id).lean();
	}

	async updateSkill(id, updates) {
		return this.skillModel.findByIdAndUpdate(id, updates).lean();
	}

	async deleteSkill(id) {
		return this.skillModel.findByIdAndDelete(id).lean();
	}
}

export default SkillsRepository;
