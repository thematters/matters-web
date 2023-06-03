import { useApolloClient } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext } from 'react'

import IMG_AD from '@/public/static/images/ad.svg'
import { translate } from '~/common/utils'
import {
  Button,
  IconClear16,
  LanguageContext,
  LoginButton,
  Translate,
} from '~/components'

import styles from './styles.module.css'

const bgStyle = { backgroundImage: `url(${IMG_AD})` }

interface WallProps {
  show: boolean
}

const Wall = ({ show }: WallProps) => {
  const { lang } = useContext(LanguageContext)

  const client = useApolloClient()
  const outerClasses = classNames({ [styles.outer]: true, [styles.show]: show })

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
            <section className={styles['container']} style={bgStyle}>
              <h2 className={styles['slogan']}>
                <Translate
                  zh_hant="看不過癮？"
                  zh_hans="看不过瘾？"
                  en="Want to read more?"
                />
              </h2>

              <p className={styles['desc']}>
                <Translate
                  zh_hant="一鍵登入，即可加入全球最優質中文創作社區"
                  zh_hans="一键登入，即可加入全球最优质中文创作社区"
                  en="Log in with one click and join the most diverse creator community globally."
                />
              </p>

              <div className={styles['signup']}>
                <LoginButton bgColor="green" />
              </div>

              <div className={styles['close']}>
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
    </section>
  )
}

export default Wall
