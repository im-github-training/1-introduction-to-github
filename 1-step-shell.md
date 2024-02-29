<!--
  <<< Author notes: Step 1 >>>
  Choose 3-5 steps for your course.
  The first step is always the hardest, so pick something easy!
  Link to docs.github.com for further explanations.
  Encourage users to open new tabs for steps!
-->

<details>
  <summary>Click me</summary>

![](images/1-step-shell-0.svg)

</details>

## Getting Started

To get started, we'll need a local copy of this repository.  To do that:

1. Click the "Code" button, and then click the "Copy url to clipboard" icon:

![](/images/image-9.png)

2. Open a terminal window and do a `git clone`:

![](/images/image-10.png)

## Chapter 1

Ok, in the next series of exercises, we'll be using this repository to work on our next manuscript.

Let's start by making sure the repository is ready for us to start working by typing `git status`.

!['ls -l ../' 'git status'](images/1-step-shell-1.svg)

Looks good!

Now let's create a file for our very first chapter.

!['echo "Chapter 1" > chapter1'](images/1-step-shell-2.svg)

Let's see if Git noticed this new file by typing `git status`:

!['git status'](images/1-step-shell-3.svg)

Cool, so Git saw that we added this file but it's not yet tracking the file.

Luckily, Git tells us exactly what we need to do next, `git add chapter1`:

!['git add chapter1'](images/1-step-shell-4.svg)

Let's see how things look now:

!['git status'](images/1-step-shell-5.svg)

Alright, so it looks like our `chapter1` file is staged and ready to be committed!

Let's go ahead and do that with `git commit -m "Added chapter1"`:

!['git commit -m "Added chapter1"'](images/1-step-shell-6.svg)

And, of course, a quick `git status`:

!['git status'](images/1-step-shell-7.svg)

Nice, looks like the file was moved from the staging area to the repository!

Let's see what `git log` has to say:

!['git log'](images/1-step-shell-8.svg)

Perfect!

## A Little Bit More

Alright, now that we've practiced `git add`'ing and `git commit`'ting files, let's up our game a bit.

Let's see how Git reacts if we accidentally delete `chapter1`.

First things first, let's double-check and make sure `chapter1`'s still there:

!['ls -l'](images/1-step-shell-9.svg)

Yup, don't know what we were expecting...

Now, let's delete `chapter1` and see what Git has to say with a lil `git status`:

!['rm chapter1' 'git status'](images/1-step-shell-10.svg)

Ok, somewhere in that wall of text, Git's telling us that `chapter1` has indeed been removed from the *working directory*.

And, once again, Git helpfully tells us what to type to restore the file:

!['git restore chapter1'](images/1-step-shell-11.svg)

Double-checking with an `ls -l` shows us that `chapter1` has been

!['ls -l'](images/1-step-shell-12.svg)

## Trying out git diff

!['echo "Section 1" >> chapter1'](images/1-step-shell-13.svg)

!['git diff'](images/1-step-shell-14.svg)

## Step: Amend a commit

!['git commit -am "Updated chapter1"'](images/1-step-shell-15.svg)

!['git log'](images/1-step-shell-16.svg)

!['git commit --amend -m "Added '\\''Section 1'\\'' to chapter1"'](images/1-step-shell-17.svg)

!['git log'](images/1-step-shell-18.svg)

## Step: Revert a commit

![](images/1-step-shell-19.svg)

## Step: Create a branch

!['git switch -c my-first-branch'](images/1-step-shell-20.svg)

## Step: Push

```shell
$ git push --set-upstream origin my-first-branch
```
