// 'use client'

// import * as React from 'react'
// import {
//   ThemeProvider as NextThemesProvider,
//   type ThemeProviderProps,
// } from 'next-themes'

// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }


"use client"

import * as React from "react"
import { SessionProvider } from "next-auth/react"
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProvider> {/* Wrap everything inside SessionProvider */}
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </SessionProvider>
  )
}

