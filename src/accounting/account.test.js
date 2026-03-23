const Account = require('./account');

describe('Account Management System - Unit Tests', () => {
  let account;

  beforeEach(() => {
    account = new Account();
  });

  test('TC001: View initial balance', () => {
    expect(account.getBalance()).toBe(1000.00);
  });

  test('TC002: Credit account with valid amount', () => {
    const newBalance = account.credit(500.00);
    expect(newBalance).toBe(1500.00);
    expect(account.getBalance()).toBe(1500.00);
  });

  test('TC003: Debit account with sufficient funds', () => {
    const result = account.debit(200.00);
    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(800.00);
    expect(account.getBalance()).toBe(800.00);
  });

  test('TC004: Debit account with insufficient funds', () => {
    const result = account.debit(1500.00);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Insufficient funds for this debit.');
    expect(account.getBalance()).toBe(1000.00); // unchanged
  });

  test('TC005: Multiple credit operations', () => {
    account.credit(100.00);
    account.credit(200.00);
    expect(account.getBalance()).toBe(1300.00);
  });

  test('TC006: Multiple debit operations', () => {
    account.debit(100.00);
    account.debit(200.00);
    expect(account.getBalance()).toBe(700.00);
  });

  test('TC007: Credit followed by debit', () => {
    account.credit(300.00);
    account.debit(200.00);
    expect(account.getBalance()).toBe(1100.00);
  });

  test('TC010: Debit exactly the available balance', () => {
    const result = account.debit(1000.00);
    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(0.00);
    expect(account.getBalance()).toBe(0.00);
  });

  test('TC011: Credit zero amount', () => {
    const newBalance = account.credit(0.00);
    expect(newBalance).toBe(1000.00);
    expect(account.getBalance()).toBe(1000.00);
  });

  test('TC012: Debit zero amount', () => {
    const result = account.debit(0.00);
    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(1000.00);
    expect(account.getBalance()).toBe(1000.00);
  });

  test('TC013: Credit negative amount', () => {
    expect(() => account.credit(-100.00)).toThrow('Invalid credit amount');
    expect(account.getBalance()).toBe(1000.00); // unchanged
  });

  test('TC014: Debit negative amount', () => {
    expect(() => account.debit(-100.00)).toThrow('Invalid debit amount');
    expect(account.getBalance()).toBe(1000.00); // unchanged
  });

  test('TC015: View balance after multiple operations', () => {
    account.credit(500.00);
    account.debit(200.00);
    account.credit(100.00);
    expect(account.getBalance()).toBe(1400.00);
  });
});