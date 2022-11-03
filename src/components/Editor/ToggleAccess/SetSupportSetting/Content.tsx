import { useQuery } from '@apollo/react-hooks'
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
import { DRAFT_DETAIL } from '~/views/Me/DraftDetail/gql'
import { DraftDetailQuery } from '~/views/Me/DraftDetail/__generated__/DraftDetailQuery'

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
    requestForDonation: string | null
    replyToDonator: string | null
}

const UPDATE_SUPPORT_REQUEST = gql`
  mutation UpdateSupportRequest($id: ID!, $requestForDonation: requestForDonation_String_maxLength_140 , $replyToDonator: replyToDonator_String_maxLength_140) {
    putDraft(input: { id: $id, requestForDonation: $requestForDonation, replyToDonator: $replyToDonator}) {
      id
      requestForDonation
      replyToDonator
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
        { showToast: true }
    )

    const { lang } = useContext(LanguageContext)
    const formId = 'edit-profile-form'

    const { getQuery, setQuery } = useRoute()
    const qsType = getQuery('type') as TabType
    const [tabType, setTabType] = useState<TabType>(qsType || 'request')
    const [wordCount, setWordCount] = useState(0)

    const id = getQuery('draftId')
    const { data } = useQuery<DraftDetailQuery>(DRAFT_DETAIL, {
        variables: { id },
        fetchPolicy: 'network-only',
    })
    const draft = (data?.node?.__typename === 'Draft' && data.node) || undefined

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,       
        isValid,
    } = useFormik<FormValues>({
        initialValues: {
            requestForDonation: draft ? draft.requestForDonation : '',
            replyToDonator: draft ? draft.replyToDonator : '',
        },
        validate: ({ requestForDonation, replyToDonator }) =>
            _pickBy({
                requestForDonation: validateSupportWords(requestForDonation!, lang),
                replyToDonator: validateSupportWords(replyToDonator!, lang),
            }),
        onSubmit: async (
            { requestForDonation, replyToDonator },
            { setSubmitting, setFieldError }
        ) => {
            try {
                await update({
                    variables: {
                            id: draft?.id!,
                            requestForDonation: values.requestForDonation,
                            replyToDonator: values.replyToDonator,   
                    },
                })

                window.dispatchEvent(
                    new CustomEvent(ADD_TOAST, {
                        detail: {
                            color: 'green',
                            content: <Translate id="successSetSupportSetting" />,
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

    onBack = async () => {
        console.log('back')
    }

    useEffect(() => {
        if (tabType === 'request') {
            setWordCount(values.requestForDonation!.length)
        }
        if (tabType === 'reply') {
            setWordCount(values.replyToDonator!.length)
        }
    }, [values.requestForDonation, values.replyToDonator])

    useEffect(() => {
        setWordCount(0)
    }, [tabType])

    const InnerForm = (tab: string) => {
        return (
            <Form id={formId} onSubmit={handleSubmit} noBackground={true}>
                {tab === 'request' && (
                    <Form.Textarea
                        label=""
                        name="description"
                        required
                        placeholder={
                            draft
                                ? draft?.requestForDonation!
                                : translate({
                                    id: 'supportRequestDescription',
                                    lang,
                                })
                        }
                        value={values.requestForDonation!}
                        error={touched.requestForDonation && errors.requestForDonation}
                        onBlur={handleBlur}
                        onChange={(e) => {
                            setFieldValue('requestForDonation', e.currentTarget.value)
                          }
                        }
                        style={{ lineHeight: '1.5rem' }}
                    />
                )}
                {tab === 'reply' && (
                    <Form.Textarea
                        label={<Translate id="supportResponseTitle" />}
                        name="description"
                        required
                        placeholder={
                            draft
                                ? draft.replyToDonator!
                                : translate({
                                    id: 'supportResponseDescription',
                                    lang,
                                })
                        }
                        value={values.replyToDonator!}
                        error={touched.replyToDonator && errors.replyToDonator}
                        onBlur={handleBlur}
                        onChange={(e) =>
                            setFieldValue('replyToDonator', e.currentTarget.value)
                        }
                        style={{ lineHeight: '1.5rem' }}
                    />
                )}

                <h4>{wordCount} / 140 </h4>

                <style jsx>{styles}</style>
            </Form>
        )
    }

    const SubmitButton = (
        <Dialog.Header.RightButton
            type="submit"
            form={formId}
            disabled={ !values }
            text={<Translate id="save" />}
            loading={isSubmitting}
        />
    )

    return (
        <>
            <Dialog.Header
                title="setSupportSetting"
                closeDialog={onClose}
                leftButton={
                    <Dialog.Header.CloseButton closeDialog={closeDialog} textId="close" />
                }
                rightButton={SubmitButton}
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
                                    ? values.requestForDonation!
                                    : values.replyToDonator!
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
