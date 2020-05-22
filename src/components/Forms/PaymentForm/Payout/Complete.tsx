import Router from 'next/router'
import { useEffect } from 'react'

import { Dialog, Translate } from '~/components'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

interface Props {
  callback?: () => void
}

const Complete: React.FC<Props> = ({ callback }) => {
  useEffect(() => {
    if (callback) {
      callback()
    }
  }, [])

  return (
    <>
      <Dialog.Message spacing="md">
        <h3>
          <Translate
            zh_hant="提現經由 Stripe 完成，請你留意發卡銀行處理進度。"
            zh_hans="提现经由 Stripe 完成，请你留意发卡银行处理进度。"
          />
        </h3>
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="button"
          bgColor="green"
          onClick={() => Router.push(PATHS.ME_WALLET_TRANSACTIONS)}
        >
          <Translate zh_hant="查看交易" zh_hans="查看交易" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
      <style jsx>{styles}</style>
    </>
  )
}

export default Complete
