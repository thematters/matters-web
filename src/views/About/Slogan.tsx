import { Button, TextIcon, Translate } from '~/components'

import { PATHS } from '~/common/enums'

import IMAGE_SLOGAN_LG from '@/public/static/images/about-1-lg.svg'
import IMAGE_SLOGAN_MD from '@/public/static/images/about-1-md.svg'
import IMAGE_SLOGAN_SM from '@/public/static/images/about-1-sm.svg'

import styles from './styles.css'

const Slogan = () => {
  return (
    <section className="slogan">
      <div style={{ width: '100%' }}>
        <div className="l-row">
          <div className="l-col-4 l-col-md-8 l-col-lg-12 ">
            <h2>
              <Translate
                zh_hant="一個自主、永續、有價的"
                zh_hans="一个自主、永续、有价的"
              />
              <br />
              <Translate
                zh_hant="創作與公共討論空間"
                zh_hans="创作与公共讨论空间"
              />
            </h2>

            <div className="buttons">
              <Button
                size={[null, '2.25rem']}
                spacing={[0, 'base']}
                bgColor="green"
                href={PATHS.HOME}
              >
                <TextIcon color="white" weight="md">
                  <Translate zh_hant="開始創作" zh_hans="开始创作" />
                </TextIcon>
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
        }
      `}</style>
    </section>
  )
}

export default Slogan
