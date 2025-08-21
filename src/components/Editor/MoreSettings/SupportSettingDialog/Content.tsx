import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { MAX_ARTICLE_SUPPORT_LENGTH } from '~/common/enums'
import { formStorage } from '~/common/utils'
import { Dialog, Form, TextIcon, toast, ViewerContext } from '~/components'
import { EditMetaDraftFragment } from '~/gql/graphql'

import styles from './styles.module.css'
import SupportPreview from './SupportPreview'
import Tab, { TabType } from './Tab'

interface FormProps {
  back?: () => void
  closeDialog: () => void
  submitCallback?: () => void

  draft?: EditMetaDraftFragment
  article?: {
    replyToDonator?: string | null
    requestForDonation?: string | null
  }
  editSupportSetting: (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) => void
  supportSettingSaving: boolean
}

interface FormValues {
  requestForDonation: string | null
  replyToDonator: string | null
}

const SupportSettingDialogContent: React.FC<FormProps> = ({
  back,
  closeDialog,
  submitCallback,

  draft,
  article,
  editSupportSetting,
  supportSettingSaving,
}) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)

  const formId = `support-setting-form:${draft?.id || ''}`
  const formStorageKey = formStorage.genKey({ authorId: viewer.id, formId })
  const formDraft = formStorage.get<FormValues>(formStorageKey, 'session')

  const [tabType, setTabType] = useState<TabType>('request')
  const content = draft ? draft : article
  const {
    values,
    errors,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    isValid,
  } = useFormik<FormValues>({
    initialValues: {
      requestForDonation:
        formDraft?.requestForDonation || content?.requestForDonation || '',
      replyToDonator:
        formDraft?.replyToDonator || content?.replyToDonator || '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({}, { setSubmitting }) => {
      editSupportSetting(values.requestForDonation, values.replyToDonator)

      toast.info({
        message: (
          <FormattedMessage
            defaultMessage="Support setting updated"
            id="wNJjR5"
          />
        ),
      })

      // clear draft
      formStorage.remove(formStorageKey, 'session')

      setSubmitting(false)

      if (submitCallback) {
        submitCallback()
      } else {
        closeDialog()
      }
    },
  })

  const changeTabType = (newType: TabType) => {
    setTabType(newType)
  }

  const isRequestOverLength =
    (values.requestForDonation?.length || 0) > MAX_ARTICLE_SUPPORT_LENGTH
  const isReplyOverLength =
    (values.replyToDonator?.length || 0) > MAX_ARTICLE_SUPPORT_LENGTH
  const requestHint = `${
    values.requestForDonation?.length || 0
  }/${MAX_ARTICLE_SUPPORT_LENGTH}`
  const replyHint = `${
    values.replyToDonator?.length || 0
  }/${MAX_ARTICLE_SUPPORT_LENGTH}`

  const InnerForm = (tab: string) => {
    return (
      <Form id={formId} onSubmit={handleSubmit}>
        {tab === 'request' && (
          <Form.Textarea
            label={
              <FormattedMessage defaultMessage="Call-to-Support" id="ptTHBL" />
            }
            name="requestForDonation"
            placeholder={intl.formatMessage({
              defaultMessage:
                "Like my work? Don't forget to support and clap, let me know that you are with me on the road of creation. Keep this enthusiasm together!",
              id: '9EABqX',
            })}
            value={values.requestForDonation! || ''}
            hint={requestHint}
            error={
              isRequestOverLength ? requestHint : errors.requestForDonation
            }
            hintAlign={errors.requestForDonation ? 'left' : 'right'}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue('requestForDonation', e.currentTarget.value)
              formStorage.set<FormValues>(
                formStorageKey,
                { ...values, requestForDonation: e.target.value },
                'session'
              )
            }}
          />
        )}
        {tab === 'reply' && (
          <Form.Textarea
            label={
              <FormattedMessage defaultMessage="Thank-you card" id="xQNq3I" />
            }
            name="replyToDonator"
            placeholder={intl.formatMessage({
              defaultMessage:
                'With your support, I will be able to accumulate more energy to create.',
              id: 'E+dEI9',
            })}
            value={values.replyToDonator! || ''}
            hint={replyHint}
            error={isReplyOverLength ? replyHint : errors.replyToDonator}
            hintAlign={errors.replyToDonator ? 'left' : 'right'}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue('replyToDonator', e.currentTarget.value)
              formStorage.set<FormValues>(
                formStorageKey,
                { ...values, replyToDonator: e.target.value },
                'session'
              )
            }}
          />
        )}
      </Form>
    )
  }

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={
        !isValid ||
        isRequestOverLength ||
        isReplyOverLength ||
        isSubmitting ||
        supportSettingSaving
      }
      text={<FormattedMessage defaultMessage="Save" id="jvo0vs" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage defaultMessage="Support Setting" id="5IS+ui" />
        }
        closeDialog={closeDialog}
        leftBtn={
          back ? (
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              onClick={back}
            />
          ) : null
        }
        rightBtn={SubmitButton}
      />

      <Dialog.Content fixedHeight>
        <section className={styles.tabs}>
          <Tab tabType={tabType} setTabType={changeTabType} />
        </section>

        {InnerForm(tabType)}

        <h3 className={styles.previewTitle}>
          <TextIcon size={16} weight="medium">
            <FormattedMessage
              defaultMessage="Preview"
              id="l31hCd"
              description="src/components/Editor/MoreSettings/SupportSettingDialog/Content.tsx"
            />
          </TextIcon>
        </h3>

        <SupportPreview
          content={
            tabType === 'request'
              ? values.requestForDonation!
              : values.replyToDonator!
          }
          tabType={tabType}
        />
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={
                back ? (
                  <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                ) : (
                  <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                )
              }
              color="greyDarker"
              onClick={back || closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default SupportSettingDialogContent
