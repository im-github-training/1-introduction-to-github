# Lesson 1

## Getting Started

## Cloning repositories

To get started, we'll need a local copy of this repository.  To do that:

1. **Click the "Code" button, and then click the "Copy url to clipboard" icon:**
   ![Copy Repo URL](/.images/image-9.png)

2. **Open a terminal window and do a `git clone`:**

<!--
```shell
$ git clone https://github.com/im-sampm/exercises.git
```
-->

Now let's make sure everything is in order with our repository.

To do this, we use the `git status` command which (unsurprisingly) prints out the current status of your repository.

<!--
```shellSession
$ git status
```
 -->

!['git status'](/.images/shell/1-step-shell-0.svg)

Looks good!

Git is telling us the following things:

* we are on the `main` branch
* that our ***staging area*** is empty
* and no changes have been detected in our ***working tree*** (aka "working directory")

> If any of these terms are unfamiliar to you, please check out [What is a Repository?](https://im-github-training.github.io/#/./docs/basic/git/repositories)

## Understanding commits

TODO: Commits are the most fundamental concept in Git...

Let's start by creating a few files:

<!--
```shellSession
$ touch file1 file2 file3
```
-->

!['touch file1 file2 file3'](/.images/shell/1-step-shell-1.svg)

Let's see if Git noticed this change to our ***working tree***:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/1-step-shell-2.svg)

So, Git noticed that we added the files, but states that they're *untracked*.

> With Git, you have to *explicitly* tell it to start tracking files using `git add`.  Until you do that, Git considers the file *untracked*.

Let's go ahead and start tracking the files with a `git add`:

<!--
```shellSession
$ git add .
```
-->

!['git add .'](/.images/shell/1-step-shell-3.svg)

> We could have individually added the files by typing `git add file1 file2 file3`, but `git add` provides the convenience method `git add .`, which stages any and all changes present in the working directory.

Let's see how things look now:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/1-step-shell-4.svg)

Alright, it looks like our files are ***staged*** and ready to be committed!

Let's go ahead and do that with `git commit -m "Added stuff"`:

<!--
```shellSession
$ git commit -m "Added stuff"
```
-->

!['git commit -m "Added stuff"'](/.images/shell/1-step-shell-5.svg)

> `-m` is the short form of `--message`, which allows us to specify short commit messages via the command-line.  If you need to enter a longer commit message, typing `git commit` without any flags brings up a text editor

Let's see what `git status` says now that the files have been committed:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/1-step-shell-6.svg)

Nice, looks like the files were moved from the ***staging area*** to the ***repository***!

We can confirm that the commit is part of our repository by doing a `git log`:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/1-step-shell-7.svg)

## Understanding branches

Branches are pointers to a specific commit in the repository's history.  They are commonly used to isolate changes for specific features or bug fixes, enabling developers to work on multiple tasks simultaneously without affecting the main codebase.

* When you create a ***branch***, Git creates a ***reference*** and points it at your ***current  commit***
* As you make ***new commits***, Git automatically updates this ***reference*** to the ***latest commit***
* In this way, a ***branch reference*** always represents the latest line of development in a ***branch***

Branches are useful because they give you a place to experiment and try things out before you make changes to your `main` branch.

Let's create one for us to work in.

### Listing all branches

First, let's see what branches this repo already has, because we want to pick a unique name.

As mentioned in [What is a repository?](), Git has a concept of ***local*** and ***remote*** repositories.  Naturally, Git also has a concept of ***local*** and ***remote*** branches.

#### Local branches

Local branches are branches that exist in our *local* repository.

To list all *local* branches, we use `git branch`:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-8.svg)

We can see that our local repository has only one branch, `main`.

> The `*` in front of `main` means that we're currently working "in" the `main` branch.  Alternatively, we have `main` "checked out".

#### Remote branches

Remote branches are branches that exist in a *remote* repository.

In our case, we made a local copy of a *remote* repository by *cloning* it.  When repositories are *cloned*, Git keeps track of the *remote* repositories *remote* branches.

To list all *local* and *remote* branches, we use `git branch --all`:

