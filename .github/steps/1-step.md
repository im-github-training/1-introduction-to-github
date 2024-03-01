## Introduction

### Getting Started

To get started, we'll need a local copy of this repository.  To do that:

1. **Click the "Code" button, and then click the "Copy url to clipboard" icon:**
   ![Copy Repo URL](/images/image-9.png)

2. **Open a terminal window and do a `git clone`:**
   ![Clone Repo](/images/image-10.png)

In the next series of exercises, we will be using this repository to work on a New York Times bestseller.

## Understanding the Basics

To begin, let's make sure everything is in order with our repository.

To do this, we use the `git status` command which (unsurprisingly) prints out the current status of your repository.

<!--
```shellSession
$ git status
```
 -->

!['git status'](/images/shell/1-step-shell-0.svg)

Looks good!

Git is telling us the following things:

* we are on the `main` branch
* that our ***staging area*** is empty
* and no changes have been detected in our ***working tree*** (aka "working directory")

> If any of these terms are unfamiliar to you, please check out [What is a Repository?](https://im-github-training.github.io/#/./docs/basic/git/repositories)

### Our First Branch

Let's set things up by creating something called a `branch`.

A branch is basically a pointer to a specific commit.  Allow me to elaborate:

* When you create a branch, Git creates a *pointer* and points it at your current commit
* As you make new commits, Git automatically moves this *branch* pointer to the latest commit
* In this way, a *branch pointer* always represents the latest line of development in a *branch*

Branches are useful because they give you a place to experiment and try things out before you make changes to your `main` branch.

#### Listing all branches

First, let's see what branches already exist, so we can pick a unique name:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/images/shell/1-step-shell-1.svg)

Ok, it looks like there's only one branch, `main`, and the `*` in front of it means that we're currently working in the `main` branch.

#### Creating a branch

Now let's actually create a branch, with `git branch <branchname>`:

<!--
```shellSession
$ git branch my-book
```
-->

!['git branch my-book'](/images/shell/1-step-shell-2.svg)

Checking our `git branch`...

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/images/shell/1-step-shell-3.svg)

Interesting, so we can see that `my-book` was created, but the `*` is still in front of `main`.

This means that we're still in the `main` branch.

To switch over to the `my-book` branch we need to do a `git switch`:

<!--
```shellSession
$ git switch my-book
```
-->

!['git switch my-book'](/images/shell/1-step-shell-4.svg)

And just to double-check `git branch`:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/images/shell/1-step-shell-5.svg)

That feels like a lot of work just to start working on a new branch, luckily, `git switch` provides the `--create` or `-c` flag, which lets you create and switch all in one go.

Let's give it a shot and create a throwaway branch:

<!--
```shellSession
$ git switch -c throwaway
```
-->

!['git switch -c throwaway'](/images/shell/1-step-shell-6.svg)

And...

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/images/shell/1-step-shell-7.svg)

Perfect!

#### Deleting a branch

Now let's get rid of the throwaway branch using `git branch`'s `--delete` or `-d` flag.

<!--
```shellSession
$ git branch -d throwaway
```
-->

!['git branch -d throwaway'](/images/shell/1-step-shell-8.svg)

Ah, so we cannot delete a branch that is currently in use or "checked out".

So let's switch back to `my-book`...

<!--
```shellSession
$ git switch my-book
```
-->

!['git switch my-book'](/images/shell/1-step-shell-9.svg)

... and try again...

<!--
```shellSession
$ git branch -d throwaway
```
-->

!['git branch -d throwaway'](/images/shell/1-step-shell-10.svg)

... and...

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/images/shell/1-step-shell-11.svg)

and let's do a `git status` for good measure:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/shell/1-step-shell-12.svg)

*Magnifique.*

### Our First Commit

Now that we've got a branch to work in, let's create some structure by adding the following:

<!--
```shellSession
$ touch table-of-contents about-the-author index
```
-->

!['touch table-of-contents about-the-author index'](/images/shell/1-step-shell-13.svg)

Let's see if Git noticed a change to our `working tree`:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/shell/1-step-shell-14.svg)

Interesting, Git noticed that we added the files, but is saying that they're *untracked*.

