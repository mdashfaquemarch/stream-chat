import CrudRepository from './crud.repository.js';
import Message from '../models/message.model.js'


class MessageRepository extends CrudRepository {

    constructor() {
        super(Message);
    }


}

export default MessageRepository;