import { CollectionDigest, List } from '~/components'

const Placeholder = () => {
  return (
    <List responsiveWrapper aria-busy="true" aria-live="polite">
      <List.Item>
        <CollectionDigest.Feed.Placeholder />
      </List.Item>
      <List.Item>
        <CollectionDigest.Feed.Placeholder />
      </List.Item>
      <List.Item>
        <CollectionDigest.Feed.Placeholder />
      </List.Item>
    </List>
  )
}

export default Placeholder
