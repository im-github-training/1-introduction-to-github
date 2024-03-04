# Lesson 2

## Welcome Back

If you're seeing this, it means you passed Lesson 1, great job!

Let's start by creating a branch for today's work!

<!--
```shellSession
$ git switch -c lesson/2
```
-->

!['git switch -c lesson/2'](/.images/shell/2-step-shell-0.svg)

## Fixing common mistakes

### Restoring files

As we demostrated in Lesson 1, once a file has been added to a repository, it's *almost* **impossible** to lose.  Luckily, most scenarios won't have us pulling up `git reflog`.

One common scenario is accidentally deleting a file, here's what to do if that happens to you.

Let's start by creating some files to accidentally delete:

<!--
```shellSession
$ touch file1 file2 file3
```
-->

!['touch file1 file2 file3'](/.images/shell/2-step-shell-1.svg)

<!--
```shellSession
$ git add file*
```
-->

!['git add file\*'](/.images/shell/2-step-shell-2.svg)

<!--
```shellSession
$ git commit -m "Added some files"
```
-->

!['git commit -m "Added some files"'](/.images/shell/2-step-shell-3.svg)

Now let's delete them:

<!--
```shellSession
$ rm file*
```
-->

!['rm file\*'](/.images/shell/2-step-shell-4.svg)

And making sure the files are deleted:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-5.svg)

Let's see what Git has to say:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-6.svg)

As expected, Git noticed the change to the *working directory*, namely, that we deleted our files.

Helpfully, Git also tells us what command restores the file, `git restore`.

Let's give it a try:

<!--
```shellSession
$ git restore file1 file2 file3
```
-->

!['git restore file1 file2 file3'](/.images/shell/2-step-shell-7.svg)

Double-checking with an `ls -l`:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-8.svg)

Great!  But that was a lot of typing, let's try something...

`git add` let's us do `git add .`, let's see if `git restore` lets us do the same:

<!--
```shellSession
$ rm file1 file2 file3
```
-->

!['rm file1 file2 file3'](/.images/shell/2-step-shell-9.svg)

Checking...

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-10.svg)

And...

<!--
```shellSession
$ git restore .
```
-->

!['git restore .'](/.images/shell/2-step-shell-11.svg)

Yup...

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-12.svg)

Cool!

> While you're learning Git it's important to experiment.  You'll probably be using Git a lot, so it makes sense to get familiar as quickly as possible.

### Resetting your working directory

The `git reset` command is a powerful tool that allows you to undo changes in your Git repository. It moves the `HEAD` pointer to a specific commit and can optionally change the staging area or the working directory to match that commit. There are three modes: `--soft`, `--mixed`, and `--hard`.

**1. Soft Reset**

A soft reset moves the `HEAD` pointer to a specific commit, but leaves the staging area and the working directory unchanged. This means that your changes are preserved and remain staged.

Example:

```bash
git reset --soft HEAD~1
```

This command moves `HEAD` back one commit (i.e., the last commit is "undone"), but the changes from that commit are left in the staging area.

First, let's clean up the directory:

**Exercise 1:**

<!--
```shellSession
$ rm file* && git commit -am "Cleanup"
```
-->

!['rm file\* && git commit -am "Cleanup"'](/.images/shell/2-step-shell-13.svg)

<!--
```shellSession
$ touch file1 && git add file1 && git commit -m "Added file1"
```
-->

!['touch file1 && git add file1 && git commit -m "Added file1"'](/.images/shell/2-step-shell-14.svg)

Let's check `git log` and `git status` before we execute `git reset`:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/2-step-shell-15.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-16.svg)

Now let's run `git reset --soft HEAD~1`:

<!--
```shellSession
$ git reset --soft HEAD~1
```
-->

!['git reset --soft HEAD~1'](/.images/shell/2-step-shell-17.svg)

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/2-step-shell-18.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-19.svg)

We can see that `file1` is still staged.

**2. Mixed Reset**

A mixed reset, which is the default mode of `git reset`, moves the `HEAD` pointer and also updates the staging area to match the specified commit, but leaves the working directory alone. This means that your changes are preserved but become unstaged.

Since `file1` is still staged from the previous example, all we have to do is commit it:

<!--
```shellSession
$ git commit -m "Added file1"
```
-->

!['git commit -m "Added file1"'](/.images/shell/2-step-shell-20.svg)

We know what `git log` and `git status` look like from the previous example, so let's go ahead and run `git reset --mixed HEAD~1`:

<!--
```shellSession
$ git reset --mixed HEAD~1
```
-->

!['git reset --mixed HEAD~1'](/.images/shell/2-step-shell-21.svg)

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/2-step-shell-22.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-23.svg)

Both commands move `HEAD` back one commit and also unstage the changes from that commit.

You should see that `file1` is unstaged but the changes are still there.

**3. Hard Reset**

A hard reset moves the `HEAD` pointer and also updates both the staging area and the working directory to match the specified commit. This means that your changes are permanently discarded.

