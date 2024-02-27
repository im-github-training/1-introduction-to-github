<!--
  <<< Author notes: Step 1 >>>
  Choose 3-5 steps for your course.
  The first step is always the hardest, so pick something easy!
  Link to docs.github.com for further explanations.
  Encourage users to open new tabs for steps!
-->

# Getting Our Feet Wet

Let's start by getting familiar with the Git basics.

In the next series of exercises, we'll be using our repository to work on a book.

Let's start by making sure the repository is ready for us to start working by typing `git status`.

```bash
git status

On branch main
nothing to commit, working tree clean
```

Looks good!

Now let's create a file for our very first chapter.

```bash
echo "Chapter 1" > chapter1
```

Let's see if Git noticed this new file by typing `git status`:

```bash
git status

On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        chapter1

nothing added to commit but untracked files present (use "git add" to track)
```

```bash
git add chapter1
git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   chapter1

git commit -m "Added chapter1"
[main 200eaab] Added chapter1
 1 file changed, 1 insertion(+)
 create mode 100644 chapter1
git status
On branch main
nothing to commit, working tree clean
git log
commit 200eaaba0e17d7675fe160a00ba987c8f7c00368 (HEAD -> main)
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Mon Feb 26 23:33:00 2024 -0800

    Added chapter1

commit 513dd263275c0f49b4f683a5227043abe0d5ffdc
Author: Sam Peddamatham <sam.pm@infomagnus.com>
Date:   Mon Feb 26 23:30:09 2024 -0800

    Initial commit
(END)
```

### :keyboard: Activity: Your first branch

1. Open a new browser tab and navigate to your newly made repository. Then, work on the steps in your second tab while you read the instructions in this tab.
2. Navigate to the **< > Code** tab in the header menu of your repository.

   ![code-tab](/images/code-tab.png)

3. Click on the **main** branch drop-down.

   ![main-branch-dropdown](/images/main-branch-dropdown.png)

4. In the field, name your branch `my-first-branch`. In this case, the name must be `my-first-branch` to trigger the course workflow.
5. Click **Create branch: my-first-branch** to create your branch.

   ![create-branch-button](/images/create-branch-button.png)

   The branch will automatically switch to the one you have just created.
   The **main** branch drop-down bar will reflect your new branch and display the new branch name.

6. Wait about 20 seconds then refresh this page (the one you're following instructions from). [GitHub Actions](https://docs.github.com/en/actions) will automatically update to the next step.
