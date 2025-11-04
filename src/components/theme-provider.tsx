"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // This will run only on client side
    const theme = props.defaultTheme;
    if (theme) {
      document.documentElement.classList.add(theme);
    }
  }, [props.defaultTheme]);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
