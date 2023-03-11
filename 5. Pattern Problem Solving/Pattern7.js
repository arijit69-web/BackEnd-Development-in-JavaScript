/*

*     *
**   **
*** ***
*******
*** ***
**   **
*     *

*/

let n=7
if(n%2!=0){
let mid=parseInt(n/2);
let star=1;
let space=n-2;
for(let i=0;i<mid;i++)
{
    for(let j=0;j<star;j++)
    {
        process.stdout.write("*");
    }
    for(let j=0;j<space;j++)
    {
        process.stdout.write(" ");
    }
    for(let j=0;j<star;j++)
    {
        process.stdout.write("*");
    }
    star++;
    space=space-2;
    console.log();

}

for(let i=0;i<n;i++)
{
    process.stdout.write("*");
}
console.log();
star=star-1;
space=1;
for(let i=0;i<mid;i++)
{
    for(let j=0;j<star;j++)
    {
        process.stdout.write("*");
    }
    for(let j=0;j<space;j++)
    {
        process.stdout.write(" ");
    }
    for(let j=0;j<star;j++)
    {
        process.stdout.write("*");
    }
    star--;
    space=space+2;
    console.log();
}

}
else{
    console.log("Enter an odd Number");
}