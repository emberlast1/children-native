# Публікація ChildrenEng у Google Play та App Store

Покроковий гайд для релізу **без** створення акаунтів розробника (Apple Developer / Google Play Console — на вашому боці).

---

## Що вже підготовлено в проєкті

| Елемент | Статус |
|---------|--------|
| `app.json` | Bundle ID / package name, іконки, splash, permissions, encryption flag |
| `eas.json` | Production build (AAB для Android), auto-increment версій, submit profiles |
| `assets/icon.png` | 1024×1024 — іконка для iOS і Android |
| `assets/adaptive-icon.png` | 1024×1024 — foreground для Android adaptive icon |
| `assets/splash-icon.png` | 512×512 — splash screen |
| `scripts/prepare-store-assets.mjs` | Перегенерація іконок з джерельного PNG |
| `docs/PRIVACY_POLICY.md` | Текст політики конфіденційності (потрібен публічний URL) |
| `docs/STORE_LISTING.md` | Готові описи для сторів |
| npm-скрипти | `build:android`, `build:ios`, `submit:*` |

**Bundle ID / Package name:** `com.emberlast.ChildrenEng`  
**Версія:** `1.0.0` (збірки на EAS auto-increment для build number / version code)

---

## 1. Передумови

1. **Node.js** і залежності:
   ```bash
   cd ChildrenEng
   npm install
   ```
2. **EAS CLI** (глобально або через `npx`):
   ```bash
   npm install -g eas-cli
   eas login
   ```
3. Проєкт уже прив’язаний до EAS (`projectId` у `app.json`).
4. Акаунти розробника Apple / Google — **ваша частина** (пропускаємо тут).

---

## 2. Іконка та splash (за потреби)

За замовчуванням іконки згенеровані з `assets/images/games.png` (центральний crop 1024×1024).

Щоб замінити на власний арт:

1. Покладіть PNG (бажано ≥1024 px по меншій стороні) у `assets/images/`.
2. Запустіть:
   ```bash
   npm run prepare:store-assets
   # або з іншим файлом:
   node scripts/prepare-store-assets.mjs assets/images/your-icon-source.png
   ```

**Вимоги магазинів:**
- iOS: 1024×1024 PNG, без прозорості, без заокруглених кутів (система зробить сама)
- Android adaptive icon: foreground 1024×1024, важливий контент у центральному колі ~66%

---

## 3. Політика конфіденційності (обов’язково)

Обидва магазини вимагають **HTTPS URL** на політику конфіденційності.

Текст — у [`PRIVACY_POLICY.md`](PRIVACY_POLICY.md). Варіанти хостингу:

- GitHub Pages з цього репозиторію
- Notion / сайт-візитка
- Будь-який статичний хостинг

> Замініть `YOUR_CONTACT_EMAIL` у політиці на ваш email підтримки.

**Для дитячого застосунку:** у політиці зазначено, що дані не збираються, реклами немає, акаунт не потрібен — це спрощує форми Data safety / App Privacy.

---

## 4. Скріншоти для сторів

Підготуйте скріншоти з реального пристрою або емулятора.

| Платформа | Розміри (мінімум) |
|-----------|-------------------|
| **Google Play** | Phone: 1080×1920 або 1920×1080 (мін. 2 скріншоти). Tablet — за бажанням. |
| **App Store** | iPhone 6.7": 1290×2796. iPad — якщо `supportsTablet: true` (у нас увімкнено). |

Рекомендовані екрани для знімків:

1. Welcome / головне меню  
2. Learn words (наприклад Animals або Alphabet)  
3. Одна з ігор (Memory, Math, Sort it)

Збережіть у `store-assets/screenshots/` (папку створіть самостійно — в git не комітиться за замовчуванням, якщо великі).

---

## 5. Перший production build (EAS)

### Android (AAB для Google Play)

```bash
cd ChildrenEng
npm run build:android
```

EAS збере **Android App Bundle** (`.aab`) — формат, який вимагає Google Play.

### iOS (для App Store)

```bash
npm run build:ios
```

При першому iOS build EAS запропонує:

- увійти в Apple Developer account;
- створити / використати **Distribution Certificate** і **Provisioning Profile**;
- зареєструвати `com.emberlast.ChildrenEng` в App Store Connect (можна автоматично через EAS).

Рекомендація: спочатку **preview** на реальному пристрої:

```bash
npm run build:preview:android   # APK для швидкого тесту
npm run build:preview:ios       # internal distribution
```

---

## 6. Google Play Console

### 6.1. Створення застосунку

1. Play Console → **Create app**
2. Назва: **ChildrenEng** (або локалізована)
3. **App / Game** → App  
4. **Free** / Paid — за вашим планом

### 6.2. Store listing

Скопіюйте текст з [`STORE_LISTING.md`](STORE_LISTING.md):

