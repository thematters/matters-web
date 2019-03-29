import { Button } from '~/components/Button'
import { Translate } from '~/components/Language'

import { PATHS } from '~/common/enums'
import IMAGE_SLOGAN_LG from '~/static/images/about-1-lg.svg'
import IMAGE_SLOGAN_MD from '~/static/images/about-1-md.svg'
import IMAGE_SLOGAN_SM from '~/static/images/about-1-sm.svg'
import IMAGE_SLOGAN_XL from '~/static/images/about-1-xl.svg'

import styles from './styles.css'

const Slogan = () => (
  <section className="slogan">
    <div style={{ width: '100%' }}>
      <div className="l-row">
        <div className="l-col-4 l-col-md-8 l-col-lg-12 ">
          <h2>
            <Translate
              zh_hant="一個自由、自主、永續的"
              zh_hans="一个自由、自主、永续的"
            />
            <br />
            <Translate
              zh_hant="創作與公共討論空間"
              zh_hans="创作与公共讨论空间"
            />
          </h2>

          <div className="buttons">
            <Button
              size="large"
              bgColor="green"
              is="link"
              as={PATHS.HOME.as}
              href={PATHS.HOME.href}
            >
              <Translate zh_hant="開始創作" zh_hans="开始创作" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{styles}</style>
    <style jsx>{`
      .slogan {
        background-image: url(${IMAGE_SLOGAN_SM});

        @media (--md-up) {
          background-image: url(${IMAGE_SLOGAN_MD});
        }
        @media (--lg-up) {
          background-image: url(${IMAGE_SLOGAN_LG});
        }
        @media (--xl-up) {
          background-image: url(${IMAGE_SLOGAN_XL});
        }
      }
    `}</style>
  </section>
)

export default Slogan
