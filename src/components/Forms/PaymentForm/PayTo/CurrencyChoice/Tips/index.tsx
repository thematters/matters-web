import { useContext } from 'react'
import { useAccount } from 'wagmi'

import { Translate, useBalanceUSDT, ViewerContext } from '~/components'

import { GUIDE_LINKS } from '~/common/enums'

import styles from './styles.css'

const Tips = () => {
  const viewer = useContext(ViewerContext)
  const { address } = useAccount()
  const { data: balanceUSDTData } = useBalanceUSDT({})

  const isZeroBalance = balanceUSDTData?.value.lte(0)
  const hasEthAddress = !!viewer.info.ethAddress

  if (!hasEthAddress) {
    return (
      <section className="tips">
        <p>
          <Translate
            zh_hant="剛接觸加密錢包？參考 "
            zh_hans="刚接触加密钱包？参考 "
            en="Don't have a wallet yet? Check the "
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.connectWallet}
            target="_blank"
          >
            <Translate zh_hant="教學指南" zh_hans="教学指南" en="tutorial" />
          </a>
        </p>

        <style jsx>{styles}</style>
      </section>
    )
  } else if (address && isZeroBalance) {
    return (
      <section className="tips">
        <p>
          <Translate
            zh_hant="USDT 餘額不正確？參考 "
            zh_hans="USDT 余额不正确？参考 "
            en="How to send tokens to Polygon? Check the "
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.payment}
            target="_blank"
          >
            <Translate zh_hant="教學指南" zh_hans="教学指南" en="tutorial" />
          </a>
        </p>

        <style jsx>{styles}</style>
      </section>
    )
  } else {
    return (
      <section className="tips">
        <p>
          <Translate
            zh_hant="如何讓支持更順利？參考 "
            zh_hans="如何让支持更顺利？参考 "
            en="How to support creators? Check the "
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.payment}
            target="_blank"
          >
            <Translate zh_hant="教學指南" zh_hans="教学指南" en="tutorial" />
          </a>
        </p>

        <style jsx>{styles}</style>
      </section>
    )
  }
}

export default Tips
