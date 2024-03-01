## Introduction

Welcome to the InfoMagnus GitHub Training Exercises.

This repository is part of the [InfoMagnus GitHub Training Guide](https://im-github-training.github.io/).

<!-- Write an introductory paragraph for this turtorial -->

In this tutorial, we'll cover the basics of Git and GitHub by working through a series of exercises.  We'll start with the basics of creating a repository, working with branches, and making commits.  From there, we'll cover more advanced topics such as merging, rebasing, and pull requests.

### Prerequisites

To complete this tutorial, you will need a basic understanding of the terminal (or command line).  If you're new to the terminal, we recommend checking out [Codecademy's Command Line Course](https://www.codecademy.com/learn/learn-the-command-line).

You'll also need to have Git installed on your machine and a GitHub account.  If you need help with this, please see:

* [Setting up Git]()
* [Setting up GitHub]()

### Recommended Reading

We recommend reading the following sections of the [InfoMagnus GitHub Training Guide](https://im-github-training.github.io/):

* [What is Git?](https://im-github-training.github.io/#/./docs/basic/git/what-is-git)
* [What is GitHub?](https://im-github-training.github.io/#/./docs/basic/github/what-is-github)
* [What is a Repository?](https://im-github-training.github.io/#/./docs/basic/git/repositories)
* [What is a Branch?](https://im-github-training.github.io/#/./docs/basic/git/branches)
* [What is a Commit?](https://im-github-training.github.io/#/./docs/basic/git/commits)

### Goals

By the end of this tutorial, you will have:

* Created a new branch
* Committed changes to a repository
* Restored files
* Amended commits

* [Understand the basics of Git](#understanding-the-basics)
* [Create a branch](#our-first-branch)
* [Create a commit](#our-first-commit)
* [Restore files](#fixing-things-part-1)
* [Amend commits](#fixing-things-part-1)

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

!['git status'](/images/combined-shell-0.svg)

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
* As you make new commits, Git automatically moves this *branch pointer* to the latest commit
* In this way, a *branch pointer* always represents the latest line of development in a *branch*

Branches are useful because they give you a place to experiment and try things out before you make changes to your `main` branch.

#### Listing all branches

First, let's see what branches already exist, so we can pick a unique name:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/images/combined-shell-1.svg)

Ok, it looks like there's only one branch, `main`, and the `*` in front of it means that we're currently working in the `main` branch.

#### Creating a branch

Now let's actually create a branch, with `git branch <branchname>`:

<!--
```shellSession
$ git branch my-book
```
-->

!['git branch my-book'](/images/combined-shell-2.svg)

Checking our `git branch`...

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/images/combined-shell-3.svg)

Interesting, so we can see that `my-book` was created, but the `*` is still in front of `main`.

This means that we're still in the `main` branch.

To switch over to the `my-book` branch we need to do a `git switch`:

<!--
```shellSession
$ git switch my-book
```
-->

!['git switch my-book'](/images/combined-shell-4.svg)

And just to double-check `git branch`:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/images/combined-shell-5.svg)

That feels like a lot of work just to start working on a new branch, luckily, `git switch` provides the `--create` or `-c` flag, which lets you create and switch all in one go.

Let's give it a shot and create a throwaway branch:

<!--
```shellSession
$ git switch -c throwaway
```
-->

!['git switch -c throwaway'](/images/combined-shell-6.svg)

And...

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/images/combined-shell-7.svg)

Perfect!

#### Deleting a branch

Now let's get rid of the throwaway branch using `git branch`'s `--delete` or `-d` flag.

<!--
```shellSession
$ git branch -d throwaway
```
-->

!['git branch -d throwaway'](/images/combined-shell-8.svg)

Ah, so we cannot delete a branch that is currently in use or "checked out".

So let's switch back to `my-book`...

<!--
```shellSession
$ git switch my-book
```
-->

!['git switch my-book'](/images/combined-shell-9.svg)

... and try again...

<!--
```shellSession
$ git branch -d throwaway
```
-->

!['git branch -d throwaway'](/images/combined-shell-10.svg)

... and...

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/images/combined-shell-11.svg)

and let's do a `git status` for good measure:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/combined-shell-12.svg)

*Magnifique.*

### Our First Commit

Now that we've got a branch to work in, let's create some structure by adding the following:

<!--
```shellSession
$ touch table-of-contents about-the-author index
```
-->

!['touch table-of-contents about-the-author index'](/images/combined-shell-13.svg)

Let's see if Git noticed a change to our `working tree`:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/combined-shell-14.svg)

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

!['git add .'](/images/combined-shell-15.svg)

> We could have individually added the files by typing `git add table-of-contents about-the-author index`, but `git add` provides the convenient `git add .`, which stages any and all changes present in the working directory.

Let's see how things look now:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/combined-shell-16.svg)

Alright, it looks like our files are staged and ready to be committed!

Let's go ahead and do that with `git commit -m "Added ToC, About Author, and Index"`:

<!--
```shellSession
$ git commit -m "Added stuff"
```
-->

!['git commit -m "Added ToC, About Author, and Index"'](/images/combined-shell-17.svg)

> `-m` is the short form of `--message`, which allows us to specify short commit messages via the command-line.
> Typing `git commit` brings up a text editor, which is useful for longform commit messages.

Let's see what `git status` says now that the files have been committed:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/combined-shell-18.svg)

Nice, looks like the files were moved from the staging area to the repository!

We can confirm that the commit is part of our repository history by doing a `git log`:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/images/combined-shell-19.svg)

Perfect!

### Fixing Things

#### Restoring files

One of the great things about Git is that once a file has been added to a repository, it's *almost* **impossible** to lose it.  We'll prove this out in later exercises, but let's start simple and `rm` some files:

<!--
```shellSession
$ rm table-of-contents about-the-author index
```
-->

!['rm table-of-contents about-the-author index'](/images/combined-shell-20.svg)

Making sure the files are deleted:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/images/combined-shell-21.svg)

Seeing what Git has to say:

<!--
```shellSession
$ git status
```
-->

!['git status'](/images/combined-shell-22.svg)

As expected, Git noticed the change to the *working directory*, namely, that we deleted our files.

Helpfully, Git also tells us what command restores the file, `git restore`.

Let's give it a try:

<!--
```shellSession
$ git restore table-of-contents about-the-author index
```
-->

!['git restore table-of-contents about-the-author index'](/images/combined-shell-23.svg)

Double-checking with an `ls -l`:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/images/combined-shell-24.svg)

Great!  But that was a lot of typing, let's try something...

`git add` let's us do `git add .`, let's see if `git restore` lets us do the same:

<!--
```shellSession
$ rm *
```
-->

Checking...

<!--
```shellSession
$ rm *
```
-->

And...

<!--
```shellSession
$ git restore .
```
-->

Yup...

<!--
```shellSession
$ ls -l
```
-->

Cool!  While you're learning Git it's important to experiment.  You'll probably be using Git a lot, so it makes sense to get familiar as quickly as possible.

#### Amending a commit message

Something that happens all the time is making a typo in a commit message or committing too early.  Let's see how to handle these situations.

First, let's update our commit message:

<!--
```shellSession
$ git commit -m "ToC, About Author, and Index" --amend

$ git log -n 1
```
-->

!['git commit -m "Added Chapter 1" --amend'](/images/combined-shell-27.svg)!['git log -n 1'](/images/combined-shell-28.svg)

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

!['echo "# Chapter 1" >> chapter1'](/images/combined-shell-29.svg)!['cat chapter1'](/images/combined-shell-30.svg)!['git add chapter1'](/images/combined-shell-31.svg)!['git commit --amend --no-edit'](/images/combined-shell-32.svg)

And checking with `git log`, we can see the commit id has updated:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/images/combined-shell-33.svg)

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

!['echo "Lorum ipsum" >> chapter1'](/images/combined-shell-34.svg)!['cat chapter1'](/images/combined-shell-35.svg)

So, now `chapter1` has a new line, "Lorum ipsum" added to it.

Let's go ahead and commit that:

<!--
```shellSession
$ git commit -am "Brainstorming"
```
-->

!['git commit -am "Brainstorming"'](/images/combined-shell-36.svg)

> **Note:** Here we used the `-a` flag which automatically `git add`s all changes found in tracked files.

Let's check with `git log` to confirm the new commit's there:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/images/combined-shell-37.svg)

And now let's revert the commit:

<!--
```shellSession
$ git revert HEAD --no-edit
```
-->

!['git revert HEAD --no-edit'](/images/combined-shell-38.svg)

Once again checking with `git log`:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/images/combined-shell-39.svg)

Yup, and now let's check the contents of `chapter1`:

<!--
```shellSession
$ cat chapter1
```
-->

!['cat chapter1'](/images/combined-shell-40.svg)

And there you go!

But what's with the `HEAD` thing?  We'll get to that soon...

## Wrapping Things Up

Now let's push today's work back to GitHub.

<!--
```shellSession
$ git push
```
-->

!['git push'](/images/combined-shell-41.svg)

<!--
```shellSession
$ git push --set-upstream origin my-first-branch
```
-->

!['git push --set-upstream origin my-first-branch'](/images/combined-shell-42.svg)

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
