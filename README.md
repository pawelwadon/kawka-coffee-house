# ☕ Kawka Coffee House

A mobile loyalty application for a coffee shop, allowing customers to collect stamps, redeem coupons, and discover nearby cafeterias. Built with React Native and Expo as an engineering thesis project.

## About

Kawka Coffee House is a digital loyalty card system designed to replace traditional paper stamp cards. Customers can scan QR codes to collect stamps with each purchase, unlock rewards, and browse available cafeteria locations — all from their phone.

## Tech Stack

- **React Native** with **Expo** (file-based routing)
- **JavaScript / JSX**
- Custom components and styling

## Features

- 🔐 User authentication (login & registration)
- 📱 QR code generation for stamp collection
- 🏷️ Digital stamp card system
- 🎟️ Coupons and rewards
- ☕ Cafeteria locations browser
- 👤 User profile management
- 🎨 Custom UI with Poppins font family

## Project Structure

```
KawkaApp/
├── app/
│   ├── (tabs)/
│   │   ├── index.jsx          # Home screen
│   │   ├── stamps.jsx         # Stamp collection
│   │   ├── coupons.jsx        # Available coupons
│   │   ├── cafeterias.jsx     # Cafeteria locations
│   │   └── profile.jsx        # User profile
│   ├── _layout.jsx            # Root layout
│   ├── login.jsx              # Login screen
│   ├── register.jsx           # Registration screen
│   └── gettingStarted.jsx     # Onboarding screen
├── components/
│   ├── Button.jsx             # Reusable button component
│   ├── ButtonWithIcon.jsx     # Button with icon variant
│   ├── Icon.jsx               # Icon component
│   ├── ScreenContent.jsx      # Screen content wrapper
│   ├── ScreenHeader.jsx       # Screen header component
│   └── UserQRCode.jsx         # QR code display component
├── styles/
│   └── styles.js              # Global styles
├── assets/
│   ├── fonts/                 # Poppins font family
│   └── images/                # App images and icons
└── pages/
    └── Screen.jsx             # Screen template
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go app on your phone (for testing)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/pawelwadon/kawka-coffee-house.git
cd kawka-coffee-house
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

4. Scan the QR code with Expo Go (Android) or Camera app (iOS) to run on your device.

## Status

🚧 **Work in progress** — Client-side UI is mostly complete. Backend integration is planned for a future phase.

## License

This project is part of an engineering thesis at WSiZ in Bielsko-Biała.
