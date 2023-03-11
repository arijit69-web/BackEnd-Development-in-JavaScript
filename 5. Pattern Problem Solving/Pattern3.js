/*

       *
      **
     ***
    ****
   *****
  ******
 *******
********

*/

let n =8;

for(let i=0;i<n;i++)
{
    for(let j=0;j<n-1-i;j++)
    {
        process.stdout.write(" ");
    }
    for(let j=0;j<=i;j++)
    {
        process.stdout.write("*");
    }
console.log();

}