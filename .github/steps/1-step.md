# Lesson 1

## Getting Started

## Cloning repositories

To get started, we'll need a local copy of this repository.  To do that:

1. **Click the "Code" button, and then click the "Copy url to clipboard" icon:**
   ![Copy Repo URL](/.images/image-9.png)

2. **Open a terminal window and do a `git clone`:**
   ![Clone Repo](/.images/image-10.png)

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

Interestingly, Git noticed that we added the files, but states that they're *untracked*.

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

Alright, it looks like our files are staged and ready to be committed!

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

Nice, looks like the files were moved from the staging area to the repository!

We can confirm that the commit is part of our repository history by doing a `git log`:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/1-step-shell-7.svg)

## Understanding branches

TODO: Branches are the second most fundamental concept in Git.

Let's set things up by creating something called a ***branch***.

A ***branch*** is a pointer to a specific ***commit***:

* When you create a ***branch***, Git creates a ***reference*** and points it at your ***current  commit***
* As you make ***new commits***, Git automatically updates this ***reference*** to the ***latest commit***
* In this way, a ***branch reference*** always represents the latest line of development in a ***branch***

Branches are useful because they give you a place to experiment and try things out before you make changes to your `main` branch.

Let's create one for us to work in.

### Listing all branches

First, let's see what branches this repo already has, because we want to pick a unique name:

<!--
```shellSession
$ git branch --all
```
-->

!['git branch --all'](/.images/shell/1-step-shell-8.svg)

TODO: Address remotes

Ok, it looks like there's only one branch, `main`

> The `*` in front of `main` means that we're currently working "in" the `main` branch.  Alternatively, we have `main` "checked out".

### Creating branches

Now let's actually create the branch, which we can do with `git branch <branchname>`:

<!--
```shellSession
$ git branch feature
```
-->

!['git branch feature'](/.images/shell/1-step-shell-9.svg)

Let's see what `git branch` looks like with our new branch:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-10.svg)

Interesting, so we can see that `feature` was created, but the `*` is still in front of `main`.

This means that we're still working "in" the `main` branch.

To start working in the `feature` branch we need to do a `git switch`:

<!--
```shellSession
$ git switch feature
```
-->

!['git switch feature'](/.images/shell/1-step-shell-11.svg)

And just to double-check:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-12.svg)

Something that we'll address head-on is that Git often has multiple ways of doing the same thing.

In our case, `git switch` provides the `--create` or `-c` flag, which lets you create and switch all in one go.

Let's give it a shot and create a throwaway branch:

<!--
```shellSession
$ git switch -c throwaway
```
-->

!['git switch -c throwaway'](/.images/shell/1-step-shell-13.svg)

And...

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-14.svg)

Perfect!

### Deleting branches

Now let's get rid of the throwaway branch using `git branch`'s `--delete` or `-d` flag.

<!--
```shellSession
$ git branch -d throwaway
```
-->

!['git branch -d throwaway'](/.images/shell/1-step-shell-15.svg)

Ah, so we cannot delete a branch that is currently in use or "checked out".

So let's switch back to `feature` using the handy `git switch -`:

<!--
```shellSession
$ git switch -
```
-->

!['git switch -'](/.images/shell/1-step-shell-16.svg)

Trying the delete again:

<!--
```shellSession
$ git branch -d throwaway
```
-->

!['git branch -d throwaway'](/.images/shell/1-step-shell-17.svg)

Great, and checking `git branch`:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-18.svg)

And a `git status` for good measure:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/1-step-shell-19.svg)

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

!['git branch -m feature lesson/1'](/.images/shell/1-step-shell-20.svg)

### Merging branches

As we mentioned in the introduction to this lesson, the contents of two or more branches can be combined using a process called **merging**.

#### The fast-forward merge

To better understand merging, let's merge some changes between branches.

First, let's create a few commits in the current `lesson/1` branch:

<!--
```shellSession
$ git commit -m "lesson/1 commit" --allow-empty
$ git commit -m "lesson/1 commit" --allow-empty
```
-->

