# Як отримати Privacy Policy URL (HTTPS)

Google Play і App Store вимагають **публічне HTTPS-посилання** на політику конфіденційності. Файл у репозиторії або на Google Drive **не підходить** — потрібен URL, який відкривається в браузері.

---

## Рекомендовано: GitHub Pages (безкоштовно)

У репозиторії вже є готова сторінка: **`docs/privacy-policy.html`**

### Крок 1. Закоміть і запуш файли

Переконайся, що на GitHub є `docs/privacy-policy.html` і `docs/.nojekyll`.

### Крок 2. Увімкни GitHub Pages

1. Відкрий репозиторій: https://github.com/emberlast1/children-native  
2. **Settings** → **Pages** (ліва колонка)  
3. **Build and deployment** → **Source**: Deploy from a branch  
4. **Branch**: `main` → folder **`/docs`** → **Save**  
5. Зачекай 1–3 хвилини — з’явиться зелений банер з URL

### Крок 3. Твій Privacy Policy URL

```
https://emberlast1.github.io/children-native/privacy-policy.html
```

Перевір у браузері: сторінка має відкриватися без помилки 404.

### Крок 4. Встав URL у сторах

| Де | Поле |
|----|------|
| **Google Play Console** | Policy → App content → Privacy policy |
| **App Store Connect** | App Information → Privacy Policy URL |

---

## Оновлення політики

1. Відредагуй `docs/PRIVACY_POLICY.md` і `docs/privacy-policy.html` (текст має збігатися)  
2. Зміни дату **Last updated**  
3. `git commit` + `git push`  
4. GitHub Pages оновиться автоматично через ~1 хвилину  

---

## Інші варіанти (якщо не GitHub Pages)

| Сервіс | Складність | HTTPS |
|--------|------------|-------|
| [Notion](https://notion.so) → Share → Publish to web | Легко | ✅ |
| [Google Sites](https://sites.google.com) | Легко | ✅ |
| Власний домен + хостинг | Складніше | ✅ |

Для Notion/Google Sites скопіюй текст з `PRIVACY_POLICY.md`.

---

## Чеклист

- [ ] URL починається з `https://`  
- [ ] Сторінка відкривається без логіну  
- [ ] Є контактний email  
- [ ] Зазначено, що дані не збираються (для ChildrenEng)  
- [ ] URL вставлений у Play Console і App Store Connect  

---

## Support URL (App Store)

Apple також просить **Support URL**. Можна використати:

- той самий GitHub repo: `https://github.com/emberlast1/children-native`  
- або `mailto:lordanvil18@gmail.com` **не підходить** — потрібен саме URL сторінки  

Мінімальний варіант: GitHub Pages URL політики або README репозиторію на GitHub.
