import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./components/auth/AuthProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import App from "./App";
import "./Components/i18n/i18n";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <App />
        </NextThemesProvider>
      </NextUIProvider>
    </AuthProvider>
  </React.StrictMode>
);
