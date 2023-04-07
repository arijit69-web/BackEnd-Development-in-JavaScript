## Git Reset

***The Checkout will just move your head pointer.***
***Git Reset not only moves your head pointer but it will also moves your branch pointer.***

3 Types of Git Reset :
> Soft,
> Mixed,
> Hard

- `git reset --soft HEAD~` -> HEAD~ means 1st parent of HEAD.
It is just going to move the HEAD pointer and the BRANCH pointer to the 1st parent of the HEAD pointer.

- `git reset ORIG_HEAD` -> It will move the HEAD pointer to the previous state of the HEAD. There is a Original Head pointer that points to the last commit that your HEAD pointer is pointing to.

- `git reset --soft HEAD~2` -> HEAD~ means 2nd parent of HEAD.
It is just going to move the HEAD pointer and the BRANCH pointer to the 2nd parent of the HEAD pointer.




### [Resetting V/S Checking Out V/S Reverting in GIT](https://www.atlassian.com/git/tutorials/resetting-checking-out-and-reverting)

