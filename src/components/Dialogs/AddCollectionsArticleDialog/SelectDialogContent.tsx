import { FormikProvider } from 'formik'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  Form,
  IconAdd20,
  Spinner,
  TextIcon,
  usePublicQuery,
  useRoute,
} from '~/components'
import { AddCollectionsArticleUserPublicQuery } from '~/gql/graphql'

import { ADD_COLLECTIONS_ARTICLE_USER_PUBLIC } from './gql'
import styles from './styles.module.css'

interface SelectDialogContentProps {
  formik: any
  articleId: string
  checkingIds: string[]
  closeDialog: () => void
  switchToCreating: () => void
}

const SelectDialogContent: React.FC<SelectDialogContentProps> = ({
  formik,
  articleId,
  checkingIds,
  closeDialog,
  switchToCreating,
}) => {
  const { getQuery } = useRoute()

  const userName = getQuery('name')
  const { data, loading } =
    usePublicQuery<AddCollectionsArticleUserPublicQuery>(
      ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
      { variables: { userName, id: articleId }, fetchPolicy: 'network-only' }
    )

  const user = data?.user
  const collections = user?.collections

  const formId = 'add-collections-article-form'
  const hasCheckedEdges = collections?.edges?.filter(
    ({ node }) => !!node.contains
  )
  const hasChecked = hasCheckedEdges?.map(({ node }) => node.id) || []

  const enableCollections =
    collections?.edges?.filter(({ node }) => node.articles.totalCount < 100) ||
    []

  if (loading) {
    return (
      <Dialog.Content>
        <Spinner />
      </Dialog.Content>
    )
  }

  const SubmitButton =
    enableCollections.length > 0 ? (
      <>
        <Dialog.TextButton
          type="submit"
          form={formId}
          disabled={formik.isSubmitting || checkingIds.length === 0}
          text={<FormattedMessage defaultMessage="Confirm" />}
          loading={formik.isSubmitting}
        />
      </>
    ) : null

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Add to collection" />}
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content fixedHeight>
        {enableCollections.length > 0 && (
          <section className={styles.formContainer}>
            <FormikProvider value={formik}>
              <Form
                id={formId}
                onSubmit={formik.handleSubmit}
                className={styles.listForm}
              >
                {enableCollections.map(({ node }) => (
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
                ))}
              </Form>
            </FormikProvider>
          </section>
        )}
      </Dialog.Content>

      <section className={styles.createCollection}>
        {enableCollections.length > 0 && <hr className={styles.hr}></hr>}

        <button className={styles.button} onClick={switchToCreating}>
          <TextIcon icon={<IconAdd20 size="mdS" />}>
            <FormattedMessage defaultMessage="New Collection" />
          </TextIcon>
        </button>
      </section>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default SelectDialogContent