> The way Git works is that you have to *explicitly* tell it to start tracking files by using the `git add` command.  Until you do that, Git considers the file *untracked*.
>
> Once a file has been added via `git add`, it becomes a "tracked" file and Git will start monitoring it for changes. If you modify a tracked file, Git will recognize that it has been modified and will mark it as "modified" but not yet "staged" for the next commit.

Let's go ahead and start tracking the files with a `git add`:

<!--
```shellSession
$ git add .
```
-->

!['git add .'](/images/shell/1-step-shell-15.svg)

> We could have individually added the files by typing `git add table-of-contents about-the-author index`, but `git add` provides the convenient `git add .`, which stages any and all changes present in the working directory.

Let's see how things look now:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/shell/1-step-shell-16.svg)

Alright, it looks like our files are staged and ready to be committed!

Let's go ahead and do that with `git commit -m "Added ToC, About Author, and Index"`:

<!--
```shellSession
$ git commit -m "Added stuff"
```
-->

!['git commit -m "Added stuff"'](/images/shell/1-step-shell-17.svg)

> `-m` is the short form of `--message`, which allows us to specify short commit messages via the command-line.
> Typing `git commit` brings up a text editor, which is useful for longform commit messages.

Let's see what `git status` says now that the files have been committed:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/shell/1-step-shell-18.svg)

Nice, looks like the files were moved from the staging area to the repository!

We can confirm that the commit is part of our repository history by doing a `git log`:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/images/shell/1-step-shell-19.svg)

Perfect!

But now that we're staring at it, what is that long, complicated number in the `git log` output above?

A **commit ID**.

## Beyond the Basics

### What Are Commit IDs?

In Git, a **commit ID**, also known as a **commit hash**, is a unique identifier for each commit. It is a 40-character string calculated based on the contents of a commit.

> In practice, you often don't need to use the full 40 characters. Git is usually able to identify a commit using just the first few characters, as long as it's unique within your repository.  For example, you might see short versions of commit hashes in `git log` output, like `e83c516`.

### What is HEAD?

Something else you may have noticed in the `git log` output is the `(HEAD -> my-book)` bit over to the top-right.  It seems to indicate that something called `HEAD` is pointing to `my-book`.

Let's dig in.

In Git, `HEAD` can be thought of as the "you are here" marker in your project. It's a pointer that indicates what the currently checked-out commit is in your repository.

> Remember, the checked-out commit dictates what set of files is present in your working directory

<!-- If you think of your project as a timeline of commits, `HEAD` points to the place on the timeline where you are currently standing. When you make a new commit, `HEAD` moves forward along the timeline.

When you checkout a branch, `HEAD` moves to the tip of that branch, the most recent commit on that branch. If you checkout a specific commit, `HEAD` detaches from the branch and points directly to that commit, and you're in what's called a "detached HEAD" state.

So, in simple terms, `HEAD` is like a bookmark that tells Git what commit you're currently working with. -->

#### Understanding HEAD

To get an intuitive understanding of `HEAD`, let's take a look at our `git log`, except let's use some flags that'll make things easier to see:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/images/shell/1-step-shell-20.svg)

This command shows a text-based graph of your commits. The commit that `HEAD` is pointing to is marked with `(HEAD)`.

> Note that `HEAD` is pointing to the latest commit on the `my-book` branch.

#### Moving HEAD

Now let's switch over to `main`:

<!--
```shellSession
$ git switch main
```
-->

!['git switch main'](/images/shell/1-step-shell-21.svg)

And see what `HEAD` is pointing to:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/images/shell/1-step-shell-22.svg)

> Notice how `HEAD` has moved to the latest commit on `main`?

Now let's switch back to `my-book`:

<!--
```shellSession
$ git switch my-book
```
-->

!['git switch my-book'](/images/shell/1-step-shell-23.svg)

And make a commit:

<!--
```shellSession
$ touch head-test && git add head-test && git commit -m "Learning about HEAD"
```
-->

!['touch head-test && git add head-test && git commit -m "Learning about HEAD"'](/images/shell/1-step-shell-24.svg)

And see what happens to `HEAD`:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/images/shell/1-step-shell-25.svg)

> Interesting... `HEAD` has moved to the new commit.

#### Detached HEAD

Now let's see what happens when we checkout a specific commit:

<!--
```shellSession
$ git checkout HEAD~3
```
-->

!['git checkout HEAD~3'](/images/shell/1-step-shell-26.svg)

This warning seems quite scary, `detached HEAD` and all...

