<!--
  <<< Author notes: Step 1 >>>
  Choose 3-5 steps for your course.
  The first step is always the hardest, so pick something easy!
  Link to docs.github.com for further explanations.
  Encourage users to open new tabs for steps!
-->

In this chapter we will be learning about:
- `git rebase`
- `git reset`
- `git merge`
- `git cherry-pick`

## Chapter 2

Alright, so where we left off last we'd just created a branch called `my-first-branch` and pushed it to `remote`.

To help speed things up, I've gone ahead and created `chapter2` for you.

Let's do a `git pull` and to grab my changes:

```console
> git pull

remote: Enumerating objects: 24, done.
remote: Counting objects: 100% (24/24), done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 19 (delta 10), reused 18 (delta 9), pack-reused 0
Unpacking objects: 100% (19/19), 1.78 KiB | 130.00 KiB/s, done.
From https://github.com/im-sampm/1-introduction-to-github
   b6dfe21..0cb845c  my-first-branch -> origin/my-first-branch
   b6dfe21..2c68930  main            -> origin/main
Updating b6dfe21..0cb845c
Fast-forward
 .github/steps/-step.txt |  2 +-
 README.md               | 33 ++++++++++++++++++++-------------
 chapter2                |  3 +++
 3 files changed, 24 insertions(+), 14 deletions(-)
 create mode 100644 chapter2
```

And let's take a look at what we've got:

```console
> git log

commit 0cb845ca23430b9f6ec4012ffd84361042ec7bdb (HEAD -> my-first-branch, origin/my-first-branch)
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:22 2024 +0000

    fix

commit ca165f1dbc117c227ff5ce45cd393051a82fbe49
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:22 2024 +0000

    Added 'Section 1' to chapter2

commit bf122733f1da8477332770586f9720bf60350e51
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:22 2024 +0000

    FIxed tyypo

commit da0a6cf54a4c3f711a23a656e540924aeb7e1c85
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:22 2024 +0000

    Added chaptor2

commit f14cf2ab6d1f8565c1b58671e545af36c72e7f52
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:21 2024 +0000

    Update to 2 in STEP and README.md

...
```

_Yeesh..._ admittedly not my best work... but you were waiting... so I was in a hurry...

Luckily we can easily clean this up with a quick `git rebase --interactive`.

First, we need to tell `git rebase --interactive` how many commits we want to... uh... _rebase_.

From the `git log` output, we can rebase everything up until the commit that starts with `f14cf2a` (of course, the commit id will be different in _your_ repo).

```bash
git rebase --interactive f14cf2a
```

Which opens an editor window containing the following:

```bash
pick da0a6cf Added chaptor2
pick bf12273 FIxed tyypo
pick ca165f1 Added 'Section 1' to chapter2
pick 0cb845c fix

# Rebase f14cf2a..0cb845c onto f14cf2a (4 commands)
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
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified); use -c <commit> to reword the commit message
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
```

Ever so handy (and borderline on oversharing), Git once again helpfully tells us everything we need to know.


```bash
reword da0a6cf Added chapter2
squash bf12273 Fixed typo
reword ca165f1 Added 'Section 1' to chapter2
squash 0cb845c Fixed typo
```

Of course, we could have also used the shortform:

```bash
r da0a6cf Added chapter2
s bf12273 Fixed typo
r ca165f1 Added 'Section 1' to chapter2
s 0cb845c Fixed typo
```

After we hit save, Git will now walk us through the changes we asked for.

First, Git gives us the option to edit the entire commit message for `da0a6cf`:

```bash
Added chapter2

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Author:    github-actions[bot] <github-actions[bot]@users.noreply.github.com>
# Date:      Tue Feb 27 10:08:22 2024 +0000
#
# interactive rebase in progress; onto f14cf2a
# Last command done (1 command done):
#    reword da0a6cf Added chapter2
# Next commands to do (3 remaining commands):
#    squash bf12273 Fixed typo
#    reword ca165f1 Added 'Section 1' to chapter2
# You are currently editing a commit while rebasing branch 'my-first-branch' on 'f14cf2a'.
#
# Changes to be committed:
#       new file:   chapter2
#
```

Next, it lets us:

