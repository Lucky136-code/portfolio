# How to Make Your GitHub Profile Look Like fancyboi999's

Follow these simple steps to configure your GitHub profile with the new premium design:

### Step 1: Create Your Profile Repository
If you haven't already:
1. Go to [GitHub - New Repository](https://github.com/new).
2. For the **Repository name**, enter your exact GitHub username: **`Lucky136-code`**.
3. GitHub will display a message: *"You found a secret! Lucky136-code/Lucky136-code is a special repository..."*
4. Check **Public** (it *must* be public).
5. Check **Initialize this repository with a README**.
6. Click **Create repository**.

---

### Step 2: Add the Profile README Content
1. Open the repository you just created (`Lucky136-code`).
2. Edit the `README.md` file in it.
3. Replace the entire content of the file with the code from **[GITHUB_PROFILE_README.md](./GITHUB_PROFILE_README.md)**.
4. Commit the changes directly to the `main` branch.

---

### Step 3: Set Up the Snake Animation Workflow
To make the animated snake eat your GitHub contributions (just like in the reference profile):
1. In your `Lucky136-code` repository, click on the **Actions** tab.
2. Click **set up a workflow yourself** (or create a file under `.github/workflows/snake.yml`).
3. Copy all code from **[SNAKE_WORKFLOW.yml](./SNAKE_WORKFLOW.yml)** and paste it into the editor.
4. Commit the file.

---

### Step 4: Enable Permissions for the Snake Action
By default, GitHub Actions may have read-only permissions. To enable updating the snake contribution SVG:
1. In your `Lucky136-code` repository, go to **Settings** (gear icon) -> **Actions** -> **General**.
2. Scroll down to **Workflow permissions**.
3. Select **Read and write permissions**.
4. Click **Save**.

---

### Step 5: Trigger the Snake Generation
1. Go to the **Actions** tab in your repository.
2. Under the list of workflows on the left, click **Generate Snake**.
3. Click the **Run workflow** dropdown and select **Run workflow**.
4. Once the action completes successfully (takes less than a minute), it will create a new branch named `output` containing your custom SVGs. 
5. The README will now display your live animated snake contribution grid!