> `detached HEAD` happens so often that it's a perennial right of passage for Git users.  Having an intuitive understanding on what it means is key to Git success

### Understanding Detached HEAD

First, let's take a look at `git log`:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/images/shell/1-step-shell-27.svg)

Seems pretty normal.

In fact, the only thing remotely "strange" is that `HEAD` isn't `->` to anything, namely, a branch like `main` or `my-book`.

We are in a sort of Norman's land.

Let's push ahead and actually ***commit*** something!

<!--
```shellSession
$ touch detached-test && git add detached-test && git commit -m "Testing detached HEAD"
```
-->

!['touch detached-test && git add detached-test && git commit -m "Testing detached HEAD"'](/images/shell/1-step-shell-28.svg)

And seeing what we have wrought:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/images/shell/1-step-shell-29.svg)

Interesting, we've created a `branch`! Or, something that looks like a `branch`...  except without a name...  An *unnamed* branch...

Let's think about that `detached HEAD` warning:

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

So `git checkout` is advising us to **create a *branch***.

For the sake of adventure, let's try the second option `git switch -`:

<!--
```shellSession
$ git switch -
```
-->

!['git switch -'](/images/shell/1-step-shell-30.svg)

Now Git is literally *begging* us to create a *branch* at that commit, even giving us a whole ***new*** command for doing so...

Let's check `git log`:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/images/shell/1-step-shell-31.svg)

And the commit is gone.

But is it *really*?  I mean, we have the commit ID right there on our screen... and *two* different suggestions for saving things...

So here's the important thing you need to learn about Git:

> It is *nearly* **impossible** to lose anything that you've committed to a Git repository... as long as you have a ***reference*** to it.

### What are references

In Git, a reference (or "ref") is a **file** that contains the commit ID of a commit - it's a way to save a pointer to a specific commit.

#### Types of references

There are three main types of references in Git:

1. **Branches**: branch references are pointers to the latest commit in a branch.
   * They are stored in the `.git/refs/heads/` directory

2. **Tags**: are references to specific points in history, often used to capture a point where a particular version of a project was released.
   * They are stored in the `.git/refs/tags/` directory

3. **Remotes**: are references to commits in other repositories.
   * They are stored in the `.git/refs/remotes/` directory

#### They're ***files***?

The next few minutes will be the deepest we are going to go in this tutorial, but muscling through will be well worth it.

So, yes, references are *files*:

<!--
```shellSession
$ tree -n -I objects ../.git
```
-->

!['tree -n -I objects ../.git'](/images/shell/1-step-shell-32.svg)

> The `-I objects` flag excludes the .git/objects folder, which contains compressed versions of all of your commits, because it contains a lot of files

Let's examine `.git/HEAD` and the contents of `.git/refs/heads/*`:

<!--
```shellSession
$ cat ../.git/HEAD
```
-->

!['cat ../.git/HEAD'](/images/shell/1-step-shell-33.svg)

So `.git/HEAD` points to `refs/heads/my-book`, which makes sense, since we currently have `my-book` checked out.

<!--
```shellSession
$ cat ../.git/refs/heads/my-book
```
-->

!['cat ../.git/refs/heads/my-book'](/images/shell/1-step-shell-34.svg)

This commit ID seems familiar, in fact, it looks like the commit ID that `HEAD` and `my-book` are pointing to from the `git log` above.

<!--
```shellSession
$ cat ../.git/refs/heads/main
```
-->

!['cat ../.git/refs/heads/main'](/images/shell/1-step-shell-35.svg)

No surprise here, so references ***are*** files!

#### Introducing the reference log

Let's try something crazy, let's see if we can recover that 'lost' commit from the `detached HEAD` episode.  From what we've just discovered, it feels like all we have to do is create a file in `.git/refs/heads` containing the commit ID of the commit.

But it's been like an hour and we've totally forgotten the commit ID of that commit.

Introducing `git reflog`;

<!--
```shellSession
$ git reflog
```
-->

!['git reflog'](/images/shell/1-step-shell-36.svg)

There it is, near the top.  So let's take that commit ID and put it in a file called `.git/refs/heads/tada`:

<!--
```shellSession
$ git rev-parse HEAD@{1} > ../.git/refs/heads/tada
```
-->

!['git rev-parse HEAD@{1} > ../.git/refs/heads/tada'](/images/shell/1-step-shell-37.svg)

