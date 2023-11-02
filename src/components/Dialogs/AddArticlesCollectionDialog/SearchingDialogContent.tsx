import { FormikProvider } from 'formik'
import { FormattedMessage } from 'react-intl'

import { DateTime, Form } from '~/components'
import {
  CollectionArticlesCollectionFragment,
  UserArticlesUserFragment,
} from '~/gql/graphql'

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
  const articles = user?.articles
  const activeArticles =
    articles?.edges?.filter(({ node }) => node.state === 'active') || []

  const hasAddedArticlesId =
    collection.articleList.edges?.map(({ node }) => node.id) || []
  const hasCheckedEdges = articles?.edges?.filter(
    ({ node }) => hasAddedArticlesId.indexOf(node.id) !== -1
  )
  const hasChecked = hasCheckedEdges?.map(({ node }) => node.id) || []

  const searchingEdges = activeArticles.filter(({ node }) =>
    node.title.includes(searchValue)
  )

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

  return (
    <FormikProvider value={formik}>
      <Form id={formId} onSubmit={formik.handleSubmit} className={styles.form}>
        {searchingEdges.map(({ node }) => {
          const checked =
            hasChecked.includes(node.id) || checkingIds.includes(node.id)
          const checkedIndex = checkingIds.includes(node.id)
            ? checkingIds.indexOf(node.id) + 1
            : undefined
          const disabled = hasChecked.includes(node.id)

          return (
            <section key={node.id} className={styles.item}>
              <Form.SquareCheckBox
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
          )
        })}
      </Form>
    </FormikProvider>
  )
}

export default SearchingDialogContent