Since the previous example unstaged `file1`, let's go ahead and get it staged and committed:

<!--
```shellSession
$ git add file1 && git commit -m "Added file1"
```
-->

!['git add file1 && git commit -m "Added file1"'](/.images/shell/2-step-shell-24.svg)

We know what to expect with `git log` and `git status`, so let's execute `git reset --hard HEAD~1`:

<!--
```shellSession
$ git reset --hard HEAD~1
```
-->

!['git reset --hard HEAD~1'](/.images/shell/2-step-shell-25.svg)

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/2-step-shell-26.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-27.svg)

This command moves `HEAD` back one commit and discards the changes from that commit.

You should see that `file3.txt` is gone.

> Remember, `git reset` can permanently discard your changes if used improperly. Always make sure you have a backup of your changes or have pushed your changes to a remote repository before using `git reset --hard`.

### Reverting a commit

Occasionally, we'll need to "undo" a commit, and one way of doing that is with `git revert`

First, let's clean up the directory:

<!--
```shellSession
$ rm file*
```
-->

!['rm file\*'](/.images/shell/2-step-shell-28.svg)

<!--
```shellSession
$ git commit -am "Cleanup"
```
-->

!['git commit -am "Cleanup"'](/.images/shell/2-step-shell-29.svg)

Next, let's create three commits, two good and one "bad":

<!--
```shellSession
$ echo "good" > file1
$ git add file1
$ git commit -m "Added feature 1"
```
-->

!['echo "good" > file1'](/.images/shell/2-step-shell-30.svg)!['git add file1'](/.images/shell/2-step-shell-31.svg)!['git commit -m "Added feature 1"'](/.images/shell/2-step-shell-32.svg)

The "bad" file:

<!--
```shellSession
$ echo "bad" > file2
$ git add file2
$ git commit -m "Added feature 2"
```
-->

!['echo "bad" > file2'](/.images/shell/2-step-shell-33.svg)!['git add file2'](/.images/shell/2-step-shell-34.svg)!['git commit -m "Added feature 2"'](/.images/shell/2-step-shell-35.svg)

A "good" file:

<!--
```shellSession
$ echo "good" > file3
$ git add file3
$ git commit -m "Added feature 3"
```
-->

!['echo "good" > file3'](/.images/shell/2-step-shell-36.svg)!['git add file3'](/.images/shell/2-step-shell-37.svg)!['git commit -m "Added feature 3"'](/.images/shell/2-step-shell-38.svg)

Now let's get rid of the "bad" commit, the one that was *one* commit ago:

<!--
```shellSession
$ git revert HEAD~1 --no-edit
```
-->

!['git revert HEAD~1 --no-edit'](/.images/shell/2-step-shell-39.svg)

Let's see what that did:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-40.svg)

Cool, `file2` is missing, as we'd expect.  Let's check the log:

<!--
```shellSession
$ git log -n 5
```
-->

!['git log -n 5'](/.images/shell/2-step-shell-41.svg)

Interesting, so the old commit is still in the history, but we have a new "revert" commit...

To *really* get rid of a commit, we'll need to use `git rebase -i`, which we'll get to later.

The benefit of `git revert` over `git rebase` is that it is a non-destructive change.  This is especially useful when working on a shared codebase.  More on this soon.t

### Amending a commit

Another common scenario is making a typo in a commit message or committing too early.  Let's see how to handle both of these situations.

First, let's create a commit message with a typo:

<!--
```shellSession
$ git commit -m "Bug fiix" --allow-empty
```
-->

!['git commit -m "Bug fiix" --allow-empty'](/.images/shell/2-step-shell-42.svg)

> Git normally doesn't allow empty commits, unless you use the `--allow-empty` flag.

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/.images/shell/2-step-shell-43.svg)

Now that's a beaut.  Let's fix it with a `git commit --amend`:

<!--
```shellSession
$ git commit -m "Fixed scrollbar bug" --amend
```
-->

!['git commit -m "Fixed scrollbar bug" --amend'](/.images/shell/2-step-shell-44.svg)

And checking `git log`:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/.images/shell/2-step-shell-45.svg)

That was easy enough!

## Understanding rebase

### Insert rebase tutorial

Here is a step-by-step guide on how to use `git rebase`:

1. Start by checking out the branch you want to rebase onto.
2. Run the command `git rebase <branch>` to start the rebase process.
3. Resolve any conflicts that may arise during the rebase.
4. Once the rebase is complete, push the changes to the remote repository using `git push`.

That's it! You have successfully performed a rebase.

### Example 2

## Wrapping Things Up

Now let's push today's work back to GitHub.

<!--
```shellSession
$ git push
```
-->

!['git push'](/.images/shell/2-step-shell-46.svg)

<!--
```shellSession
$ git push --set-upstream origin my-first-branch
```
-->

!['git push --set-upstream origin my-first-branch'](/.images/shell/2-step-shell-47.svg)

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
