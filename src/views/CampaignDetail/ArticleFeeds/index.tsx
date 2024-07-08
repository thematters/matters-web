import React, { useState } from 'react'

// import { analytics } from '~/common/utils'
import {
  ArticleDigestFeed,
  InfiniteScroll,
  Layout,
  List,
  SquareTabs,
} from '~/components'
import { MOCK_CAMPAIGN } from '~/stories/mocks'

import styles from './styles.module.css'

const ArticleFeeds = ({ campaign }: { campaign: typeof MOCK_CAMPAIGN }) => {
  const [feedType, setFeedType] = useState<string>(campaign.stages[0].name)

  return (
    <section className={styles.feeds}>
      <section className={styles.tabs}>
        <SquareTabs sticky>
          {campaign.stages.map((stage, i) => (
            <SquareTabs.Tab
              selected={stage.name === feedType}
              onClick={() => setFeedType(stage.name)}
              key={stage.name}
            >
              {stage.name}
            </SquareTabs.Tab>
          ))}
        </SquareTabs>
      </section>

      <Layout.Main.Spacing hasVertical={false}>
        <InfiniteScroll hasNextPage={false} loadMore={async () => {}} eof>
          <List>
            {(campaign.articles.edges || []).map(({ node }, i) => (
              <React.Fragment key={`${feedType}:${i}`}>
                <List.Item>
                  <ArticleDigestFeed
                    article={node}
                    // onClick={() => {}
                    // analytics.trackEvent('click_feed', {
                    //   type: trackingType,
                    //   contentType: 'article',
                    //   location: i,
                    //   id: node.id,
                    // })
                    // }
                    // onClickAuthor={() => {
                    // analytics.trackEvent('click_feed', {
                    //   type: trackingType,
                    //   contentType: 'user',
                    //   location: i,
                    //   id: node.author.id,
                    // })
                    // }}
                  />
                </List.Item>
              </React.Fragment>
            ))}
          </List>
        </InfiniteScroll>
      </Layout.Main.Spacing>
    </section>
  )
}

export default ArticleFeeds
