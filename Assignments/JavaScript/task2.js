function solve(str) {
  if (!str) return 0;

  let sum = 0;
  str.split(",").forEach((s) => {
    let num = parseFloat(s.trim());
    if (!isNaN(num)) sum += num;
  });
  return sum;
}

let str = "1.5, 2.3, 3.1, 4, 5.5, 6, 7, 8, 9, 10.9";
console.log(solve(str)); 
