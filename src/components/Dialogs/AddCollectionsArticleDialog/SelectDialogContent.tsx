import { FieldInputProps, FormikProvider, useField } from 'formik'
import { useContext, useId } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconPlus } from '@/public/static/icons/24px/plus.svg'
import { MAX_COLLECTION_ARTICLES_COUNT } from '~/common/enums'
import {
  Dialog,
  Form,
  Icon,
  SpinnerBlock,
  TextIcon,
  usePublicQuery,
  useRoute,
  ViewerContext,
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
  const viewer = useContext(ViewerContext)

  const { getQuery } = useRoute()

  const userName = viewer.userName || getQuery('name')
  const { data, loading } =
    usePublicQuery<AddCollectionsArticleUserPublicQuery>(
      ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
      { variables: { userName, id: articleId }, fetchPolicy: 'network-only' }
    )

  const user = data?.user
  const collections = user?.collections

  const formId = useId()
  const hasCheckedEdges = collections?.edges?.filter(
    ({ node }) => !!node.contains
  )
  const hasChecked = hasCheckedEdges?.map(({ node }) => node.id) || []

  const collectionEdges = collections?.edges || []

  if (loading) {
    return (
      <Dialog.Content>
        <SpinnerBlock />
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
                      left={
                        node.articles.totalCount >=
                        MAX_COLLECTION_ARTICLES_COUNT ? (
                          <span className={styles.full}>
                            <FormattedMessage
                              defaultMessage="FULL"
                              id="Jxr/TM"
                              description="src/components/Dialogs/AddCollectionsArticleDialog/SelectDialogContent.tsx"
                            />
                          </span>
                        ) : undefined
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
          <TextIcon icon={<Icon icon={IconPlus} size={20} />}>
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
