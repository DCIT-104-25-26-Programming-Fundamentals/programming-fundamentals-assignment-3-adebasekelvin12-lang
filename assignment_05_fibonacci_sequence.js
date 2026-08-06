// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 5
// =============================================================================
//
// TASK: Fibonacci Sequence Generator
//
// The Fibonacci sequence is a series of numbers where each number is the sum
// of the two numbers before it:
//
//   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
//
// Write a JavaScript program with TWO parts, each implemented as a function.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_05_fibonacci_sequence.js
//
// -----------------------------------------------------------------------------
// PART A — Print the First N Terms
// -----------------------------------------------------------------------------
// - Ask the user how many terms (N) to display.
// - Print the first N numbers of the Fibonacci sequence on one line.
//
// Example:
//   How many terms? 7
//   Fibonacci sequence: 0 1 1 2 3 5 8
//
// -----------------------------------------------------------------------------
// PART B — Check if a Number Belongs to the Sequence
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Determine whether that number is a Fibonacci number.
// - Print an appropriate message.
//
// Example:
//   Enter a number to check: 13
//   13 is a Fibonacci number.
//
//   Enter a number to check: 20
//   20 is NOT a Fibonacci number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use a loop (not recursion) to generate the sequence in both parts.
// - N must be a positive integer. If it is not, print an error message.
// - Each part must be implemented in its own function (see scaffold below).
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');

// -----------------------------------------------------------------------------
// PART A — printFibonacci(n)
// Prints the first n numbers of the Fibonacci sequence on a single line.
// Uses a loop (no recursion).
//   Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
// -----------------------------------------------------------------------------
function printFibonacci(n) {
  // n must be a positive integer.
  if (!Number.isInteger(n) || n <= 0) {
    console.log('Error: Please enter a positive integer.');
    return;
  }

  const sequence = [];

  // Generate the first n terms using a loop.
  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    sequence.push(a);
    const next = a + b;
    a = b;
    b = next;
  }

  console.log(`Fibonacci sequence: ${sequence.join(' ')}`);
}

// -----------------------------------------------------------------------------
// PART B — isFibonacci(num)
// Returns true if num is a Fibonacci number, false otherwise.
// Uses a loop (no recursion).
//
// A number is Fibonacci if it appears in the sequence 0, 1, 1, 2, 3, 5, 8, ...
// We generate terms until we reach or exceed num. This also handles negatives
// (the sequence never goes below 0).
// -----------------------------------------------------------------------------
function isFibonacci(num) {
  // Fibonacci numbers are non-negative integers.
  if (!Number.isInteger(num) || num < 0) {
    return false;
  }

  // 0 is the first Fibonacci number.
  if (num === 0) {
    return true;
  }

  let a = 0;
  let b = 1;

  // Advance through the sequence until b reaches or exceeds num.
  while (b < num) {
    const next = a + b;
    a = b;
    b = next;
  }

  return b === num;
}

// -----------------------------------------------------------------------------
// runPartA()
// Handles user interaction for Part A.
// -----------------------------------------------------------------------------
function runPartA() {
  const n = readlineSync.questionInt('How many terms? ');
  printFibonacci(n);
}

// -----------------------------------------------------------------------------
// runPartB()
// Handles user interaction for Part B.
// -----------------------------------------------------------------------------
function runPartB() {
  const num = readlineSync.questionInt('Enter a number to check: ');

  if (isFibonacci(num)) {
    console.log(`${num} is a Fibonacci number.`);
  } else {
    console.log(`${num} is NOT a Fibonacci number.`);
  }
}

// -----------------------------------------------------------------------------
// main()
// Shows a menu so the user can choose Part A, Part B, or exit.
// -----------------------------------------------------------------------------
function main() {
  console.log('=== Fibonacci Sequence Generator ===');

  let running = true;

  while (running) {
    console.log('\nChoose an option:');
    console.log('  1. Print the first N terms (Part A)');
    console.log('  2. Check if a number is Fibonacci (Part B)');
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