## GIT Logs

- `git log --since="<date>"` -> 

eg1. git log --since="yesterday" : Since yesterday how many commits we have made.

eg2. git log --since="1 minute ago" : How many commits we have made 1 minute ago.

eg3. git log --since="10.minute" : How many commits we have made 10 minutes ago.

- `git log --grep=<Commit Message>` -> You are only going to get the commit which is having <Commit Message> as a substring in the message.

- `git log <Commit ID>^<N>` -> If u want to switch to any particular parent of another merged branch. It will give u the immediate Nth parent.

- `git log <Commit ID>~<N>` -> It will give u the Nth node in your same ancestry chain.

- `git merge <Other Branch Name>` ->  The git merge command lets you take the independent lines of development created by git branch and integrate them into a single branch.