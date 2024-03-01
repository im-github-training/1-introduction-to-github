## Introduction

Welcome to the InfoMagnus GitHub Training Exercises.

This repository is part of the [InfoMagnus GitHub Training Guide](https://im-github-training.github.io/).

### Getting Started

To get started, we'll need a local copy of this repository.  To do that:

1. Click the "Code" button, and then click the "Copy url to clipboard" icon:

![](/images/image-9.png)

2. Open a terminal window and do a `git clone`:

![](/images/image-10.png)


In the next series of exercises, we will be using this repository to work on a New York Times bestseller.

## Understanding the Basics

To begin, let's make sure everything is in order with our repository.

To do this, we use the `git status` command which (unsurprisingly) prints out the current status of your repository.

<!--
```shellSession
$ git status
```
 -->

!['git status'](/images/1-step-shell-0.svg)

Looks good!

Git is telling us the following things:

* we are on the `main` branch
* that our _**staging area**_ is empty
* and no changes have been detected in our _**working tree**_ (aka "working directory")

> If any of these terms are unfamiliar to you, please check out [What is a Repository?](https://im-github-training.github.io/#/./docs/basic/git/repositories)


### Our First Branch

Let's set things up by creating something called a `branch`.

A branch is basically a bookmark to a specific commit.  What's neat about them is that they give you a place to experiment and try things out before you make changes to your `main` branch.

To create a branch, we use `git branch <branchname>`:

<!--
```shellSession
$ git branch
```
 -->



<!--
```shellSession
$ git switch -c my-first-branch
```
 -->

!['git switch -c my-first-branch'](/images/1-step-shell-1.svg)



### Our First Commit

Now, let's create a file for Chapter 1 called `chapter1`.

We can do this with a simple `touch chapter`:

<!--
```shellSession
$ touch chapter1
```
 -->

!['touch chapter1'](/images/1-step-shell-2.svg)



Let's see if Git noticed this change to our `working tree` by typing `git status`:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/1-step-shell-3.svg)



Great, Git noticed that we added the file, but is saying it's *untracked*.

> The way Git works is that you have to *explicitly* tell it to start tracking files by using the `git add` command.  Until you do that, Git considers the file *untracked*.
>
> Once a file has been added via `git add`, it becomes a "tracked" file and Git will start monitoring it for changes. If you modify a tracked file, Git will recognize that it has been modified and will mark it as "modified" but not yet "staged" for the next commit.

Let's go ahead and start tracking the file with a `git add chapter1`:

<!--
```shellSession
$ git add chapter1
```
-->

!['git add chapter1'](/images/1-step-shell-4.svg)



Let's see how things look now:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/1-step-shell-5.svg)



Alright, it looks like `chapter1` file is staged and ready to be committed!

Let's go ahead and do that with `git commit -m "Added chapter1"`:

<!--
```shellSession
$ git commit -m "Added chapter1"
```
-->

!['git commit -m "Added chapter1"'](/images/1-step-shell-6.svg)

> note: we can type git commit and explain '-m flag

Let's see what `git status` says now that the file's been committed:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/1-step-shell-7.svg)



Nice, looks like the file was moved from the staging area to the repository!

We can confirm the commit is part of our repository history by doing a `git log`:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/images/1-step-shell-8.svg)



Perfect!

### Fixing Things (Part 1)

#### Restoring files

One of the great things about Git is that once a file has been added to a repository, it's *almost* **impossible** to lose it.  We'll prove this out in later exercises, but let's start simple and delete `chapter1`.

<!--
```shellSession
$ rm chapter1

$ ls -l

$ git status
```
-->

!['rm chapter1'](/images/1-step-shell-9.svg)!['ls -l'](/images/1-step-shell-10.svg)!['git status'](/images/1-step-shell-11.svg)



As expected, Git noticed the change to the *working directory*, namely, that `chapter1` was deleted.

Helpfully, Git also tells us what command restores the file, `git restore`.

Let's give it a try:

<!--
```shellSession
$ git restore chapter1
```
-->

!['git restore chapter1'](/images/1-step-shell-12.svg)



Double-checking with an `ls -l` shows us that `chapter1` has been

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/images/1-step-shell-13.svg)



#### Amending commits

Something that happens all the time is making a typo in a commit message or committing too early.  Let's see how to handle these situations.

First, let's update our commit message:

