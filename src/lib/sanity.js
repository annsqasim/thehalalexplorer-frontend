import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '46z29k3b', // 👈 replace this
  dataset: 'production',
  apiVersion: '2025-05-03', // use a fixed date
  useCdn: true, // `false` if you want fresh data
})
