**Qs. What is UNIX like OS?**

An operating system is said to be Unix-based or Unix-like if it's designed to function and behave similar to the Unix operating system. Examples of proprietary Unix-like operating systems include AIX, HP-UX, Solaris, and Tru64. Examples of open-source Unix-like operating systems are those based on the Linux kernel and BSD derivatives, such as FreeBSD and OpenBSD. Linux is not Unix, but it is a Unix-like operating system. Linux system is derived from Unix and it is a continuation of the basis of Unix design. Linux distributions are the most famous and healthiest example of direct Unix derivatives. 

**Qs. Why Linux?**
1. It’s free
2. Open source software
3. Security
4. Stability
5. Easy to maintain
6. Runs on any hardware
7. Easy to use
8. Customizable
 
A **Linux distribution** (often abbreviated as distro) is an operating system made from a software collection that includes the Linux kernel, and often a package management system. eg. Ubuntu is a Linux distro. Ubuntu is not Linux. Ubuntu is based on Linux.

A *Shell script* is a computer program designed to be run by a Unix shell, a command-line interpreter. The various dialects of shell scripts are considered to be scripting languages. Typical operations performed by shell scripts include file manipulation, program execution, and printing text.
Whatever Linux command that we will learn are actually a part of a bigger ecosystem called shell scripts.

**REPL => Read Evalualte Print Loop**

NodeJS, Python, the Bash shell, and the developer console found in most web browsers are REPL consoles.
The read-eval-print-loop (REPL) console is a convenient way to do simple programming, test out things, and experiment. As the name implies, the REPL repeatedly (in a infinite loop) prints out a prompt, reads an input command, evaluates it, then prints the result.

For any linux command u can actually check the usage and different input flags it expects by running the command followed by `--help`. 

- `pwd` -> The pwd command writes to standard output the full path name of your current directory (from the root directory). All directories are separated by a / (slash). The root directory is represented by the first /, and the last directory named is your current directory.

- `cd <path>` -> The cd command in Linux stands for change directory. It is used to change the current directory of the terminal. The terminal, by default, opens the home directory. 

- `cd ..` -> The cd .. command in Linux shift one level above the current directory, we input .. as the argument.

- `cd ../..` -> The cd ../.. command in Linux shift two levels above the current directory, we input ../.. as the argument.

- `cd ~` -> This cd ~ command will help u to directly come back to the Home directory.

- `cd directory1/directory2/` -> This command will move into internal subdirectories directly by separating them with a forward slash `/` [In windows use backward slash `\`].

- Absolute Path -> An absolute path is defined as the specifying the location of a file or directory from the root directory(/).

- Relative Path -> Relative path is defined as the path related to the present working directly(pwd).

- `cat <filename>` -> It can be used to display the content of a file, copy content from one file to another, concatenate the contents of multiple files, display the line number, display $ at the end of the line, etc.

- `cat ~/<filename.extension>` -> You can access your home directory files from anywhere using this command.

- `root folder(/)` -> A folder without a parent is the root folder.

- `clear` -> clears the working space by actually moving u to the top of the current shell.

- `ls` -> Lists all the files and directories inside the
current directory in which you are.

- `ls -l` -> Lists all the files and directories inside the current directory along with more details about the owner, permissions, and date.

- `ls -lh` -> Lists all the files and directories inside the current directory along with more details about the owner, permissions, date and file size.

- `ls -a` -> Lists all the files and directories in the current directory and also lists the hidden files (such as .git files). 

- `mkdir <directoryname>` -> The mkdir command in Linux allows the user to create directories (also referred to as folders in some operating systems).

- `touch <filename>` -> The touch command is used to create, change and modify a file.

- `rm <filename>` -> The rm command removes a specified file, group of files, or certain select files from a list within a directory.

- `rmdir <directoryname>` -> The rmdir command is used to remove the **empty** directories.

- `rm -r <directoryname>` -> The rmdir command is used to remove the **non-empty** directories. The -r flag enables rmdir to recursively delete all the content of the folder and then delete the folder.

- `tail <filename>` -> Tail is a command which prints the last few number of lines (10 lines by default) of a certain file, then terminates.

- `tail -n <n> <filename>` -> Tail is a command which prints the last <n> number of lines of a certain file, then terminates. eg. tail -n 3 file1.txt.

- `head <filename>` -> Head is a command which prints the first few number of lines (10 lines by default) of a certain file, then terminates.

- `head -n <n> <filename>` -> Head is a command which prints the first <n> number of lines of a certain file, then terminates. eg. head -n 3 file1.txt.

- `echo "<String>"` -> Echo is a built-in Linux command that is used to display the text passed in as an argument. eg. echo "Hello World" 

- `echo "String" > <filename.extension>` -> Whatever will be the result of `echo "String"`, it will be dumped inside the file. It will not be printed at the terminal. eg. echo "Hello World" > file1.txt

- `ls > <filename.extension>` -> Whatever will be the result of `ls`, it will be dumped inside the file. It will not be printed at the terminal. eg. ls > file1.txt

## VIM Editor

- `vim <filename.extension>` -> Create a new file and open it in the VIM editor.

- `vi <filename.extension>` -> Create a new file and open it in the VIM editor.

- `Press Esc, Press :, Press q, Press Enter` -> To exit from the VIM editor.

- `Press Esc, Press :, Press q, Press !, Press Enter` -> To exit from the VIM editor without saving the changes made in the file.

- `Press Esc, Press :, Press w, Press q, Press Enter` -> To exit from the VIM editor after saving the file.

- Now after opening VIM if you want to start making changes you need to, first of all, change the mode from normal mode to insert mode. To go into the insert mode we can `press i`.
If you want to come back to the normal mode then `press Esc`.

- `Press l` -> In normal mode, you can move the cursor right.

- `Press h` -> In normal mode, you can move the cursor left.

- `Press i` -> In normal mode, you can move the cursor down.

- `Press k` -> In normal mode, you can move the cursor up.

- You can use the normal `right`, `left`, `up`, and `down` arrow keys as well to navigate.

- `Press dd` -> In normal mode, it will delete the line the cursor is currently at.

- `Press gg` -> In normal mode, it will make the cursor go on the first line.

- `Press G` -> In normal mode, it will make the cursor go on the last line.

- `w` -> In normal mode, it can make u jump one word.

- `<n>w` -> In normal mode, it can make u jump <n> words. eg. 3w -> In normal mode, it can make u jump 3 words. 

- `:%s/<word1>/<word2>/` -> In normal mode, to replace all occurrences of <word1> with <word2>. eg. :%s/foo/bar/ -> To replace all occurrences of foo with bar.

- `:s/<word1>/<word2>/` -> In normal mode, to search for the first occurrence of the string <word1> in the current line and replace it with <word2>. eg. :s/foo/bar/ -> To search for the first occurrence of the string foo in the current line and replace it with bar.

- `yy` -> In normal mode, it copies the whole line where the cursor is at the moment. 

- `yw` -> In normal mode, it copies one word where the cursor is at the moment.

- `p` -> In normal mode, for pasting.

