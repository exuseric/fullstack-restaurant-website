"use client"
import TanstackQueryProvider from "@/app/providers/lib/tanstack-query-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
    )
}