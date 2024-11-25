class SkillsService {
	constructor(skillsRepository) {
		this.skillsRepository = skillsRepository;
	}

	async createSkill(skill) {
		return await this.skillsRepository.createSkill(skill);
	}

	async getSkills() {
		return await this.skillsRepository.getSkills();
	}

	async getSkillById(id) {
		return await this.skillsRepository.getSkillById(id);
	}

	async updateSkill(id, updates) {
		return await this.skillsRepository.updateSkill(id, updates);
	}

	async deleteSkill(id) {
		return await this.skillsRepository.deleteSkill(id);
	}
}

export default SkillsService;
