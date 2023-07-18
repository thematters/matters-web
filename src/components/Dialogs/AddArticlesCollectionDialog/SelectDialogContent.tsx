import { FormikProvider } from 'formik'
import { FormattedMessage } from 'react-intl'

import { Dialog, Form, Spinner, usePublicQuery, useRoute } from '~/components'
import {
  AddArticlesCollectionUserPublicQuery,
  CollectionDetailFragment,
} from '~/gql/graphql'

import { ADD_ARTICLES_COLLECTION_USER_PUBLIC } from './gql'
import styles from './styles.module.css'

interface SelectDialogContentProps {
  formik: any
  collection: CollectionDetailFragment
  checkingIds: string[]
  closeDialog: () => void
  // switchToSearching: () => void
}

const SelectDialogContent: React.FC<SelectDialogContentProps> = ({
  formik,
  collection,
  checkingIds,
  closeDialog,
  // switchToSearching,
}) => {
  const { getQuery } = useRoute()

  const userName = getQuery('name')
  const { data, loading } =
    usePublicQuery<AddArticlesCollectionUserPublicQuery>(
      ADD_ARTICLES_COLLECTION_USER_PUBLIC,
      {
        variables: { userName },
      }
    )

  const user = data?.user
  const articles = user?.articles

  const hasAddedArticlesId =
    collection.articles.edges?.map(({ node }) => node.id) || []

  const formId = 'add-collection-article-form'
  const hasCheckedEdges = articles?.edges?.filter(
    ({ node }) => hasAddedArticlesId.indexOf(node.id) !== -1
  )
  const hasChecked = hasCheckedEdges?.map(({ node }) => node.id) || []

  if (loading) {
    return (
      <Dialog.Content>
        <Spinner />
      </Dialog.Content>
    )
  }

  const SubmitButton = () => (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={formik.isSubmitting}
      text={<FormattedMessage defaultMessage="Confirm" />}
      loading={formik.isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Add to collection" />}
        rightBtn={<SubmitButton />}
      />
      <Dialog.Content>
        <section className={styles.formContainer}>
          <FormikProvider value={formik}>
            <Form
              id={formId}
              onSubmit={formik.handleSubmit}
              className={styles.listForm}
            >
              {articles?.edges?.map(
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
                        <div className={styles.index}>
                          {checkingIds.indexOf(node.id) + 1}
                        </div>
                      )}
                    </section>
                  )
              )}
            </Form>
          </FormikProvider>
        </section>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            <SubmitButton />
          </>
        }
      />
    </>
  )
}

export default SelectDialogContent
