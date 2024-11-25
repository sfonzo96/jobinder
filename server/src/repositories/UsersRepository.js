class UsersRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(user) {
        return await this.userModel.create(user);
    }

    async getUsers() {
        return await this.userModel.find().lean();
    }

    async getUserById(userId) {
        return await this.userModel.findById(userId).lean();
    }

    async getUserByEmail(email) {
        return await this.userModel.findOne({ email }).lean();
    }

    async updateUser(id, updates) {
        const result = await this.userModel
            .findByIdAndUpdate(id, updates, { new: true })
            .lean();
        return result;
    }

    async updateUserAvatar(id, avatarPath) {
        return await this.userModel
            .findByIdAndUpdate(id, { avatar: avatarPath }, { new: true })
            .lean();
    }
}

export default UsersRepository;
