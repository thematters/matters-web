import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect, useState } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Translate,
  useMutation,
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

import { UpdateSupportRequest } from './__generated__/UpdateSupportRequest'

interface FormProps {
  closeDialog: () => void
  onBack?: () => any
  onClose?: () => any
}

interface FormValues {
  supportRequest: string
  supportResponse: string
}

const UPDATE_SUPPORT_REQUEST = gql`
  mutation UpdateSupportRequest($id: ID!) {
    editArticle(input: { id: $id }) {
      id
      title
    }
  }
`

const SupportSettingDialogContent: React.FC<FormProps> = ({
  closeDialog,
  onClose,
  onBack,
}) => {
  const [update] = useMutation<UpdateSupportRequest>(
    UPDATE_SUPPORT_REQUEST,
    undefined,
    { showToast: false }
  )

  const { lang } = useContext(LanguageContext)
  const formId = 'edit-profile-form'

  const { getQuery, setQuery } = useRoute()
  const qsType = getQuery('type') as TabType
  const [tabType, setTanType] = useState<TabType>(qsType || 'request')
  const [wordCount, setWordCount] = useState(0)

  const { values, errors, touched, handleBlur, handleSubmit, setFieldValue } =
    useFormik<FormValues>({
      initialValues: {
        // TODO: wait for backend to query
        supportRequest: '',
        supportResponse: '',
      },
      validate: ({ supportRequest, supportResponse }) =>
        _pickBy({
          supportRequest: validateSupportWords(supportRequest, lang),
          supportResponse: validateSupportWords(supportResponse, lang),
        }),
      onSubmit: async (
        { supportRequest, supportResponse },
        { setSubmitting, setFieldError }
      ) => {
        try {
          await update({
            variables: {
              input: {
                supportRequest,
                supportResponse,
              },
            },
          })

          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'green',
                content: <Translate id="successEditUserProfile" />,
              },
            })
          )

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
              setFieldError('supportRequest', messages[code])
            }
          })
        }
      },
    })

  const changeTabType = (newType: TabType) => {
    setQuery('type', newType)
    setTanType(newType)
  }

  const onSave = async () => {
    console.log('save')
  }

  onBack = async () => {
    console.log('back')
  }

  useEffect(() => {
    if (tabType === 'request') {
      setWordCount(values.supportRequest.length)
    }
    if (tabType === 'response') {
      setWordCount(values.supportResponse.length)
    }
  }, [values.supportRequest, values.supportResponse])

  useEffect(() => {
    setWordCount(0)
  }, [tabType])

  const InnerForm = (tab: string) => {
    return (
      <Form id={formId} onSubmit={handleSubmit}>
        {tab === 'request' && (
          <Form.Textarea
            label=""
            name="description"
            required
            placeholder={translate({
              id: 'supportRequestDescription',
              lang,
            })}
            value={values.supportRequest}
            error={touched.supportRequest && errors.supportRequest}
            onBlur={handleBlur}
            onChange={(e) =>
              setFieldValue('supportRequest', e.currentTarget.value)
            }
            style={{ lineHeight: '1.5rem' }}
          />
        )}
        {tab === 'response' && (
          <Form.Textarea
            label={<Translate id="supportResponseTitle" />}
            name="description"
            required
            placeholder={translate({
              id: 'supportResponseDescription',
              lang,
            })}
            value={values.supportResponse}
            error={touched.supportResponse && errors.supportResponse}
            onBlur={handleBlur}
            onChange={(e) =>
              setFieldValue('supportResponse', e.currentTarget.value)
            }
            style={{ lineHeight: '1.5rem' }}
          />
        )}

        <h4>{wordCount}/140 </h4>

        <style jsx>{styles}</style>
      </Form>
    )
  }
  return (
    <>
      <Dialog.Header
        title="setSupportSetting"
        closeDialog={onClose}
        leftButton={
          <Dialog.Header.CloseButton closeDialog={closeDialog} textId="close" />
        }
        rightButton={
          <Dialog.Header.RightButton
            onClick={onSave}
            text={<Translate id="save" />}
          />
        }
      />
      <Tab tabType={tabType} setTabType={changeTabType} />

      <Dialog.Content hasGrow>
        <section className="content">
          <section className="content-input">{InnerForm(tabType)}</section>
          <section className="preview">
            <span className="preview-title">效果预览</span>
            <SupportPreview
              content={
                tabType === 'request'
                  ? values.supportRequest
                  : values.supportResponse
              }
              tabType={tabType}
            />
          </section>
        </section>
        <style jsx>{styles}</style>
      </Dialog.Content>
    </>
  )
}

export default SupportSettingDialogContent