And checking `git log`:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 10
```
-->

!['git log --oneline --graph --decorate --all -n 10'](/images/shell/1-step-shell-38.svg)

***TADA!***

### Fixing Things

#### Restoring files

One of the great things about Git is that once a file has been added to a repository, it's *almost* **impossible** to lose it.  We'll prove this out in later exercises, but let's start simple and `rm` some files:

<!--
```shellSession
$ rm table-of-contents about-the-author index
```
-->

!['rm table-of-contents about-the-author index'](/images/shell/1-step-shell-39.svg)

Making sure the files are deleted:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/images/shell/1-step-shell-40.svg)

Seeing what Git has to say:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/shell/1-step-shell-41.svg)

As expected, Git noticed the change to the *working directory*, namely, that we deleted our files.

Helpfully, Git also tells us what command restores the file, `git restore`.

Let's give it a try:

<!--
```shellSession
$ git restore table-of-contents about-the-author index
```
-->

!['git restore table-of-contents about-the-author index'](/images/shell/1-step-shell-42.svg)

Double-checking with an `ls -l`:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/images/shell/1-step-shell-43.svg)

Great!  But that was a lot of typing, let's try something...

`git add` let's us do `git add .`, let's see if `git restore` lets us do the same:

<!--
```shellSession
$ rm table-of-contents about-the-author index
```
-->

!['rm table-of-contents about-the-author index'](/images/shell/1-step-shell-44.svg)

Checking...

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/images/shell/1-step-shell-45.svg)

And...

<!--
```shellSession
$ git restore .
```
-->

!['git restore .'](/images/shell/1-step-shell-46.svg)

Yup...

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/images/shell/1-step-shell-47.svg)

Cool!

> While you're learning Git it's important to experiment.  You'll probably be using Git a lot, so it makes sense to get familiar as quickly as possible.

#### Amending a commit message

Something that happens all the time is making a typo in a commit message or committing too early.  Let's see how to handle these situations.

First, let's update our commit message:

<!--
```shellSession
$ git commit -m "ToC, About Author, and Index" --amend

$ git log -n 1
```
-->

!['git commit -m "ToC, About Author, and Index" --amend'](/images/shell/1-step-shell-48.svg)!['git log -n 1'](/images/shell/1-step-shell-49.svg)

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

!['echo "# Chapter 1" >> chapter1'](/images/shell/1-step-shell-50.svg)!['cat chapter1'](/images/shell/1-step-shell-51.svg)!['git add chapter1'](/images/shell/1-step-shell-52.svg)!['git commit --amend --no-edit'](/images/shell/1-step-shell-53.svg)

And checking with `git log`, we can see the commit id has updated:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/images/shell/1-step-shell-54.svg)

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

!['echo "Lorum ipsum" >> chapter1'](/images/shell/1-step-shell-55.svg)!['cat chapter1'](/images/shell/1-step-shell-56.svg)

So, now `chapter1` has a new line, "Lorum ipsum" added to it.

Let's go ahead and commit that:

<!--
```shellSession
$ git commit -am "Brainstorming"
```
-->

!['git commit -am "Brainstorming"'](/images/shell/1-step-shell-57.svg)

> **Note:** Here we used the `-a` flag which automatically `git add`s all changes found in tracked files.

Let's check with `git log` to confirm the new commit's there:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/images/shell/1-step-shell-58.svg)

And now let's revert the commit:

<!--
```shellSession
$ git revert HEAD --no-edit
```
-->

!['git revert HEAD --no-edit'](/images/shell/1-step-shell-59.svg)

Once again checking with `git log`:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/images/shell/1-step-shell-60.svg)

Yup, and now let's check the contents of `chapter1`:

<!--
```shellSession
$ cat chapter1
```
-->

!['cat chapter1'](/images/shell/1-step-shell-61.svg)

And there you go!

But what's with the `HEAD` thing?  We'll get to that soon...

## Wrapping Things Up

Now let's push today's work back to GitHub.

<!--
```shellSession
$ git push
```
-->

!['git push'](/images/shell/1-step-shell-62.svg)

<!--
```shellSession
$ git push --set-upstream origin my-first-branch
```
-->

!['git push --set-upstream origin my-first-branch'](/images/shell/1-step-shell-63.svg)

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
