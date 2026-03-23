class Account {
  constructor(initialBalance = 1000.00) {
    this.balance = initialBalance;
  }

  getBalance() {
    return this.balance;
  }

  credit(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Invalid credit amount');
    }
    this.balance += amount;
    return this.balance;
  }

  debit(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Invalid debit amount');
    }
    if (this.balance >= amount) {
      this.balance -= amount;
      return { success: true, newBalance: this.balance };
    } else {
      return { success: false, message: 'Insufficient funds for this debit.' };
    }
  }
}

module.exports = Account;