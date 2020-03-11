import { ShareButton, TextIcon, Translate, useResponsive } from '~/components'

import IMAGE_BANNER from '~/static/images/migration-banner.svg'

import styles from './styles.css'

const Banner = () => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <section className="l-row banner">
      <p className="title">
        <Translate
          zh_hant="搬家來 Matters，討論超有梗，寫字更賺錢。"
          zh_hans="搬家来 Matters，讨论超有梗，写字更赚钱。"
        />
      </p>
      <p className="content">
        <Translate
          zh_hant="把這個消息分享給更多你支持的寫作者吧！"
          zh_hans="把这个消息分享给更多你支持的写作者吧！"
        />
      </p>
      <section>
        <ShareButton
          bgColor="green"
          hasIcon={false}
          size={[isSmallUp ? '8rem' : '7rem', '2.5rem']}
          spacing={[0, 0]}
          inCard={false}
        >
          <TextIcon color="white" size={isSmallUp ? 'md' : 'sm'} weight="md">
            <Translate zh_hant="邀請朋友搬家" zh_hans="邀请朋友搬家" />
          </TextIcon>
        </ShareButton>
      </section>

      <style jsx>{styles}</style>
      <style jsx>{`
        .banner {
          background-image: url(${IMAGE_BANNER});
        }
      `}</style>
    </section>
  )
}

export default Banner
