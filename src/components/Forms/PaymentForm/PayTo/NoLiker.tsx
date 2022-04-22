import { Dialog, Translate } from '~/components'

import {
  OPEN_LIKE_COIN_DIALOG,
  PAYMENT_CURRENCY as CURRENCY,
} from '~/common/enums'

interface NoLikerId {
  canPayLike: boolean
  canReceiveLike: boolean
}

export const NoLikerIdMessage = ({ canPayLike, canReceiveLike }: NoLikerId) => {
  if (!canPayLike) {
    return (
      <Translate
        zh_hant="請先綁定 Liker ID， 才能用 LikeCoin 支持作者"
        zh_hans="请先绑定 Liker ID， 才能用 LikeCoin 支持作者"
        en="Please link your Liker ID before supporting authors with LikeCoin"
      />
    )
  }

  if (!canReceiveLike) {
    return (
      <Translate
        zh_hant="作者還沒有綁定 Liker ID，你還不能用 LikeCoin 支持他"
        zh_hans="作者还没有绑定 Liker ID，你还不能用 LikeCoin 支持他"
        en="The author has not linked Liker ID and cannot be supported with LikeCoin."
      />
    )
  }

  return null
}

export const NoLikerIdButton = ({
  canPayLike,
  canReceiveLike,
  closeDialog,
  setFieldValue,
}: NoLikerId & {
  closeDialog: () => void
  setFieldValue: (field: string, value: any) => void
}) => {
  if (!canPayLike) {
    return (
      <Dialog.Footer.Button
        onClick={() => {
          window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
          closeDialog()
        }}
      >
        <Translate
          zh_hant="綁定 LikeID"
          zh_hans="綁定 LikeID"
          en="Like LikeID"
        />
      </Dialog.Footer.Button>
    )
  }

  if (!canReceiveLike) {
    return (
      <Dialog.Footer.Button
        onClick={() => setFieldValue('currency', CURRENCY.HKD)}
      >
        <Translate
          zh_hant="使用港幣支持"
          zh_hans="使用港币支持"
          en="Use HKD to support"
        />
      </Dialog.Footer.Button>
    )
  }

  return null
}
