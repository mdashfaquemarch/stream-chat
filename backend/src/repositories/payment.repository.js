import CrudRepository from './crud.repository.js';
import Payment from '../models/payment.model.js'

class PaymentRepository extends CrudRepository {

    constructor() {
        super(Payment);
    }


}

export default PaymentRepository;