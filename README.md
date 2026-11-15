# Giftlinq — Assignment 4

Giftlinq is a gift recommendation website. The user enters the general interests, an age group, and a budget, and the app ranks gift ideas from a demo catalog. It is a runnable prototype built with HTML, CSS, vanilla JavaScript (ES modules), Bootstrap CSS, and browser localStorage. No backend, database, npm, or framework is required.

You may notice a couple branches that have the ebay api partially implemented. You can feel free to check those out, but they do not currently fully work. Unsure what's missing in it. The most up-to-date one doing so is `MergingEbayApi`

Repository: https://github.com/subat1064/SWE-6623---Assignment-4

## How to run it

You need a web browser, an internet connection, and any computer terminal (PyCharm, VS Code, local terminal). The app must be served over HTTP. Opening `index.html` by double-clicking will not work, because browsers block ES modules on `file://` pages.

**Option A: Python (no install needed on a Mac)**

1. Clone the repo and go into the folder:
   ```bash
   git clone https://github.com/subat1064/SWE-6623---Assignment-4.git
   cd SWE-6623---Assignment-4
   ```
2. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
   On Windows, use `python -m http.server 8000`.
3. Open **http://localhost:8000** in your browser.
4. Press `Ctrl+C` in the terminal to stop the server.

**Option B: VS Code**

1. Open the project folder in VS Code (**File → Open Folder**).
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

## Try it

1. Enter the interests `gaming, lego`, set Age group to **Child**, and set the budget to **$0 to $75**.
2. Click **Find gift ideas**.
3. Click the round teal arrow on a card to save the gift. It appears under **Saved gifts**, and the summary cards at the top update.
4. Click **Mark purchased** or **Remove** on a saved gift.
5. Click **Save profile for this tab**, then **Load** it again from the Profiles box.
6. In the sidebar, click **Remember** to save a gift, and refresh the page. Click **Clear saved data** to erase everything.

## What is finished

- Dashboard-style responsive user interface: sidebar, four summary cards (gift ideas found, saved gifts, purchased, recent searches), search form, product cards, and saved-gift list.
- Form validation for interests, nickname, and budget.
- Filtering by price and age group, and ranking by matching interests.
- Saving, removing, and marking gifts as purchased.
- Recent searches list.
- Recipient profiles kept in tab memory only.
- Opt-in localStorage for the gift list and general search topics.
- A clear-all button.
- A demo catalog of 10 gifts with price, quantity, category, condition, and description.

## What is not finished

- **Live eBay results.** `EbayAPIService` defines the methods and a response mapper, but live calls are disabled and throw an error. eBay credentials cannot be stored safely in a static page, so real search would need a secure token service or a different architecture.
- **User login.** `LoginService` is a placeholder that returns "not supported." Secure login needs a backend.
- **Real inventory, product photos, and checkout.** Mostly sample data.

## Project structure

```
index.html                    Page layout (sidebar, summary cards, form, results)
css/styles.css                Dashboard theme
fonts/                        Instrument Sans font file and its license
js/
  app.js                      Creates the objects and starts the UI
  models/
    Recipient.js              Recipient details (age group, interests, budget)
    Gift.js                   One gift and its product details
  services/
    GiftRecommender.js        Filters and ranks gifts
    RecipientManager.js       Tab-only recipient profiles
    StorageService.js         Opt-in localStorage for gifts and searches
    EbayAPIService.js         Planned eBay integration (disabled stub)
    LoginService.js           Planned login (unsupported stub)
  ui/
    UIController.js           Reads the form, renders results, handles clicks
  data/
    sampleGifts.js            Fictional demo catalog
```

**Layers:** presentation (`index.html`, `css/`, `js/ui/`), application (`js/models/`, `GiftRecommender`, `RecipientManager`, `EbayAPIService`, `LoginService`), and data (`StorageService`, `js/data/`).

## Classes and methods

| Class | Main methods | Status |
|---|---|---|
| `Recipient` | `updateDetails()` | Done |
| `Gift` | `getProductDetails()` | Done |
| `RecipientManager` | `getRecipients()`, `addRecipient()`, `editRecipient()`, `deleteRecipient()`, `clear()` | Done |
| `GiftRecommender` | `createSearchQuery()`, `filterProducts()`, `rankProducts()`, `generateRecommendations()` | Done (demo catalog only) |
| `StorageService` | `setPersistence()`, `saveGift()`, `getSavedGifts()`, `removeGift()`, `togglePurchased()`, `saveSearch()`, `getSearches()`, `clearAll()` | Done |
| `UIController` | `initialize()`, `readRecipient()`, `handleSearch()`, `displayRecommendations()`, `renderSaved()`, `renderProfiles()`, `renderSearches()`, `updateStats()` | Done |
| `EbayAPIService` | `searchProducts()`, `getProductDetails()`, `handleAPIError()`, `parseProductResponse()` | Stub (live calls disabled) |
| `LoginService` | `login()`, `logout()`, `validateCredentials()` | Stub |

## Privacy requirement (NFR-9)

The application minimizes personal information. It never stores passwords, tokens, or recipient profiles in localStorage, does not send recipient profiles to retailers.

The application accepts general topics and optional nicknames, rejects numbers and contact details in form fields, keeps profiles in memory only, allows only two localStorage keys, offers a clear-data control, and makes no external API calls in demo mode.

Our limitations include browser storage that is not encrypted and can be read by someone with access to the device. Validation cannot guarantee that every entry is free of personal information. The Bootstrap CDN receives normal web request metadata.

## AI usage statement

AI tools were used in this project. ChatGPT-6 was used by Aminah Babar for troubleshooting and guidance while setting up and testing the eBay API integration, and working through errors and getting the backend connected to the Sandbox API. Aminah did the testing and the set-up in the terminal herself. Claude was used by Subat Amin to create the user interface for the application (CSS, JavaScript), but deployment, implementation, and testing were done herself before committing the design. Ariyana Perkins used ChatGPT-6 to create an initial structure but the code was edited by the team and the AI-generated response was not our final solution.

## Team

| Member | Emails |
|---|---|
| Subat Amin | (samin3) |
| Aminah Babar | (ababar5) |
| Hunter Osborne | (hosborn7) |
| Ariyana Perkins | (aperki35) |

## Credits

- Bootstrap 5.3.3 (CSS only, loaded from the jsDelivr CDN).
- Instrument Sans font, included in `fonts/` with its license file.
