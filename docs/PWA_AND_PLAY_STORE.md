# Installable app and Play Store listing

Politica ships as a Progressive Web App (PWA). The same site installs to the home screen on Android
and iOS, opens full-screen, and keeps visited profiles available offline. A Play Store listing wraps
this PWA with a Trusted Web Activity (TWA): one codebase, no native rewrite.

## What is in the repo

| Piece | Where |
|-------|-------|
| Web manifest (name, icons, shortcuts, theme) | `src/app/manifest.ts` → `/manifest.webmanifest` |
| Icons incl. maskable + Apple touch | `public/icons/` (generated from `src/app/icon.svg`) |
| Service worker | `public/sw.js` — cache-first for hashed assets, network-first pages with offline fallback |
| Registration (production only) | `src/components/PwaRegister.tsx` in the root layout |
| Install card on the homepage | `src/components/InstallPrompt.tsx` (Android/Chrome; iOS uses Share → Add to Home Screen) |
| Offline fallback page | `src/app/offline/page.tsx` |

Bump `VERSION` in `public/sw.js` whenever the caching strategy changes; old caches are deleted on activate.

## Publishing to Google Play (about 30 minutes, one-time)

1. Put the site on its final domain first (the TWA is bound to the origin).
2. Create a Google Play developer account (one-time fee, about USD 25).
3. Go to https://www.pwabuilder.com, enter the site URL, choose **Android**, keep the TWA defaults,
   set package id to `in.politicaindia.app` (adjust to the domain you buy), download the package.
4. The download includes `assetlinks.json`. Serve it at `public/.well-known/assetlinks.json` and deploy;
   this proves the domain owns the app so Chrome hides the browser bar.
5. Upload the `.aab` in Play Console, fill the listing (screenshots from a phone, privacy policy URL,
   content rating), submit for review.

Updates to the site reach the app automatically; the Play package only needs re-uploading when
the icon, name or package settings change.

## iOS

Safari supports install via Share → **Add to Home Screen**; the manifest and Apple touch icon are
already in place. An App Store listing needs a Capacitor wrapper and is planned with Phase C
(accounts and push notifications), when native push makes it worthwhile.

## Checking the install

- Chrome desktop: DevTools → Application → Manifest shows no warnings; "Installability" passes.
- Android Chrome: the homepage shows the install card; after install, the app opens without browser chrome.
- Offline: open a profile, switch to airplane mode, reopen the same profile — it loads. An unvisited
  profile shows the offline page.
