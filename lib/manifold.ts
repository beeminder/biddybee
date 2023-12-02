'use server'

import { Content } from '@tiptap/react'

const MANIFOLD_API = 'https://api.manifold.markets'
const MANIFOLD_OLD_API = 'https://manifold.markets/api/v0'

export type Bounty = {
  id: string
  slug: string
  views: 10
  totalBounty: number
  bountyLeft: number
  question: string
  creatorId: string
  groupSlugs: Array<string>
  createdTime: number
  creatorName: string
  importanceScore: number // 0-1
  lastUpdatedTime: number
  popularityScore: number // 0-1
  creatorAvatarUrl: string
  creatorUsername: string
  uniqueBettorCount: number
  creatorCreatedTime: number
  description: Content
}

async function fetchApi<T>(path: string, body?: Record<string, string | number>) {
  const res = await fetch(`${MANIFOLD_API}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  try {
    return res.json() as T
  } catch (error) {
    console.log(error)
    throw new Error('API Error')
  }
}

async function fetchOldApi<T>(path: string, body?: Record<string, string | number>) {
  const res = await fetch(`${MANIFOLD_OLD_API}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  try {
    return res.json() as T
  } catch (error) {
    console.log(error)
    throw new Error('API Error')
  }
}

export async function getBounties() {
  const bounties = await fetchApi<Array<Bounty>>('/supabasesearchcontracts', {
    contractType: 'BOUNTIED_QUESTION',
    filter: 'open',
    limit: 40,
    offset: 0,
    sort: 'bounty-amount',
    term: '',
    topicSlug: 'manifoldbountiescom',
  })
  return bounties
}

export async function getBountyBySlug(slug: string) {
  const bounty = await fetchOldApi<Bounty>(`/slug/${slug}`)
  console.log(bounty)
  return bounty
}
