import classNames from 'classnames'

import {
  ArticleDigestTitle,
  Button,
  Card,
  IconArrowRight16,
  LinkWrapper,
  ResponsiveImage,
  TextIcon,
  Translate,
} from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'
import TopicCounts from './TopicCounts'

import { ArticleDigestTitleArticle } from '../ArticleDigest/Title/__generated__/ArticleDigestTitleArticle'

export interface ArticleTopicDigestProps {
  topic: {
    id: string
    title: string
    description: string
    cover: string
    author: {
      id: string
      userName: string
    }
    chapters: {
      totalCount: number
    }
    articles: {
      totalCount: number
      edges: {
        node: ArticleDigestTitleArticle
      }[]
    }
  }
}

export const ArticleTopicDigest = ({ topic }: ArticleTopicDigestProps) => {
  const containerClasses = classNames({
    container: true,
  })
  const path = toPath({
    page: 'userTopicDetail',
    topicId: topic.id,
    userName: topic.author.userName,
  })
  const chapterCount = topic.chapters.totalCount
  const articleCount = topic.articles.totalCount

  return (
    <Card {...path} spacing={['base', 'base']} borderRadius="xtight">
      <div className={containerClasses}>
        <section className="content">
          <div className="cover">
            <ResponsiveImage url={topic.cover} size="144w" smUpSize="360w" />
          </div>

          <section className="head">
            <h3 className="title">
              <LinkWrapper {...path} textActiveColor="green">
                {topic.title}
              </LinkWrapper>
            </h3>

            <TopicCounts
              chapterCount={chapterCount}
              articleCount={articleCount}
            />
          </section>

          <p className="description">{topic.description}</p>

          <section className="latestArticle">
            <TextIcon size="md-s" weight="md">
              <Translate
                zh_hant="最新&nbsp;|&nbsp;"
                zh_hans="最新&nbsp;|&nbsp;"
                en="Latest&nbsp;|&nbsp;"
              />
            </TextIcon>
            <ArticleDigestTitle
              article={topic.articles.edges[0].node}
              is="h4"
              textSize="md-s"
              textWeight="md"
              lineClamp
            />
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
