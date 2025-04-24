import { FieldInputProps, FormikProvider, useField } from 'formik'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  DateTime,
  Form,
  InfiniteScroll,
  SpinnerBlock,
  usePublicQuery,
} from '~/components'
import { SquareCheckBoxBoxProps } from '~/components/Form/SquareCheckBox'
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

const SquareCheckBoxField: React.FC<SquareCheckBoxBoxProps> = (props) => {
  const [field] = useField({ name: props.name, type: 'checkbox' })
  return <Form.SquareCheckBox {...field} {...props} />
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
    return <SpinnerBlock />
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
          {searchingEdges.map(({ node }, index) => {
            if (node.__typename !== 'Article') {
              return null
            }
            const checked =
              hasChecked.includes(node.id) || checkingIds.includes(node.id)
            const checkedIndex = checkingIds.includes(node.id)
              ? checkingIds.indexOf(node.id) + 1
              : undefined
            const disabled = hasChecked.includes(node.id)
            return (
              <section key={index} className={styles.item}>
                <SquareCheckBoxField
                  hasTooltip={true}
                  checked={checked}
                  icon={
                    checked && !disabled && checkedIndex !== undefined ? (
                      <span className={styles.indexIcon}>{checkedIndex}</span>
                    ) : undefined
                  }
                  sup={<DateTime date={node.createdAt} color="grey" />}
                  supHeight={18}
                  hint={node.title}
                  disabled={disabled}
                  {...(formik.getFieldProps('checked') as FieldInputProps<any>)}
                  value={node.id}
                  contents={(() => {
                    const index = node.title
                      .toLowerCase()
                      .indexOf(searchValue.toLowerCase())
                    const content = (
                      <>
                        {node.title.slice(0, index)}
                        <span className="u-highlight">
                          {node.title.slice(index, index + searchValue.length)}
                        </span>
                        {node.title.slice(index + searchValue.length)}
                      </>
                    )
                    return content
                  })()}
                />
              </section>
            )
          })}
        </InfiniteScroll>
      </Form>
    </FormikProvider>
  )
}

export default SearchingDialogContent
