function fun() {
    for(let i = 0; i < 10; i++) {
        // do something
    }
    
    for(var i = 0; i < 10; i++) { //This i has no use outside the for block but it will be still accessible outside the for block and that can lead to issues so here instead of var i let i is a better option
       
        // do something
    }
    console.log(i);
}

function process(x, y) {
    if(x > y) {
        // var temp = x; This temp has no use outside the if block but it will be still accessible outside the if block and that can lead to issues so here instead of var temp let temp is a better option
        let temp = x;
        x = y;
        y = temp;
    }
    return y - x;
}

fun();