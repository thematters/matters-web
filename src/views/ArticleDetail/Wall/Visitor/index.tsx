import { useApolloClient } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext } from 'react'

import IMG_AD from '@/public/static/images/ad.svg'
import { analytics, translate } from '~/common/utils'
import {
  Button,
  IconClear16,
  LanguageContext,
  Layout,
  LoginButton,
  Translate,
} from '~/components'

import styles from './styles.module.css'

interface VisitorWallProps {
  show: boolean
}

const VisitorWall = ({ show }: VisitorWallProps) => {
  const { lang } = useContext(LanguageContext)

  const client = useApolloClient()
  const outerClasses = classNames({ [styles.outer]: true, [styles.show]: show })

  const closeDialog = () => {
    client?.writeData({
      id: 'ClientPreference:local',
      data: { wall: false },
    })
  }

  const style = {
    '--wall-visitor-bg': `url(${IMG_AD})`,
  } as React.CSSProperties

  return (
    <section className={outerClasses} style={style}>
      <Layout.FixedMain>
        <section className={styles.container}>
          <h2 className={styles.slogan}>
            <Translate
              zh_hant="看不過癮？"
              zh_hans="看不过瘾？"
              en="Want to read more ?"
            />
          </h2>

          <p className={styles.desc}>
            <Translate
              zh_hant="一鍵登入，即可加入全球最優質中文創作社區"
              zh_hans="一键登入，即可加入全球最优质中文创作社区"
              en="Login with one click and join the most diverse creator community."
            />
          </p>

          <div className={styles.signup}>
            <LoginButton
              bgColor="green"
              onClick={() => {
                analytics.trackEvent('click_button', {
                  type: 'try_login_from_visitor',
                  pageType: 'article_detail',
                })
              }}
            />
          </div>

          <div className={styles.close}>
            <Button
              onClick={closeDialog}
              aria-label={translate({ id: 'close', lang })}
            >
              <IconClear16 color="grey" />
            </Button>
          </div>
        </section>
      </Layout.FixedMain>
    </section>
  )
}

export default VisitorWall