<!--
```shellSession
$ git branch --all
```
-->

!['git branch --all'](/.images/shell/1-step-shell-9.svg)

We can see that in addition to the local `main` branch, there are *remote* branches.

TODO:

### Creating branches

Now let's actually create a *local* branch, which we can do with `git branch <branchname>`:

<!--
```shellSession
$ git branch feature
```
-->

!['git branch feature'](/.images/shell/1-step-shell-10.svg)

Let's see what `git branch` looks like with our new branch:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-11.svg)

Interesting, so we can see that `feature` was created, but the `*` is still in front of `main`.

This means that we're still working "in" the `main` branch.

To start working in the `feature` branch we need to do a `git switch`:

<!--
```shellSession
$ git switch feature
```
-->

!['git switch feature'](/.images/shell/1-step-shell-12.svg)

And just to double-check:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-13.svg)

> Something that we'll address head-on is that Git often has multiple ways of doing the same thing.
>
> In our case, `git switch` provides the `--create` or `-c` flag, which lets you create and switch all in one go.

Let's give it a shot and create a throwaway branch:

<!--
```shellSession
$ git switch -c throwaway
```
-->

!['git switch -c throwaway'](/.images/shell/1-step-shell-14.svg)

And...

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-15.svg)

Perfect!

### Deleting branches

Now let's get rid of the throwaway branch using `git branch`'s `--delete` or `-d` flag.

<!--
```shellSession
$ git branch -d throwaway
```
-->

!['git branch -d throwaway'](/.images/shell/1-step-shell-16.svg)

Ah, so we cannot delete a branch that is currently in use or "checked out".

So let's switch back to `feature` using the handy `git switch -`:

<!--
```shellSession
$ git switch -
```
-->

!['git switch -'](/.images/shell/1-step-shell-17.svg)

Trying the delete again:

<!--
```shellSession
$ git branch -d throwaway
```
-->

!['git branch -d throwaway'](/.images/shell/1-step-shell-18.svg)

Great, and checking `git branch`:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-19.svg)

And a `git status` for good measure:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/1-step-shell-20.svg)

*Magnifique.*

### Renaming branches

So at the start of this lesson we created a branch called `feature`, however, we aren't going to be building anything.

A more appropriate name would be something like `lesson/1`, that way we can keep the files for each lesson separate.

Now let's rename the branch using `git branch -m`:

<!--
```shellSession
$ git branch -m feature lesson/1
```
-->

!['git branch -m feature lesson/1'](/.images/shell/1-step-shell-21.svg)

### Merging branches

As we mentioned in the introduction to this lesson, the contents of two or more branches can be combined using a process called **merging**.

Git supports two main types of merges:

1. **Fast-forward merge**: This type of merge can occur when there is a linear path from the current branch tip to the target branch. Instead of creating a new commit, Git just moves the current branch pointer up to the target branch pointer.

2. **Three-way merge**: This is the most common type of merge. When the two branches you're trying to merge have diverged, Git creates a new commit that includes changes from both branches. This is done by looking at the common ancestor of the two branches, the current branch, and the target branch.

#### The fast-forward merge

To better understand merging, let's merge some changes between branches.

First, let's create a few commits in the current `lesson/1` branch:

<!--
```shellSession
$ git commit -m "lesson/1 commit" --allow-empty
$ git commit -m "lesson/1 commit" --allow-empty
```
-->

!['git commit -m "lesson/1 commit" --allow-empty'](/.images/shell/1-step-shell-22.svg)!['git commit -m "lesson/1 commit" --allow-empty'](/.images/shell/1-step-shell-23.svg)

Next, let's create a branch to merge:

<!--
```shellSession
$ git switch -c lesson/1-merge
```
-->

!['git switch -c lesson/1-merge'](/.images/shell/1-step-shell-24.svg)

Let's create a few commits in the `lesson/1-merge` branch:

<!--
```shellSession
$ git commit -m "lesson/1-merge commit" --allow-empty
$ git commit -m "lesson/1-merge commit" --allow-empty
```
-->

