# ☕ KawkaApp — Kawka Coffee House Loyalty App

A full-stack mobile loyalty application built with React Native (Expo) and Firebase for Kawka Coffee House. Customers collect stamps, earn coupons, and redeem free coffee — all through a QR code-based system managed by baristas via an admin panel.

## 📱 Features

### Customer Panel
- **QR Code** — unique QR code per user for barista scanning
- **Stamps** — collect stamps with every coffee purchase (7 stamps = free coffee)
- **Coupons** — redeem collected stamps for coupons with 3-month validity
- **Cafeterias** — browse coffee shop locations with opening hours, directions, and call buttons
- **Profile** — view personal statistics, change password, app info, contact, and logout

### Admin Panel
- **QR Scanner** — scan customer QR codes using device camera to assign stamps
- **Users** — browse all registered users with search functionality and detailed client profiles
- **Statistics** — view stamp, coupon, and registration stats filtered by day, week, or month with activity history

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native (Expo) |
| Navigation | Expo Router (file-based) |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Camera | expo-camera |
| QR Code | react-native-qrcode-styled |
| Animations | react-native-reanimated |
| Icons | react-native-svg (custom SVG paths) |
| Styling | StyleSheet (CSS-in-JS) |
| Font | Poppins (expo-font) |
| Testing | Jest |

## 📁 Project Structure

```
KawkaApp/
├── app/
│   ├── _layout.jsx          # Root layout (auth, fonts, context)
│   ├── (auth)/               # Login, register, getting started
│   │   ├── _layout.jsx
│   │   ├── gettingStarted.jsx
│   │   ├── login.jsx
│   │   └── register.jsx
│   ├── (tabs)/               # Customer panel
│   │   ├── _layout.jsx
│   │   ├── index.jsx         # Home screen
│   │   ├── stamps.jsx
│   │   ├── coupons.jsx
│   │   ├── cafeterias.jsx
│   │   └── profile.jsx
│   └── (admin)/              # Admin panel
│       ├── _layout.jsx
│       ├── index.jsx         # QR Scanner
│       ├── users.jsx
│       ├── clientDetails.jsx
│       └── statistics.jsx
├── components/
│   ├── Button.jsx
│   ├── ButtonWithIcon.jsx
│   ├── Icon.jsx
│   ├── Input.jsx
│   ├── Screen.jsx
│   ├── ScreenBackground.jsx
│   ├── ScreenContent.jsx
│   ├── ScreenHeader.jsx
│   ├── ScanUserQRCode.jsx
│   ├── StampAssignModal.jsx
│   └── UserQRCode.jsx
├── context/
│   └── AuthContext.js
├── firebase/
│   ├── FirebaseConfig.js
│   ├── addStamps.js
│   └── addVisitsHistory.js
├── pages/
│   └── Screen.jsx
├── styles/
│   └── styles.js
├── assets/
│   ├── fonts/                # Poppins font family
│   └── images/
├── __tests__/
│   └── helpers.test.js
├── .env                      # Firebase API keys (not in repo)
└── .gitignore
```

## 🔥 Firebase Structure

### Firestore Collections

**users/{uid}**
```
{
  name: string,
  surname: string,
  stamps: number,
  coupons: [{ expirationDate: string }],
  visits: [{ collectedStamps: number, dateOfVisit: string, type: string }],
  allTimeStamps: number,
  allTimeCoupons: number,
  role: "client" | "admin"
}
```

**history/{auto-id}**
```
{
  client: string,
  activity: string,
  type: "stamp" | "coupon" | "registration",
  count: number,
  dateOfVisit: Timestamp
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/KawkaApp.git
cd KawkaApp

# Install dependencies
npm install

# Create .env file with Firebase config
touch .env
```

Add your Firebase credentials to `.env`:
```
EXPO_PUBLIC_API_KEY=your_api_key_here
```

### Running the app

```bash
# Start Expo development server
npx expo start

# Scan QR code with Expo Go (Android) or Camera (iOS)
```

## 🧪 Testing

```bash
# Run unit tests
npx jest
```

## 👤 Author

Paweł Wadoń — Engineering thesis project at WSIiZ Bielsko-Biała

## 📄 License

This project was created as an engineering thesis and is not licensed for commercial use.