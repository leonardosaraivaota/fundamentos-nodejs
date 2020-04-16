// import { response } from 'express';
import Transaction from '../models/Transaction';
// import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  // private balances: Balance[];

  constructor() {
    this.transactions = [];
    // this.balances = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public findByType(type: string): Transaction[] {
    const findTransaction = this.transactions.filter(
      transaction => transaction.type === type,
    );
    return findTransaction;
  }

  public getSumByType(type: string): number {
    const transactions = this.transactions
      .filter(transaction => transaction.type === type)
      .reduce((sum, item) => {
        return sum + item.value;
      }, 0);

    return transactions;
  }

  public getBalance(): BalanceDTO {
    const income = this.getSumByType('income');
    const outcome = this.getSumByType('outcome');
    const total = income - outcome;
    // return total;
    const balance = { income, outcome, total };
    // const balance = new Balance({ income, outcome, total });
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
