# ❌ Wrong German Proverbs as a Service

![Wrong German Proverbs Banner](assets/imgs/IMG_4152.JPG)

<!-- GitAds-Verify: 69PXW7NERTRSAFEOI7BXZRPOA28PHGXW -->

## GitAds Sponsored
[![Sponsored by GitAds](https://gitads.dev/v1/ad-serve?source=eliasschr/wrong-german-proverbs-as-a-service@github)](https://gitads.dev/v1/ad-track?source=eliasschr/wrong-german-proverbs-as-a-service@github)

Eine kleine API, die zufällige, absichtlich falsche deutsche Sprichwörter zurückgibt.

## 🚀 API

**Gehostete Variante:**

```txt
https://wrong-german-proverbs-as-a-service.onrender.com/get
```

**Basis-URL (self-hosted):**

```txt
http://localhost:3000
```

### Endpoints

- `GET /api` – API-Info und verfügbare Endpoints
- `GET /healthz` – Health-Check
- `GET /get` – gibt ein zufälliges falsches Sprichwort zurück

### Beispielantwort

```json
{
  "proverb": "Alles kann, Nussmix."
}
```

## 🛠️ Self-Hosting

Alle Schritte, um das Projekt lokal selbst zu hosten:

### 1) Repository klonen

```bash
git clone https://github.com/eliasschr/wrong-german-proverbs-as-a-service.git
cd wrong-german-proverbs-as-a-service
```

### 2) Abhängigkeiten installieren

```bash
npm install
```

### 3) Server starten

```bash
npm start
```

Danach läuft die API unter:

```txt
http://localhost:3000/get
```

### 4) Optional: eigenen Port setzen

```bash
PORT=5000 npm start
```

### 5) Optional: Smoke-Test ausführen

```bash
npm run test:smoke
```

## ☁️ Render-Hinweis

Wenn du auf Render deployst, setze den **Health Check Path** auf:

```txt
/healthz
```

## 📁 Projektstruktur

```txt
wrong-german-proverbs-as-a-service/
├── index.js
├── proverbs.json
├── scripts/
│   └── smoke-test.sh
├── public/
└── README.md
```

## 🙌 Shoutout

Großer Respekt und Dank an den ursprünglichen Ersteller **hotheadhacker** und das ursprüngliche Projekt, auf dem diese Variante aufbaut.

## 📄 Lizenz

MIT — do whatever, just don’t say yes when you should say no.
