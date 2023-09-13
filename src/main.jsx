import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./components/auth/AuthProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import App from "./App";
import "./Components/i18n/i18n";
import Header from "./components/header/headerC/Header";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
      >
        <Header />
        <App />
      </NextThemesProvider>
    </NextUIProvider>
  </AuthProvider>
);
