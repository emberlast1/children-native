# ChildrenEng

**ChildrenEng** — мобільний застосунок для дітей на **Expo / React Native**, який допомагає вивчати англійську через картинки, озвучення та прості інтерактивні ігри. Інтерфейс розрахований на маленькі пальці: великі плитки, яскраві кольори, анімації та м’який голосовий супровід.

Репозиторій `children-native` містить код застосунку в папці **`ChildrenEng/`**.

---

## Про застосунок

Після запуску дитина бачить **вітальний екран** з маскотом, короткою мелодією та озвученим привітанням. Далі відкривається головне меню з двома розділами:

- **Learn words** — словникові категорії з картинками
- **Games** — навчальні міні-ігри

Натискання на плитку озвучує слово англійською. У іграх за правильну відповідь показується святкова анімація, а помилка супроводжується тактильним і голосовим зворотним зв’язком.

---

## Розділи та контент

### Learn words (19 категорій)

| Категорія | Маршрут | Опис |
|-----------|---------|------|
| Days | `/days` | Дні тижня — горизонтальні кольорові «пілюлі» з іконками |
| Animals | `/animals` | Тварини |
| Colors | `/colors` | Кольори — картки-зразки |
| Fruits | `/fruits` | Фрукти |
| Vegetables | `/vegetables` | Овочі |
| Shapes | `/shapes` | Фігури |
| English alphabet | `/alphabet` | Літери алфавіту |
| Numbers | `/numbers` | Числа 0–20 |
| Body | `/body` | Частини тіла |
| Family | `/family` | Члени родини |
| At the walk | `/at-the-walk` | На прогулянці |
| Weather | `/weather` | Погода |
| Seasons | `/seasons` | Пори року |
| Our planet | `/our-planet` | Наша планета |
| In the city | `/in-the-city` | У місті |
| Home items | `/home-items` | Речі в домі |
| My clothes | `/my-clothes` | Одяг |
| School supplies | `/school-supplies` | Шкільне приладдя |
| Sea creatures | `/sea-creatures` | Морські тварини |

Більшість категорій використовують спільний **`VocabularyScreen`**: сітка плиток з ілюстраціями та озвученням. Окремі екрани — **Alphabet**, **Numbers**, **Colors**, **Days** — мають власний UI під формат контенту.

### Games (7 ігор)

| Гра | Маршрут | Механіка |
|-----|---------|----------|
| Write letters | `/letter-tracing` | Обведення літер пальцем на «зошитному» тлі (SVG) |
| Math game | `/math-game` | Прості приклади на додавання та віднімання |
| Count animals | `/count-animals` | Підрахунок тварин на екрані |
| Memory | `/memory-game` | Знайди пару однакових картинок |
| Listen and tap | `/listen-and-tap` | Прослухай слово й обери правильну картинку |
| Where is | `/where-is` | Drag-and-drop: перетягни предмет у правильне місце (ландшафт) |
| Sort it | `/sort-it` | Розклади картинки по кошиках (фрукти / овочі / тварини) |

---

## Основні можливості (features)

### Навчання

- **Text-to-speech** — озвучення слів, літер і чисел через `expo-speech` (англійська, `en-US`, знижена швидкість і підвищений pitch для дитячого голосу)
- **Інтерактивні плитки** — натискання активує слово та коротку анімацію
- **Тематичні фони** — у кожного розділу свій анімований фон (`ThemedAnimatedBackground`)

### Ігри та взаємодія

- **Генерація завдань** — випадкові раунди для математики, підрахунку, memory, listen-and-tap, where-is, sort-it
- **Drag-and-drop** — жести для ігор Where is та Sort it (`react-native-gesture-handler`)
- **Letter tracing** — малювання по контуру літери (`react-native-svg`)
- **Святкування** — confetti / burst-анімація при правильній відповіді (`CelebrationBurst`)
- **Haptic feedback** — легкий тактильний відгук на натискання, успіх і помилку (`expo-haptics`)

### UX / UI

