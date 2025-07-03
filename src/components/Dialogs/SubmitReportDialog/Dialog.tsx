import { useFormik } from 'formik'
import gql from 'graphql-tag'
import { useId } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, Form, toast, useDialogSwitch, useMutation } from '~/components'
import { ReportReason, SubmitReportMutation } from '~/gql/graphql'

const SUBMIT_REPORT = gql`
  mutation SubmitReport($id: ID!, $reason: ReportReason!) {
    submitReport(input: { targetId: $id, reason: $reason }) {
      id
      target {
        ... on Comment {
          id
          state
        }
      }
    }
  }
`

const Reasons = {
  [ReportReason.Tort]: <FormattedMessage defaultMessage="Tort" id="+5sU+5" />,
  [ReportReason.IllegalAdvertising]: (
    <FormattedMessage defaultMessage="Illegal advertising" id="tIDG14" />
  ),
  [ReportReason.DiscriminationInsultHatred]: (
    <FormattedMessage
      defaultMessage="Discrimination, insult, or hatred"
      id="AGDFGs"
    />
  ),
  [ReportReason.PornographyInvolvingMinors]: (
    <FormattedMessage
      defaultMessage="Pornography involving minors"
      id="e3qUqn"
    />
  ),
  [ReportReason.Other]: (
    <FormattedMessage defaultMessage="Other malicious behavior" id="yOhatg" />
  ),
}

export interface SubmitReportDialogProps {
  id: string
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

interface FormValues {
  reason: string
}

const SubmitReportDialog = ({ id, children }: SubmitReportDialogProps) => {
  const { show, openDialog, closeDialog: _closeDialog } = useDialogSwitch(true)
  const formId = useId()
  const order = [
    ReportReason.Tort,
    ReportReason.DiscriminationInsultHatred,
    ReportReason.PornographyInvolvingMinors,
    ReportReason.IllegalAdvertising,
    ReportReason.Other,
  ]

  const [submitReport] = useMutation<SubmitReportMutation>(SUBMIT_REPORT)

  const {
    errors,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    values,
  } = useFormik<FormValues>({
    initialValues: {
      reason: '',
    },
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: async ({ reason }, { setSubmitting }) => {
      try {
        await submitReport({
          variables: { id, reason },
        })

        toast.info({
          message: (
            <FormattedMessage
              defaultMessage="Submission successful"
              id="2kpUZD"
            />
          ),
        })

        setSubmitting(false)
        closeDialog()
      } catch {
        setSubmitting(false)
      }
    },
  })

  const closeDialog = () => {
    _closeDialog()
    setTimeout(() => {
      setFieldValue('reason', '', false)
    }, 100)
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Report issues" id="BaQj20" />
          }
        />

        <Dialog.Content>
          <Form id={formId} onSubmit={handleSubmit}>
            <Form.RadioGroup
              name="reason"
              label={
                <FormattedMessage
                  defaultMessage="Please select the type of issues: "
                  id="uQHRvx"
                />
              }
              options={order.map((reason) => ({
                label: Reasons[reason],
                value: reason,
              }))}
              currentValue={values.reason}
              error={errors.reason}
              onBlur={handleBlur}
              onChange={async (e) => {
                const value = e.target.value
                await setFieldValue('reason', value, false)
                e.target.blur()
              }}
            />
          </Form>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              type="submit"
              form={formId}
              text={<FormattedMessage defaultMessage="Submit" id="wSZR47" />}
              color={!values.reason ? 'greyDarker' : 'green'}
              loading={isSubmitting}
              disabled={isSubmitting || !values.reason}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              type="submit"
              form={formId}
              text={<FormattedMessage defaultMessage="Submit" id="wSZR47" />}
              color={!values.reason ? 'greyDarker' : 'green'}
              loading={isSubmitting}
              disabled={isSubmitting || !values.reason}
            />
          }
        />
      </Dialog>
    </>
  )
}

const LazySubmitReportDialog = (props: SubmitReportDialogProps) => (
  <Dialog.Lazy mounted={<SubmitReportDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazySubmitReportDialog
