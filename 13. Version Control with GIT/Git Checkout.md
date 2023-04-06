## Checkout in GIT

- `git checkout -- <filename.<extension>>` -> It is going to override the working area file with the staging area file version. You are going to lose all of your changes in the working area. If u are actually doing a checkout on a file and some changes are in the staging area and some changes are in the working area then u are going to lose the changes in the working area. eg. git checkout -- new_file.txt

- `git checkout <Commit ID> -- <filename.<extension>>` -> Sometimes we mess around with a file and than there is a desire to have a particular state of this file back to the workspace. 
You made some changes to a file and now u don't want those changes and u want to revert back a particular file back to a previous state then git cheout will help u. You actually brought back the changes from a old commit to a corresponding file.

- `git clean -f` -> git clean is a convenient method for deleting only untracked files in a repo's working directory. It will not remove untracked directories from a repo's working directory.
***-f is a FORCE flag in git.***

- `git clean --dry-run` -> It will tell u what files are going to get removed. It will not remove the untracked files in a repo's working directory.

- `git clean -d --dry-run` -> -d flag will remove untracked directories in a repo's working directory.

- `git clean -d -f` ->  It will remove ur both untracked files and directories from a repo's working directory.


### Checkout From a Specific GIT Commit ID (SHA)
There are scenarios where you might need to checkout or clone from a specific git commit id. For example, you might want to perform a git pull on a specific commit version for troubleshooting.

- `git checkout <Commit ID>` -> You need to be very careful with this checkout. It will be in the detached HEAD mode. Meaning, you can play around with making the changes without impacting any branches. So if you need to make any actual changes to a specific commit, use a branch checkout as explained in the next step.

The branch pointer is pointing to some other commit. And the head is also not pointing to the last commit and u make changes to ur head and ur head comes to a detached state, then u will lose access to those sets of commits that are not even pointed by the branch pointer.

Due to the detached head state u can get some dangling commits. A dangling commit is a commit which is not associated with reference, i.e., there is no way to reach it. The commits which are no more referenced by any branch pointer or the head pointer are garbage collected.

- `git switch -` -> To undo the above operation.

If you want to make changes from the commit ID checkout, you need to create a branch, as shown below.

- `git checkout -b <New Branch Name> <Commit ID SHA>`

For example:
`git checkout -b test-branch 7d4c59f5`

This will retain everything from the commit ID to the test-branch.

