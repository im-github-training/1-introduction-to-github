## Introduction

In the next series of exercises, we will be using this repository to work on a New York Times bestseller.

## Getting Started

To get started, we'll need a local copy of this repository.  To do that:

1. Click the "Code" button, and then click the "Copy url to clipboard" icon:

![](/images/image-9.png)

2. Open a terminal window and do a `git clone`:

![](/images/image-10.png)

## Understanding the Basics

To begin, let's make sure everything is in order with our repository.

To do this, we use the `git status` command which (unsurprisingly) prints out the current status of your repository.

![git status](/images/1-step-shell-0.svg)

Looks good!

Git is telling us the following things:

* we are on the `main` branch
* our `staging area` is empty
* and no changes have been detected in our `working tree` *or* `working directory`

### Our First Branch

Let's set things up by creating something called a `branch`.

A branch is basically a named pointer to the current commit.  What's neat about them is that they give you a place to experiment and try things out before you make changes to your `main` branch.

![git switch -c my-first-branch](/images/1-step-shell-1.svg)

### Our First Commit

Now, let's create a file for Chapter 1 called `chapter1`.

We can do this with a simple `touch chapter`:

![touch chapter1](/images/1-step-shell-2.svg)

Let's see if Git noticed this change to our `working tree` by typing `git status`:

![git status](/images/1-step-shell-3.svg)

Great, Git noticed that we added the file, but is saying it's *untracked*.

> The way Git works is that you have to *explicitly* tell it to start tracking files by using the `git add` command.  Until you do that, Git considers the file *untracked*.
>
> Once a file has been added via `git add`, it becomes a "tracked" file and Git will start monitoring it for changes. If you modify a tracked file, Git will recognize that it has been modified and will mark it as "modified" but not yet "staged" for the next commit.

Let's go ahead and start tracking the file with a `git add chapter1`:

![git add chapter1](/images/1-step-shell-4.svg)

Let's see how things look now:

![git status](/images/1-step-shell-5.svg)

Alright, it looks like `chapter1` file is staged and ready to be committed!

Let's go ahead and do that with `git commit -m "Added chapter1"`:

![git commit -m "Added chapter1"](/images/1-step-shell-6.svg)

Let's see what `git status` says now that the file's been committed:

![git status](/images/1-step-shell-7.svg)

Nice, looks like the file was moved from the staging area to the repository!

We can confirm the commit is part of our repository history by doing a `git log`:

![git log -n 1](/images/1-step-shell-8.svg)

Perfect!

### Fixing Things (Part 1)

#### Restoring files

One of the great things about Git is that once a file has been added to a repository, it's *almost* **impossible** to lose it.  We'll prove this out in later exercises, but let's start simple and delete `chapter`.

![rm chapter1](/images/1-step-shell-9.svg)![ls -l](/images/1-step-shell-10.svg)![git status](/images/1-step-shell-11.svg)

As expected, Git noticed the change to the *working directory*, namely, that `chapter1` was deleted.

Helpfully, Git also tells us what command restores the file, `git restore`.

Let's give it a try:

![git restore chapter1](/images/1-step-shell-12.svg)

Double-checking with an `ls -l` shows us that `chapter1` has been

![ls -l](/images/1-step-shell-13.svg)

#### Amending commits

Something that happens all the time is making a typo in a commit message or committing too early.  Let's see how to handle these situations.

First, let's update our commit message:

![git commit -m "Added Chapter 1" --amend](/images/1-step-shell-14.svg)![git log -n 1](/images/1-step-shell-15.svg)

Great!

Now, let's make an update to `chapter1` and add it to the commit:

![echo "# Chapter 1" >> chapter1](/images/1-step-shell-16.svg)![cat chapter1](/images/1-step-shell-17.svg)![git add chapter1](/images/1-step-shell-18.svg)![git commit --amend --no-edit](/images/1-step-shell-19.svg)

And checking with `git log`, we can see the commit id has updated:

![git log -n 1](/images/1-step-shell-20.svg)

> **Note:** Here we used the `--no-edit` flag, which allows us to skip retyping the commit message.

#### Reverting a commit

Occasionally, we'll need to "undo" a commit, and one way of doing that is with `git revert`

First, let's create a commit that we can revert.

![echo "Lorum ipsum" >> chapter1](/images/1-step-shell-21.svg)![cat chapter1](/images/1-step-shell-22.svg)

So, now `chapter1` has a new line, "Lorum ipsum" added to it.

Let's go ahead and commit that:

![git commit -am "Brainstorming"](/images/1-step-shell-23.svg)

> **Note:** Here we used the `-a` flag which automatically `git add`s all changes found in tracked files.

Let's check with `git log` to confirm the new commit's there:

![git log -n 2](/images/1-step-shell-24.svg)

And now let's revert the commit:

![git revert HEAD --no-edit](/images/1-step-shell-25.svg)

Once again checking with `git log`:

![git log -n 2](/images/1-step-shell-26.svg)

Yup, and now let's check the contents of `chapter1`:

![cat chapter1](/images/1-step-shell-27.svg)

And there you go!

But what's with the `HEAD` thing?  We'll get to that soon...

## Wrapping Things Up

Now let's push today's work back to GitHub.

![git push](/images/1-step-shell-28.svg)

![git push --set-upstream origin my-first-branch](/images/1-step-shell-29.svg)
