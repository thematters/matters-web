import { FormikProvider } from 'formik'
import { memo } from 'react'
import { areEqual, FixedSizeList } from 'react-window'

import { Form } from '~/components'
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
}

const SelectDialogContent: React.FC<SelectDialogContentProps> = ({
  formik,
  user,
  collection,
  checkingIds,
  formId,
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
        <FixedSizeList
          height={52 * 7.5}
          itemCount={articles.edges?.length || 0}
          itemData={articles.edges}
          itemSize={52}
          width="100%"
          className={styles.fixedSizeList}
        >
          {memo(function Item({ index, style, data }) {
            if (!data) {
              return null
            }
            const node = data[index].node
            return (
              <section style={style}>
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
              </section>
            )
          }, areEqual)}
        </FixedSizeList>
      </Form>
    </FormikProvider>
  )
}

export default SelectDialogContent
