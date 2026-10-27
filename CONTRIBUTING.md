# Contributing to Open Source Community Wall 🚀

Welcome! If you are looking to make your very first open source contribution, you are in the right place! 

This project is built specifically to make the pull request process fun, risk-free, and memorable. By adding a simple JSON card, you will practice:
1. Forking a repository
2. Creating a branch
3. Adding your file
4. Opening a Pull Request
5. Watching automated CI checks run
6. Seeing your profile card published live on the website once merged!

---

## 🎯 The Golden Rule: "One Contributor, One File"
To prevent merge conflicts (the #1 blocker for beginners), **every contributor only adds their own file**:
> **`cards/<your-github-username>.json`**

Never edit anyone else's card or the website source code in a card PR.

---

## 🛠️ Method 1: The Quickest Way (Via GitHub Web UI - No Git installed needed!)

1. **Fork this repository** by clicking the **Fork** button in the top right.
2. Navigate to the `cards/` folder in your fork.
3. Click **Add file** -> **Create new file**.
4. Name your file: `cards/<your-github-username>.json` (example: `cards/johndoe.json`).
5. Copy and customize the template below:
```json
{
  "name": "Your Name",
  "github": "your-github-username",
  "avatar": "https://github.com/your-github-username.png",
  "bio": "Passionate learner exploring open source and frontend design.",
  "skills": ["JavaScript", "HTML", "CSS", "Git"],
  "links": {
    "linkedin": "https://linkedin.com/in/yourprofile",
    "portfolio": "https://yourportfolio.dev"
  },
  "firstPR": "My first open-source PR!"
}
```
6. Scroll down, choose **Create a new branch for this commit and start a pull request**.
7. Name your branch (e.g. `add-card-yourname`).
8. Click **Propose changes**, review your PR description, and click **Create pull request**!

---

## 💻 Method 2: Using the Command Line (Terminal & Git)

### Step 1: Fork and Clone
Fork the repository to your own account, then clone it locally:
```bash
git clone https://github.com/<your-username>/GitHub-Contri.git
cd GitHub-Contri
```

### Step 2: Create a Feature Branch
```bash
git checkout -b add-card-<your-username>
```

### Step 3: Create Your Card
Create a new file in `cards/` named `<your-username>.json`:
```bash
# Example on Linux/macOS
cp cards/janedoe.json cards/<your-username>.json

# On Windows PowerShell
Copy-Item cards/janedoe.json cards/<your-username>.json
```
Edit the file with your information.

### Step 4: Validate Your Card Locally
Make sure you have Node.js installed, then run:
```bash
npm run validate
```
If your card passes, you'll see a green checkmark!

### Step 5: Commit and Push
```bash
git add cards/<your-username>.json
git commit -m "feat(cards): add <your-username> profile card"
git push origin add-card-<your-username>
```

### Step 6: Open the Pull Request
Go to the original repository on GitHub. You will see a banner prompting **Compare & pull request**. Click it, fill in the template, and submit!

---

## 📋 Card JSON Specification

| Field | Type | Required? | Constraints & Details |
|---|---|---|---|
| `name` | string | **Yes** | 2-50 characters. Your display name. |
| `github` | string | **Yes** | 1-39 characters. Must match your GitHub username and file name. |
| `avatar` | string (URL) | No | Direct URL to avatar. Default: `https://github.com/<username>.png`. |
| `bio` | string | **Yes** | 5-180 characters. Brief summary about yourself. |
| `skills` | array | **Yes** | 1 to 12 skills (e.g. `["React", "Python", "Git"]`). |
| `links` | object | No | Supported keys: `portfolio`, `linkedin`, `twitter`, `blog`, `youtube`. |
| `firstPR` | string | No | Optional badge text or note (e.g. `joined via PR #42`). |
| `joinedDate` | string | No | Format: `YYYY-MM-DD`. |

---

## 🤖 What Happens After You Open Your PR?
1. **GitHub Actions CI** triggers automatically to test your JSON file against our strict schema.
2. A **Welcome Bot** posts a comment cheering you on.
3. A maintainer will review your pull request.
4. When approved, your PR is **merged**!
5. Within 1-2 minutes, the live website automatically rebuilds and deploys, featuring **your new card on the wall**!

Happy open-sourcing! ❤️
