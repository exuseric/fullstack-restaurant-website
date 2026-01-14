"use client"
import TanstackQueryProvider from "@/app/providers/lib/tanstack-query-provider"
import { NuqsAdapter } from 'nuqs/adapters/next/app'


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <TanstackQueryProvider>
          <NuqsAdapter>
          {children}
          </NuqsAdapter>
        </TanstackQueryProvider>
    )
}