- **Welcome screen** — маскот, blur-бульбашка, мелодія (`expo-audio`), озвучене привітання; показується один раз за сесію
- **Головне меню** — два великі hub-плитки (Learn words / Games)
- **IconFrame** — «скляні» рамки з blur для плиток меню та ігрових елементів
- **BackButton** — напівпрозора кнопка «додому» на всіх екранах
- **Staggered entrance** — поступова поява елементів списку
- **Адаптивність** — окремі розміри для телефонів і планшетів (`theme/responsive.ts`)
- **Портретна орієнтація** — за замовчуванням; гра Where is перемикає екран у landscape
- **Шрифт Fredoka** — округлий дитячий шрифт (`@expo-google-fonts/fredoka`)
- **Брендовий текст** — білий напис з бірюзовою обводкою (`AppText`)

---

## Технології

| Категорія | Стек |
|-----------|------|
| Платформа | [Expo SDK 54](https://expo.dev/) |
| UI | React 19, React Native 0.81 |
| Мова | TypeScript |
| Навігація | [expo-router](https://docs.expo.dev/router/introduction/) (file-based routing) |
| Анімації | react-native-reanimated, react-native-gesture-handler |
| Зображення | expo-image |
| Графіка | react-native-svg |
| Озвучення | expo-speech |
| Звук | expo-audio |
| Тактильний відгук | expo-haptics |
| Blur / градієнти | expo-blur, expo-linear-gradient |
| Орієнтація | expo-screen-orientation |
| Безпечні зони | react-native-safe-area-context |
| Тестування | Jest + jest-expo |
| Лінтер | ESLint (eslint-config-expo) |

Підтримуються **iOS**, **Android** та **Web** (частина haptic-ефектів на web вимкнена).

---

## Структура проєкту

```
ChildrenEng/
├── app/                  # Маршрути expo-router
├── components/           # Екрани, плитки, ігрові UI-компоненти
├── data/                 # Дані категорій і меню (mainScreenData, animalsData, …)
├── features/             # speak, haptics, orientation, welcomeMelody, …
├── hooks/                # useCelebration та інші хуки
├── layout/               # MainScreen, MenuHubTile, MainScreenComponent
├── theme/                # colors, screenThemes, tilePalette, responsive, gameScreen
├── types/                # TypeScript-типи
├── utils/                # Генератори раундів для ігор
├── assets/images/        # PNG-ілюстрації по категоріях
└── __tests__/            # Unit-тести утиліт
```

---

## Запуск

### З папки застосунку

```bash
cd ChildrenEng
npm install
npm start
```

Далі відкрийте проєкт у **Expo Go** або запустіть development build:

```bash
npm run android
npm run ios
npm run web
```

### З кореня репозиторію

```bash
npm install          # лише якщо потрібні root-скрипти
npm --prefix ChildrenEng install
npm start            # делегує в ChildrenEng
```

> Не запускайте `expo` з кореня без `ChildrenEng/` — там немає `package.json` застосунку.

---

## Скрипти

| Команда | Опис |
|---------|------|
| `npm start` | Dev-сервер Expo |
| `npm run android` | Запуск на Android |
| `npm run ios` | Запуск на iOS |
| `npm run web` | Запуск у браузері |
| `npm run lint` | ESLint |
| `npm run typecheck` | Перевірка TypeScript (`tsc --noEmit`) |
| `npm test` | Unit-тести Jest |

---

## Збірка

Конфігурація Expo — у `app.json`. Для production-збірок через EAS Build:

```bash
eas build --profile production
```

(потрібен налаштований [EAS](https://docs.expo.dev/build/introduction/))

---

## Для розробників

- **Нова категорія слів:** додайте `data/*Data.tsx`, маршрут у `app/*.tsx` з `VocabularyScreen`, пункт у `data/mainScreenData.tsx`
- **Нова гра:** екран у `components/`, маршрут у `app/`, генератор у `utils/`, пункт меню в `gamesItems`
- **Тема екрана:** ключ у `theme/screenThemes.ts`, фон через `ScreenLayout theme="…"`
- **Озвучення:** `speak("word")` з `features/speak.ts`
- **Переходи між екранами:** налаштування в `app/_layout.tsx` (fade для категорій, slide для ігор)

---

## Ліцензія

Приватний проєкт (`"private": true` у `package.json`).
