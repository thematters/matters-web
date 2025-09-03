import { useFormik } from 'formik'
import { useContext, useId } from 'react'
import { FormattedMessage } from 'react-intl'

import IconCircleCheck from '@/public/static/icons/24px/circle-check.svg'
import { Dialog, Form, Icon, LanguageContext, useChannels } from '~/components'

import styles from './ChannelDrawer/styles.module.css'

export type Step = 'select' | 'confirm' | 'submitted' | 'completed'

interface Channel {
  id: string
  nameZhHans: string
  nameZhHant: string
  nameEn: string
}

interface FormValues {
  selectedChannel: string
}

interface ContentProps {
  step: Step
  setStep: (step: Step) => void
  onClose: () => void
  onConfirm?: (channels: string[]) => Promise<void>
}

const getChannelDisplayName = (channel: Channel | undefined, lang: string) => {
  if (!channel) return ''

  switch (lang) {
    case 'zh_hans':
      return channel.nameZhHans
    case 'zh_hant':
      return channel.nameZhHant
    default:
      return channel.nameEn
  }
}

const Content = ({ step, setStep, onClose, onConfirm }: ContentProps) => {
  const formId = useId()
  const { channels } = useChannels()
  const { lang } = useContext(LanguageContext)

  const topicChannels = channels?.filter(
    (channel) =>
      channel.__typename === 'TopicChannel' &&
      'enabled' in channel &&
      channel.enabled
  ) as Channel[]

  const { setFieldValue, values } = useFormik<FormValues>({
    initialValues: { selectedChannel: '' },
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: () => {},
  })

  const handleChannelChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    await setFieldValue('selectedChannel', value, false)
    e.target.blur()
  }

  const latestValue = 'latest'

  const handleNextStep = () => {
    setStep('confirm')
  }
  const handleConfirm = async () => {
    const isEmpty =
      values.selectedChannel === latestValue || values.selectedChannel === ''
    const channels = isEmpty ? [] : [values.selectedChannel]
    await onConfirm?.(channels)
    setStep(isEmpty ? 'completed' : 'submitted')
  }

  const handleClose = () => {
    setTimeout(() => setStep('select'), 200)
    onClose()
  }

  const selectedChannel = topicChannels?.find(
    (channel) => channel.id === values.selectedChannel
  )

  const renderSelectStep = () => (
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
            options={
              topicChannels?.map((channel) => ({
                label: (
                  <span
                    className={`${styles.channelLabel} ${styles.lineClamp}`}
                  >
                    {getChannelDisplayName(channel as Channel, lang)}
                  </span>
                ),
                value: channel.id,
              })) || []
            }
            currentValue={values.selectedChannel}
            onChange={handleChannelChange}
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
                        defaultMessage='(the work will appear in "Latest")'
                        id="g39W4D"
                      />
                    </span>
                  </span>
                ),
                value: latestValue,
              },
            ]}
            currentValue={values.selectedChannel}
            onChange={handleChannelChange}
          />
        </section>
      </Form>

      <Dialog.RoundedButton
        color="black"
        onClick={handleNextStep}
        borderColor="greyLight"
        borderWidth="sm"
        textWeight="normal"
        borderActiveColor="grey"
        text={<FormattedMessage defaultMessage="Next Step" id="8cv9D4" />}
        disabled={values.selectedChannel === ''}
      />
    </>
  )

  const renderConfirmStep = () => (
    <>
      <section className={styles.confirmTitle}>
        <FormattedMessage defaultMessage="Submit Confirmation" id="exG99K" />
      </section>

      <section className={styles.confirmContent}>
        {values.selectedChannel !== latestValue ? (
          <FormattedMessage
            defaultMessage="Would you like to recommend your work to the channel: {channelName}?"
            id="3MZvMF"
            values={{
              channelName: (
                <span className={styles.selectedChannelName}>
                  {getChannelDisplayName(selectedChannel as Channel, lang)}
                </span>
              ),
            }}
          />
        ) : (
          <>
            <FormattedMessage
              defaultMessage='Confirm to move the work to "Latest"?'
              id="g3NgLw"
            />
            <br />
            <FormattedMessage
              defaultMessage="(This action is immediate and cannot be undone.)"
              id="fpLpPO"
            />
          </>
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
  )

  const renderSubmittedStep = () => (
    <>
      <section className={styles.confirmTitle}>
        <FormattedMessage defaultMessage="Submitted" id="raexxM" />
      </section>

      <section className={styles.submittedContent}>
        <section className={styles.submittedIcon}>
          <Icon icon={IconCircleCheck} size={40} color="green" />
        </section>
        <section className={styles.submittedText}>
          <FormattedMessage
            defaultMessage="Your suggestion has been submitted to the editor. "
            id="KhbWu2"
          />
          <br />
          <FormattedMessage
            defaultMessage="Once it's approved, the channel will be updated : )"
            id="HJhf1Q"
          />
        </section>
      </section>

      <Dialog.RoundedButton
        color="black"
        onClick={handleClose}
        borderColor="greyLight"
        borderWidth="sm"
        textWeight="normal"
        borderActiveColor="grey"
        text={<FormattedMessage defaultMessage="Got it" id="NYTGIb" />}
      />
    </>
  )

  const renderCompletedStep = () => (
    <>
      <section className={styles.confirmTitle}>
        <FormattedMessage defaultMessage="Completed" id="95stPq" />
      </section>

      <section className={styles.submittedContent}>
        <section className={styles.submittedIcon}>
          <Icon icon={IconCircleCheck} size={40} color="green" />
        </section>
      </section>

      <Dialog.RoundedButton
        color="black"
        onClick={handleClose}
        borderColor="greyLight"
        borderWidth="sm"
        textWeight="normal"
        borderActiveColor="grey"
        text={<FormattedMessage defaultMessage="Got it" id="NYTGIb" />}
      />
    </>
  )

  switch (step) {
    case 'select':
      return renderSelectStep()
    case 'confirm':
      return renderConfirmStep()
    case 'submitted':
      return renderSubmittedStep()
    case 'completed':
      return renderCompletedStep()
    default:
      return null
  }
}

export default Content
