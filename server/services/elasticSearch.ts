// TODO: improve this
import { Client } from '@elastic/elasticsearch'

// still not 100% sure yet what to do with this
export const client = new Client({
  node: process.env.ELASTICSEARCH_URL, // Elasticsearch endpoint
  // auth: {
  // apiKey: {
  // // API key ID and secret
  // id: 'foo',
  // api_key: 'bar',
  // },
  // },
})

export * as elascicsearch from './elasticsearch'
