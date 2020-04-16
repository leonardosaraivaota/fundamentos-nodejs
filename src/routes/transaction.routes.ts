import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import Transaction from '../models/Transaction';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

// const transactions: Transaction[] = [];

transactionRouter.get('/', (request, response) => {
  try {
    const balance = transactionsRepository.getBalance();
    const transactions = transactionsRepository.all();

    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    /*
    const findTransactionByType = transactionsRepository.getSumByType('income');
    // console.log(findTransactionByType);
    if (findTransactionByType === 0 && type === 'outcome') {
      return response.status(400).json({ error: 'Insufficient funds' });
      // throw Error('Insufficient Funds');
    }
    */
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({ title, value, type });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
