// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

const readlineSync = require('readline-sync');

// -----------------------------------------------------------------------------
// readMatrix(rows, cols)
// Reads a matrix of the given dimensions from the user.
// Each row is entered as space-separated values on a single line.
// -----------------------------------------------------------------------------
function readMatrix(rows, cols) {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    const line = readlineSync.question(`Enter row ${i + 1}: `);
    const row = line.trim().split(/\s+/).map(Number);

    // Validate that the row has the expected number of columns.
    if (row.length !== cols || row.some(isNaN)) {
      console.log(
        `Error: Expected ${cols} valid number(s). Please try again.`
      );
      i--; // Repeat this row.
      continue;
    }

    matrix.push(row);
  }

  return matrix;
}

// -----------------------------------------------------------------------------
// printMatrix(matrix)
// Displays a matrix in a neat, right-aligned grid format.
// -----------------------------------------------------------------------------
function printMatrix(matrix) {
  if (matrix.length === 0) {
    console.log('(empty matrix)');
    return;
  }

  // Find the maximum string width across all elements for alignment.
  let maxWidth = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const width = String(matrix[i][j]).length;
      if (width > maxWidth) {
        maxWidth = width;
      }
    }
  }

  // Print each row, padding every cell to maxWidth.
  for (let i = 0; i < matrix.length; i++) {
    let rowStr = '';
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = String(matrix[i][j]);
      // Pad on the left so numbers are right-aligned.
      const padded = ' '.repeat(maxWidth - cell.length) + cell;
      rowStr += (j === 0 ? ' ' : '  ') + padded;
    }
    console.log(rowStr);
  }
}

// -----------------------------------------------------------------------------
// PART A — transposeMatrix(matrix)
// Returns the transpose of the given matrix.
// An M x N matrix becomes an N x M matrix (rows and columns swap).
// -----------------------------------------------------------------------------
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // The transpose has `cols` rows and `rows` columns.
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

// -----------------------------------------------------------------------------
// PART B — addMatrices(a, b)
// Returns the element-wise sum of two matrices.
// Both matrices must have the same dimensions.
// -----------------------------------------------------------------------------
function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;

  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(a[i][j] + b[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

// -----------------------------------------------------------------------------
// PART C — multiplyMatrices(a, b)
// Returns the matrix product A x B.
// A is M x N, B is N x P, result is M x P.
// -----------------------------------------------------------------------------
function multiplyMatrices(a, b) {
  const m = a.length; // rows in A
  const n = a[0].length; // cols in A (= rows in B)
  const p = b[0].length; // cols in B

  const result = [];

  for (let i = 0; i < m; i++) {
    const newRow = [];
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

// -----------------------------------------------------------------------------
// runTranspose()
// Handles user interaction for Part A.
// -----------------------------------------------------------------------------
function runTranspose() {
  console.log('\n--- Part A: Transpose a Matrix ---');
  const rows = readlineSync.questionInt('Enter number of rows: ');
  const cols = readlineSync.questionInt('Enter number of columns: ');

  if (rows <= 0 || cols <= 0) {
    console.log('Error: Dimensions must be positive integers.');
    return;
  }

  console.log(`Enter the ${rows} x ${cols} matrix:`);
  const matrix = readMatrix(rows, cols);

  console.log('\nOriginal Matrix:');
  printMatrix(matrix);

  const transposed = transposeMatrix(matrix);
  console.log('\nTransposed Matrix:');
  printMatrix(transposed);
}

// -----------------------------------------------------------------------------
// runAddition()
// Handles user interaction for Part B.
// -----------------------------------------------------------------------------
function runAddition() {
  console.log('\n--- Part B: Add Two Matrices ---');
  const rows = readlineSync.questionInt('Enter number of rows: ');
  const cols = readlineSync.questionInt('Enter number of columns: ');

  if (rows <= 0 || cols <= 0) {
    console.log('Error: Dimensions must be positive integers.');
    return;
  }

  console.log(`\nEnter matrix A (${rows} x ${cols}):`);
  const matrixA = readMatrix(rows, cols);

  console.log(`\nEnter matrix B (${rows} x ${cols}):`);
  const matrixB = readMatrix(rows, cols);

  console.log('\nMatrix A:');
  printMatrix(matrixA);
  console.log('\nMatrix B:');
  printMatrix(matrixB);

  const sum = addMatrices(matrixA, matrixB);
  console.log('\nA + B:');
  printMatrix(sum);
}

// -----------------------------------------------------------------------------
// runMultiplication()
// Handles user interaction for Part C.
// -----------------------------------------------------------------------------
function runMultiplication() {
  console.log('\n--- Part C: Multiply Two Matrices ---');
  console.log('Matrix A is M x N, matrix B is N x P.');

  const m = readlineSync.questionInt('Enter M (rows in A): ');
  const n = readlineSync.questionInt('Enter N (cols in A / rows in B): ');
  const p = readlineSync.questionInt('Enter P (cols in B): ');

  if (m <= 0 || n <= 0 || p <= 0) {
    console.log('Error: Dimensions must be positive integers.');
    return;
  }

  console.log(`\nEnter matrix A (${m} x ${n}):`);
  const matrixA = readMatrix(m, n);

  console.log(`\nEnter matrix B (${n} x ${p}):`);
  const matrixB = readMatrix(n, p);

  console.log('\nMatrix A:');
  printMatrix(matrixA);
  console.log('\nMatrix B:');
  printMatrix(matrixB);

  const product = multiplyMatrices(matrixA, matrixB);
  console.log('\nA x B:');
  printMatrix(product);
}

// -----------------------------------------------------------------------------
// main()
// Shows a menu so the user can choose which matrix operation to run.
// -----------------------------------------------------------------------------
function main() {
  console.log('=== Matrix Operations ===');

  let running = true;

  while (running) {
    console.log('\nChoose an operation:');
    console.log('  1. Transpose a matrix (Part A)');
    console.log('  2. Add two matrices (Part B)');
    console.log('  3. Multiply two matrices (Part C)');
    console.log('  4. Exit');

    const choice = readlineSync.questionInt('Enter your choice (1-4): ');

    switch (choice) {
      case 1:
        runTranspose();
        break;
      case 2:
        runAddition();
        break;
      case 3:
        runMultiplication();
        break;
      case 4:
        running = false;
        console.log('Goodbye!');
        break;
      default:
        console.log('Invalid choice. Please enter 1, 2, 3, or 4.');
    }
  }
}

// Run the program.
main();