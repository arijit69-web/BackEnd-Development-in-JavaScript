function isPrime(num) {
    if(num==1)return "Not Prime";
    if(num>3&&(num%2==0||num%3==0))return "Not Prime";
    
    for(var i=5;i<=Math.sqrt(num);i+=2)
    {
        // we found a number in range [2, Math.sqrt(x)] which divides x
        // hence x is non prime

        if(num%i==0)return "Not Prime";
    }
    return "Prime";
    /*
        The loop completed but we didn't return false, that means
        no number in the range [2, x-1] can divide x hence 
        x is prime
     */

}

console.log(isPrime(14));
console.log(isPrime(17));