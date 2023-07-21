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
      {
        variables: { userName, id: articleId },
      }
    )

  const user = data?.user
  const collections = user?.collections

  const formId = 'add-collection-article-form'
  const hasCheckedEdges = collections?.edges?.filter(
    ({ node }) => !!node.contains
  )
  const hasChecked = hasCheckedEdges?.map(({ node }) => node.id) || []

  if (loading) {
    return (
      <Dialog.Content>
        <Spinner />
      </Dialog.Content>
    )
  }

  const SubmitButton = (
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
        leftBtn={<span />}
        rightBtn={SubmitButton}
      />
      <Dialog.Content>
        <section className={styles.formContainer}>
          <FormikProvider value={formik}>
            <Form
              id={formId}
              onSubmit={formik.handleSubmit}
              className={styles.listForm}
            >
              {collections?.edges?.map(
                ({ node }) =>
                  node.articles.totalCount < 100 && (
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
                  )
              )}
            </Form>
          </FormikProvider>

          <section className={styles.newCollection}>
            <span className={styles.button} onClick={switchToCreating}>
              <TextIcon icon={<IconAdd20 size="mdS" />}>
                <FormattedMessage defaultMessage="New Collection" />
              </TextIcon>
            </span>
          </section>
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
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default SelectDialogContent
