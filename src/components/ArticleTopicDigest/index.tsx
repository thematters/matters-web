import classNames from 'classnames'

import {
  ArticleDigestTitle,
  Card,
  IconArticle16,
  IconChapter16,
  IconDotDivider,
  ResponsiveImage,
  TextIcon,
  Translate,
} from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

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
    id: topic.id,
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
            <h3 className="title">{topic.title}</h3>

            <section className="info">
              {chapterCount > 0 && (
                <>
                  <TextIcon
                    icon={<IconChapter16 />}
                    size="sm-s"
                    spacing="xxtight"
                  >
                    <Translate
                      zh_hant={`${chapterCount} 個章節`}
                      zh_hans={`${chapterCount} 个章节`}
                      en={`${chapterCount} chapters`}
                    />
                  </TextIcon>

                  <IconDotDivider />
                </>
              )}

              {articleCount > 9 && (
                <TextIcon
                  icon={<IconArticle16 />}
                  size="sm-s"
                  spacing="xxtight"
                >
                  <Translate
                    zh_hant={`${articleCount} 篇作品`}
                    zh_hans={`${articleCount} 篇作品`}
                    en={`${articleCount} articles`}
                  />
                </TextIcon>
              )}
            </section>
          </section>

          <p className="description">{topic.description}</p>

          <section className="latestArticle">
            <ArticleDigestTitle
              article={topic.articles.edges[0].node}
              is="h4"
              textSize="md-s"
              textWeight="md"
              lineClamp
            />
          </section>
        </section>

        <style jsx>{styles}</style>
      </div>
    </Card>
  )
}
