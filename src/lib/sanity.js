import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '46z29k3b', // 👈 replace this
  dataset: 'production',
  apiVersion: "2023-08-01", // use a fixed date
  useCdn: false, // `false` if you want fresh data
})
