export function stringToMatrix(input: string): string[][] | null {

    let numbers = input.split(',');
    const matrix: string[][] = [];

    // Create a 9x9 matrix
    for (let i = 0; i < 9; i++) {
        const row: string[] = [];
        for (let j = 0; j < 9; j++) {
            const index = i * 9 + j;
            row.push(numbers[index]);
        }
        matrix.push(row);
    }

    return matrix;
}