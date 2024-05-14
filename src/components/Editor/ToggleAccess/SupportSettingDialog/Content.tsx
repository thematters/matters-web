import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { MAX_ARTICLE_SUPPORT_LENGTH } from '~/common/enums'
import { Dialog, Form, TextIcon, toast } from '~/components'
import { EditMetaDraftFragment } from '~/gql/graphql'

import styles from './styles.module.css'
import SupportPreview from './SupportPreview'
import Tab, { TabType } from './Tab'

interface FormProps {
  back?: () => any
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
  ) => any
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
  const formId = 'support-setting-form'
  const intl = useIntl()

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
      requestForDonation: content?.requestForDonation
        ? content.requestForDonation
        : '',
      replyToDonator: content?.replyToDonator ? content.replyToDonator : '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({}, { setSubmitting }) => {
      editSupportSetting(values.requestForDonation, values.replyToDonator)

      toast.success({
        message: (
          <FormattedMessage
            defaultMessage="Support setting updated"
            id="wNJjR5"
          />
        ),
      })

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
            onChange={(e) =>
              setFieldValue('replyToDonator', e.currentTarget.value)
            }
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
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
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

      <Dialog.Content noMaxHeight>
        <section className={styles.tabs}>
          <Tab tabType={tabType} setTabType={changeTabType} />
        </section>

        {InnerForm(tabType)}

        <h3 className={styles.previewTitle}>
          <TextIcon size={16} weight="medium">
            <FormattedMessage
              defaultMessage="Preview"
              id="zn83cE"
              description="src/components/Editor/ToggleAccess/SupportSettingDialog/Content.tsx"
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