!['git commit -m "lesson/1-merge commit" --allow-empty'](/.images/shell/1-step-shell-25.svg)!['git commit -m "lesson/1-merge commit" --allow-empty'](/.images/shell/1-step-shell-26.svg)

Now let's switch back to the `lesson/1` branch:

<!--
```shellSession
$ git switch lesson/1
```
-->

!['git switch lesson/1'](/.images/shell/1-step-shell-27.svg)

And let's merge the branch:

<!--
```shellSession
$ git merge lesson/1-merge
```
-->

!['git merge lesson/1-merge'](/.images/shell/1-step-shell-28.svg)

As Git reports, it has performed a ***fast-forward*** merge.

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 5
```
-->

!['git log --oneline --graph --decorate --all -n 5'](/.images/shell/1-step-shell-29.svg)

In this simple scenario, Git was able to simply take the commits in the `lesson/1-merge` branch and add them to the end of the `lesson/1` branch.

#### Three-way merges

Now let's try a more complex scenario, and see what happens if we add commits to both `lesson/1` ***and*** `lesson/1-merge`:

<!--
```shellSession
$ git switch lesson/1-merge
$ git commit -m "lesson/1-merge commit" --allow-empty
$ git commit -m "lesson/1-merge commit" --allow-empty
```
-->

!['git switch lesson/1-merge'](/.images/shell/1-step-shell-30.svg)!['git commit -m "lesson/1-merge commit" --allow-empty'](/.images/shell/1-step-shell-31.svg)!['git commit -m "lesson/1-merge commit" --allow-empty'](/.images/shell/1-step-shell-32.svg)

Now let's switch back to `lesson/1` and add a few commits:

<!--
```shellSession
$ git switch lesson/1
$ git commit -m "lesson/1 commit" --allow-empty
$ git commit -m "lesson/1 commit" --allow-empty
```
-->

!['git switch lesson/1'](/.images/shell/1-step-shell-33.svg)!['git commit -m "lesson/1 commit" --allow-empty'](/.images/shell/1-step-shell-34.svg)!['git commit -m "lesson/1 commit" --allow-empty'](/.images/shell/1-step-shell-35.svg)

Using `git log` we can now see two separate branches:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 5
```
-->

!['git log --oneline --graph --decorate --all -n 5'](/.images/shell/1-step-shell-36.svg)

Let's try merging these:

<!--
```shellSession
$ git merge lesson/1-merge -m "Merging branches"
```
-->

!['git merge lesson/1-merge -m "Merging branches"'](/.images/shell/1-step-shell-37.svg)

