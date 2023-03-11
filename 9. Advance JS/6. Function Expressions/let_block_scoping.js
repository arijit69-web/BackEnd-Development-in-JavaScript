var teacher = "Sanket"; // global
function fun() { // global
    console.log(teacher); // no error will be given
    // console.log(content); // throws an error
    var teacher = "Pulkit"; // scope of fun
    let content = "JS"; // content will be access only post declaration
    if(content == "JS") {
        let hours = "120+";
        console.log(content,hours);
    }
    console.log(teacher, content);
}

fun();
console.log(teacher);
// console.log(content);



var teacher = "Sanket"; // global scope
function fun() { // global scope
    console.log(teacher); // No error will be given | Output : undefined | In Parsing Phase- Hey fun() scope do you have a variable teacher ->  Yes, but value has not been assigned yet so the value will be undefined but if there was no variable teacher inside the fun() scope, Scope Manager will go one level up and say Hey Global scope do you have a variable teacher - Yes,  so technically we are refering to that variable teacher and the output will be Sanket.
    // console.log(content); // throws an error | TDZ
    var teacher = "Pulkit"; // scope of fun
    let content = "JS"; // content will be accessible only after post declaration
    if(content == "JS") {
        let hours = "120+";
        console.log(content,hours);// we can access content inside the nested blocks as content has already been declared above outside this block
        {{{console.log("Content inside Nested Block : ",content);}}}// we can access content inside the nested blocks as content has already been declared above outside this block
    }
    console.log(teacher, content);
//  console.log(teacher, content,hours);//throws an error : hours will not be accessible outside the block 
/*
variable hours is only accessible only in this block
{
        let hours = "120+";
        console.log(content,hours);
}
*/

}

fun();
console.log(teacher);
// console.log(content);throws an error : we cannot access it outside the block


/*
If u want to give block scoping we use Let.Var gives the function scope.
Var gives you fucntion scope so teacher @ line 22 is available everywhere in the function even before the declaration but block scope doesnot allow that.
Let gives you block scope so content will not be availavle everywhere.
Let does not give the access everywhere in the block so @ Line 25 content will be accessible only after post declaration and initialization so @ line no. 23 you get an Error.
TDZ - Temporal Dead Zone :  You cannot access the variable which is having a block scope before it has been declared.

*/