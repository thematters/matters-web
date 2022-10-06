import { useApolloClient } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext } from 'react'

import {
  Button,
  IconClear16,
  LanguageContext,
  Layout,
  LoginButton,
  Translate,
} from '~/components'

import { analytics, translate } from '~/common/utils'

import IMG_AD from '@/public/static/images/ad.svg'

import styles from './styles.css'

const bgStyle = { backgroundImage: `url(${IMG_AD})` }

interface VisitorWallProps {
  show: boolean
}

const VisitorWall = ({ show }: VisitorWallProps) => {
  const { lang } = useContext(LanguageContext)

  const client = useApolloClient()
  const outerClasses = classNames({ outer: true, show })

  const closeDialog = () => {
    client?.writeData({
      id: 'ClientPreference:local',
      data: { wall: false },
    })
  }

  return (
    <section className={outerClasses}>
      <Layout.FixedMain>
        <section className="container" style={bgStyle}>
          <h2 className="slogan">
            <Translate
              zh_hant="看不過癮？"
              zh_hans="看不过瘾？"
              en="Want to read more ?"
            />
          </h2>

          <p className="desc">
            <Translate
              zh_hant="一鍵登入，即可加入全球最優質中文創作社區"
              zh_hans="一键登入，即可加入全球最优质中文创作社区"
              en="Login with one click and join the most diverse creator community."
            />
          </p>

          <div className="signup">
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

          <div className="close">
            <Button
              onClick={closeDialog}
              aria-label={translate({ id: 'close', lang })}
            >
              <IconClear16 color="grey" />
            </Button>
          </div>
        </section>
      </Layout.FixedMain>

      <style jsx>{styles}</style>
    </section>
  )
}

export default VisitorWall
