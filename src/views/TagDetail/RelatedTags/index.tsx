import _chunk from 'lodash/chunk'
import _get from 'lodash/get'
import Link from 'next/link'

import {
  IconArticle16,
  IconHashTag16,
  IconUser16,
  PageHeader,
  TextIcon,
  Translate,
  usePublicQuery,
  ViewAllButton,
} from '~/components'

import { PATHS } from '~/common/enums'
import { analytics, numAbbr, toPath } from '~/common/utils'

import { RELATED_TAGS } from './gql'
import styles from './styles.css'

import {
  TagDetailRecommended,
  TagDetailRecommended_node_Tag_recommended_edges,
} from './__generated__/TagDetailRecommended'

interface RelatedTagsProps {
  tagId: string
}

const RelatedTags = ({ tagId }: RelatedTagsProps) => {
  const { data } = usePublicQuery<TagDetailRecommended>(RELATED_TAGS, {
    variables: { id: tagId },
  })

  const { edges } =
    (data?.node?.__typename === 'Tag' && data.node.recommended) || {}

  const onClick = (i: number, id: string) => () =>
    analytics.trackEvent('click_feed', {
      type: 'related_tags',
      contentType: 'tag',
      location: i,
      id,
    })

  const Header = (
    <PageHeader
      title={
        <Translate zh_hant="相關標籤" zh_hans="相关标签" en="Related Tags" />
      }
      is="h2"
      hasNoBorder
    >
      <section className="right">
        {PATHS && (
          <ViewAllButton
            href={PATHS.TAGS}
            bgColor={undefined}
            bgActiveColor="grey-lighter"
          />
        )}

        <style jsx>{styles}</style>
      </section>
    </PageHeader>
  )

  return (
    <section className="tags">
      {Header}
      <div className="outer">
        <div className="inner">
          {_chunk(edges, 5).map((list, i) => (
            <ul key={i}>
              {list.map(
                (
                  {
                    node,
                    cursor,
                  }: TagDetailRecommended_node_Tag_recommended_edges,
                  j
                ) => (
                  <li key={cursor}>
                    <section className="tag">
                      <Link
                        href={
                          toPath({
                            page: 'tagDetail',
                            id: node.id,
                            content: node.content,
                            // `/tags/${node?.id}`
                          }).href
                        }
                      >
                        <a onClick={onClick(j, node?.id)}>
                          <div className="cover">
                            <figure
                              style={{ backgroundImage: `url(${node?.cover})` }}
                            />
                          </div>
                          <div className="content">
                            <div className="title">
                              <h3>
                                <TextIcon
                                  icon={<IconHashTag16 color="grey-dark" />}
                                >
                                  {node?.content}
                                </TextIcon>
                              </h3>
                            </div>
                            <div className="text">
                              <span className="authors">
                                <TextIcon
                                  size="xs"
                                  icon={<IconUser16 color="grey-dark" />}
                                >
                                  {numAbbr(node?.numAuthors)}
                                </TextIcon>
                              </span>
                              <span className="articles">
                                <TextIcon
                                  size="xs"
                                  icon={<IconArticle16 color="grey-dark" />}
                                >
                                  {numAbbr(node?.numArticles)}
                                </TextIcon>
                              </span>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </section>
                  </li>
                )
              )}
            </ul>
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </section>
  )
}

export default RelatedTags
