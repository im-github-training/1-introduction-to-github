<header>

# InfoMagnus GitHub Training Platform

</header>

<!--
  <<< Author notes: Step 1 >>>
  Choose 3-5 steps for your course.
  The first step is always the hardest, so pick something easy!
  Link to docs.github.com for further explanations.
  Encourage users to open new tabs for steps!
-->

## Getting Started

To get started, we'll need a local copy of this repository.  To do that:

1. Click the "Code" button, and then click the "Copy url to clipboard" icon:

![](images/image-9.png)

2. Open a terminal window and do a `git clone`:

<img src="../../images/image-10.png" width="70%">

## Chapter 1

Ok, in the next series of exercises, we'll be using this repository to work on our next manuscript.

Let's start by making sure the repository is ready for us to start working by typing `git status`.

```shellSession
> git status

On branch main
nothing to commit, working tree clean
```

Looks good!

Now let's create a file for our very first chapter.

```shell
echo "Chapter 1" > chapter1
```

Let's see if Git noticed this new file by typing `git status`:

```shellSession
> git status

On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        chapter1

nothing added to commit but untracked files present (use "git add" to track)
```

Cool, so Git saw that we added this file but it's not yet tracking the file.

Luckily, Git tells us exactly what we need to do next, a `git add`:

```console
git add chapter1
```

Let's see how things look now:

```bash
> git status

On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   chapter1
```

Alright, so it looks like our `chapter1` file is staged and ready to be committed!

Let's go ahead and do that with a `git commit`:

```bash
> git commit -m "Added chapter1"

[main 200eaab] Added chapter1
 1 file changed, 1 insertion(+)
 create mode 100644 chapter1
```

And, of course, a quick `git status`:

```bash
> git status
On branch main
nothing to commit, working tree clean
```

Nice, looks like the file was moved from the staging area to the repository!

Let's see what `git log` has to say:

```bash
> git log

commit 200eaaba0e17d7675fe160a00ba987c8f7c00368 (HEAD -> main)
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Mon Feb 26 23:33:00 2024 -0800

    Added chapter1

commit 513dd263275c0f49b4f683a5227043abe0d5ffdc
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Mon Feb 26 23:30:09 2024 -0800

    Initial commit
(END)
```

Perfect!

## A Little Bit More

Alright, now that we've practiced `git add`'ing and `git commit`'ting files, let's up our game a bit.

Let's see how Git reacts if we accidentally delete `chapter1`.

First things first, let's double-check and make sure `chapter1`'s still there:

```bash
> ls -l
total 4
-rw-r--r-- 1 me me 10 Feb 26 23:32 chapter1
```

Yup, don't know what we were expecting...  

Now, let's delete `chapter1` and see what Git has to say with a lil `git status`:

```bash
> rm chapter1

> git status
On branch main
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    chapter1

no changes added to commit (use "git add" and/or "git commit -a")
```

Ok, somewhere in that wall of text, Git's telling us that `chapter1` has indeed been removed from the _working directory_.

And, once again, Git helpfully tells us what to type to restore the file: 

```bash
git restore chapter1
```

Double-checking with an `ls -l` shows us that `chapter1` has been

```bash
ls -l
total 4
-rw-r--r-- 1 me me 10 Feb 26 23:36 chapter1
```

## Trying out git diff

```bash
echo "Section 1" >> chapter1
```

```bash
> git diff

diff --git a/chapter1 b/chapter1
index 70b252c..211497d 100644
--- a/chapter1
+++ b/chapter1
@@ -1 +1,2 @@
 Chapter 1
+Section 1
(END)
```

## Step: Amend a commit

```bash
> git commit -am "Updated chapter1"

[main 9f5f218] Updated chapter1
 1 file changed, 1 insertion(+)
```

```bash
> git log

commit 9f5f2188f804514cb32c2a2c9b0dc52f904c366d (HEAD -> main)
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Mon Feb 26 23:39:48 2024 -0800

    Updated chapter1

commit 200eaaba0e17d7675fe160a00ba987c8f7c00368
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Mon Feb 26 23:33:00 2024 -0800

    Added chapter1

commit 513dd263275c0f49b4f683a5227043abe0d5ffdc
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Mon Feb 26 23:30:09 2024 -0800

    Initial commit
(END)
```

```bash
> git commit --amend -m "Added 'Section 1' to chapter1"

[main 4ee397d] Added 'Section 1' to chapter1
 Date: Mon Feb 26 23:39:48 2024 -0800
 1 file changed, 1 insertion(+)
```


```bash
> git log

commit 4ee397d6dad3855e209260a1e7380cfb65c1a2b5 (HEAD -> main)
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Mon Feb 26 23:39:48 2024 -0800

    Added 'Section 1' to chapter1

commit 200eaaba0e17d7675fe160a00ba987c8f7c00368
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Mon Feb 26 23:33:00 2024 -0800

    Added chapter1

commit 513dd263275c0f49b4f683a5227043abe0d5ffdc
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Mon Feb 26 23:30:09 2024 -0800

    Initial commit
(END)
```

## Step: Revert a commit

```bash
git revert <commit id>
git log
  
git reset <commit id>
```

## Step: Create a branch

```bash
> git switch -c my-first-branch
Switched to a new branch 'my-first-branch'
```

## Step: Push

```bash
> git push --set-upstream origin my-first-branch
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'my-first-branch' on GitHub by visiting:
remote:      https://github.com/im-sampm/1-introduction-to-github/pull/new/my-first-branch
remote:
To https://github.com/im-sampm/1-introduction-to-github.git
 * [new branch]      my-first-branch -> my-first-branch
Branch 'my-first-branch' set up to track remote branch 'my-first-branch' from 'origin'.
```

<footer>

&copy; 2024 InfoMagnus &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

</footer>
