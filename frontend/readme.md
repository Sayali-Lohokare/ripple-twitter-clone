# Ripple 

This is a React application built using **Vite**, **Ionic Framework**, and **Capacitor**. It can run both as a web app and as a mobile application (Android/iOS).  

---

## Features

- Modern React + Vite setup for fast development.
- Mobile-ready UI using Ionic components.
- Capacitor integration for native mobile functionality.
- Supports live reload during development.
- Configured for building both web and mobile apps.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v18+ recommended)
- npm or yarn
- Android Studio / Xcode (for mobile builds)
- Capacitor CLI (`npm install -g @capacitor/cli`)
- Vite (`npm install -g vite`)

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-folder> 
```
## Install dependencies:

npm install
# or
yarn install

## To Run Web

ionic serve 

## Add Platforms

```bash
npx cap add android
npx cap add ios
```

## Sync with Capacitor

```bash
npx cap sync
```

## Run on Android

```bash
npx cap open android
```
This will open Android Studio.From there, you can run the app on an emulator or a connected device.

## Run on iOS

```bash
npx cap open ios
```

References

Vite Documentation : https://vitejs.dev/

Ionic Framework : https://ionicframework.com/docs

Capacitor Documentation : https://capacitorjs.com/docs


