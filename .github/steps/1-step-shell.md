<!--
  <<< Author notes: Step 1 >>>
  Choose 3-5 steps for your course.
  The first step is always the hardest, so pick something easy!
  Link to docs.github.com for further explanations.
  Encourage users to open new tabs for steps!
-->

## Introduction

In the next series of exercises, we will be using this repository to work on a New York Times bestseller.

## Getting Started

To get started, we'll need a local copy of this repository.  To do that:

1. Click the "Code" button, and then click the "Copy url to clipboard" icon:

<!-- ![](/images/image-9.png) -->

2. Open a terminal window and do a `git clone`:

<!-- ![](/images/image-10.png) -->

## Understanding the Basics

To begin, let's make sure everything is in order with our repository.

To do this, we use the `git status` command which (unsurprisingly) prints out the current status of your repository.

!['git status'](/images/1-step-shell-0.svg)

Looks good!

Git is telling us the following things:

* we are on the `main` branch
* our `staging area` is empty
* and no changes have been detected in our `working tree` *or* `working directory`

### Our First Commit

Now, let's create a file for Chapter 1 called `chapter1`.

We can do this with a simple `touch chapter`:

!['touch chapter1'](/images/1-step-shell-1.svg)

Let's see if Git noticed this change to our `working tree` by typing `git status`:

!['git status'](/images/1-step-shell-2.svg)

Great, Git noticed that we added the file, but is saying it's *untracked*.

> The way Git works is that you have to *explicitly* tell it to start tracking files by using the `git add` command.  Until you do that, Git considers the file *untracked*.
>
> Once a file has been added via `git add`, it becomes a "tracked" file and Git will start monitoring it for changes. If you modify a tracked file, Git will recognize that it has been modified and will mark it as "modified" but not yet "staged" for the next commit.

Let's go ahead and start tracking the file with a `git add chapter1`:

!['git add chapter1'](/images/1-step-shell-3.svg)

Let's see how things look now:

!['git status'](/images/1-step-shell-4.svg)

Alright, it looks like `chapter1` file is staged and ready to be committed!

Let's go ahead and do that with `git commit -m "Added chapter1"`:

!['git commit -m "Added chapter1"'](/images/1-step-shell-5.svg)

Let's see what `git status` says now that the file's been committed:

!['git status'](/images/1-step-shell-6.svg)

Nice, looks like the file was moved from the staging area to the repository!

We can confirm the commit is part of our repository history by doing a `git log`:

!['git log'](/images/1-step-shell-7.svg)

Perfect!

### Fixing Things (Part 1)

#### Restoring files

One of the great things about Git is that once a file has been added to a repository, it's *almost* **impossible** to lose it.  We'll prove this out in later exercises, but let's start simple and delete `chapter`.

!['rm chapter1' 'ls -l' 'git status'](/images/1-step-shell-8.svg)

As expected, Git noticed the change to the *working directory*, namely, that `chapter1` was deleted.

Helpfully, Git also tells us what command restores the file, `git restore`.

Let's give it a try:

!['git restore chapter1'](/images/1-step-shell-9.svg)

Double-checking with an `ls -l` shows us that `chapter1` has been

!['ls -l'](/images/1-step-shell-10.svg)

#### Amending commits

Something that happens all the time is making a typo in a commit message or committing too early.  Let's see how to handle these situations.

First, let's update our commit message:

!['git commit -m "Added Chapter 1" --amend' 'git log'](/images/1-step-shell-11.svg)

Great!

Now, let's make an update to `chapter1` and add it to the commit:

!['echo "# Chapter 1" >> chapter1' 'cat chapter1' 'git add chapter1' 'git commit --amend --no-edit'](/images/1-step-shell-12.svg)

And checking with `git log`, we can see the commit date has updated:

!['git log'](/images/1-step-shell-13.svg)

> **Note:** Here we used the `--no-edit` flag, which allows us to skip retyping the commit message.

#### Reverting a commit

Occasionally, we'll need to "undo" a commit, and one way of doing that is with `git revert`

First, let's update `chapter1`:

!['echo "Lorum ipsum" >> chapter1' 'git commit -am "Brainstorming"' 'cat chapter1' 'git log'](/images/1-step-shell-14.svg)

> **Note:** Here we used the `-a` flag which automatically `git add`s all changes found in tracked files.

Now, let's revert that last commit:

!['git revert HEAD --no-edit'](/images/1-step-shell-15.svg)

!['git log'](/images/1-step-shell-16.svg)

!['cat chapter1'](/images/1-step-shell-17.svg)

And there you go!

But what's with the `HEAD` thing?  We'll get to that soon...

## Wrapping Things Up

Before we finish up for the day, let's set things up for the next lesson by creating something called a `branch`.

A branch is basically a named pointer to the current commit.  What's neat about them is that they create a fork of your entire working tree.

!['git switch -c my-first-branch'](/images/1-step-shell-18.svg)

Now let's push today's work back to GitHub:

```shell
$ git push --set-upstream origin my-first-branch
```
