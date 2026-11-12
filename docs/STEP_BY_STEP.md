# Assignment 4 — start-to-finish walkthrough (Mac + VS Code + GitHub)

## 1. Extract and open
1. Download the `Giftlinq_Assignment4_Final.zip` file.
2. Double-click it in Finder to extract `Giftlinq_Assignment4_Final`.
3. Launch Visual Studio Code → **File → Open Folder** → choose that folder.
4. Confirm `index.html`, `README.md`, `css`, `js`, and `docs` are visible.

## 2. Run the website
1. VS Code → Extensions → search **Live Server** → Install.
2. Right-click `index.html` → **Open with Live Server**.
3. In the browser, enter `gaming, lego`, select `Child`, budget 0–75 → **Find gift ideas**.
4. Test saving a gift, marking it purchased, and deleting it.
5. Test **Remember** on and off, then **Clear saved data**.

## 3. Create an empty GitHub repository
1. Sign in to `https://github.com/new`.
2. Repository name: `giftlinq`. Description: `Giftlinq SWE Assignment 4`.
3. Choose visibility appropriate for your group/course.
4. **Do not** initialize a README, `.gitignore`, or license (already included).
5. Click **Create repository**.

## 4. Upload the code with Git (VS Code Terminal → New Terminal)
Run each command one at a time from the project folder:
```bash
pwd
git --version
git init
git add .
git commit -m "Assignment 4 runnable privacy-first Giftlinq prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/giftlinq.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your actual GitHub username or organization. If Git requests an author identity:
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```
Then rerun the failed `git commit` and continue. Follow GitHub's sign-in instructions if asked to authenticate. **Never paste a password or token into your source files.**

## 5. Verify and share
1. Refresh your GitHub repo; verify `index.html`, `README.md`, `css`, `js`, and `docs` are present.
2. GitHub repo → **Settings → Collaborators** → invite your teammates.
3. Teammates clone using `git clone https://github.com/YOUR-USERNAME/giftlinq.git`.
4. Teammates should use feature branches and pull requests to avoid overwriting each other's work.

## 6. Optional: GitHub Pages
1. Repo → **Settings → Pages**.
2. Source: **Deploy from a branch**; branch: `main`; folder: `/ (root)` → Save.
3. Wait for GitHub to publish the site; test the published URL. Pages availability depends on account and repo visibility.

## 7. Submit
1. Ensure the latest code is committed and pushed.
2. In Finder, right-click the updated project folder → **Compress**.
3. Open the ZIP and verify it contains the README, HTML/CSS/JS source, and docs.
4. Upload **one ZIP** to your course assignment and provide the GitHub repository URL.
5. Explain what is complete and what remains (live eBay search, secure login) using the README.

## 8. If you change code later
```bash
git status
git add .
git commit -m "Describe your changes"
git push
```