- Short description (80 символів)
- Full description (4000 символів)
- App icon (512×512) — можна експортувати з `assets/icon.png`
- Feature graphic (1024×500) — **потрібно створити окремо** (банер для Play Store)
- Скріншоти

### 6.3. Content rating

Пройдіть questionnaire (IARC). Для ChildrenEng очікувано:

- Немає violence, gambling, user-generated content
- Освітній контент для дітей
- Рейтинг: **Everyone / 3+**

### 6.4. Target audience and content

Оскільки застосунок для **дітей**:

- Вкажіть цільову аудиторію включаючи дітей
- Увімкніть відповідність **Families Policy** / Designed for Families (якщо target — діти до 13)
- **Немає** реклами та сторонніх SDK аналітики — відповідайте чесно в анкетах

### 6.5. Data safety

Заповніть форму на основі [`PRIVACY_POLICY.md`](PRIVACY_POLICY.md):

| Питання | Відповідь для ChildrenEng |
|---------|---------------------------|
| Збираєте дані? | **Ні** (або лише технічні дані не персональні — за політикою) |
| Дані передаються третім сторонам? | **Ні** |
| Шифрування in transit | N/A (немає мережевих запитів до вашого backend) |
| Видалення даних | N/A |

### 6.6. Release

1. **Production** → **Create new release**
2. Завантажте `.aab` з EAS (або через `eas submit`, див. нижче)
3. Release notes — з [`STORE_LISTING.md`](STORE_LISTING.md)
4. Review → rollout

**Submit через EAS:**

```bash
npm run submit:android
```

У `eas.json` для першого релізу встановлено `track: internal` і `releaseStatus: draft`. Після тесту змініть у `eas.json` на `"track": "production"` або `"alpha"` / `"beta"`.

---

## 7. App Store Connect (iOS)

### 7.1. App record

1. **My Apps** → **+** → New App  
2. Platform: iOS  
3. Name: **ChildrenEng**  
4. Bundle ID: `com.emberlast.ChildrenEng`  
5. SKU: наприклад `childreneng-ios`

### 7.2. App Information

- Category: **Education** (Primary), **Kids** (Secondary — за бажанням)
- Age Rating: questionnaire → очікувано **4+**
- Privacy Policy URL: ваш HTTPS лінк

### 7.3. App Privacy (Nutrition Labels)

У App Store Connect → **App Privacy**:

- **Data Not Collected** — якщо не збираєте дані (відповідає нашій політиці)

### 7.4. Version information

З [`STORE_LISTING.md`](STORE_LISTING.md):

- Promotional text, description, keywords
- Screenshots для потрібних розмірів iPhone / iPad
- Support URL (можна GitHub repo або email на сайті)

### 7.5. Build upload

Після `npm run build:ios` build з’явиться в TestFlight / App Store Connect.

**Submit через EAS:**

```bash
npm run submit:ios
```

EAS запитає Apple ID, team, App-specific password (якщо 2FA).

Або завантажте `.ipa` через **Transporter** (Mac).

### 7.6. TestFlight → Review

1. Internal testing → перевірка на пристрої  
2. Submit for Review → Production release

---

## 8. Версіонування наступних релізів

1. Оновіть `"version"` у `app.json` (semver, напр. `1.0.1`, `1.1.0`).
2. `eas.json` має `"autoIncrement": true` — build number / version code збільшиться на EAS автоматично.
3. Знову:
   ```bash
   npm run build:all
   npm run submit:android
   npm run submit:ios
   ```

---

## 9. Чеклист перед відправкою на review

- [ ] Протестовано на реальному Android і iPhone / iPad
- [ ] Welcome → меню → кілька категорій → кілька ігор без крашів
- [ ] Озвучення (TTS) працює
- [ ] Where is — landscape на iOS/Android
- [ ] Іконка та splash виглядають коректно
- [ ] Privacy Policy URL опублікований і відкривається
- [ ] Store listing + скріншоти заповнені
- [ ] Content rating / Data safety / App Privacy заповнені
- [ ] Feature graphic (1024×500) для Google Play готовий
- [ ] Contact email у політиці замінений на реальний

---

## 10. Корисні команди

```bash
# Перевірки перед релізом
npm run typecheck
npm test
npm run lint

# Assets
npm run prepare:store-assets

# Builds
npm run build:android
npm run build:ios
npm run build:all

# Submit останнього successful build
npm run submit:android
npm run submit:ios

# Статус builds
eas build:list
```

---

## 11. Що ще можна зробити пізніше (не блокує реліз)

- **Feature graphic** 1024×500 для Google Play (дизайн у Figma/Canva)
- **Локалізація** store listing українською / англійською окремо
- **EAS Update** для OTA-патчів без повного review (опційно)
- Заміна `owner` / bundle id, якщо зміниться Apple/Google акаунт

---

## Підтримка EAS

- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)
- [Google Play: first app](https://support.google.com/googleplay/android-developer/answer/9859152)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
