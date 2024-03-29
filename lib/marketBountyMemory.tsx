'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Issue } from './github'

type MarketBountyMemory = Record<string, number>

const MarketBountyMemoryContext = createContext<{
  memory: MarketBountyMemory
  setMemory: (memory: MarketBountyMemory) => void
  increment: (marketId: string | number, amount: number) => void
} | null>(null)

export function MarketBountyMemoryContextProvider({ children }: { children: React.ReactNode }) {
  const [memory, setMemory] = useState<MarketBountyMemory>({})

  const value = {
    memory,
    setMemory: useCallback((memory: MarketBountyMemory) => setMemory((prev) => ({ ...prev, ...memory })), []),
    increment: useCallback(
      (marketId: string | number, amount: number) =>
        setMemory((prev) => ({ ...prev, [marketId]: (prev[marketId] || 0) + amount })),
      [],
    ),
  }

  return <MarketBountyMemoryContext.Provider value={value}>{children}</MarketBountyMemoryContext.Provider>
}

export function useMarketBountyMemory() {
  const context = useContext(MarketBountyMemoryContext)
  if (context == undefined) {
    throw new Error('useMarketBountyMemory must be used within an MarketBountyMemoryContextProvider')
  }

  return context
}

export function SyncMarketMemory({ bounties }: { bounties: Array<Issue> }) {
  const { setMemory } = useMarketBountyMemory()

  useEffect(() => {
    setMemory(bounties.reduce((acc, bounty) => ({ ...acc, [bounty.id]: 1 }), {}))
  }, [bounties, setMemory])

  return null
}