```bash
# This is a combination of 2 commits.
# This is the 1st commit message:

Added chapter2

# This is the commit message #2:

Fixed typo

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Author:    github-actions[bot] <github-actions[bot]@users.noreply.github.com>
# Date:      Tue Feb 27 10:08:22 2024 +0000
#
# interactive rebase in progress; onto f14cf2a
# Last commands done (2 commands done):
#    reword da0a6cf Added chapter2
#    squash bf12273 Fixed typo
# Next commands to do (2 remaining commands):
#    reword ca165f1 Added 'Section 1' to chapter2
#    squash 0cb845c Fixed typo
# You are currently rebasing branch 'my-first-branch' on 'f14cf2a'.
#
# Changes to be committed:
#       new file:   chapter2
#
```

Since I only want to keep the 1st commit message, I'll comment out commit message #2:

```bash
# This is a combination of 2 commits.
# This is the 1st commit message:

Added chapter2

# This is the commit message #2:

#Fixed typo
```

```bash
Added 'Section 1' to chapter2

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Author:    github-actions[bot] <github-actions[bot]@users.noreply.github.com>
# Date:      Tue Feb 27 10:08:22 2024 +0000
#
# interactive rebase in progress; onto f14cf2a
# Last commands done (3 commands done):
#    squash bf12273 Fixed typo
#    reword ca165f1 Added 'Section 1' to chapter2
# Next command to do (1 remaining command):
#    squash 0cb845c Fixed typo
# You are currently editing a commit while rebasing branch 'my-first-branch' on 'f14cf2a'.
#
# Changes to be committed:
#       modified:   chapter2
#
```

```bash
# This is a combination of 2 commits.
# This is the 1st commit message:

Added 'Section 1' to chapter2

# This is the commit message #2:

#Fixed typo

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Author:    github-actions[bot] <github-actions[bot]@users.noreply.github.com>
# Date:      Tue Feb 27 10:08:22 2024 +0000
#
# interactive rebase in progress; onto f14cf2a
# Last commands done (4 commands done):
#    reword ca165f1 Added 'Section 1' to chapter2
#    squash 0cb845c Fixed typo
# No commands remaining.
# You are currently rebasing branch 'my-first-branch' on 'f14cf2a'.
#
# Changes to be committed:
#       modified:   chapter2
#
```

This takes us back to the commandline:

```bash
> git rebase --interactive f14cf2a

[detached HEAD 0f9dc5a] Added chapter2
 Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
 Date: Tue Feb 27 10:08:22 2024 +0000
 1 file changed, 1 insertion(+)
 create mode 100644 chapter2
[detached HEAD ac5a0ea] Added chapter2
 Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
 Date: Tue Feb 27 10:08:22 2024 +0000
 1 file changed, 1 insertion(+)
 create mode 100644 chapter2
[detached HEAD 3c350c8] Added 'Section 1' to chapter2
 Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
 Date: Tue Feb 27 10:08:22 2024 +0000
 1 file changed, 1 insertion(+)
[detached HEAD a692dae] Added 'Section 1' to chapter2
 Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
 Date: Tue Feb 27 10:08:22 2024 +0000
 1 file changed, 2 insertions(+)
Successfully rebased and updated refs/heads/my-first-branch.
```

And checking with a `git log`:

```bash
commit a692daeb7209b1da66914523fcd82c955733a057 (HEAD -> my-first-branch)
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:22 2024 +0000

    Added 'Section 1' to chapter2

commit ac5a0ea3b8a61616334742ae3d89e9e93c05bfe3
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:22 2024 +0000

    Added chapter2

commit f14cf2ab6d1f8565c1b58671e545af36c72e7f52
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:21 2024 +0000

    Update to 2 in STEP and README.md
...
```

🤌🤌🤌

### Merging

Now we're ready to merge `chapter2` back into our `main` branch.

Let's switch over the the `main` branch:

```bash
> git switch main
Switched to branch 'main'
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)
```

Hrm... what's this?  It looks like our `local` repository somehow got out of sync with the `remote` repository...

Let's not worry about this for now, and just do what Git tells us, which is a `git pull`:

```bash
> git pull

Updating b6dfe21..2c68930
Fast-forward
 .github/steps/-step.txt |  2 +-
 README.md               | 33 ++++++++++++++++++++-------------
 2 files changed, 21 insertions(+), 14 deletions(-)
```

Ok, now let's do a `git merge my-first-branch`, which brings up a:

