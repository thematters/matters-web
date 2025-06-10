import { gql } from '@apollo/client'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { LanguageContext, ViewerContext } from '~/components'
import { ChannelArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  article: gql`
    fragment ChannelArticle on Article {
      author {
        id
      }
      classification {
        topicChannel {
          channels {
            channel {
              id
              nameZhHans: name(input: { language: zh_hans })
              nameZhHant: name(input: { language: zh_hant })
              nameEn: name(input: { language: en })
            }
          }
          feedback {
            id
            type
          }
        }
      }
    }
  `,
}

const Channel = ({ article }: { article: ChannelArticleFragment }) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const isAuthor = viewer?.id === article.author?.id

  const topicChannel = article.classification?.topicChannel
  const hasTopicChannel = (topicChannel?.channels?.length ?? 0) > 0

  if (!isAuthor && !hasTopicChannel) {
    return null
  }

  if (isAuthor && !hasTopicChannel) {
    return (
      <section className={styles.content}>
        <FormattedMessage
          defaultMessage="Recommending channels for your work…"
          id="S+D/hf"
        />
      </section>
    )
  }

  if (!isAuthor && hasTopicChannel) {
    return (
      <section className={styles.content}>
        <FormattedMessage
          defaultMessage="Recommended to channel: {channelNames}"
          id="0mQE3E"
          values={{
            channelNames: (
              <>
                {topicChannel?.channels?.map((channel, index) => (
                  <span key={channel.channel.id}>
                    <span className={styles.channelNames}>
                      {lang === 'zh_hans'
                        ? channel.channel.nameZhHans
                        : lang === 'zh_hant'
                          ? channel.channel.nameZhHant
                          : channel.channel.nameEn}
                    </span>
                    {index < (topicChannel?.channels?.length ?? 0) - 1 &&
                      (lang === 'zh_hans' || lang === 'zh_hant' ? '、' : ', ')}
                  </span>
                ))}
              </>
            ),
          }}
        />
      </section>
    )
  }

  if (isAuthor && hasTopicChannel) {
    return (
      <section className={styles.content}>
        <FormattedMessage
          defaultMessage="Your work has been recommended to the channels: {channelNames}. Are you satisfied with the result?"
          id="dZlT9q"
          values={{
            channelNames: (
              <>
                {topicChannel?.channels?.map((channel, index) => (
                  <span key={channel.channel.id}>
                    <span className={styles.channelNames}>
                      {lang === 'zh_hans'
                        ? channel.channel.nameZhHans
                        : lang === 'zh_hant'
                          ? channel.channel.nameZhHant
                          : channel.channel.nameEn}
                    </span>
                    {index < (topicChannel?.channels?.length ?? 0) - 1 &&
                      (lang === 'zh_hans' || lang === 'zh_hant' ? '、' : ', ')}
                  </span>
                ))}
              </>
            ),
          }}
        />
      </section>
    )
  }

  return <div>Channel</div>
}

Channel.fragments = fragments

export default Channel
