import jump from 'jump.js'

import { Button, TextIcon, Translate } from '~/components'

import IMAGE_MIGRATION_LG from '~/static/images/migration-intro-lg.svg'
import IMAGE_MIGRATION_MD from '~/static/images/migration-intro-md.svg'
import IMAGE_MIGRATION_SM from '~/static/images/migration-intro-sm.svg'
import IMAGE_MIGRATION_XL from '~/static/images/migration-intro-xl.svg'
import IMAGE_MIGRATION_XS from '~/static/images/migration-intro-xs.svg'

import styles from './styles.css'

const texts: {
  zh_hant: Record<string, string>
  zh_hans: Record<string, string>
} = {
  zh_hant: {
    intro: '搬家到 Matters',
    content:
      '想將過去發表在其他地方的文章，搬到 Matters，實現文章的永久保存？' +
      '從今天開始，只要三個步驟，就可以將你在 Medium 的文章輕鬆搬到 Matters。',
    start: '開始搬家'
  },
  zh_hans: {
    intro: '搬家到 Matters',
    content:
      '想将过去发表在其他地方的文章，搬到 Matters，实现文章的永久保存？' +
      '从今天开始，只要三个步骤，就可以将你在 Medium 的文章轻松搬到 Matters。',
    start: '开始搬家'
  }
}

const Intro = () => {
  const { zh_hant, zh_hans } = texts

  return (
    <section className="intro-wrap">
      <section className="l-row intro">
        <section className="l-col-4 l-col-md-8 l-col-lg-12">
          <section>
            <h2>
              <Translate zh_hant={zh_hant.intro} zh_hans={zh_hans.intro} />
            </h2>
            <p>
              <Translate zh_hant={zh_hant.content} zh_hans={zh_hans.content} />
            </p>
          </section>

          <Button
            size={[null, '2.25rem']}
            spacing={[0, 'base']}
            bgColor="green"
            onClick={() => jump('#steps', { offset: 10 })}
          >
            <TextIcon color="white" weight="md">
              <Translate zh_hant={zh_hant.start} zh_hans={zh_hans.start} />
            </TextIcon>
          </Button>
        </section>
      </section>

      <style jsx>{styles}</style>
      <style jsx>{`
        .intro-wrap {
          background-image: url(${IMAGE_MIGRATION_XS});

          @media (--sm-up) {
            background-image: url(${IMAGE_MIGRATION_SM});
          }

          @media (--md-up) {
            background-image: url(${IMAGE_MIGRATION_MD});
          }

          @media (--lg-up) {
            background-image: url(${IMAGE_MIGRATION_LG});
          }

          @media (--xl-up) {
            background-image: url(${IMAGE_MIGRATION_XL});
          }
        }
      `}</style>
    </section>
  )
}

export default Intro
