# Lesson 2

## Welcome Back

If you're seeing this, it means you passed Lesson 1, great job!

In today's lesson, we'll learn about how to handle a few common scenarios.

Let's start by creating a branch for today's work!

<!--
```shellSession
$ git switch -c lesson/2
```
-->

!['git switch -c lesson/2'](/.images/shell/2-step-shell-0.svg)

## Exercise 1: Restoring files

A common Git scenario is accidentally deleting a file - let's learn how to get out of this pickle.

Let's start by committing a few files that we can *accidentally* delete:

<!--
```shellSession
$ touch file1 file2 file3
$ git add file*
$ git commit -m "Added some files"
```
-->

![''touch file1 file2 file3' 'git add file\*' 'git commit -m "Added some files"''](/.images/shell/2-step-shell-1.svg)

Now, let's delete them:

<!--
```shellSession
$ rm file*
```
-->

!['rm file\*'](/.images/shell/2-step-shell-2.svg)

And make sure the files are actually deleted:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-3.svg)

Let's see what Git has to say:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-4.svg)

As expected, Git noticed a change to the *working directory*, namely, that we deleted our files.

Helpfully, Git also tells us what to do to restore the files, use `git restore`.

Let's give it a try:

<!--
```shellSession
$ git restore file1 file2 file3
```
-->

!['git restore file1 file2 file3'](/.images/shell/2-step-shell-5.svg)

Double-checking with an `ls -l`:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-6.svg)

Great!  But that was a lot of typing, let's try something...

`git add` let's us do `git add .`, let's see if `git restore` lets us do the same:

<!--
```shellSession
$ rm file1 file2 file3
```
-->

!['rm file1 file2 file3'](/.images/shell/2-step-shell-7.svg)

Checking...

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-8.svg)

And...

<!--
```shellSession
$ git restore .
```
-->

!['git restore .'](/.images/shell/2-step-shell-9.svg)

Yup...

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-10.svg)

Cool!

> While you're learning Git take the opportunity to experiment!  There's often an easier way to do almost everything in Git.

## Exercise 2: Reverting commits

Occasionally, we'll need to "undo" a commit, and one way of doing that is with `git revert`

To test things out, let's create three commits, two "good" commits and one "bad"commit.

Let's start by cleaning up the current directory:

<!--
```shellSession
$ rm file*
```
-->

!['rm file\*'](/.images/shell/2-step-shell-11.svg)

<!--
```shellSession
$ git commit -am "Cleanup"
```
-->

!['git commit -am "Cleanup"'](/.images/shell/2-step-shell-12.svg)

Next, let's a "good" commit:

<!--
```shellSession
$ echo "good" > file1
$ git add file1
$ git commit -m "Added feature 1"
```
-->

![''echo "good" > file1' 'git add file1' 'git commit -m "Added feature 1"''](/.images/shell/2-step-shell-13.svg)

A "bad" commit:

<!--
```shellSession
$ echo "bad" > file2
$ git add file2
$ git commit -m "Added feature 2"
```
-->

![''echo "bad" > file2' 'git add file2' 'git commit -m "Added feature 2"''](/.images/shell/2-step-shell-14.svg)

And a "good" commit:

<!--
```shellSession
$ echo "good" > file3
$ git add file3
$ git commit -m "Added feature 3"
```
-->

![''echo "good" > file3' 'git add file3' 'git commit -m "Added feature 3"''](/.images/shell/2-step-shell-15.svg)

Now let's get rid of the "bad" commit, the one that was *one* commit ago:

<!--
```shellSession
$ git revert HEAD~1 --no-edit
```
-->

!['git revert HEAD~1 --no-edit'](/.images/shell/2-step-shell-16.svg)

Let's see what that did:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-17.svg)

Cool, `file2` is missing, as we'd expect.  Let's check the log:

<!--
```shellSession
$ git log -n 5
```
-->

!['git log -n 5'](/.images/shell/2-step-shell-18.svg)

Interesting, so the old commit is still in the history, but we have a new "revert" commit...

To *really* get rid of a commit, we'll need to use `git rebase -i`, which we'll get to later.

The benefit of `git revert` over `git rebase` is that it is a non-destructive change.  This is especially useful when working on a shared codebase.  More on this soon.t

## Exercise 3: Amending commits

Another common scenario is making a typo in a commit message or committing too early.  Let's see how to handle both of these situations.

First, let's create a commit message with a typo:

