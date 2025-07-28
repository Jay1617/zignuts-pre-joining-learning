# 🚀 GitHub Practice Log

Welcome to my GitHub practice file!  
This file is a part of my learning journey as I explore **Git** and **GitHub**.

---

## 📅 Date
**July 28, 2025**

---

## 📘 What I'm Learning

- ✅ How to create repositories
- ✅ How to stage, commit, and push changes
- ✅ Understanding the difference between Git and GitHub
- ✅ Creating branches and merging
- 📄 How to use `.gitignore`
- 🌱 How to clone repositories

---

## 🔁 Git Workflow (Local to GitHub)

```text
GitHub Repo → Clone → Make Changes → Add → Commit → Push

---

## 💡 Commands I'm Practicing

```bash
# Clone a repository to local machine
git clone <repo-url>

# Check the status of files in the working directory
git status
# States: untracked, modified, staged, unmodified

# Push commits to the remote repository
git push origin main
# 'origin' is the remote name, 'main' is the branch name

# Set upstream for easier future pushes
git push -u origin main
# After this, you can use just `git push` next time

# Initialize a new local Git repository
git init

# Add a remote repository named 'origin'
git remote add origin <repo-url>

# Verify remote URLs
git remote -v



#Branches
# List all branches
git branch

# Rename current branch to 'main'
git branch -M main

# Switch to an existing branch
git checkout branch-name

# Create and switch to a new branch
git checkout -b new-branch

# Delete a branch
git branch -d branch-name



#Merging code
# View differences between branches or commits
git diff branch-name

# Merge another branch into the current one
git merge branch-name



# Stage all changes in the working directory
git add .

# Commit staged changes with a message
git commit -m "Your commit message"

# Pull the latest changes from remote to local
git pull origin main



---

Let me know if you want to add GitHub Desktop usage, pull requests, GitHub Actions, or more visuals next!
