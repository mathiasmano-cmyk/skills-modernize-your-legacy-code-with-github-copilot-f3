# Test Plan for Account Management System

This test plan covers the business logic of the COBOL-based Account Management System. The system allows users to view their account balance, credit funds, debit funds (with validation for sufficient balance), and exit the application. The initial balance is set to $1000.00.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|-----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC001 | View initial balance | Application is started | 1. Select option 1 (View Balance) | Displays "Current balance: 1000.00" |  |  |  |
| TC002 | Credit account with valid amount | Application is started, initial balance is 1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount: 500.00 | Displays "Amount credited. New balance: 1500.00" |  |  |  |
| TC003 | Debit account with sufficient funds | Application is started, balance is at least 200.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 200.00 | Displays "Amount debited. New balance: 800.00" (assuming initial balance) |  |  | Adjust expected balance based on current balance |
| TC004 | Debit account with insufficient funds | Application is started, balance is less than requested amount | 1. Select option 3 (Debit Account)<br>2. Enter amount: 1500.00 | Displays "Insufficient funds for this debit." Balance remains unchanged |  |  |  |
| TC005 | Multiple credit operations | Application is started | 1. Select option 2, enter 100.00<br>2. Select option 2, enter 200.00<br>3. Select option 1 to view balance | Balance increases by 300.00 total, displays correct cumulative balance |  |  |  |
| TC006 | Multiple debit operations | Application is started, sufficient balance | 1. Select option 3, enter 100.00<br>2. Select option 3, enter 200.00<br>3. Select option 1 to view balance | Balance decreases by 300.00 total, displays correct cumulative balance |  |  |  |
| TC007 | Credit followed by debit | Application is started | 1. Select option 2, enter 300.00<br>2. Select option 3, enter 200.00<br>3. Select option 1 to view balance | Net balance change: +100.00, displays correct balance |  |  |  |
| TC008 | Invalid menu choice | Application is started | 1. Enter invalid choice (e.g., 5) | Displays "Invalid choice, please select 1-4." Continues to prompt |  |  |  |
| TC009 | Exit application | Application is running | 1. Select option 4 (Exit) | Displays "Exiting the program. Goodbye!" and terminates |  |  |  |
| TC010 | Debit exactly the available balance | Application is started, balance is known (e.g., 1000.00) | 1. Select option 3, enter 1000.00 | Displays "Amount debited. New balance: 0.00" |  |  |  |
| TC011 | Credit zero amount | Application is started | 1. Select option 2, enter 0.00 | Balance remains unchanged, displays new balance as same |  |  | Edge case: zero credit |
| TC012 | Debit zero amount | Application is started | 1. Select option 3, enter 0.00 | Balance remains unchanged, displays new balance as same |  |  | Edge case: zero debit |
| TC013 | Credit negative amount | Application is started | 1. Select option 2, enter -100.00 | Balance decreases (if allowed), or error message |  |  | Check if system handles negative inputs |
| TC014 | Debit negative amount | Application is started | 1. Select option 3, enter -100.00 | Balance increases (if allowed), or error message |  |  | Check if system handles negative inputs |
| TC015 | View balance after multiple operations | Application is started, after TC005 or similar | 1. Select option 1 | Displays the correct balance after all operations |  |  |  |

## Notes
- The system uses in-memory storage, so balance persists only during the session.
- Amounts are entered as numeric values with up to 2 decimal places.
- The application runs in a loop until the user chooses to exit.
- Test cases should be executed in sequence where dependencies exist (e.g., TC003 assumes sufficient balance).
- For integration testing in Node.js, these test cases can be adapted to API calls or function invocations.