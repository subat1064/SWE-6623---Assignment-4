# Giftlinq complete source code

All project files are also available separately in this folder. Copying them individually is not necessary.

## `.gitignore`

```text
# Do not publish secrets or local system files
.env
.env.*
!.env.example
.DS_Store
node_modules/
.vscode/
*.log
```

## `README.md`

```markdown
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

The prototype implements this by accepting general topics and optional nicknames, rejecting obvious numbers/contact details in form fields, keeping recipient profiles in memory only, using a small allowlist of localStorage keys, providing a clear-data control, and never calling an external API in demo mode. **Limitations:** browser storage is unencrypted and accessible to someone with access to the device or malicious same-origin JavaScript; validation cannot guarantee all entered text is non-PII; Bootstrap CDN receives normal web request metadata; no design can guarantee zero leakage after every possible breach. See `docs/PRIVACY.md`.

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
Upload **one ZIP** containing the complete project, including this README and `docs/`. Include the GitHub repository URL in the submission. See `docs/STEP_BY_STEP.md` for a complete walkthrough and `docs/TEST_PLAN.md` for verification.
```

## `css/styles.css`

```css
body{background:#f6f7fb;color:#17243b;font-family:system-ui,-apple-system,sans-serif}.hero{background:linear-gradient(120deg,#253d7a,#65499c);color:white}.hero h1{font-weight:750}.card{border:1px solid #e7eaf0;border-radius:16px}.gift{padding:1rem 0;border-bottom:1px solid #e7eaf0}.gift:last-child{border-bottom:0}.gift h3{font-size:1.05rem;font-weight:700}.chip{display:inline-block;background:#e9f2ff;border-radius:30px;padding:.2rem .65rem;font-size:.8rem;margin-right:.5rem}.btn-primary{background:#344da3;border-color:#344da3}.btn-primary:hover{background:#293c83}.mini-row{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;border-bottom:1px solid #edf0f5;padding:.6rem 0}.mini-row span{flex:1;min-width:160px}
```

## `docs/PRIVACY.md`

```markdown
# Privacy implementation and threat limits

## NFR-9 — privacy and data minimization
The application shall minimize personal information collection; shall never store passwords, tokens, or recipient profiles in localStorage; shall require explicit opt-in before persisting saved gift lists and general search topics; and shall not transmit recipient profiles to retailers.

## Implemented safeguards
1. No login, email, address, birth date, payment details, or authentication secrets are requested.
2. Nicknames are optional and profiles are **RAM-only**; they disappear on reload. Validation rejects digits and `@` in nicknames; it is not a comprehensive PII detector.
3. Search interests accept 1–5 short, letter-only general categories. Search history stores topics and price ranges only, never nickname, age, or relationship.
4. localStorage keys are allowlisted to `giftlinq_v3_gifts`, `giftlinq_v3_searches`, and `giftlinq_v3_consent`. Persistent storage is off by default and can be disabled or cleared.
5. Gift lists store only product ID, title, price, and purchased flag.
6. UI uses `textContent`, not `innerHTML`, for user and product strings; scripts are limited to same-origin by a basic CSP. Avoid adding untrusted scripts.
7. Demo mode makes **zero eBay API requests** and does not transmit recipient profiles to third parties. No analytics or advertising scripts are included.
8. No secrets are committed to GitHub. `.gitignore` excludes `.env` files.
9. `Clear saved data` also removes known `giftlinq_v1_` and `giftlinq_v2_` localStorage keys used by previous prototypes on the same origin.

## What is NOT guaranteed
- localStorage is not encrypted, and another person with device/browser access or a successful same-origin XSS can read it.
- The Bootstrap CDN still receives the browser's normal request metadata (e.g., IP address). Self-hosting Bootstrap CSS would avoid that third-party request.
- A static app cannot promise zero PII leaks under every conceivable breach. Users could type identifying text as a topic even with restrictions.
- CSP in an HTML meta tag is a defense-in-depth measure, not a substitute for secure headers; some directives (such as frame-ancestors) cannot be enforced through a meta tag.
- A future eBay integration must send only generic search terms and budget, never profile identifiers. Its OAuth credentials cannot safely be embedded in client-side JS.

## Demonstration for the professor
1. Open browser DevTools → Application → Local Storage; search without checking Remember: no `giftlinq_v3_searches` key is created.
2. Save a gift and profile, refresh: they disappear by default.
3. Check Remember; save a gift and search, refresh: gift list and search topics persist; profiles do not.
4. Inspect the storage values: no nickname, age, relationship, passwords, email, or address is stored.
5. Click Clear saved data and verify the `giftlinq_v3_` keys are removed.
6. Open DevTools → Network; perform a search and confirm there are no calls to eBay or third-party data endpoints.
```

