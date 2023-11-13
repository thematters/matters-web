import { FormikProvider } from 'formik'

import { Form, InfiniteScroll } from '~/components'
import {
  CollectionArticlesCollectionFragment,
  UserArticlesUserFragment,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface SelectDialogContentProps {
  formik: any
  user: UserArticlesUserFragment
  collection: CollectionArticlesCollectionFragment
  checkingIds: string[]
  formId: string
  loadMore: () => Promise<void>
  pageInfo: any
}

const SelectDialogContent: React.FC<SelectDialogContentProps> = ({
  formik,
  user,
  collection,
  checkingIds,
  formId,
  loadMore,
  pageInfo,
}) => {
  const articles = user.articles

  const hasAddedArticlesId =
    collection.articleList.edges?.map(({ node }) => node.id) || []

  const hasCheckedEdges = articles?.edges?.filter(
    ({ node }) => hasAddedArticlesId.indexOf(node.id) !== -1
  )
  const hasChecked = hasCheckedEdges?.map(({ node }) => node.id) || []

  return (
    <FormikProvider value={formik}>
      <Form id={formId} onSubmit={formik.handleSubmit} className={styles.form}>
        <InfiniteScroll
          hasNextPage={pageInfo.hasNextPage}
          loadMore={loadMore}
          eof
        >
          {articles.edges?.map(({ node }) => {
            return (
              <section key={node.id} className={styles.item}>
                <Form.IndexSquareCheckBox
                  key={node.id}
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
                />
              </section>
            )
          })}
        </InfiniteScroll>
      </Form>
    </FormikProvider>
  )
}

export default SelectDialogContent
