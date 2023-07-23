import { ArticleDigestFeed, Layout, List } from '~/components'

const Placeholder = () => {
  return (
    <Layout.Main.Spacing>
      <List aria-busy="true" aria-live="polite">
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
    </Layout.Main.Spacing>
  )
}

export default Placeholder