<!--
```shellSession
$ git commit -m "Bug fiix" --allow-empty
```
-->

!['git commit -m "Bug fiix" --allow-empty'](/.images/shell/2-step-shell-19.svg)

> Git normally doesn't allow empty commits unless you use the `--allow-empty` flag.

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/.images/shell/2-step-shell-20.svg)

Now that's a beaut.  Let's fix it with a `git commit --amend`:

<!--
```shellSession
$ git commit -m "Fixed scrollbar bug" --amend
```
-->

!['git commit -m "Fixed scrollbar bug" --amend'](/.images/shell/2-step-shell-21.svg)

And checking `git log`:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/.images/shell/2-step-shell-22.svg)

That was easy enough!

## Exercise 4: Resetting your tree

Sometimes you just want to reset the changes to your repository to a specified branch or commit.  The `git reset` command is allows you to do this by moving the `HEAD` pointer to a specific commit and can optionally change the staging area or the working directory to match that commit.

There are three modes: `--soft`, `--mixed`, and `--hard`.

### Soft reset

A soft reset moves the `HEAD` pointer to a specific commit, but leaves the staging area and the working directory unchanged. This means that your changes are preserved and remain staged.

Example:

```bash
git reset --soft HEAD~1
```

This command moves `HEAD` back one commit (i.e., the last commit is "undone"), but the changes from that commit are left in the staging area.

First, let's clean up the directory:

<!--
```shellSession
$ rm file* && git commit -am "Cleanup"
```
-->

!['rm file\* && git commit -am "Cleanup"'](/.images/shell/2-step-shell-23.svg)

<!--
```shellSession
$ touch file1 && git add file1 && git commit -m "Added file1"
```
-->

!['touch file1 && git add file1 && git commit -m "Added file1"'](/.images/shell/2-step-shell-24.svg)

Let's check `git log` and `git status` before we execute `git reset`:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/2-step-shell-25.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-26.svg)

Now let's run `git reset --soft HEAD~1`:

<!--
```shellSession
$ git reset --soft HEAD~1
```
-->

!['git reset --soft HEAD~1'](/.images/shell/2-step-shell-27.svg)

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/2-step-shell-28.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-29.svg)

We can see that `file1` is still staged.

### Mixed reset

A mixed reset, which is the default mode of `git reset`, moves the `HEAD` pointer and also updates the staging area to match the specified commit, but leaves the working directory alone. This means that your changes are preserved but become unstaged.

Since `file1` is still staged from the previous example, all we have to do is commit it:

<!--
```shellSession
$ git commit -m "Added file1"
```
-->

!['git commit -m "Added file1"'](/.images/shell/2-step-shell-30.svg)

We know what `git log` and `git status` look like from the previous example, so let's go ahead and run `git reset --mixed HEAD~1`:

<!--
```shellSession
$ git reset --mixed HEAD~1
```
-->

!['git reset --mixed HEAD~1'](/.images/shell/2-step-shell-31.svg)

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/2-step-shell-32.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-33.svg)

Both commands move `HEAD` back one commit and also unstage the changes from that commit.

You should see that `file1` is unstaged but the changes are still there.

### Hard reset

A hard reset moves the `HEAD` pointer and also updates both the staging area and the working directory to match the specified commit. This means that your changes are permanently discarded.

Since the previous example unstaged `file1`, let's go ahead and get it staged and committed:

<!--
```shellSession
$ git add file1 && git commit -m "Added file1"
```
-->

!['git add file1 && git commit -m "Added file1"'](/.images/shell/2-step-shell-34.svg)

We know what to expect with `git log` and `git status`, so let's execute `git reset --hard HEAD~1`:

<!--
```shellSession
$ git reset --hard HEAD~1
```
-->

!['git reset --hard HEAD~1'](/.images/shell/2-step-shell-35.svg)

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/2-step-shell-36.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-37.svg)

This command moves `HEAD` back one commit and discards the changes from that commit.

You should see that `file3.txt` is gone.

> Remember, `git reset` can permanently discard your changes if used improperly. Always make sure you have a backup of your changes or have pushed your changes to a remote repository before using `git reset --hard`.

## Wrapping Things Up

Now let's push today's work back to GitHub.

<!--
```shellSession
$ git push
```
-->

!['git push'](/.images/shell/2-step-shell-38.svg)

<!--
```shellSession
$ git push --set-upstream origin lesson/2
```
-->

!['git push --set-upstream origin lesson/2'](/.images/shell/2-step-shell-39.svg)
