class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async createUser(user) {
        return await this.usersRepository.createUser(user);
    }

    async getUsers() {
        return await this.usersRepository.getUsers();
    }

    async getUserById(id) {
        return await this.usersRepository.getUserById(id);
    }

    async getUserByEmail(email) {
        return await this.usersRepository.getUserByEmail(email);
    }

    async updateUser(id, updates) {
        return await this.usersRepository.updateUser(id, updates);
    }

    async updateUserAvatar(id, avatarPath) {
        return await this.usersRepository.updateUserAvatar(id, avatarPath);
    }
}

export default UsersService;
