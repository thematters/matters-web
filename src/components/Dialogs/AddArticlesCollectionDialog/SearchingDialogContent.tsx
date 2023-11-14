import { FormikProvider } from 'formik'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import { Form, InfiniteScroll, Spinner, usePublicQuery } from '~/components'
import {
  CollectionArticlesCollectionFragment,
  UserArticlesSearchQuery,
  UserArticlesUserFragment,
} from '~/gql/graphql'

import { USER_ARTICLES_SEARCH } from './gql'
import styles from './styles.module.css'

interface SearchingDialogContentProps {
  formik: any
  user: UserArticlesUserFragment
  collection: CollectionArticlesCollectionFragment
  checkingIds: string[]
  searchValue: string
  formId: string
}

const SearchingDialogContent: React.FC<SearchingDialogContentProps> = ({
  formik,
  user,
  collection,
  checkingIds,
  searchValue,
  formId,
}) => {
  const { data, loading, fetchMore, refetch } =
    usePublicQuery<UserArticlesSearchQuery>(USER_ARTICLES_SEARCH, {
      variables: { key: searchValue, authorId: user.id },
    })

  useEffect(() => {
    refetch()
  }, [searchValue])

  const activeArticles = data?.search.edges?.filter(
    ({ node }) => node.__typename === 'Article' && node.state === 'active'
  )

  const hasAddedArticlesId =
    collection.articleList.edges?.map(({ node }) => node.id) || []
  const hasCheckedEdges = activeArticles?.filter(
    ({ node }) =>
      node.__typename === 'Article' &&
      hasAddedArticlesId.indexOf(node.id) !== -1
  )
  const hasChecked =
    hasCheckedEdges?.map(
      ({ node }) => node.__typename === 'Article' && node.id
    ) || []

  const searchingEdges = activeArticles || []

  if (loading) {
    return <Spinner />
  }

  if (searchingEdges.length === 0) {
    return (
      <section className={styles.emptyResult}>
        <FormattedMessage
          defaultMessage="No results"
          id="7jjWxF"
          description="src/components/Dialogs/AddArticlesCollectionDialog/SearchingDialogContent.tsx"
        />
      </section>
    )
  }

  // pageination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user-collection-articles-search',
      location: edges?.length || 0,
    })

    await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <FormikProvider value={formik}>
      <Form id={formId} onSubmit={formik.handleSubmit} className={styles.form}>
        <InfiniteScroll
          hasNextPage={pageInfo?.hasNextPage || false}
          loadMore={loadMore}
          eof
        >
          {searchingEdges.map(({ node }, index) => (
            <>
              {node.__typename === 'Article' && (
                <section key={index} className={styles.item}>
                  <Form.IndexSquareCheckBox
                    hasTooltip={true}
                    checked={
                      hasChecked.includes(node.id) ||
                      checkingIds.includes(node.id)
                    }
                    index={
                      checkingIds.includes(node.id)
                        ? checkingIds.indexOf(node.id) + 1
                        : undefined
                    }
                    createAt={node.createdAt}
                    hint={node.title}
                    disabled={hasChecked.includes(node.id)}
                    {...formik.getFieldProps('checked')}
                    value={node.id}
                    content={(() => {
                      const index = node.title.indexOf(searchValue)
                      const content = (
                        <>
                          {node.title.slice(0, index)}
                          <span className="u-highlight">{searchValue}</span>
                          {node.title.slice(index + searchValue.length)}
                        </>
                      )
                      return content
                    })()}
                  />
                </section>
              )}
            </>
          ))}
        </InfiniteScroll>
      </Form>
    </FormikProvider>
  )
}

export default SearchingDialogContent
