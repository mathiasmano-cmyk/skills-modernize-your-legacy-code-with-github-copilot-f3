const readline = require('readline');
const Account = require('./account');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const account = new Account();

function operations(operationType, rl) {
  if (operationType === 'TOTAL ') {
    console.log(`Current balance: ${account.getBalance().toFixed(2)}`);
  } else if (operationType === 'CREDIT') {
    rl.question('Enter credit amount: ', (amountStr) => {
      const amount = parseFloat(amountStr);
      try {
        const newBalance = account.credit(amount);
        console.log(`Amount credited. New balance: ${newBalance.toFixed(2)}`);
      } catch (error) {
        console.log('Invalid credit amount.');
      }
      mainMenu(rl);
    });
  } else if (operationType === 'DEBIT ') {
    rl.question('Enter debit amount: ', (amountStr) => {
      const amount = parseFloat(amountStr);
      try {
        const result = account.debit(amount);
        if (result.success) {
          console.log(`Amount debited. New balance: ${result.newBalance.toFixed(2)}`);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log('Invalid debit amount.');
      }
      mainMenu(rl);
    });
  }
}

function mainMenu(rl) {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
  rl.question('Enter your choice (1-4): ', (choice) => {
    const userChoice = parseInt(choice);
    if (userChoice === 1) {
      operations('TOTAL ', rl);
      mainMenu(rl);
    } else if (userChoice === 2) {
      operations('CREDIT', rl);
    } else if (userChoice === 3) {
      operations('DEBIT ', rl);
    } else if (userChoice === 4) {
      console.log('Exiting the program. Goodbye!');
      rl.close();
    } else {
      console.log('Invalid choice, please select 1-4.');
      mainMenu(rl);
    }
  });
}

mainMenu(rl);