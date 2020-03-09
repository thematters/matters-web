import { useApolloClient } from '@apollo/react-hooks'
import classNames from 'classnames'

import { Button, Icon, SignUpButton, Translate } from '~/components'

import { SIGNUP_TYPE } from '~/common/enums'
import IMG_AD from '~/static/images/ad.svg'

import styles from './styles.css'

const bgStyle = { backgroundImage: `url(${IMG_AD})` }

interface WallProps {
  show: boolean
}

const Wall = ({ show }: WallProps) => {
  const client = useApolloClient()
  const outerClasses = classNames({ outer: true, show })

  const close = () => {
    if (client?.writeData) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { wall: false }
      })
    }
  }

  return (
    <section className={outerClasses}>
      <section className="l-row full">
        <section className="l-col-4 l-col-sm-7 l-offset-sm-1 l-col-md-7 l-offset-md-2 l-col-lg-7 l-offset-lg-2">
          <section className="container" style={bgStyle}>
            <h2 className="slogan">
              <Translate zh_hant="看不過癮？" zh_hans="看不过瘾？" />
            </h2>

            <p className="desc">
              <Translate
                zh_hant="馬上加入全球最高質量華語創作社區，更多精彩文章與討論等著你。"
                zh_hans="马上加入全球最高质量华语创作社区，更多精彩文章与讨论等着你。"
              />
            </p>

            <div className="signup">
              <SignUpButton trackType={SIGNUP_TYPE.AD_WALL} />
            </div>

            <div className="close">
              <Button onClick={close}>
                <Icon.Clear color="grey" />
              </Button>
            </div>
          </section>
        </section>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Wall
