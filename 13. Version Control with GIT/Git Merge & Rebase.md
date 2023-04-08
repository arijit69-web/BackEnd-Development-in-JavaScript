## Git Merge

<img src="Merge.png"  width="650" height="600">

- `git merge <branch>` -> Merging two branches. The git merge command lets you take the independent lines of development created by git branch and integrate them into a single branch. Now resolve the merge conflicts if there are any merge conflicts in the files.

**The Git merge strategy looks messy. So for that, we have Git Rebase.**

Visit these links to learn more about merge :

- [Git Merge](https://www.atlassian.com/git/tutorials/using-branches/git-merge#:~:text=Merging%20is%20Git's%20way%20of,merge%20into%20the%20current%20branch.)


## Git Rebase

Rebasing is the process of moving or combining a sequence of commits to a new base commit. Rebasing is most useful and easily visualized in the context of a feature branching workflow. It is a cleaner way to actually merge 2 branches together. So in this process, a sequence of commits is going to be moved to a new base commit. It actually creates copy but the main/master branch looks linear to u.

- `git rebase <base>` -> Git rebase in standard mode will automatically take the commits in your current working branch and apply them to the head of the passed branch.
This automatically rebases the current branch onto ＜base＞, which can be any kind of commit reference (for example an ID, a branch name, a tag, or a relative reference to HEAD).

Visit these links to learn more about rebase squash, rebase pick & Git Rebase Standard V/S Git Rebase Interactive :

- [Git Rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)


## `Squash and merge` & `Rebase and merge` can be done on GitHub too.

<br />

<img src="Rebase1.png"  width="700" height="200">

<br />

<img src="Rebase2.png"  width="490" height="300">

<br />

<img src="Rebase3.png"  width="500" height="300">

<br />

<img src="Rebase4.png"  width="500" height="200">

<br />

*In general, `rebasing with squashing` is recommended. When your changes are merged, most open source repositories or companies prefer `git rebase` over `git merge`.*

