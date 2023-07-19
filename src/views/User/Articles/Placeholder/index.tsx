import { ArticleDigestFeed, List } from '~/components'

const Placeholder = () => {
  return (
    <List responsiveWrapper aria-busy="true" aria-live="polite">
      <List.Item>
        <ArticleDigestFeed.Placeholder />
      </List.Item>
      <List.Item>
        <ArticleDigestFeed.Placeholder />
      </List.Item>
      <List.Item>
        <ArticleDigestFeed.Placeholder />
      </List.Item>
    </List>
  )
}

export default Placeholder
