1. `git init` -> Powers your folder to be managed by git, and initialises a new empty
   repository. It also creates a .git folder that has all the relevant logic to manage
   versions of your project.

2. There are 3 areas in which your file changes can actually resides. Any file change that u actually do might lie in one of the 3 areas.

- **Working Area** -> There can be a bunch of files that are not currently handled/tracked by git. Git won't know that this changes may or may not go to the next version that u are actually going to prepare for.
  It means that changes done or to be done in those files are not managed by git yet. A file
  which is in working area is considered to be not in the staging area. When we do `git status`
  and we see abunch if `untracked files` then these are actually called to be in the working area.

- **Staging Area** -> What all files are going to be part of the next version that we will create.
  This staging area is the place where git knows what changes will be done from the last version to
  the next version. Staging area is files that are going to be a part of the next commit, which lets git know what changes in the file are going to occur for the next commit.

- **Repository Area** -> This area actually contains the details of all you previous registered version.
  And the files in this area, git already manages them and knows their version history.

![image](./Working%20Area%20-%20Staging%20Area%20-%20Repository.PNG)

3. `git add <file>` -> moves the untracked file from the working area to the staging area.

4. `git rm --cached <file>` -> moves file back from staging area to working area.

5. `git rm --cached -r .` -> moves all the files back from staging area to working area.

**Commit** is a particular version of the project. It captures a snapshot of the project's staged
changes and creates a version out of it.

6. `git log` -> List downs all the commits of the repository. Every commit is actually a version,so every commit has a unique hash. This unique Hash is actually very important to know How Git internally handles everything? If you want to exit out of git log prompt
   press `q`.

7. `git restore <file>` -> It removes all files changes from the staging area to be committed. This can
   be useful, if we write some dirty piece of code and now no more want it. Instead of deleting every change
   line by line manually, we can restore it or you can say restore last clean version of the file.

8. `git restore --staged <file>` -> It changes the file area from staging area to the working area.
   This only works if changes are in your staging area.

**Difference between git rm and git restore**
Ans: If you want to move the **_whole file_** back to the untracked state, then we do git rm, otherwise if we
just want the changes to be moved in working area or staging area then we git restore.

9. `git diff commit-1-HashID commit-2-HashID` -> Gives the difference of all file changes between two commits.

10. `git commit -m "<your commit message>"` -> If we want to avoid opening a text editor like vim/nano to
    add commit message we can use this following command.

11. `git remote` -> List down all the remote connection names.

**Remote connection** -> It helps you to link two git repositories, our local repository to our github repository for uploading and downloading changes
from each otherwise.

12. `git remote add <name of remote> <link of the remote>` -> This command helps us to add a new link to the
    remote repository and give a name to it.

13. `git remote rm <name of remote>` -> This command deletes a remote connection.

14. `git remote rename <OldName> <NewName>` -> This command remanes the remote connection.

Note: The name of the remote connection is always used to establish communication between the repositories.

15. `git add <file1> <file2> <file3>` -> This command will add multiple file changes together in the
    staging area.

16. `git add .` -> This command will add all files from working repo to staging area.

17. `git pull <remote name> <branch name>` -> Downloads latest changes from the branch of the mentioned remote in your local repository.

18. Merge conflicts are a very common scenario. Merge conflicts can occur if multiple people try to make changes to the same file, and then collaborate.

19. `git push origin master` -> It will push changes from the local master branch to the remote (Git) master branch.
