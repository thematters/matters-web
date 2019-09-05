import classNames from 'classnames'

import { Icon, Translate } from '~/components'
import SignUpButton from '~/components/Button/SignUp'

import { SIGNUP_TYPE } from '~/common/enums'
import ICON_CLOSE from '~/static/icons/close-no-color.svg?sprite'
import IMG_AD from '~/static/images/ad.svg'

import styles from './styles.css'

const bgStyle = { backgroundImage: `url(${IMG_AD})` }

const signUpButtonStyle = { minWidth: '6rem' }

const Wall = ({ show, client }: any) => {
  const outerClasses = classNames({ outer: true, show })

  const close = () => {
    if (client && client.writeData) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { wall: false }
      })
    }
  }

  return (
    <section className={outerClasses}>
      <section className="bg" style={bgStyle}>
        <section className="l-row">
          <section className="l-col-4 l-col-md-8 l-col-lg-12">
            <section className="container">
              <div className="slogan">
                <Translate zh_hant="看不過癮？" zh_hans="看不过瘾？" />
              </div>
              <div className="desc">
                <Translate
                  zh_hant="馬上加入全球最高質量華語創作社區，更多精彩文章与讨论等着你。"
                  zh_hans="马上加入全球最高质量华语创作社区，更多精彩文章与讨论等着你。"
                />
              </div>
              <div className="signup">
                <SignUpButton
                  extraStyle={signUpButtonStyle}
                  type={SIGNUP_TYPE.AD_WALL}
                >
                  <Translate zh_hant="註冊帳號" zh_hans="注册账号" />
                </SignUpButton>
              </div>
              <div className="close">
                <button onClick={close}>
                  <Icon
                    id={ICON_CLOSE.id}
                    viewBox={ICON_CLOSE.viewBox}
                    size="small"
                  />
                </button>
              </div>
            </section>
          </section>
        </section>
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Wall
