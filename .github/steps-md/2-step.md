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

_Yeesh..._ admittedly not my best work... but I was in a hurry!

Luckily we can easily clean this up with a quick `git rebase --interactive`.

First, we need to tell `git rebase --interactive` how many commits we want to... uh... _rebase_.

From the `git log` output, we can rebase everything up until the commit that starts with `1d386eb` (of course, the commit id will be different in _your_ repo).

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

```shellSession
$ git log -n 3
```

🤌🤌🤌

Now we have to push our changes back to GitHub

```shellSession
$ git push
```

```shellSession
$ git push --force
```




### Merging Back to Main

Now we're ready to merge `chapter2` back into our `main` branch.

Let's switch over the the `main` branch:

```shellSession
$ git switch main
```

Hrm... what's this?  It looks like our `local` repository somehow got out of sync with the `remote` repository...

Let's not worry about this for now, and just do what Git tells us, which is a `git pull`:

```shellSession
$ git pull
```

Ok, now let's merge our changes back to the `main` branch with:

```shellSession
$ git merge --no-ff -m "Merging my-first-branch" my-first-branch
```

And checking with `git log`:

```shellSession
$ git log -n 5
```

Nice... but it feels a bit flat, let's try:

```shellSession
$ git log --oneline --graph --decorate -n 10
```

On second thought, we probably don't want that branch crudding up our repo until the end of time.  Let's bring in our changes using `git rebase` instead.

First, we have to undo our changes.  Sure, we could use `git revert`, but that leaves a history of the branch.

We'll have to use `git reset` to reset main back to before the merge, which, from the `git log` output above, is commit `606a5db`:

```shellSession
$ git reset HEAD~ --hard
```

Now, let's bring in the changes from `my-first-branch` using the following:

```shellSession
$ git rebase my-first-branch
```

And another `git log`:

```shellSession
$ git log --oneline --graph --decorate -n 10
```

Nice!

Now we can get rid of the `my-first-branch` branch with a `git branch -d my-first-branch`:

```shellSession
$ git branch -d my-first-branch
```

Er... I meant a `git branch -D my-first-branch`!

```shellSession
$ git branch -D my-first-branch
```

```shellSession
$ git push
```

```shellSession
$ git pull
```

```shellSession
$ git push
```