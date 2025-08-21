import User from '../models/user.model.js';
import CrudRepository from './crud.repository.js';


class UserRepository extends CrudRepository {

    constructor() {
        super(User);
    }

    async getUserByEmail(email) {
        const user = await User.findOne({email: email});
        return user;
    }

}

export default UserRepository;