export type Step =
  | 'setPaymentPassword'
  | 'subscribeCircle'
  | 'resetPassword'
  | 'complete'

export interface BaseSubscribeCircleDialogProps {
  circle: DigestRichCirclePublicFragment & DigestRichCirclePrivateFragment
}
