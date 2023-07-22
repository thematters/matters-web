import { FormikProvider } from 'formik'
import { useState } from 'react'

import { Form, InfiniteScroll, Spinner } from '~/components'
import {
  CollectionDetailFragment,
  UserArticlesUserFragment,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface SelectDialogContentProps {
  formik: any
  user: UserArticlesUserFragment
  collection: CollectionDetailFragment
  checkingIds: string[]
  formId: string
}

const SelectDialogContent: React.FC<SelectDialogContentProps> = ({
  formik,
  user,
  collection,
  checkingIds,
  formId,
}) => {
  const articles = user.articles

  const articlesLength = 20

  const hasAddedArticlesId =
    collection.articles.edges?.map(({ node }) => node.id) || []

  const hasCheckedEdges = articles?.edges?.filter(
    ({ node }) => hasAddedArticlesId.indexOf(node.id) !== -1
  )
  const hasChecked = hasCheckedEdges?.map(({ node }) => node.id) || []

  const [loadedArticles, setLoadedArticles] = useState(
    articles.edges?.slice(0, articlesLength) || []
  )

  // load next page
  const loadMore = async () => {
    setLoadedArticles(
      loadedArticles.concat(
        articles.edges?.slice(
          loadedArticles.length,
          loadedArticles.length + articlesLength
        ) || []
      )
    )
  }

  return (
    <InfiniteScroll
      hasNextPage={loadedArticles.length < (articles.edges?.length as number)}
      loadMore={loadMore}
      loader={<Spinner />}
    >
      <FormikProvider value={formik}>
        <Form
          id={formId}
          onSubmit={formik.handleSubmit}
          className={styles.form}
        >
          {loadedArticles.map(
            ({ node }) =>
              node.state === 'active' && (
                <section key={node.id} className={styles.item}>
                  <Form.SquareCheckBox
                    key={node.id}
                    hasTooltip={true}
                    checked={
                      hasChecked.includes(node.id) ||
                      checkingIds.includes(node.id)
                    }
                    hint={node.title}
                    disabled={hasChecked.includes(node.id)}
                    {...formik.getFieldProps('checked')}
                    value={node.id}
                  />
                  {checkingIds.includes(node.id) && (
                    <span className={styles.index}>
                      {checkingIds.indexOf(node.id) + 1}
                    </span>
                  )}
                </section>
              )
          )}
        </Form>
      </FormikProvider>
    </InfiniteScroll>
  )
}

export default SelectDialogContent
