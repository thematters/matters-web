import jump from 'jump.js'

import { Button, TextIcon, Translate } from '~/components'

import styles from './styles.module.css'

const Intro = () => {
  return (
    <section className={styles.intro}>
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <h2>
              <Translate
                zh_hant="搬家到 Matters"
                zh_hans="搬家到 Matters"
                en="Settled in Matters"
              />
            </h2>
            <p>
              <Translate
                zh_hant="想將過去發布在其他地方的作品，搬到 Matters，實現作品的永久保存？"
                zh_hans="想将过去发布在其他地方的作品，搬到 Matters，实现作品的永久保存？"
                en="You can effortlessly pack articles published on Medium to Matters in just 3 steps."
              />
              <br />
              <Translate
                zh_hant="從今天開始，只要三個步驟，就可以將你在 Medium 的作品輕鬆搬到 Matters。"
                zh_hans="从今天开始，只要三个步骤，就可以将你在 Medium 的作品轻松搬到 Matters。"
                en=""
              />
            </p>

            <Button
              size={[null, '2.25rem']}
              spacing={[0, 'base']}
              bgColor="green"
              onClick={() => jump('#steps', { offset: 10 })}
            >
              <TextIcon color="white" weight="md">
                <Translate
                  zh_hant="開始搬家"
                  zh_hans="开始搬家"
                  en="Pack and move to Matters"
                />
              </TextIcon>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro
