import { useApolloClient } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext } from 'react'

import {
  Button,
  IconClear16,
  LanguageContext,
  LoginButton,
  Translate,
} from '~/components'

import { translate } from '~/common/utils'

import IMG_AD from '@/public/static/images/ad.svg'

import styles from './styles.css'

const bgStyle = { backgroundImage: `url(${IMG_AD})` }

interface WallProps {
  show: boolean
}

const Wall = ({ show }: WallProps) => {
  const { lang } = useContext(LanguageContext)

  const client = useApolloClient()
  const outerClasses = classNames({ outer: true, show })

  const closeDialog = () => {
    if (client?.writeData) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { wall: false },
      })
    }
  }

  return (
    <section className={outerClasses}>
      <div className="l-container full">
        <div className="l-row">
          <div className="l-col-three-mid">
            <section className="container" style={bgStyle}>
              <h2 className="slogan">
                <Translate
                  zh_hant="看不過癮？"
                  zh_hans="看不过瘾？"
                  en="Want to read more?"
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
                <LoginButton bgColor="green" />
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
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Wall
