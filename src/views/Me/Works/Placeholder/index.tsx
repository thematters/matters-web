import { DraftDigest, List } from '~/components'

const Placeholder = () => {
  return (
    <List aria-busy="true" aria-live="polite">
      <List.Item>
        <DraftDigest.Feed.Placeholder />
      </List.Item>
      <List.Item>
        <DraftDigest.Feed.Placeholder />
      </List.Item>
      <List.Item>
        <DraftDigest.Feed.Placeholder />
      </List.Item>
    </List>
  )
}

export default Placeholder
