import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useState } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Translate,
  useRoute,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'
import {
  parseFormSubmitErrors,
  translate,
  validateSupportWords,
} from '~/common/utils'

import styles from './styles.css'
import SupportPreview from './SupportPreview'
import Tab, { TabType } from './Tab'

import { ArticleDetailPublic_article } from '~/views/ArticleDetail/__generated__/ArticleDetailPublic'
import { EditMetaDraft } from '~/views/Me/DraftDetail/__generated__/EditMetaDraft'

interface FormProps {
  closeDialog: () => void
  onBack?: () => any
  draft?: EditMetaDraft
  article?: ArticleDetailPublic_article
  editSupportSetting: (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) => any
  supportSettingSaving: boolean
  displayName: string
  avatar: string
}

interface FormValues {
  requestForDonation: string | null
  replyToDonator: string | null
}

const SupportSettingDialogContent: React.FC<FormProps> = ({
  closeDialog,
  onBack,
  draft,
  article,
  editSupportSetting,
  supportSettingSaving,
  displayName,
  avatar,
}) => {
  const { lang } = useContext(LanguageContext)
  const formId = 'edit-profile-form'

  const { getQuery, setQuery } = useRoute()
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
      requestForDonation: content ? content.requestForDonation : '',
      replyToDonator: content ? content.replyToDonator : '',
    },
    validate: ({ requestForDonation, replyToDonator }) =>
      _pickBy({
        requestForDonation: validateSupportWords(requestForDonation!, lang),
        replyToDonator: validateSupportWords(replyToDonator!, lang),
      }),
    onSubmit: async ({}, { setSubmitting, setFieldError }) => {
      try {
        editSupportSetting(values.requestForDonation, values.replyToDonator)
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <Translate id="successSetSupportSetting" />,
            },
          })
        )

        supportSettingSaving = false
        setSubmitting(false)
        closeDialog()
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        codes.forEach((code) => {
          if (code === 'DISPLAYNAME_INVALID') {
            setFieldError(
              'displayName',
              translate({ id: 'hintDisplayName', lang })
            )
          } else {
            setFieldError('requestForDonation', messages[code])
          }
        })
      }
    },
  })

  const changeTabType = (newType: TabType) => {
    setQuery('type', newType)
    setTabType(newType)
  }

  const InnerForm = (tab: string) => {
    return (
      <Form id={formId} onSubmit={handleSubmit} noBackground={true}>
        {tab === 'request' && (
          <Form.Textarea
            label=""
            name="description"
            required
            placeholder={translate({
              id: 'supportRequestDescription',
              lang,
            })}
            value={values.requestForDonation!}
            error={errors.requestForDonation}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue('requestForDonation', e.currentTarget.value)
            }}
            style={{ lineHeight: '1.5rem' }}
          />
        )}
        {tab === 'reply' && (
          <Form.Textarea
            label={<Translate id="supportResponseTitle" />}
            name="description"
            required
            placeholder={translate({
              id: 'supportResponseDescription',
              lang,
            })}
            value={values.replyToDonator!}
            error={errors.replyToDonator}
            onBlur={handleBlur}
            onChange={(e) =>
              setFieldValue('replyToDonator', e.currentTarget.value)
            }
            style={{ lineHeight: '1.5rem' }}
          />
        )}
        <style jsx>{styles}</style>
      </Form>
    )
  }

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting || supportSettingSaving}
      text={<Translate id="save" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title="setSupportSetting"
        closeDialog={closeDialog}
        leftButton={
          onBack ? <Dialog.Header.BackButton onClick={onBack} /> : null
        }
        rightButton={SubmitButton}
      />

      <Tab tabType={tabType} setTabType={changeTabType} />

      <Dialog.Content hasGrow>
        <section className="content">
          <section className="content-input">{InnerForm(tabType)}</section>
          <section className="preview">
            <span className="preview-title">
              <Translate
                zh_hans="效果预览"
                zh_hant="效果預覽"
                en="Support Setting Preview"
              />
            </span>
            <SupportPreview
              content={
                tabType === 'request'
                  ? values.requestForDonation!
                  : values.replyToDonator!
              }
              tabType={tabType}
              displayName={displayName}
              avatar={avatar}
            />
          </section>
        </section>

        <style jsx>{styles}</style>
      </Dialog.Content>
    </>
  )
}

export default SupportSettingDialogContent