!['git commit -m "lesson/1 commit" --allow-empty'](/.images/shell/1-step-shell-21.svg)!['git commit -m "lesson/1 commit" --allow-empty'](/.images/shell/1-step-shell-22.svg)

Next, let's create a branch to merge:

<!--
```shellSession
$ git switch -c lesson/1-merge
```
-->

!['git switch -c lesson/1-merge'](/.images/shell/1-step-shell-23.svg)

Let's create a few commits in the `lesson/1-merge` branch:

<!--
```shellSession
$ git commit -m "lesson/1-merge commit" --allow-empty
$ git commit -m "lesson/1-merge commit" --allow-empty
```
-->

!['git commit -m "lesson/1-merge commit" --allow-empty'](/.images/shell/1-step-shell-24.svg)!['git commit -m "lesson/1-merge commit" --allow-empty'](/.images/shell/1-step-shell-25.svg)

Now let's switch back to the `lesson/1` branch:

<!--
```shellSession
$ git switch lesson/1
```
-->

!['git switch lesson/1'](/.images/shell/1-step-shell-26.svg)

And let's merge the branch:

<!--
```shellSession
$ git merge lesson/1-merge
```
-->

!['git merge lesson/1-merge'](/.images/shell/1-step-shell-27.svg)

Git says it did a `fast-forward`...

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 5
```
-->

!['git log --oneline --graph --decorate --all -n 5'](/.images/shell/1-step-shell-28.svg)

#### Three-way merges

Let's see what happens if we add commits to both `lesson/1` ***and*** `lesson/1-merge`:

<!--
```shellSession
$ git switch lesson/1-merge
$ git commit -m "lesson/1-merge commit" --allow-empty
$ git commit -m "lesson/1-merge commit" --allow-empty
```
-->

!['git switch lesson/1-merge'](/.images/shell/1-step-shell-29.svg)!['git commit -m "lesson/1-merge commit" --allow-empty'](/.images/shell/1-step-shell-30.svg)!['git commit -m "lesson/1-merge commit" --allow-empty'](/.images/shell/1-step-shell-31.svg)

Now let's switch back to `lesson/1` and add a few commits:

<!--
```shellSession
$ git switch lesson/1
$ git commit -m "lesson/1 commit" --allow-empty
$ git commit -m "lesson/1 commit" --allow-empty
```
-->

!['git switch lesson/1'](/.images/shell/1-step-shell-32.svg)!['git commit -m "lesson/1 commit" --allow-empty'](/.images/shell/1-step-shell-33.svg)!['git commit -m "lesson/1 commit" --allow-empty'](/.images/shell/1-step-shell-34.svg)

Using `git log` we can now see two separate branches:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 5
```
-->

!['git log --oneline --graph --decorate --all -n 5'](/.images/shell/1-step-shell-35.svg)

Let's try merging these:

<!--
```shellSession
$ git merge lesson/1-merge -m "Merging branches"
```
-->

!['git merge lesson/1-merge -m "Merging branches"'](/.images/shell/1-step-shell-36.svg)