## `docs/STEP_BY_STEP.md`

```markdown
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
5. Test **Remember** on and off, then **Clear saved data**. Use `docs/TEST_PLAN.md`.

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
```

## `docs/TEST_PLAN.md`

```markdown
# Manual acceptance tests
| ID | Action | Expected result |
|---|---|---|
| T1 | Open website using VS Code Live Server | Page loads without console errors |
| T2 | Search `gaming, lego`, age Child, $0–75 | Sample recommendations appear |
| T3 | Search with maximum less than minimum | Validation message appears |
| T4 | Search with an email or numbers in interests | Validation rejects input |
| T5 | Save gift, mark purchased, remove | Saved list updates correctly |
| T6 | Save profile and load it | Form repopulates in current tab |
| T7 | Save profile, reload | Profile disappears (privacy design) |
| T8 | Without Remember, save/search and reload | Saved gifts and searches disappear |
| T9 | Enable Remember, save/search and reload | Gifts and general search topics persist |
| T10 | Click Clear saved data | Data and consent keys removed |
| T11 | Check DevTools Network during search | No live eBay API request |
| T12 | Resize browser to mobile width | Layout remains usable |

Run and record the actual results before submission. These are **test cases**, not a claim that all browser tests were executed.
```

## `index.html`

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="referrer" content="no-referrer">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' https://cdn.jsdelivr.net; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'">
  <title>Giftlinq | Gift ideas</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
<header class="hero"><div class="container py-4"><h1>🎁 Giftlinq</h1><p class="mb-0">Thoughtful gift ideas, without sharing personal details.</p></div></header>
<main class="container py-4">
  <div id="notice" role="status" aria-live="polite" class="alert alert-info">Demo catalog: prices and items are examples, not live eBay offers.</div>
  <div class="row g-4">
    <section class="col-lg-5"><div class="card shadow-sm"><div class="card-body">
      <h2 class="h5">Find a gift</h2>
      <form id="gift-form">
        <label for="nickname" class="form-label">Recipient nickname (optional; no real names)</label>
        <input id="nickname" class="form-control" maxlength="40" autocomplete="off" placeholder="e.g., Cousin">
        <label for="age" class="form-label mt-3">Age group</label>
        <select id="age" class="form-select"><option value="all">Any</option><option value="child">Child</option><option value="teen">Teen</option><option value="adult">Adult</option></select>
        <label for="relationship" class="form-label mt-3">Relationship</label>
        <select id="relationship" class="form-select"><option value="">Prefer not to say</option><option value="family">Family</option><option value="friend">Friend</option><option value="coworker">Coworker</option><option value="other">Other</option></select>
        <label for="interests" class="form-label mt-3">Interests (comma-separated, general topics only)</label>
        <input id="interests" class="form-control" maxlength="120" required autocomplete="off" placeholder="gaming, books, cooking">
        <div class="row mt-3"><div class="col"><label for="min-price" class="form-label">Minimum ($)</label><input id="min-price" class="form-control" type="number" min="0" max="10000" step="1" value="0" required></div><div class="col"><label for="max-price" class="form-label">Maximum ($)</label><input id="max-price" class="form-control" type="number" min="0" max="10000" step="1" value="100" required></div></div>
        <button class="btn btn-primary w-100 mt-3" type="submit">Find gift ideas</button>
      </form>
      <div class="d-flex flex-wrap gap-2 mt-3"><button id="save-profile" class="btn btn-outline-secondary btn-sm" type="button">Save profile for this tab</button><button id="clear-data" class="btn btn-outline-danger btn-sm" type="button">Clear saved data</button></div>
      <div class="form-check mt-3"><input class="form-check-input" id="remember" type="checkbox"><label for="remember" class="form-check-label">Remember gift list and general search topics on this device (optional; not encrypted)</label></div>
      <p class="small text-muted mt-2">Recipient profiles are never written to localStorage. Only gift catalog details and general search topics may be remembered when you opt in.</p>
      <h3 class="h6 mt-4">Profiles (this tab only)</h3><div id="profiles"></div>
      <h3 class="h6 mt-3">Recent searches</h3><div id="searches"></div>
    </div></div></section>
    <section class="col-lg-7">
      <div class="card shadow-sm mb-4"><div class="card-body"><div class="d-flex justify-content-between align-items-center"><h2 class="h5">Gift recommendations</h2><span id="count" class="small text-muted"></span></div><div id="results" aria-live="polite">Search to see sample recommendations.</div></div></div>
      <div class="card shadow-sm"><div class="card-body"><h2 class="h5">Saved gifts</h2><div id="saved-gifts"></div></div></div>
    </section>
  </div>
  <p class="small text-muted mt-4">Privacy: no account, passwords, payment details, analytics, or recipient information is sent to a retailer in this prototype. Do not enter names, addresses, health details, or other sensitive information. Browser storage is not secure against device access or malicious same-origin scripts.</p>