<!--
```shellSession
$ git commit -m "Added Chapter 1" --amend

$ git log -n 1
```
-->

!['git commit -m "Added Chapter 1" --amend'](/images/1-step-shell-14.svg)!['git log -n 1'](/images/1-step-shell-15.svg)



Great!

Now, let's make an update to `chapter1` and add it to the commit:

<!--
```shellSession
$ echo "# Chapter 1" >> chapter1

$ cat chapter1

$ git add chapter1
$ git commit --amend --no-edit
```
-->

!['echo "# Chapter 1" >> chapter1'](/images/1-step-shell-16.svg)!['cat chapter1'](/images/1-step-shell-17.svg)!['git add chapter1'](/images/1-step-shell-18.svg)!['git commit --amend --no-edit'](/images/1-step-shell-19.svg)



And checking with `git log`, we can see the commit id has updated:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/images/1-step-shell-20.svg)



> **Note:** Here we used the `--no-edit` flag, which allows us to skip retyping the commit message.

#### Reverting a commit

Occasionally, we'll need to "undo" a commit, and one way of doing that is with `git revert`

First, let's create a commit that we can revert.

<!--
```shellSession
$ echo "Lorum ipsum" >> chapter1

$ cat chapter1
```
-->

!['echo "Lorum ipsum" >> chapter1'](/images/1-step-shell-21.svg)!['cat chapter1'](/images/1-step-shell-22.svg)



So, now `chapter1` has a new line, "Lorum ipsum" added to it.

Let's go ahead and commit that:

<!--
```shellSession
$ git commit -am "Brainstorming"
```
-->

!['git commit -am "Brainstorming"'](/images/1-step-shell-23.svg)



> **Note:** Here we used the `-a` flag which automatically `git add`s all changes found in tracked files.

Let's check with `git log` to confirm the new commit's there:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/images/1-step-shell-24.svg)



And now let's revert the commit:

<!--
```shellSession
$ git revert HEAD --no-edit
```
-->

!['git revert HEAD --no-edit'](/images/1-step-shell-25.svg)



Once again checking with `git log`:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/images/1-step-shell-26.svg)



Yup, and now let's check the contents of `chapter1`:

<!--
```shellSession
$ cat chapter1
```
-->

!['cat chapter1'](/images/1-step-shell-27.svg)



And there you go!

But what's with the `HEAD` thing?  We'll get to that soon...

## Wrapping Things Up

Now let's push today's work back to GitHub.

<!--
```shellSession
$ git push
```
-->

!['git push'](/images/1-step-shell-28.svg)



<!--
```shellSession
$ git push --set-upstream origin my-first-branch
```
-->

!['git push --set-upstream origin my-first-branch'](/images/1-step-shell-29.svg)

<!--
  <<< Author notes: Step 1 >>>
  Choose 3-5 steps for your course.
  The first step is always the hardest, so pick something easy!
  Link to docs.github.com for further explanations.
  Encourage users to open new tabs for steps!
-->

In this chapter we will be learning about:

* `git rebase`
* `git reset`
* `git merge`
* `git cherry-pick`

## Advanced Topics

### Tidying Up Your History

Where we left off last we'd just created a branch called `my-first-branch` and pushed it to GitHub.

To help speed things up, I've gone ahead and created `chapter2` for you.

Let's do a `git pull` and to grab my changes:

<!-- ```shell
$ git pull
``` -->

!['git pull'](/images/2-step-shell-0.svg)

And let's take a look at what we've got:

<!-- ```shell
$ git log -n 8
``` -->

!['git log -n 8'](/images/2-step-shell-1.svg)

*Yeesh...* admittedly not my best work... but I was in a hurry!

Luckily we can easily clean this up with a quick `git rebase --interactive`.

First, we need to tell `git rebase --interactive` how many commits we want to... uh... *rebase*.

From the `git log` output, we can rebase everything up until the commit that starts with `1d386eb` (of course, the commit id will be different in *your* repo).

```shell
$ git rebase --interactive HEAD~7
```

Which opens an editor window containing the following:

```shell
pick a445d3e Added chaptor2
pick 630daf2 FIxed tyypo
pick 8b7ca0e bugfix # empty
pick e252de9 bugfix # empty
pick 9c8c02c Added 'Section 1' to chapter2
pick 3ae5885 fix
pick f66977a fiix # empty

# Rebase 1d386eb..f66977a onto 1d386eb (7 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
#         create a merge commit using the original merge commit's
#         message (or the oneline, if no original merge commit was
#         specified); use -c <commit> to reword the commit message
# u, update-ref <ref> = track a placeholder for the <ref> to be updated
#                       to this position in the new commits. The <ref> is
#                       updated at the end of the rebase
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
```

