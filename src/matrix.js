export default class Matrix {
  constructor(data) {
    this.m    = data.length;
    this.n    = data[0].length;
    this.data = data;
  }

  asArray() {
    return this.data.map((row) => {
      return Array.from(row);
    });
  }

  row(index) {
    if (index < 0) {
      throw new TypeError();
    }
    const data = Array.from(this.data[index]);
    return Matrix.from(data);
  }

  column(index) {
    const data = this.data.map((row) => {
      if (index < 0) {
        throw new TypeError();
      }
      return row[index];
    });
    return Matrix.from(...data);
  }

  get(rIndex, cIndex) {
    const row = this.data[rIndex];
    return row[cIndex];
  }

  rowSize() {
    return this.m;
  }

  columnSize() {
    return this.n;
  }

  add(matrix) {
    if (!matrix) {
      throw new TypeError('matrix must not be null');
    }

    if (matrix.rowSize() !== this.rowSize() || matrix.columnSize() !== this.columnSize()) {
      throw new TypeError();
    }

    const data = this.data.map((row, rIndex) => {
      return row.map((value, cIndex) => {
        return value + matrix.get(rIndex, cIndex);
      });
    });
    return new Matrix(data);
  }

  mul(matrix) {
    if (!matrix) {
      throw new TypeError('matrix must not be null');
    }

    if (matrix.rowSize() !== this.columnSize()) {
      throw new TypeError();
    }

    const m = this.rowSize();
    const n = matrix.columnSize();
    const data = new Array(m);
    for (let i = 0; i < m; i++) {
      data[i] = new Float32Array(n);
      for (let j = 0; j < n; j++) {
        data[i][j] = this.row(i)
                        .asArray()
                        .reduce((result, value) => {
                          return result.concat(value);
                        })
                        .reduce((result, value, index) => {
                          return result + value * this.get(index, j) * matrix.get(i, index);
                        });
      }
    }
    return new Matrix(data);
  }

  static from(...rows) {
    const data = rows.map((row) => {
      if (Array.isArray(row)) {
        row = Array.from(row);
      } else {
        row = Array.of(row);
      }
      return new Float32Array(row);
    });
    return new Matrix(data);
  }
}

/*
const matrix1 = Matrix.from(
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
);
const matrix2 = Matrix.from(
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
);
const matrix3 = Matrix.from(
    1,
    2,
    3
);
const matrix4 = Matrix.from(
    [1, 2, 3]
);
console.log(matrix1, matrix2, matrix1.add(matrix2));
console.log(matrix1.column(1).row(2));
console.log(matrix1.row(0), matrix1.row(1));
console.log(matrix3.column(0), matrix1.column(1));
console.log(matrix1.asArray(), matrix3.asArray(), matrix4.asArray());

console.log(
    Matrix.from(
      [1, 2],
      [3, 4]  
    )
    .mul(Matrix.from(
      [1, 2],
      [3, 4]  
    ))
  );
*/