Now looking at `git log` we can now see the three-way branch:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 5
```
-->

!['git log --oneline --graph --decorate --all -n 5'](/.images/shell/1-step-shell-37.svg)

#### Dealing with merge *conflicts*

TODO: Something that commonly happens when merging branches is something called a ***merge conflict***.  This occurs when...

Let's create a change to `file1`:

<!--
```shellSession
$ git switch lesson/1-merge
$ echo "lesson/1-merge" > file1
$ git commit -am "Updated file1 in lesson/1-merge"
```
-->

!['git switch lesson/1-merge'](/.images/shell/1-step-shell-38.svg)!['echo "lesson/1-merge" > file1'](/.images/shell/1-step-shell-39.svg)!['git commit -am "Updated file1 in lesson/1-merge"'](/.images/shell/1-step-shell-40.svg)

Now let's...

<!--
```shellSession
$ git switch lesson/1
$ echo "lesson/1" > file1
$ git commit -am "Updated file1 in lesson/1"
```
-->

!['git switch lesson/1'](/.images/shell/1-step-shell-41.svg)!['echo "lesson/1" > file1'](/.images/shell/1-step-shell-42.svg)!['git commit -am "Updated file1 in lesson/1"'](/.images/shell/1-step-shell-43.svg)

And merge:

<!--
```shellSession
$ git merge lesson/1-merge
```
-->

!['git merge lesson/1-merge'](/.images/shell/1-step-shell-44.svg)

Git says...

<!--
```shellSession
$ cat file1
```
-->

!['cat file1'](/.images/shell/1-step-shell-45.svg)

So let's say we want to keep both changes, let's edit `file1`:

```diff
lesson/1
lesson/1-merge
```

And continue the merge with `git commit -a`:

<!--
```shellSession
$ git commit -am "Merging branches"
```
-->

!['git commit -am "Merging branches"'](/.images/shell/1-step-shell-46.svg)

Great, but while we're here, what's that long number-like thing next to `commit`, above?

It's a **commit ID**.

## What is a Commit ID?

A **commit ID** (or **commit hash**) is a unique identifier for each commit. It is a 40-character alpha-numeric string calculated based on the contents of a commit.

> When using a commit ID, you only need to type out the first few characters, just enough to uniquely identify the commit within your repository. For example, you might see short versions of commit hashes in `git log` output, like `e83c516`.

## What is HEAD?

To the right of the **commit ID** in the `git log` output is `(HEAD -> feature)`, which seems to indicate that something called `HEAD` is pointing to `feature`.

Let's dig in.

In Git, `HEAD` can be thought of as the "you are here" marker in your repository. It's a pointer that indicates what the currently "checked out" commit is.

### Understanding HEAD

To get an intuitive understanding of `HEAD`, let's take a look at our `git log` (using some flags to make things easier to see):

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/1-step-shell-47.svg)

This is a text-based graph of the commits in your repository. The commit that `HEAD` is pointing to is marked with `(HEAD)`.

> Note that `HEAD` is pointing to the latest commit on the `feature` branch.

### Moving HEAD

Now let's switch over to `main`:

<!--
```shellSession
$ git switch main
```
-->

!['git switch main'](/.images/shell/1-step-shell-48.svg)

And see what `HEAD` is pointing to:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/1-step-shell-49.svg)

> Notice how `HEAD` has moved to the latest commit on `main`?

Now let's switch back to `feature`:

<!--
```shellSession
$ git switch feature
```
-->

!['git switch feature'](/.images/shell/1-step-shell-50.svg)

And make a commit:

<!--
```shellSession
$ touch head-test && git add head-test && git commit -m "Learning about HEAD"
```
-->

!['touch head-test && git add head-test && git commit -m "Learning about HEAD"'](/.images/shell/1-step-shell-51.svg)

And see what happens to `HEAD`:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/1-step-shell-52.svg)

> `HEAD` has been automatically moved to the new commit!

### Detached HEAD

Now let's see what happens when we checkout a specific commit, instead of a `branch`:

<!--
```shellSession
$ git checkout HEAD~3
```
-->

!['git checkout HEAD~3'](/.images/shell/1-step-shell-53.svg)

This warning seems quite scary, `detached HEAD` and all...  Get used to it, because you'll be seeing it a lot. `detached HEAD` happens so often that it's a perennial right of passage for Git users.  Having an intuitive understanding on what it means is key to Git success.

## Understanding Detached HEAD

First, let's take a look at `git log`:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/1-step-shell-54.svg)

Seems pretty normal.

In fact, the only thing remotely "strange" is that `HEAD` doesn't have an arrow (`->`) pointing to a branch like `main` or `feature`.

Let's see what happens when we **commit** something:

<!--
```shellSession
$ touch detached-test && git add detached-test && git commit -m "Testing detached HEAD"
```
-->

!['touch detached-test && git add detached-test && git commit -m "Testing detached HEAD"'](/.images/shell/1-step-shell-55.svg)

And seeing what we have wrought:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/1-step-shell-56.svg)

It looks like we've created a `branch`! Or, at least something that *looks* like a `branch`...

Let's think about that `detached HEAD` warning...

```shell
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -
...
```

... `git checkout` is advising us to create a *branch*...

For the sake of adventure, let's try the second option `git switch -`:

<!--
```shellSession
$ git switch -
```
-->

!['git switch -'](/.images/shell/1-step-shell-57.svg)

Now Git is literally *begging* us to create a *branch* at that commit, even giving us a whole ***new*** command for doing so...

Let's check `git log`:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/1-step-shell-58.svg)

And the commit is gone.

But is it *really*?  I mean, we have the commit ID right there on our screen... what's stopping us from doing a `git branch <new-branch-name> <commit-id>` now?  In ten minutes?  A month from now?

So here's the important thing you need to learn about Git:

> It is *nearly* **impossible** to lose anything that you've committed to a Git repository... as long as you have a ***reference***.

## What is a reference?

In Git, a reference (or "ref") is a **file** that contains the commit ID of a commit - it's a way to save a pointer to a specific commit.

### Types of references

There are three main types of references in Git:

1. **Branches**: branch references are pointers to the latest commit in a branch.
   * They are stored in the `.git/refs/heads/` directory

2. **Tags**: are references to specific points in history, often used to capture a point where a particular version of a project was released.
   * They are stored in the `.git/refs/tags/` directory

3. **Remotes**: are references to commits in other repositories.
   * They are stored in the `.git/refs/remotes/` directory

### Wait, they're ***files***?

Yes, references are *files*:

Let's take a quick peek into the `.git` directory mentioned above:

<!--
```shellSession
$ tree -n -I objects ../.git
```
-->

!['tree -n -I objects ../.git'](/.images/shell/1-step-shell-59.svg)

> The `-I objects` flag excludes the .git/objects folder because it contains a lot of files

Let's examine `.git/HEAD` and the contents of `.git/refs/heads/*`:

<!--
```shellSession
$ cat ../.git/HEAD
```
-->

!['cat ../.git/HEAD'](/.images/shell/1-step-shell-60.svg)

So `.git/HEAD` points to `refs/heads/feature`, which makes sense, since we currently have `feature` checked out.

<!--
```shellSession
$ cat ../.git/refs/heads/feature
```
-->

!['cat ../.git/refs/heads/feature'](/.images/shell/1-step-shell-61.svg)

This commit ID seems familiar, in fact, it looks like the commit ID that `HEAD` and `feature` are pointing to from the `git log` above.

<!--
```shellSession
$ cat ../.git/refs/heads/main
```
-->

!['cat ../.git/refs/heads/main'](/.images/shell/1-step-shell-62.svg)

No surprise here, so references ***are*** files!

Let's try something crazy, let's see if we can recover that 'lost' commit from the `detached HEAD` episode.  From what we've just discovered, it feels like all we have to do is create a file in `.git/refs/heads` containing the commit ID of the commit.

What, you don't remember the commit ID?

Check the reflog.

### Introducing the reflog

<!--
```shellSession
$ git reflog
```
-->

!['git reflog'](/.images/shell/1-step-shell-63.svg)

There it is, near the top.  So let's take that commit ID and put it in a file called `.git/refs/heads/tada`:

<!--
```shellSession
$ git rev-parse HEAD@{1} > ../.git/refs/heads/tada
```
-->

!['git rev-parse HEAD@{1} > ../.git/refs/heads/tada'](/.images/shell/1-step-shell-64.svg)

And checking `git log`:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 10
```
-->

!['git log --oneline --graph --decorate --all -n 10'](/.images/shell/1-step-shell-65.svg)

***TADA!***

## Wrapping Things Up

Phew, that was a whirlwind tour of Git, let's end things on a high-note.

Once you're ready, push your changes back to GitHub.

We'll grade your work and update your repo's `README.md` with instructions for Lesson 2.

<!--
```shellSession
$ git push
```
-->

!['git push'](/.images/shell/1-step-shell-66.svg)

<!--
```shellSession
$ git push --set-upstream origin feature
```
-->

!['git push --set-upstream origin feature'](/.images/shell/1-step-shell-67.svg)