</main>
</body></html>
```

## `js/app.js`

```javascript
import {StorageService} from './services/StorageService.js';
import {RecipientManager} from './services/RecipientManager.js';
import {GiftRecommender} from './services/GiftRecommender.js';
import {EbayAPIService} from './services/EbayAPIService.js';
import {UIController} from './ui/UIController.js';
const storage=new StorageService();
const recipientManager=new RecipientManager();
const recommender=new GiftRecommender(new EbayAPIService());
new UIController({storage,recipientManager,recommender}).initialize();
```

## `js/data/sampleGifts.js`

```javascript
// Fictional demo catalog. No retailer requests are made.
export const sampleGifts = [
  {id:'g1',title:'Creative Building Blocks Set',price:34.99,category:'Toys',condition:'New',quantity:12,age:'child',tags:['lego','building','gaming'],description:'Colorful creative building kit.'},
  {id:'g2',title:'Wireless Gaming Headset',price:59.99,category:'Electronics',condition:'New',quantity:8,age:'all',tags:['gaming','technology','music'],description:'Comfortable over-ear headset.'},
  {id:'g3',title:'Illustrated Adventure Book',price:19.99,category:'Books',condition:'New',quantity:22,age:'child',tags:['books','reading','stories'],description:'Illustrated adventure stories.'},
  {id:'g4',title:'Beginner Painting Kit',price:29.50,category:'Arts',condition:'New',quantity:16,age:'all',tags:['art','painting','crafts'],description:'Brushes and starter paints.'},
  {id:'g5',title:'Cooking Essentials Set',price:44.00,category:'Kitchen',condition:'New',quantity:11,age:'adult',tags:['cooking','food','baking'],description:'Everyday kitchen utensils.'},
  {id:'g6',title:'Portable Bluetooth Speaker',price:49.99,category:'Electronics',condition:'New',quantity:10,age:'all',tags:['music','technology','outdoors'],description:'Compact portable speaker.'},
  {id:'g7',title:'Strategy Board Game',price:24.99,category:'Games',condition:'New',quantity:17,age:'teen',tags:['games','gaming','puzzles'],description:'A tabletop strategy game.'},
  {id:'g8',title:'Indoor Herb Garden Kit',price:27.99,category:'Home',condition:'New',quantity:9,age:'adult',tags:['gardening','plants','cooking'],description:'Starter kit for growing herbs.'},
  {id:'g9',title:'Fitness Resistance Bands',price:18.00,category:'Fitness',condition:'New',quantity:30,age:'adult',tags:['fitness','sports','exercise'],description:'Set of exercise bands.'},
  {id:'g10',title:'Jigsaw Puzzle Collection',price:21.99,category:'Games',condition:'New',quantity:15,age:'all',tags:['puzzles','art','games'],description:'Relaxing multi-puzzle collection.'}
];
```

## `js/models/Gift.js`

```javascript
export class Gift {
  constructor(item={}){Object.assign(this,item);}
  getProductDetails(){return {id:this.id,title:this.title,price:this.price,category:this.category,condition:this.condition,quantity:this.quantity,description:this.description};}
}
```

## `js/models/Recipient.js`

```javascript
export class Recipient {
  constructor({id, nickname='',age='all',relationship='',interests=[],minPrice=0,maxPrice=100}={}) {
    this.id=id||('r'+Date.now().toString(36)+Math.random().toString(36).slice(2,7));
    this.nickname=nickname;this.age=age;this.relationship=relationship;
    this.interests=[...interests];this.minPrice=Number(minPrice);this.maxPrice=Number(maxPrice);
  }
  updateDetails(changes){Object.assign(this,changes);return this;}
}
```

## `js/services/EbayAPIService.js`

```javascript
// Integration boundary for the planned eBay Browse API.
// No OAuth token or client secret may be placed in a public GitHub Pages app.
// Live calls are intentionally disabled until a secure token service exists.
export class EbayAPIService {
  async searchProducts(query,filters={}){void query;void filters;throw new Error('Live eBay search is unavailable in the static-only build. Use demo recommendations.');}
  async getProductDetails(itemId){void itemId;throw new Error('Live eBay product details are not configured.');}
  handleAPIError(response){throw new Error('eBay request failed: '+response.status);}
  // Future fetch/JSON mapping method; only accepts non-sensitive catalog response data.
  parseProductResponse(json){return (json.itemSummaries||[]).map(item=>({id:item.itemId,title:item.title,price:Number(item.price?.value),quantity:undefined,condition:item.condition||'Unknown',description:item.shortDescription||'',category:'eBay',age:'all',tags:[]}));}
}
```

## `js/services/GiftRecommender.js`

```javascript
import {sampleGifts} from '../data/sampleGifts.js';
import {Gift} from '../models/Gift.js';
export class GiftRecommender {
  constructor(apiService){this.apiService=apiService;}
  createSearchQuery(recipient){return recipient.interests.join(' ');}
  filterProducts(items,recipient){return items.filter(p=>p.price>=recipient.minPrice&&p.price<=recipient.maxPrice&&(recipient.age==='all'||p.age==='all'||p.age===recipient.age));}
  rankProducts(items,recipient){return items.map(item=>({...item,matchScore:item.tags.filter(tag=>recipient.interests.some(interest=>tag.includes(interest)||interest.includes(tag))).length})).sort((a,b)=>b.matchScore-a.matchScore||a.price-b.price);}
  async generateRecommendations(recipient,{live=false}={}){const items=live?await this.apiService.searchProducts(this.createSearchQuery(recipient),recipient):sampleGifts;
    return this.rankProducts(this.filterProducts(items,recipient),recipient).map(item=>new Gift(item));}
}
```

## `js/services/LoginService.js`

```javascript
// Assignment 2 mentioned login, but secure login is outside the static-only proposal.
// This class preserves the designed interface without collecting passwords.
export class LoginService {
  login(){throw new Error('Login is not supported in this no-backend prototype.');}
  logout(){return true;}
  validateCredentials(){return false;}
}
```

## `js/services/RecipientManager.js`

```javascript
import {Recipient} from '../models/Recipient.js';
// Profiles are deliberately kept in RAM, never in localStorage.
export class RecipientManager {
  constructor(){this.profiles=[];}
  getRecipients(){return this.profiles.map(p=>new Recipient(p));}
  addRecipient(data){if(this.profiles.length>=20)throw new Error('Limit: 20 profiles per tab');const r=new Recipient(data);this.profiles.push(r);return r;}
  editRecipient(id,changes){const p=this.profiles.find(p=>p.id===id);if(p)p.updateDetails(changes);return p||null;}
  deleteRecipient(id){this.profiles=this.profiles.filter(p=>p.id!==id);}
  clear(){this.profiles=[];}
}
```

## `js/services/StorageService.js`

```javascript
// Consent-gated localStorage. Never store passwords, tokens, names or profiles.
export class StorageService {
  constructor(){this.prefix='giftlinq_v3_';this.allowed=new Set(['gifts','searches']);this.memory=new Map();this.persist=false;
    try{this.persist=localStorage.getItem(this.prefix+'consent')==='yes';}catch{this.persist=false;}
  }
  setPersistence(enabled){
    this.persist=Boolean(enabled);
    try{
      if(this.persist){localStorage.setItem(this.prefix+'consent','yes');for(const key of this.allowed)localStorage.setItem(this.prefix+key,JSON.stringify(this.getData(key)));}
      else{for(const key of this.allowed)localStorage.removeItem(this.prefix+key);localStorage.removeItem(this.prefix+'consent');}
    }catch{this.persist=false;throw new Error('Browser storage is unavailable. Data will remain in this tab only.');}
  }
  getData(key){this.assertKey(key);if(this.memory.has(key))return structuredClone(this.memory.get(key));
    if(this.persist){try{const raw=localStorage.getItem(this.prefix+key);if(raw){const data=JSON.parse(raw);if(Array.isArray(data))return data;}}catch{}}
    return [];
  }
  saveData(key,items){this.assertKey(key);if(!Array.isArray(items))throw new Error('Invalid saved data');this.memory.set(key,structuredClone(items));
    if(this.persist){try{localStorage.setItem(this.prefix+key,JSON.stringify(items));}catch{throw new Error('Could not save data on this device.');}}
  }
  assertKey(key){if(!this.allowed.has(key))throw new Error('Unsupported data type');}
  saveGift(gift){const gifts=this.getSavedGifts();const safe={id:String(gift.id).slice(0,80),title:String(gift.title).slice(0,120),price:Number(gift.price),purchased:false};
    if(!gifts.some(g=>g.id===safe.id)){gifts.push(safe);this.saveData('gifts',gifts.slice(-50));}return this.getSavedGifts();}
  getSavedGifts(){return this.getData('gifts');}
  removeGift(id){this.saveData('gifts',this.getSavedGifts().filter(g=>g.id!==id));}
  togglePurchased(id){this.saveData('gifts',this.getSavedGifts().map(g=>g.id===id?{...g,purchased:!g.purchased}:g));}
  saveSearch(search){const safe={topics:search.interests.slice(0,5),minPrice:search.minPrice,maxPrice:search.maxPrice};
    const searches=this.getData('searches');searches.unshift(safe);this.saveData('searches',searches.slice(0,10));}
  getSearches(){return this.getData('searches');}
  clearAll(){this.memory.clear();try{for(const key of this.allowed)localStorage.removeItem(this.prefix+key);localStorage.removeItem(this.prefix+'consent');
    // Also remove known older Giftlinq storage keys from earlier prototypes.
    for(let i=localStorage.length-1;i>=0;i--){const key=localStorage.key(i);if(key&&/^giftlinq_v[12]_/.test(key))localStorage.removeItem(key);}}
    catch{}this.persist=false;}
}
```

## `js/ui/UIController.js`

```javascript
import {Recipient} from '../models/Recipient.js';
const $=id=>document.getElementById(id);
export class UIController {
  constructor({storage,recipientManager,recommender}){Object.assign(this,{storage,recipientManager,recommender});}
  initialize(){
    $('gift-form').addEventListener('submit',e=>this.handleSearch(e));
    $('save-profile').addEventListener('click',()=>this.saveRecipient());
    $('remember').checked=this.storage.persist;
    $('remember').addEventListener('change',e=>{try{this.storage.setPersistence(e.target.checked);this.showMessage(e.target.checked?'Saving enabled for this device.':'Persistent storage disabled and removed.','success');}catch(err){e.target.checked=false;this.showMessage(err.message,'danger');}});
    $('clear-data').addEventListener('click',()=>{if(confirm('Clear all saved Giftlinq gifts, searches, and tab-only profiles?')){this.storage.clearAll();this.recipientManager.clear();$('remember').checked=false;this.renderSaved();this.renderProfiles();this.renderSearches();this.showMessage('Giftlinq data cleared.','success');}});
    this.renderSaved();this.renderProfiles();this.renderSearches();
  }
  showMessage(message,type='info'){$('notice').className='alert alert-'+type;$('notice').textContent=message;}
  readRecipient(){
    const nickname=$('nickname').value.trim();
    if(nickname&&(/[@\d]/.test(nickname)||nickname.length>40))throw new Error('Use a generic nickname without numbers or contact details.');
    const interests=$('interests').value.toLowerCase().split(',').map(x=>x.trim()).filter(Boolean);
    // Allow simple category words only: no emails, URLs, digits, or contact details.
    if(!interests.length||interests.length>5||interests.some(x=>!(/^[a-z][a-z -]{1,23}$/.test(x))))throw new Error('Enter 1–5 general interest topics using letters only (e.g., gaming, books).');
    const minPrice=Number($('min-price').value),maxPrice=Number($('max-price').value);
    if(!$('min-price').value||!$('max-price').value||!Number.isFinite(minPrice)||!Number.isFinite(maxPrice)||minPrice<0||maxPrice<minPrice||maxPrice>10000)throw new Error('Enter a valid budget between $0 and $10,000.');
    return new Recipient({nickname,age:$('age').value,relationship:$('relationship').value,interests,minPrice,maxPrice});
  }
  async handleSearch(event){event.preventDefault();try{const recipient=this.readRecipient();const gifts=await this.recommender.generateRecommendations(recipient);this.displayRecommendations(gifts);this.storage.saveSearch(recipient);this.renderSearches();this.showMessage('Showing '+gifts.length+' demo gift ideas (not live listings).','success');}catch(error){this.showMessage(error.message,'danger');}}
  displayRecommendations(gifts){const root=$('results');root.replaceChildren();$('count').textContent=gifts.length+' results';if(!gifts.length){root.textContent='No gifts match. Try a different budget or age group.';return;}
    for(const gift of gifts){const card=document.createElement('article');card.className='gift';const title=document.createElement('h3');title.textContent=gift.title;const detail=document.createElement('p');detail.textContent=`$${gift.price.toFixed(2)} · ${gift.category} · ${gift.condition} · ${gift.quantity} available (sample) · ${gift.description}`;
      const chip=document.createElement('span');chip.className='chip';chip.textContent=gift.matchScore+' matching interest(s)';const button=this.button('Save gift','btn btn-sm btn-outline-primary',()=>{try{this.storage.saveGift(gift.getProductDetails());this.renderSaved();this.showMessage('Gift added to saved list.','success');}catch(err){this.showMessage(err.message,'danger');}});card.append(title,detail,chip,button);root.append(card);}}
  button(label,classes,handler){const button=document.createElement('button');button.type='button';button.className=classes;button.textContent=label;button.addEventListener('click',handler);return button;}
  renderSaved(){const root=$('saved-gifts');root.replaceChildren();const gifts=this.storage.getSavedGifts();if(!gifts.length){root.textContent='No gifts saved yet.';return;}
    for(const gift of gifts){const row=document.createElement('div');row.className='mini-row';const text=document.createElement('span');text.textContent=(gift.purchased?'✓ ':'')+gift.title+' — $'+Number(gift.price).toFixed(2);row.append(text,this.button(gift.purchased?'Undo purchased':'Mark purchased','btn btn-sm btn-outline-secondary',()=>{this.storage.togglePurchased(gift.id);this.renderSaved();}),this.button('Remove','btn btn-sm btn-outline-danger',()=>{this.storage.removeGift(gift.id);this.renderSaved();}));root.append(row);}}
  saveRecipient(){try{this.recipientManager.addRecipient(this.readRecipient());this.renderProfiles();this.showMessage('Profile saved in this tab only; not written to browser storage.','success');}catch(error){this.showMessage(error.message,'danger');}}
  renderProfiles(){const root=$('profiles');root.replaceChildren();const profiles=this.recipientManager.getRecipients();if(!profiles.length){root.textContent='No tab-only profiles.';return;}
    for(const p of profiles){const row=document.createElement('div');row.className='mini-row';const text=document.createElement('span');text.textContent=(p.nickname||'Unnamed')+' — '+p.interests.join(', ');row.append(text,this.button('Load','btn btn-sm btn-outline-secondary',()=>this.loadRecipient(p)),this.button('Delete','btn btn-sm btn-outline-danger',()=>{this.recipientManager.deleteRecipient(p.id);this.renderProfiles();}));root.append(row);}}
  loadRecipient(p){$('nickname').value=p.nickname;$('age').value=p.age;$('relationship').value=p.relationship;$('interests').value=p.interests.join(', ');$('min-price').value=p.minPrice;$('max-price').value=p.maxPrice;}
  renderSearches(){const root=$('searches');root.replaceChildren();const searches=this.storage.getSearches();if(!searches.length){root.textContent='No searches yet.';return;}
    for(const s of searches){const row=document.createElement('div');row.className='mini-row';const text=document.createElement('span');text.textContent=s.topics.join(', ')+' · $'+s.minPrice+'–$'+s.maxPrice;row.append(text);root.append(row);}}
  displaySavedGifts(){this.renderSaved();}
}
```
