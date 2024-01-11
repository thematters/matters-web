import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { MAX_ARTICLE_SUPPORT_LENGTH } from '~/common/enums'
import { translate, validateSupportWords } from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  TextIcon,
  toast,
  Translate,
  useRoute,
} from '~/components'
import { ArticleDetailPublicQuery, EditMetaDraftFragment } from '~/gql/graphql'

import styles from './styles.module.css'
import SupportPreview from './SupportPreview'
import Tab, { TabType } from './Tab'

interface FormProps {
  back?: () => any
  closeDialog: () => void
  submitCallback?: () => void

  draft?: EditMetaDraftFragment
  article?: ArticleDetailPublicQuery['article']
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
  const { lang } = useContext(LanguageContext)
  const formId = 'support-setting-form'

  const { getQuery } = useRoute()
  const qsType = getQuery('type') as TabType
  const [tabType, setTabType] = useState<TabType>(qsType || 'request')
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
    validate: ({ requestForDonation, replyToDonator }) =>
      _pickBy({
        requestForDonation: validateSupportWords(requestForDonation!, lang),
        replyToDonator: validateSupportWords(replyToDonator!, lang),
      }),
    onSubmit: async ({}, { setSubmitting }) => {
      editSupportSetting(values.requestForDonation, values.replyToDonator)

      toast.success({
        message: <Translate id="successSetSupportSetting" />,
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

  const InnerForm = (tab: string) => {
    return (
      <Form id={formId} onSubmit={handleSubmit}>
        {tab === 'request' && (
          <Form.Textarea
            label={<Translate id="requestForDonation" />}
            name="requestForDonation"
            placeholder={translate({
              id: 'supportRequestDescription',
              lang,
            })}
            value={values.requestForDonation! || ''}
            hint={`${
              values.requestForDonation?.length || 0
            }/${MAX_ARTICLE_SUPPORT_LENGTH}`}
            error={errors.requestForDonation}
            hintAlign={errors.requestForDonation ? 'left' : 'right'}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue('requestForDonation', e.currentTarget.value)
            }}
          />
        )}
        {tab === 'reply' && (
          <Form.Textarea
            label={<Translate id="replyToDonator" />}
            name="replyToDonator"
            placeholder={translate({
              id: 'supportResponseDescription',
              lang,
            })}
            hint={`${
              values.replyToDonator?.length || 0
            }/${MAX_ARTICLE_SUPPORT_LENGTH}`}
            error={errors.replyToDonator}
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
      disabled={!isValid || isSubmitting || supportSettingSaving}
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

      <Dialog.Content fixedHeight>
        <section className={styles.tabs}>
          <Tab tabType={tabType} setTabType={changeTabType} />
        </section>

        {InnerForm(tabType)}

        <h3>
          <TextIcon size="md" weight="md">
            <Translate
              zh_hans="效果预览"
              zh_hant="效果預覽"
              en="Support Setting Preview"
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
