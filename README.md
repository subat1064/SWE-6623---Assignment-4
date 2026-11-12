# Giftlinq — Assignment 4

A runnable, **static-only** Christmas gift recommendation prototype. Built only with **HTML, CSS, vanilla JavaScript (ES modules), Bootstrap CSS, browser localStorage, GitHub, GitHub Pages, and VS Code**. No backend, database, npm, or framework is required.

## Run it in VS Code
1. Download/extract this folder or clone its GitHub repository.
2. Open this folder in VS Code (**File → Open Folder**).
3. Install the **Live Server** VS Code extension, if needed.
4. Right-click `index.html` and select **Open with Live Server**. (Do not use `file://`; ES modules need an HTTP server.)
5. Enter `gaming, lego`, age `Child`, budget `$0–$75`, and click **Find gift ideas**.
6. Save a gift, mark it purchased, save a tab-only recipient profile, and test the opt-in **Remember** checkbox.
7. Use **Clear saved data** to delete Giftlinq storage and tab profiles.

## Completed
- Responsive HTML/CSS/Bootstrap interface; working form and validation.
- Client-side three-layer organization (presentation, application, data).
- `Recipient`, `Gift`, `RecipientManager`, `GiftRecommender`, `StorageService`, `UIController` and `EbayAPIService` classes with required methods; `LoginService` is an explicit unsupported interface.
- 10 **fictional** sample gift records with price, quantity, description, category, and condition.
- Age and price filtering, interest-based ranking, gift saving, removal, purchased state, and recent searches.
- Recipient profiles in **tab memory only**; gift list and general search topics in tab memory unless the user opts into localStorage.
- No password or API token collection, no analytics, no personal data sent to a third party, and safe DOM rendering using `textContent`.
- Content Security Policy restricts JavaScript to same-origin scripts. Bootstrap CSS is the only external asset.

## Not yet implemented (must not be claimed complete)
- **Live eBay Browse API** results: eBay OAuth credentials must not be exposed in a static GitHub Pages application. `EbayAPIService` defines the methods and JSON mapper but intentionally refuses live calls. A secure token broker or changed architecture is required for real eBay search.
- Real user login: secure account login is not possible with the stated no-backend/localStorage-only architecture; `LoginService` is a placeholder.
- Real inventory, live product images, and checkout.

## Architecture and files
- Presentation: `index.html`, `css/styles.css`, `js/ui/UIController.js`
- Application: `js/models/`, `js/services/GiftRecommender.js`, `js/services/RecipientManager.js`, `js/services/EbayAPIService.js`, `js/services/LoginService.js`
- Data: `js/services/StorageService.js`, `js/data/sampleGifts.js`, opt-in localStorage
- Bootstrap stylesheet is loaded from a CDN. No JavaScript libraries are used.

## Privacy requirement (NFR-9)
**The application shall minimize personal information collection, shall never store passwords, tokens, or recipient profiles in localStorage, shall require explicit opt-in before persisting gift lists or general search topics, and shall not transmit recipient profiles to retailers.**

The prototype implements this by accepting general topics and optional nicknames, rejecting obvious numbers/contact details in form fields, keeping recipient profiles in memory only, using a small allowlist of localStorage keys, providing a clear-data control, and never calling an external API in demo mode. **Limitations:** browser storage is unencrypted and accessible to someone with access to the device or malicious same-origin JavaScript; validation cannot guarantee all entered text is non-PII; Bootstrap CDN receives normal web request metadata; no design can guarantee zero leakage after every possible breach.

## GitHub upload (terminal in project root)
```bash
git init
git add .
git commit -m "Assignment 4 runnable privacy-first Giftlinq prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/giftlinq.git
git push -u origin main
```
Create the empty `giftlinq` GitHub repository first; replace `YOUR-USERNAME`. Do not add API secrets. Invite teammates through GitHub Settings → Collaborators.

## GitHub Pages (optional)
Repository → Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save. GitHub Pages may require a public repository depending on account settings.

## Submission
Upload **one ZIP** containing the complete project, including this README and `docs/`. Include the GitHub repository URL in the submission. See `docs/STEP_BY_STEP.md` for a complete walkthrough.
