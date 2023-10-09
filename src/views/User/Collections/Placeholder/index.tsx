import { CollectionDigestFeed, List } from '~/components'

const Placeholder = () => {
  return (
    <List aria-busy="true" aria-live="polite">
      <List.Item>
        <CollectionDigestFeed.Placeholder />
      </List.Item>
      <List.Item>
        <CollectionDigestFeed.Placeholder />
      </List.Item>
      <List.Item>
        <CollectionDigestFeed.Placeholder />
      </List.Item>
    </List>
  )
}

export default Placeholder
