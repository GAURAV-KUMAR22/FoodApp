let n = 5;
let pattern = "";
for (let row = 1; row <= n; row++) {
    // we need to print new
    for (let col = 1; col <= row; col++) {
        pattern += "*";
    }
    pattern += "\n";
}
console.log(pattern)