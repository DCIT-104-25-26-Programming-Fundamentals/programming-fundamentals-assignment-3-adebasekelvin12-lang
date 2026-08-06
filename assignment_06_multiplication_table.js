// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 6
// =============================================================================
//
// TASK: Multiplication Table Generator
//
// Write a JavaScript program that generates multiplication tables using loops
// and functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_06_multiplication_table.js
//
// -----------------------------------------------------------------------------
// PART A — Single Table
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Print the multiplication table for that number from 1 to 12.
//
// Expected output (if user enters 5):
//
//   Multiplication Table for 5:
//   5  x  1  =  5
//   5  x  2  =  10
//   5  x  3  =  15
//   ...
//   5  x  12 =  60
//
// -----------------------------------------------------------------------------
// PART B — Bonus: Tables from 1 to N
// -----------------------------------------------------------------------------
// - Ask the user to enter a number N.
// - Print the full multiplication table for every number from 1 to N.
// - Add a separator line (e.g. "---") between each table.
//
// Expected output (if user enters 3):
//
//   Multiplication Table for 1:
//   1  x  1  =  1
//   ...
//   1  x  12 =  12
//   ---------------------------
//   Multiplication Table for 2:
//   2  x  1  =  2
//   ...
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - N must be a positive integer. If the user enters an invalid value,
//   print an error message and stop.
// - Each part must be in its own function (see scaffold below).
// - Complete Part A before attempting Part B.

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');

// -----------------------------------------------------------------------------
// PART A — printTable(n)
// Prints the multiplication table for n from 1 to 12.
// Uses a loop. Columns are aligned for a neat grid.
// -----------------------------------------------------------------------------
function printTable(n) {
  console.log(`\nMultiplication Table for ${n}:`);

  for (let i = 1; i <= 12; i++) {
    const product = n * i;
    // Pad numbers so the "=" signs line up.
    const nStr = String(n).padStart(2, ' ');
    const iStr = String(i).padStart(2, ' ');
    const pStr = String(product).padStart(3, ' ');
    console.log(`${nStr} x ${iStr} = ${pStr}`);
  }
}

// -----------------------------------------------------------------------------
// PART B — printTablesUpTo(n)
// Prints the multiplication table for every number from 1 to n.
// A separator line is printed between each table (but not after the last).
// -----------------------------------------------------------------------------
function printTablesUpTo(n) {
  for (let i = 1; i <= n; i++) {
    printTable(i);

    if (i < n) {
      console.log('---------------------------');
    }
  }
}

// -----------------------------------------------------------------------------
// runPartA()
// Handles user interaction for Part A.
// -----------------------------------------------------------------------------
function runPartA() {
  const n = readlineSync.questionInt('Enter a number: ');

  // n must be a positive integer.
  if (!Number.isInteger(n) || n <= 0) {
    console.log('Error: Please enter a positive integer.');
    return;
  }

  printTable(n);
}

// -----------------------------------------------------------------------------
// runPartB()
// Handles user interaction for Part B.
// -----------------------------------------------------------------------------
function runPartB() {
  const n = readlineSync.questionInt('Enter a number N: ');

  // N must be a positive integer.
  if (!Number.isInteger(n) || n <= 0) {
    console.log('Error: Please enter a positive integer.');
    return;
  }

  printTablesUpTo(n);
}

// -----------------------------------------------------------------------------
// main()
// Shows a menu so the user can choose Part A, Part B, or exit.
// -----------------------------------------------------------------------------
function main() {
  console.log('=== Multiplication Table Generator ===');

  let running = true;

  while (running) {
    console.log('\nChoose an option:');
    console.log('  1. Single table (Part A)');
    console.log('  2. Tables from 1 to N (Part B — Bonus)');
    console.log('  3. Exit');

    const choice = readlineSync.questionInt('Enter your choice (1-3): ');

    switch (choice) {
      case 1:
        runPartA();
        break;
      case 2:
        runPartB();
        break;
      case 3:
        running = false;
        console.log('Goodbye!');
        break;
      default:
        console.log('Invalid choice. Please enter 1, 2, or 3.');
    }
  }
}

// Run the program.
main();