# Deployment

The site lives at **https://bella-voyage.vercel.app**.  The production
URL is hard-wired in two places:

- `scripts/generate-qr.mjs`  → encodes the URL into the QR code
- `app/qr/page.tsx`           → server-renders the same QR inline on `/qr`
- `vercel.json`               → publishes legacy redirects (`/trip`, `/welcome` → `/`)

If the production URL ever changes, update those, run `npm run gen:qr`,
commit, and push.

---

## How deploys actually run

There are **two redundant paths**, in priority order.

### 1. Vercel's Git integration (primary)

This is the simplest, lowest-friction path.  When wired up, every push
to `master` builds and ships in ~60 seconds, no GitHub Actions involved.

**One-time setup** (≤ 30 seconds in the Vercel dashboard):

1. Open https://vercel.com/dashboard → click the **bella-voyage** project.
2. If you see a **Connect Git** button at the top of the Production
   Deployment card, click it.  Otherwise: **Settings → Git**.
3. Pick **GitHub**, authorize Vercel if prompted, choose
   `argusagent/bella-voyage`.
4. **Production Branch** = `master`.  Save.

Vercel will detect the latest commit on master and deploy immediately.
You can watch progress in the **Deployments** tab.

### 2. GitHub Actions fallback (`.github/workflows/deploy.yml`)

If Vercel's Git webhooks ever break (this is what happened on the
initial setup — Vercel was disconnected and pushes silently no-opped),
this workflow takes over.  It runs `vercel build && vercel deploy --prod`
from CI on every push to `master`.

**One-time setup** (~3 minutes):

1. Go to https://vercel.com/account/tokens and create a token named
   `bella-voyage-ci`.  Copy the token.
2. From your laptop in a clone of this repo:
   ```
   npx vercel link --yes
   cat .vercel/project.json
   ```
   That prints the org ID and project ID Vercel assigns.
3. In GitHub: **Settings → Secrets and variables → Actions → New
   repository secret**.  Add three secrets:

   | Secret name           | Value                                           |
   | --------------------- | ----------------------------------------------- |
   | `VERCEL_TOKEN`        | the token from step 1                           |
   | `VERCEL_ORG_ID`       | the `orgId` value from `.vercel/project.json`   |
   | `VERCEL_PROJECT_ID`   | the `projectId` value from `.vercel/project.json` |

After those three secrets exist, every push to `master` triggers the
Action, which builds and deploys.  If any secret is missing, the
workflow exits cleanly with a notice — no failure noise.

---

## CI sanity check

`.github/workflows/ci.yml` runs typecheck + production build on every
push to non-master branches and every PR targeting master.  This means
a broken commit can't reach master in the first place — the PR's CI
check goes red and you can't merge until it's fixed.  No environment
variables or secrets needed.

---

## Verify a deploy worked

Two checks — both should match what's in `master`:

```
curl -sI https://bella-voyage.vercel.app/ | head -1
# → HTTP/2 200

curl -s https://bella-voyage.vercel.app/ | grep -oE '>(Trip|Lodging|Flights|Itinerary)<'
# → >Trip< >Lodging< >Flights< >Itinerary<

curl -sI https://bella-voyage.vercel.app/qr | head -1
# → HTTP/2 200

curl -sI https://bella-voyage.vercel.app/bella-voyage-qr.png | head -1
# → HTTP/2 200
```

If any of those return 404 or show old text, your local clone has
commits Vercel hasn't built yet — check **Deployments** in Vercel for
the SHA, or check the **Actions** tab in GitHub for the workflow run.
