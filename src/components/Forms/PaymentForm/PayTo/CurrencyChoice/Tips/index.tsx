import { useContext } from 'react'
import { useAccount } from 'wagmi'

import { GUIDE_LINKS } from '~/common/enums'
import {
  LanguageContext,
  Translate,
  useBalanceUSDT,
  ViewerContext,
} from '~/components'

import styles from './styles.module.css'

const Tips = () => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { address } = useAccount()
  const { data: balanceUSDTData } = useBalanceUSDT({})

  const isZeroBalance = balanceUSDTData?.value && balanceUSDTData?.value < 0n
  const hasEthAddress = !!viewer.info.ethAddress

  if (!hasEthAddress) {
    return (
      <section className={styles.tips}>
        <p>
          <Translate
            zh_hant="剛接觸加密錢包？參考 "
            zh_hans="刚接触加密钱包？参考 "
            en="Don't have a wallet yet? Check the "
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.connectWallet[lang]}
            target="_blank"
            rel="noreferrer"
          >
            <Translate zh_hant="教學指南" zh_hans="教学指南" en="tutorial" />
          </a>
          <Translate zh_hant="" zh_hans="" en="." />
        </p>
      </section>
    )
  } else if (address && isZeroBalance) {
    return (
      <section className={styles.tips}>
        <p>
          <Translate
            zh_hant="USDT 餘額不正確？參考 "
            zh_hans="USDT 余额不正确？参考 "
            en="How to transfer funds to Optimism? Check the "
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.usdt[lang]}
            target="_blank"
            rel="noreferrer"
          >
            <Translate zh_hant="教學指南" zh_hans="教学指南" en="tutorial" />
          </a>
          <Translate zh_hant="" zh_hans="" en="." />
        </p>
      </section>
    )
  } else {
    return (
      <section className={styles.tips}>
        <p>
          <Translate
            zh_hant="如何讓支持更順利？參考 "
            zh_hans="如何让支持更顺利？参考 "
            en="How to support creators? Check the "
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.payment[lang]}
            target="_blank"
            rel="noreferrer"
          >
            <Translate zh_hant="教學指南" zh_hans="教学指南" en="tutorial" />
          </a>
          <Translate zh_hant="" zh_hans="" en="." />
        </p>
      </section>
    )
  }
}

export default Tips