```bash
Merge branch 'my-first-branch'
# Please enter a commit message to explain why this merge is necessary,
# especially if it merges an updated upstream into a topic branch.
#
# Lines starting with '#' will be ignored, and an empty message aborts
# the commit.
```

```bash
> git merge my-first-branch

Merge made by the 'ort' strategy.
 chapter2 | 3 +++
 1 file changed, 3 insertions(+)
 create mode 100644 chapter2
```

And checking with `git log`:

```bash
commit f188587c25237d93e114779eb6c903fa044733c5 (HEAD -> main)
Merge: 2c68930 a692dae
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Tue Feb 27 02:42:29 2024 -0800

    Merge branch 'my-first-branch'

commit a692daeb7209b1da66914523fcd82c955733a057 (my-first-branch)
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:22 2024 +0000

    Added 'Section 1' to chapter2

commit ac5a0ea3b8a61616334742ae3d89e9e93c05bfe3
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:22 2024 +0000

    Added chapter2

commit f14cf2ab6d1f8565c1b58671e545af36c72e7f52
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:21 2024 +0000

    Update to 2 in STEP and README.md

commit 2c6893074403cad79fbd5be8417fd12966954ef5 (origin/main, origin/HEAD)
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Tue Feb 27 10:08:21 2024 +0000

    Update to 2 in STEP and README.md
```

Nice... but it feels a bit flat, let's try `git log --oneline --graph --decorate`:

```bash
*   f188587 (HEAD -> main) Merge branch 'my-first-branch'
|\
| * a692dae (my-first-branch) Added 'Section 1' to chapter2
| * ac5a0ea Added chapter2
| * f14cf2a Update to 2 in STEP and README.md
* | 2c68930 (origin/main, origin/HEAD) Update to 2 in STEP and README.md
|/
* b6dfe21 Update to 1 in STEP and README.md
...
```

On second thought, we probably don't want that branch crudding up our repo until the end of time.  Let's bring in our changes using `git rebase` instead.

First, we have to undo our changes.  Sure, we could use `git revert`, but that won't truly get rid of that abomination.  

We'll have to use `git reset` to reset main back to before the merge, which, from the `git log` output above, is commit `2c68930`:

`git reset 2c68930`

Now, let's bring in the changes from `my-first-branch` using the following:

```bash
> git rebase my-first-branch

warning: skipped previously applied commit 2c68930
hint: use --reapply-cherry-picks to include skipped commits
hint: Disable this message with "git config advice.skippedCherryPicks false"
Successfully rebased and updated refs/heads/main.
```

And another `git log --oneline --graph --decorate`:

```bash
* a692dae (HEAD -> main, my-first-branch) Added 'Section 1' to chapter2
* ac5a0ea Added chapter2
* f14cf2a Update to 2 in STEP and README.md
* b6dfe21 Update to 1 in STEP and README.md
* 9938f44 Updated
...
```

Nice!

Now we can get rid of the `my-first-branch` branch with a `git branch -d my-first-branch`:

```bash
> git branch -d my-first-branch

warning: not deleting branch 'my-first-branch' that is not yet merged to
         'refs/remotes/origin/my-first-branch', even though it is merged to HEAD.
error: The branch 'my-first-branch' is not fully merged.
If you are sure you want to delete it, run 'git branch -D my-first-branch'.
```

Er... I meant a `git branch -D my-first-branch`!

```bash
> git branch -D my-first-branch
Deleted branch my-first-branch (was a692dae).
```

Thankyouverymuch.

```bash
> git push

To https://github.com/im-sampm/1-introduction-to-github.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/im-sampm/1-introduction-to-github.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

> git pull
remote: Enumerating objects: 24, done.
remote: Counting objects: 100% (24/24), done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 19 (delta 9), reused 18 (delta 8), pack-reused 0
Unpacking objects: 100% (19/19), 5.71 KiB | 389.00 KiB/s, done.
From https://github.com/im-sampm/1-introduction-to-github
   51b9013..e3bedc1  main            -> origin/main
   51b9013..c866aae  my-first-branch -> origin/my-first-branch
Updating 51b9013..e3bedc1
Fast-forward
 .github/steps/-step.txt |   2 +-
 README.md               | 506 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--------------------------
 2 files changed, 353 insertions(+), 155 deletions(-)

> git push
Everything up-to-date

> git branch
-branch
To https://github.com/im-sampm/1-introduction-to-github.git
 - [deleted]         my-first-branch
```