Once again, Git helpfully tells us everything we need to know.

```shell
reword 2a48bfb Added chaptor2
squash bb1735f FIxed tyypo
squash 2b12579 bugfix # empty
squash bb7102d bugfix # empty
pick 47e5455 Added 'Section 1' to chapter2
squash ecf8347 fix
squash  2ca6445 fiix # empty
```

After we hit save, Git will walk us through the changes we asked for, allowing us to edit our commit messages along the way.

```shell
$ git rebase -i 606a5db1
[detached HEAD f0517f6] Added Chapter 2
 Date: Thu Feb 29 12:08:03 2024 +0000
 1 file changed, 1 insertion(+)
 create mode 100644 chapter2
[detached HEAD 004fb28] Added Chapter 2
 Date: Thu Feb 29 12:08:03 2024 +0000
 1 file changed, 1 insertion(+)
 create mode 100644 chapter2
[detached HEAD 9e90441] Added 'Section 1' to chapter2
 Date: Thu Feb 29 12:08:07 2024 +0000
 1 file changed, 2 insertions(+)
Successfully rebased and updated refs/heads/my-first-branch.
```

And checking with a `git log`:

<!--
```shellSession
$ git log -n 3
```
-->

!['git log -n 3'](/images/2-step-shell-2.svg)

🤌🤌🤌

Now we have to push our changes back to GitHub

<!--
```shellSession
$ git push
```
-->

!['git push'](/images/2-step-shell-3.svg)

<!--
```shellSession
$ git push --force
```
-->

!['git push --force'](/images/2-step-shell-4.svg)

### Merging Back to Main

Now we're ready to merge `chapter2` back into our `main` branch.

Let's switch over the the `main` branch:

<!--
```shellSession
$ git switch main
```
-->

!['git switch main'](/images/2-step-shell-5.svg)

Hrm... what's this?  It looks like our `local` repository somehow got out of sync with the `remote` repository...

Let's not worry about this for now, and just do what Git tells us, which is a `git pull`:

<!--
```shellSession
$ git pull
```
-->

!['git pull'](/images/2-step-shell-6.svg)

Ok, now let's merge our changes back to the `main` branch with:

<!--
```shellSession
$ git merge --no-ff -m "Merging my-first-branch" my-first-branch
```
-->

!['git merge --no-ff -m "Merging my-first-branch" my-first-branch'](/images/2-step-shell-7.svg)

And checking with `git log`:

<!--
```shellSession
$ git log -n 5
```
-->

!['git log -n 5'](/images/2-step-shell-8.svg)

Nice... but it feels a bit flat, let's try:

<!--
```shellSession
$ git log --oneline --graph --decorate -n 10
```
-->

!['git log --oneline --graph --decorate -n 10'](/images/2-step-shell-9.svg)

On second thought, we probably don't want that branch crudding up our repo until the end of time.  Let's bring in our changes using `git rebase` instead.

First, we have to undo our changes.  Sure, we could use `git revert`, but that leaves a history of the branch.

We'll have to use `git reset` to reset main back to before the merge, which, from the `git log` output above, is commit `606a5db`:

<!--
```shellSession
$ git reset HEAD~ --hard
```
-->

!['git reset HEAD~ --hard'](/images/2-step-shell-10.svg)

Now, let's bring in the changes from `my-first-branch` using the following:

<!--
```shellSession
$ git rebase my-first-branch
```
-->

!['git rebase my-first-branch'](/images/2-step-shell-11.svg)

And another `git log`:

<!--
```shellSession
$ git log --oneline --graph --decorate -n 10
```
-->

!['git log --oneline --graph --decorate -n 10'](/images/2-step-shell-12.svg)

Nice!

Now we can get rid of the `my-first-branch` branch with a `git branch -d my-first-branch`:

<!--
```shellSession
$ git branch -d my-first-branch
```

Er... I meant a `git branch -D my-first-branch`!


<!--
```shellSession
$ git branch -D my-first-branch
```


<!--
```shellSession
$ git push
```


<!--
```shellSession
$ git pull
```


<!--
```shellSession
$ git push
```
