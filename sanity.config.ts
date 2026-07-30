import { defineConfig } from 'sanity';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'The Halal Explorer Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '46z29k3b',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  schema: {
    types: schemaTypes,
  },
});
