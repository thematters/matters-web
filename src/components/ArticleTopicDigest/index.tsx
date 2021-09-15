import classNames from 'classnames'
import { useContext } from 'react'

import {
  ArticleDigestTitle,
  Button,
  Card,
  IconArrowRight16,
  LanguageContext,
  LinkWrapper,
  ResponsiveImage,
  TextIcon,
  Translate,
} from '~/components'

import { toPath, translate } from '~/common/utils'

import IMAGE_TOPIC_COVER from '@/public/static/images/tag-cover.png'

import { fragments } from './gql'
import styles from './styles.css'
import TopicCounts from './TopicCounts'

import { ArticleTopicDigestTopic } from './__generated__/ArticleTopicDigestTopic'

export interface ArticleTopicDigestProps {
  topic: ArticleTopicDigestTopic
}

export const ArticleTopicDigest = ({ topic }: ArticleTopicDigestProps) => {
  const { lang } = useContext(LanguageContext)

  const containerClasses = classNames({
    container: true,
  })
  const path = toPath({
    page: 'userTopicDetail',
    topicId: topic.id,
    userName: topic.author.userName || '',
  })

  const latestArticlePrefix = translate({
    zh_hant: '最新 | ',
    zh_hans: '最新 | ',
    en: 'Latest | ',
    lang,
  })

  return (
    <Card {...path} spacing={['base', 'base']} borderRadius="xtight">
      <div className={containerClasses}>
        <section className="content">
          <div className="cover">
            <ResponsiveImage
              url={topic.cover || IMAGE_TOPIC_COVER.src}
              size="144w"
              smUpSize="360w"
            />
          </div>

          <section className="head">
            <h3 className="title">
              <LinkWrapper {...path} textActiveColor="green">
                {topic.title}
              </LinkWrapper>
            </h3>

            <TopicCounts topic={topic} />
          </section>

          <p className="description">{topic.description}</p>

          <section className="latestArticle">
            {topic.latestArticle && (
              <ArticleDigestTitle
                article={{
                  ...topic.latestArticle,
                  title: latestArticlePrefix + topic.latestArticle.title,
                }}
                is="h4"
                textSize="md-s"
                textWeight="md"
                lineClamp
              />
            )}
          </section>
        </section>

        <section className="viewAll">
          <Button
            size={[null, '1.25rem']}
            spacing={[0, 'xtight']}
            bgActiveColor="grey-lighter-active"
            href={path.href}
          >
            <TextIcon
              icon={<IconArrowRight16 size="xs" />}
              color="grey-darker"
              size="xs"
              weight="md"
              spacing="xxtight"
              textPlacement="left"
            >
              <Translate
                zh_hant="查看全部作品"
                zh_hans="查看全部作品"
                en="View All"
              />
            </TextIcon>
          </Button>
        </section>

        <style jsx>{styles}</style>
      </div>
    </Card>
  )
}

ArticleTopicDigest.fragments = fragments
