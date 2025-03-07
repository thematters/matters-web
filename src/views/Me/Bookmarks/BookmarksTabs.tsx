import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Tabs, useRoute } from '~/components'

const BookmarksTabs: React.FC = () => {
  const { isInPath } = useRoute()

  return (
    <Tabs>
      <Tabs.Tab
        href={PATHS.ME_BOOKMARKS_ARTICLES}
        selected={isInPath('ME_BOOKMARKS_ARTICLES')}
      >
        <FormattedMessage
          defaultMessage="Articles"
          id="Ajc5SE"
          description="src/views/Me/Bookmarks/Tabs.tsx"
        />
      </Tabs.Tab>

      <Tabs.Tab
        href={PATHS.ME_BOOKMARKS_TAGS}
        selected={isInPath('ME_BOOKMARKS_TAGS')}
      >
        <FormattedMessage defaultMessage="Tags" id="1EYCdR" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default BookmarksTabs
