import { useFormik } from 'formik'
import { useContext, useId, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconCircleCheckFill from '@/public/static/icons/24px/circle-check-fill.svg'
import {
  Dialog,
  Drawer,
  Form,
  Icon,
  LanguageContext,
  useChannels,
} from '~/components'

import styles from './styles.module.css'

type Step = 'select' | 'confirm' | 'submitted'

interface ChannelDrawerProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (selectedChannels: string[]) => void
  selectedChannels?: string[]
}

interface FormValues {
  selectedChannel: string
}

const ChannelDrawer = ({ isOpen, onClose: _onClose }: ChannelDrawerProps) => {
  const intl = useIntl()
  const formId = useId()
  const { channels } = useChannels()
  const { lang } = useContext(LanguageContext)
  const [step, setStep] = useState<Step>('select')
  const isSelectStep = step === 'select'
  const isConfirmStep = step === 'confirm'
  const isSubmittedStep = step === 'submitted'

  const topicChannels = channels?.filter(
    (channel) =>
      channel.__typename === 'TopicChannel' &&
      'enabled' in channel &&
      channel.enabled
  )

  const nextStep = () => {
    setStep('confirm')
  }

  const onClose = () => {
    setTimeout(() => {
      setStep('select')
    }, 200)
    _onClose()
  }

  const handleConfirm = () => {
    // onConfirm(tempSelectedChannels)
    setStep('submitted')
  }

  const getChannelName = (channel?: {
    nameZhHans: string
    nameZhHant: string
    nameEn: string
  }) => {
    if (!channel) return ''
    return lang === 'zh_hans'
      ? channel.nameZhHans
      : lang === 'zh_hant'
        ? channel.nameZhHant
        : channel.nameEn
  }

  const { setFieldValue, values } = useFormik<FormValues>({
    initialValues: {
      selectedChannel: '',
    },
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: async ({ selectedChannel }, { setSubmitting }) => {
      try {
        console.log('selectedChannel', selectedChannel)

        setSubmitting(false)
      } catch {
        setSubmitting(false)
      }
    },
  })

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <Drawer.Header
        title={intl.formatMessage({
          defaultMessage: 'Channel suggestion',
          id: 'A4P0al',
        })}
        closeDrawer={onClose}
        fixedWidth
      />

      <Drawer.Content fixedWidth>
        {isSelectStep && (
          <>
            <section className={styles.title}>
              <FormattedMessage
                defaultMessage="Select the channel you want to recommend (single choice)"
                id="yx0LeF"
              />
            </section>
            <Form id={formId}>
              <section className={styles.channelList}>
                <Form.RadioGroup
                  name="selectedChannel"
                  options={topicChannels?.map((channel) => ({
                    label: (
                      <span
                        className={`${styles.channelLabel} ${styles.lineClamp}`}
                      >
                        {getChannelName(channel)}
                      </span>
                    ),
                    value: channel.id,
                  }))}
                  currentValue={values.selectedChannel}
                  onChange={async (e) => {
                    const value = e.target.value
                    await setFieldValue('selectedChannel', value, false)
                    e.target.blur()
                  }}
                />
              </section>

              <section className={styles.noSuitableChannels}>
                <div className={styles.title}>
                  <FormattedMessage
                    defaultMessage="No suitable channels"
                    id="Y9IYvj"
                  />
                </div>
                <Form.RadioGroup
                  name="selectedChannel"
                  options={[
                    {
                      label: (
                        <span className={styles.channelLabel}>
                          <FormattedMessage
                            defaultMessage="Do not recommend to any channel"
                            id="Kt6f7U"
                          />
                          &nbsp;
                          <span className={styles.latest}>
                            <FormattedMessage
                              defaultMessage="(the work will appear in “Latest”)"
                              id="J4BUGe"
                            />
                          </span>
                        </span>
                      ),
                      value: '',
                    },
                  ]}
                  currentValue={values.selectedChannel}
                  onChange={async (e) => {
                    const value = e.target.value
                    await setFieldValue('selectedChannel', value, false)
                    e.target.blur()
                  }}
                ></Form.RadioGroup>
              </section>
            </Form>
            <Dialog.RoundedButton
              color="black"
              onClick={nextStep}
              borderColor="greyLight"
              borderWidth="sm"
              textWeight="normal"
              borderActiveColor="grey"
              text={<FormattedMessage defaultMessage="Next Step" id="8cv9D4" />}
            />
          </>
        )}
        {isConfirmStep && (
          <>
            <section className={styles.confirmTitle}>
              <FormattedMessage
                defaultMessage="Submit Confirmation"
                id="exG99K"
              />
            </section>
            <section className={styles.confirmContent}>
              {values.selectedChannel !== '' && (
                <FormattedMessage
                  defaultMessage="Would you like to recommend your work to the channel: {channelName}?"
                  id="3MZvMF"
                  values={{
                    channelName: (
                      <span className={styles.selectedChannelName}>
                        {getChannelName(
                          topicChannels?.find(
                            (channel) => channel.id === values.selectedChannel
                          )
                        )}
                      </span>
                    ),
                  }}
                />
              )}
              {values.selectedChannel === '' && (
                <FormattedMessage
                  defaultMessage="Confirm to move the work to “Latest”?
(This action is immediate and cannot be undone.)"
                  id="WVicCO"
                />
              )}
            </section>
            <Dialog.RoundedButton
              color="black"
              onClick={handleConfirm}
              borderColor="greyLight"
              borderWidth="sm"
              textWeight="normal"
              borderActiveColor="grey"
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
            />
          </>
        )}
        {isSubmittedStep && (
          <>
            <section className={styles.confirmTitle}>
              <FormattedMessage defaultMessage="Submitted" id="raexxM" />
            </section>
            <section className={styles.submittedContent}>
              <section className={styles.submittedIcon}>
                <Icon icon={IconCircleCheckFill} size={40} color="green" />
              </section>
              <section className={styles.submittedText}>
                <FormattedMessage
                  defaultMessage="Your suggestion has been submitted to the editor.
Once it’s approved, the channel will be updated : )"
                  id="cJ+M8n"
                />
              </section>
            </section>
            <Dialog.RoundedButton
              color="black"
              onClick={onClose}
              borderColor="greyLight"
              borderWidth="sm"
              textWeight="normal"
              borderActiveColor="grey"
              text={<FormattedMessage defaultMessage="Got it" id="NYTGIb" />}
            />
          </>
        )}
      </Drawer.Content>
    </Drawer>
  )
}

export default ChannelDrawer
