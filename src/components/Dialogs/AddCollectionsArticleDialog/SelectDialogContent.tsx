import { FieldInputProps, FormikProvider, useField } from 'formik'
import { FormattedMessage } from 'react-intl'

import { MAX_COLLECTION_ARTICLES_COUNT } from '~/common/enums'
import {
  Dialog,
  Form,
  IconAdd20,
  Spinner,
  TextIcon,
  usePublicQuery,
  useRoute,
} from '~/components'
import { SquareCheckBoxBoxProps } from '~/components/Form/SquareCheckBox'
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

const SquareCheckBoxField: React.FC<SquareCheckBoxBoxProps> = (props) => {
  const [field] = useField({ name: props.name, type: 'checkbox' })
  return <Form.SquareCheckBox {...field} {...props} />
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

  const collectionEdges = collections?.edges || []

  if (loading) {
    return (
      <Dialog.Content>
        <Spinner />
      </Dialog.Content>
    )
  }

  const SubmitButton =
    collectionEdges.length > 0 ? (
      <>
        <Dialog.TextButton
          type="submit"
          form={formId}
          disabled={formik.isSubmitting || checkingIds.length === 0}
          text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
          loading={formik.isSubmitting}
        />
      </>
    ) : null

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage defaultMessage="Add to collection" id="ub1kHa" />
        }
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content fixedHeight>
        {collectionEdges.length > 0 && (
          <section className={styles.formContainer}>
            <FormikProvider value={formik}>
              <Form
                id={formId}
                onSubmit={formik.handleSubmit}
                className={styles.listForm}
              >
                {collectionEdges.map(({ node }) => (
                  <section key={node.id} className={styles.item}>
                    <SquareCheckBoxField
                      hasTooltip={true}
                      checked={
                        hasChecked.includes(node.id) ||
                        checkingIds.includes(node.id)
                      }
                      full={
                        node.articles.totalCount >=
                        MAX_COLLECTION_ARTICLES_COUNT
                      }
                      hint={node.title}
                      disabled={
                        hasChecked.includes(node.id) ||
                        node.articles.totalCount >=
                          MAX_COLLECTION_ARTICLES_COUNT
                      }
                      {...(formik.getFieldProps(
                        'checked'
                      ) as FieldInputProps<any>)}
                      value={node.id}
                    />
                  </section>
                ))}
              </Form>
            </FormikProvider>
          </section>
        )}
      </Dialog.Content>

      <section className={styles.createCollection}>
        {collectionEdges.length > 0 && <hr className={styles.hr}></hr>}

        <button className={styles.button} onClick={switchToCreating}>
          <TextIcon icon={<IconAdd20 size="mdS" />}>
            <FormattedMessage defaultMessage="New Collection" id="L4Fcr8" />
          </TextIcon>
        </button>
      </section>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
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
