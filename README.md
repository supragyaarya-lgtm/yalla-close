# Yalla Close — Deploy Guide (100% Free)

Your UAE Sales CRM, ready to put online. This guide gets you a real link
(like `yalla-close.vercel.app`) that you can open on any phone or laptop and
share with anyone — for free.

There are two parts: **(A)** get a free AI key, **(B)** put the app online.
Total time: about 15 minutes. No coding needed.

---

## What you're deploying

- **Hosting:** Vercel — free, no credit card.
- **AI follow-up button:** Google Gemini free tier — free, no credit card,
  ~250 messages/day (plenty for one person).
- **Everything else** (leads, board, search, CSV, PDF) works offline in the
  browser and costs nothing.

Your data stays in the browser of whoever uses the app (localStorage). The AI
key is stored safely on the server, never in the app code.

---

## PART A — Get your free Gemini key (5 min)

1. Go to **https://aistudio.google.com/apikey**
2. Sign in with any Google account.
3. Click **"Create API key"** → choose "Create API key in new project".
4. Copy the key (it starts with `AIza...`). Keep it somewhere safe for a moment.

> No credit card is required for the free tier.

---

## PART B — Put the app online with Vercel

You have two ways. **Path 1 needs no terminal** — use it if you're not a
developer. Path 2 is faster if you're comfortable with a terminal.

### Path 1 — No terminal (recommended for most people)

**Step 1: Put the code on GitHub**
1. Create a free account at **https://github.com** (skip if you have one).
2. Click the **+** (top right) → **New repository**.
3. Name it `yalla-close`, keep it **Public** or Private, click **Create repository**.
4. On the new repo page, click **"uploading an existing file"**.
5. Unzip the project I gave you, then **drag the folder's contents** (the
   `api`, `src` folders and the loose files like `package.json`, `index.html`,
   etc.) into the upload box. Do **not** upload the `node_modules` or `dist`
   folders if they exist.
6. Click **Commit changes**.

**Step 2: Deploy on Vercel**
1. Go to **https://vercel.com** → **Sign Up** → **Continue with GitHub**.
2. Click **Add New… → Project**.
3. Find `yalla-close` in the list → click **Import**.
4. Before clicking Deploy, open **Environment Variables** and add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** paste the `AIza...` key from Part A
   - Click **Add**.
5. Click **Deploy**. Wait ~1 minute.
6. Done — Vercel shows your live link. Click **Visit**.

> If you ever add the key *after* deploying, go to **Settings → Environment
> Variables**, add it, then **Deployments → ⋯ → Redeploy**.

### Path 2 — Terminal (for developers)

```bash
# 1. Install Node.js 18+ from https://nodejs.org if you don't have it
npm install -g vercel        # install the Vercel CLI

# 2. In the unzipped project folder:
vercel                        # log in + create the project (accept defaults)
vercel env add GEMINI_API_KEY # paste your AIza... key, choose all environments
vercel --prod                 # deploy to production, prints your live URL
```

---

## Testing it locally (optional)

- **CRM only** (no AI): `npm install` then `npm run dev` → open the localhost
  link. Leads, board, search, CSV, PDF all work.
- **With the AI button:** the AI needs the server function, so locally run
  `vercel dev` instead of `npm run dev`, after creating a `.env` file
  (copy `.env.example` to `.env` and paste your key). Easiest option is just to
  test the AI button on the live Vercel link.

---

## Updating the app later

- **Path 1:** edit/upload files on GitHub → Vercel redeploys automatically.
- **Path 2:** run `vercel --prod` again.

---

## Security notes (important)

- Your key lives only in Vercel's settings (and your private `.env` if testing
  locally). It is **never** in the GitHub code, so it can't leak from the repo.
- The included `.gitignore` keeps `.env` out of GitHub automatically.
- Optional but smart: in Google Cloud Console, restrict the key to the
  "Generative Language API" only, so a leaked key can't be abused elsewhere.

---

## Quick troubleshooting

- **AI button says "Server is missing GEMINI_API_KEY"** → you didn't add the
  env var, or didn't redeploy after adding it. Fix in Vercel → Settings →
  Environment Variables → then redeploy.
- **AI button fails with a quota error** → you hit the free daily limit
  (~250/day). It resets the next day.
- **PDF button does nothing** → it loads a library on first click; give it a
  second and check your internet.

That's it. Yalla, close some deals. ✌️🇦🇪
