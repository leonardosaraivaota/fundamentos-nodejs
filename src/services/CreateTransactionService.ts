import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    /*
    const findTransactionByType = this.transactionsRepository.getSumByType(
      type,
    );
    */

    const findTransactionByType = this.transactionsRepository.getSumByType(
      'income',
    );
    // console.log(findTransactionByType);
    if (findTransactionByType === 0 && type === 'outcome') {
      // return response.status(400).json({ error: 'Insufficient funds' });
      throw Error('Insufficient Funds');
    }

    const balance = this.transactionsRepository.getBalance();
    if (value > balance.total && type === 'outcome') {
      throw Error('Insufficient Funds');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
