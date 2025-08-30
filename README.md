# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Safe Area & Responsive Layout (NativeWind)

This project includes a standard setup for safe areas and responsive layouts across iOS, Android, and Web.

### Components

- `src/components/SafeScreen.tsx`
  - Wraps `react-native-safe-area-context` `SafeAreaView`.
  - Defaults to edges: `['top','left','right']` so the tab bar manages the bottom inset.

- `src/components/layout/Screen.tsx`
  - Builds on `SafeScreen`, adds `bg-background` and an optional `scroll` prop.
  - Props:
    - `edges?: Edge[]`
    - `scroll?: boolean`
    - `className?: string`
    - `contentClassName?: string`

- `src/components/layout/Container.tsx`
  - Centers content, adds responsive horizontal padding and max-width.
  - Defaults: `px-4 sm:px-6 md:px-8`, `max-w-[1200px]`.
  - Props:
    - `padded?: boolean` (default true)
    - `maxWidthClassName?: string`
    - `className?: string`

### Usage

- Standard screen (non-scroll):

```tsx
import Screen from "../src/components/layout/Screen";
import Container from "../src/components/layout/Container";

export default function SomeScreen() {
  return (
    <Screen>
      <Container>
        {/* content */}
      </Container>
    </Screen>
  );
}
```

- Scrollable screen:

```tsx
<Screen scroll>
  <Container>{/* long content */}</Container>
  {/* Optionally add bottom padding so content clears the tab bar */}
  {/* <Container className="pb-6" /> */}
  
</Screen>
```

- Full-bleed section (no side padding or max-width):

```tsx
<Container padded={false} maxWidthClassName="">
  {/* edge-to-edge content */}
  {/* e.g., hero banner or map */}
  
</Container>
```

- Include bottom safe area (non-tab screens):

```tsx
<Screen edges={["top", "right", "bottom", "left"]}>
  <Container>{/* content */}</Container>
  
</Screen>
```

### Responsive breakpoints

Configured in `tailwind.config.js` (mobile-first):

```
xs: 360px  // small phones
sm: 400px  // large phones
md: 768px  // small tablets
lg: 1024px // tablets / small desktop
xl: 1280px // large desktop (web only)
```

Use with NativeWind like:

```tsx
<View className="px-4 sm:px-6 md:px-8" />
<Text className="text-base md:text-lg lg:text-xl" />
<View className="flex-col md:flex-row gap-4" />
```

### Notes

- `SafeAreaProvider` is already set in `src/app/_layout.tsx`.
- Tab screens omit the bottom edge by default to avoid double spacing with the tab bar.
- For keyboard-heavy screens, compose `KeyboardAvoidingView` inside `Screen`/`Container` as needed.

## Network Status & TanStack Query

This project includes automatic network status management for TanStack Query, following the [official React Native documentation](https://tanstack.com/query/latest/docs/framework/react/react-native).

### Features

- **Automatic online/offline detection** using `expo-network`
- **App focus management** for automatic refetching when app becomes active
- **Network status indicator** that shows when the device is offline
- **Query retry logic** with exponential backoff

### Components

- `src/lib/networkManager.ts` - Network status monitoring
- `src/lib/focusManager.ts` - App focus state management  
- `src/components/NetworkStatus.tsx` - Offline indicator component

### Usage

The network status is automatically set up in `src/app/_layout.tsx`. You'll see a red banner when offline.

For queries that should only run when online:

```tsx
import { useQuery } from '@tanstack/react-query'

const { data } = useQuery({
  queryKey: ['my-data'],
  queryFn: fetchMyData,
  enabled: !!onlineManager.isOnline(), // Only run when online
})
```

For screen-specific focus management:

```tsx
import { useIsFocused } from '@react-navigation/native'

const isFocused = useIsFocused()

const { data } = useQuery({
  queryKey: ['screen-data'],
  queryFn: fetchScreenData,
  subscribed: isFocused, // Only subscribe when screen is focused
})
```
