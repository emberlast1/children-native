# Store assets

Place optional marketing files here (not required for build):

```
store-assets/
  screenshots/
    android-phone/
    ios-iphone/
    ios-ipad/
  feature-graphic-1024x500.png   # Google Play — npm run generate:feature-graphic
```

Build-time icons are generated into `assets/`:

- `icon.png` — 1024×1024
- `adaptive-icon.png` — 1024×1024
- `splash-icon.png` — 512×512

Regenerate:

```bash
npm run prepare:store-assets
```

See [STORE_PUBLISHING.md](STORE_PUBLISHING.md) for full release guide.
