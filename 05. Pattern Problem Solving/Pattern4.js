/*

    *
   ***
  *****
 *******
*********

*/

let n=5;
let star=1;
for(let i=0;i<n;i++)
{
    for(let j=0;j<n-1-i;j++)
    {
        process.stdout.write(" ");
    }
    for(let j=0;j<star;j++)
    {
        process.stdout.write("*");
    }
console.log();
star=star+2;

}