Now looking at `git log` we can now see the three-way branch:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 5
```
-->

!['git log --oneline --graph --decorate --all -n 5'](/.images/shell/1-step-shell-38.svg)

#### Dealing with merge *conflicts*

A common occurrence when merging branches are ***merge conflicts***.

***Merge conflicts*** occur when the same part of your code is changed in two branches that you're trying to merge together, and Git can't determine which change should take precedence.  When this happens, Git halts the merge process and requires manual intervention to resolve the conflict, after which you can continue with the merge.

Let's create a merge conflict and learn how to ***resolve*** them.

First, let's create a change to `file1` in the `lesson/1-merge` branch:

<!--
```shellSession
$ git switch lesson/1-merge
$ echo "lesson/1-merge" > file1
$ git commit -am "Updated file1 in lesson/1-merge"
```
-->

!['git switch lesson/1-merge'](/.images/shell/1-step-shell-39.svg)!['echo "lesson/1-merge" > file1'](/.images/shell/1-step-shell-40.svg)!['git commit -am "Updated file1 in lesson/1-merge"'](/.images/shell/1-step-shell-41.svg)

Next let's create a change to `file1` in the `lesson/1` branch:

<!--
```shellSession
$ git switch lesson/1
$ echo "lesson/1" > file1
$ git commit -am "Updated file1 in lesson/1"
```
-->

!['git switch lesson/1'](/.images/shell/1-step-shell-42.svg)!['echo "lesson/1" > file1'](/.images/shell/1-step-shell-43.svg)!['git commit -am "Updated file1 in lesson/1"'](/.images/shell/1-step-shell-44.svg)

And now let's try to merge `lesson/1-merge` into `lesson/1`:

<!--
```shellSession
$ git merge lesson/1-merge
```
-->

!['git merge lesson/1-merge'](/.images/shell/1-step-shell-45.svg)

As expected, Git aborts the automatic merge and asks us to "fix the conflicts" and "commit the result".

To start, let's take a look at `file1`:

<!--
```shellSession
$ cat file1
```
-->

!['cat file1'](/.images/shell/1-step-shell-46.svg)

We can see that Git has added ***conflict markers*** to `file1`:

```diff
<<<<<<<
Code from your current branch
=======
Code from branch you are merging
>>>>>>>
```

In our current example, let's say we want to keep *both* changes.  To do that, we need to edit `file1` so it looks like:

```diff
lesson/1
lesson/1-merge
```

And continue the merge with `git commit -a`:

<!--
```shellSession
$ git commit -am "Merging branches"
$ git log --oneline --graph --decorate --all -n 5
```
-->

!['git commit -am "Merging branches"'](/.images/shell/1-step-shell-47.svg)!['git log --oneline --graph --decorate --all -n 5'](/.images/shell/1-step-shell-48.svg)

### Stashing commits

Git mostly stays out of your way as you create and switch between branches, however, Git disallows switching branches when the switch could result in losing uncommitted changes.

This typically happens when the changes in your current working directory or staging area conflict with the branch you are trying to switch to. If the same file has been modified in your current branch and in the branch you're trying to check out, Git will prevent the branch switch to avoid overwriting those modifications.

In these situations, you have two options:

1. **Commit your changes**: `git commit`
2. **Stash your changes**: `git stash`

**Stashing** allows you to save changes that you don't want to commit immediately. You can apply the stashed changes later, even on a different branch.

#### Basic Stashing

You're in the middle of working on a feature when you need to switch branches to fix a bug. You don't want to commit half-done work, so you can stash the changes.

1. Modify a file in your repository but do not commit the changes.
2. Run `git stash`. Your changes are saved in a new stash and your working directory is reverted to the last commit.
3. Switch to another branch and make some changes.
4. Switch back to the original branch.

#### Applying Stashed Changes

Now that the bug is fixed, you want to go back to working on the feature. You can apply the stashed changes to your working directory.

1. Run `git stash list`. This will show a list of all stashes. You should see the stash you created earlier.
2. Run `git stash apply`. This will apply the most recent stash to your working directory.

#### Stashing Specific Files

Sometimes, you only want to stash changes to certain files. You can do this with `git stash push`.

1. Modify two files in your repository but do not commit the changes.
2. Run `git stash push -m "A descriptive message" <file>`. Replace `<file>` with the path to one of the files you modified. This will create a new stash with only the changes to that file.

#### Dropping a Stash

Once you've applied a stash and made sure you won't need it again, you can drop it to keep your stash list clean.

1. Run `git stash list`. This will show a list of all stashes.
2. Run `git stash drop <stash>`. Replace `<stash>` with the name of the stash you want to drop.

#### Stashing Untracked Files

By default, `git stash` will not stash untracked files. If you want to include untracked files, you can use `git stash -u`.

1. Create a new file in your repository but do not stage or commit it.
2. Run `git stash -u`. This will create a new stash that includes the untracked file.

Remember, stashing is a powerful tool that allows you to save changes without committing them. It's useful when you need to switch context quickly, but don't want to lose your current work.

## Wrapping Things Up

Phew, that was a whirlwind tour of Git, let's end things on a high-note.

Once you're ready, push your changes back to GitHub.

We'll grade your work and update your repo's `README.md` with instructions for Lesson 2.

<!--
```shellSession
$ git push
```
-->

!['git push'](/.images/shell/1-step-shell-49.svg)

<!--
```shellSession
$ git push --set-upstream origin feature
```
-->

!['git push --set-upstream origin feature'](/.images/shell/1-step-shell-50.svg)
