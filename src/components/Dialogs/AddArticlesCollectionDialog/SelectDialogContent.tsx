import { FieldInputProps, FormikProps, FormikProvider, useField } from 'formik'

import { DateTime, Form, InfiniteScroll } from '~/components'
import { SquareCheckBoxBoxProps } from '~/components/Form/SquareCheckBox'
import {
  CollectionArticlesCollectionFragment,
  UserArticlesUserFragment,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface SelectDialogContentProps {
  formik: FormikProps<{ checked: string[] }>
  user: UserArticlesUserFragment
  collection: CollectionArticlesCollectionFragment
  checkingIds: string[]
  formId: string
  loadMore: () => Promise<void>
  pageInfo:
    | {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
    | undefined
}

const SquareCheckBoxField: React.FC<SquareCheckBoxBoxProps> = (props) => {
  const [field] = useField({ name: props.name, type: 'checkbox' })
  return <Form.SquareCheckBox {...field} {...props} />
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
          hasNextPage={pageInfo?.hasNextPage || false}
          loadMore={loadMore}
          eof
        >
          {articles.edges?.map(({ node }) => {
            const checked =
              hasChecked.includes(node.id) || checkingIds.includes(node.id)
            const checkedIndex = checkingIds.includes(node.id)
              ? checkingIds.indexOf(node.id) + 1
              : undefined
            const disabled = hasChecked.includes(node.id)

            return (
              <section key={node.id} className={styles.item}>
                <SquareCheckBoxField
                  hasTooltip
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
                  {...(formik.getFieldProps('checked') as FieldInputProps<
                    string[]
                  >)}
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
