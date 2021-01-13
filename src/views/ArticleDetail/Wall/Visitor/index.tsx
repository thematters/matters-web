import { useApolloClient } from '@apollo/react-hooks'
import classNames from 'classnames'

import { Button, IconClear16, LoginButton, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import IMG_AD from '@/public/static/images/ad.svg'

import styles from './styles.css'

const bgStyle = { backgroundImage: `url(${IMG_AD})` }

interface VisitorWallProps {
  show: boolean
}

const VisitorWall = ({ show }: VisitorWallProps) => {
  const client = useApolloClient()
  const outerClasses = classNames({ outer: true, show })

  const close = () => {
    if (client?.writeData) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { wall: false },
      })
    }
  }

  return (
    <section className={outerClasses}>
      <div className="l-row full">
        <div className="l-col-three-left" />
        <div className="l-col-three-mid">
          <section className="container" style={bgStyle}>
            <h2 className="slogan">
              <Translate zh_hant="看不過癮？" zh_hans="看不过瘾？" />
            </h2>

            <p className="desc">
              <Translate
                zh_hant="一鍵登入，即可加入全球最優質中文創作社區"
                zh_hans="一键登入，即可加入全球最优质中文创作社区"
              />
            </p>

            <div className="signup">
              <LoginButton bgColor="green" />
            </div>

            <div className="close">
              <Button onClick={close} aria-label={TEXT.zh_hant.close}>
                <IconClear16 color="grey" />
              </Button>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default VisitorWall
