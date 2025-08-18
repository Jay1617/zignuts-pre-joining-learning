function solve(str) {
  let sum = 0;
  if (!str) return 0;

  str.split("").forEach((s) => {
    if (!isNaN(s)) sum += Number(s);
  });
  return sum;
}

let str = "foo8bar8cat2tc2";
console.log(solve(str));
