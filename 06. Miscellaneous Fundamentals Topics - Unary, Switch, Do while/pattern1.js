let n = 4;
let sp = n - 1;
let num = 1;
let str = "";
for (let i = 0; i < n; i++) {
  for (let j = 0; j < sp; j++) {
    process.stdout.write(" ");
  }
  for (let j = 1; j <= num; j++) {
    process.stdout.write(j.toString());
  }
  for (let j = num - 1; j >= 1; j--) {
    process.stdout.write(j.toString());
  }

  sp--;
  num++;
  str = str + "\n";
  console.log();
}
