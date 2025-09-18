# Decrypto Multiplayer (Firebase + GitHub Pages)

## Setup

1. **Clone this repo** or download as ZIP.
2. Go to [Firebase Console](https://console.firebase.google.com/) → create a project.
3. Enable **Firestore Database**.
4. Copy your Firebase config into `firebase.js`.
5. Push to GitHub repo.
6. Enable **GitHub Pages** in repo settings → deploy from `main` branch.
7. Open your `https://username.github.io/repo-name`.

## Usage

- Open site → **Create Game** → share game code.
- Other players → **Join Game** with code.
- Players pick team **White / Black**.
- Logs update in realtime via Firestore.
