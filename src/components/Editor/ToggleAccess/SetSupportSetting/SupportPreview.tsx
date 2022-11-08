import { Avatar, Spacer, TextIcon, Translate } from '~/components'
import DonationButton from '~/components/Buttons/DonationButton'

import styles from './styles.css'

const SupportPreview = ({
  content,
  tabType,
  displayName,
  avatar,
}: {
  content: string
  tabType: string
  displayName: string
  avatar: string
}) => {
  return (
    <section className="donation">
      <section className="preview">
        <span>
          {!content &&
            (tabType === 'request' ? (
              <Translate
                zh_hant="喜歡我的創作嗎？創作並不容易，別忘了給予支持與讚賞，讓我知道在創作的路上有你陪伴。"
                zh_hans="喜欢我的创作吗？创作并不容易，别忘了给予支持与赞赏，让我知道在创作的路上有你陪伴。"
                en="Don't forget to support or like, so I know you are with me."
              />
            ) : (
              <section className="preview-response">
                <p>
                  <Translate
                    zh_hans="🎉感谢支持"
                    zh_hant="🎉 感謝支持！"
                    en="🎉Thanks for your support!"
                  />
                </p>
                <Translate
                  zh_hant="感謝 Matty 的支持 🥳，創作這條路不容易，有你的支持我將能夠蓄積更多能量創作。"
                  zh_hans="感谢 Matty 的支持 🥳，创作这条路不容易，有你的支持我将能够蓄积更多能量创作。"
                  en="Thanks to x for your support. The way isn’t always easy being a creator. With your generous support, I can accumulate more energy to go on."
                />{' '}
              </section>
            ))}
          {content && tabType === 'reply' && (
            <section>
              <Avatar src={avatar} size="xl" />
              <p>
                <TextIcon weight="md">{displayName}</TextIcon>
                <TextIcon color="grey-darker">
                  <Translate
                    zh_hant="&nbsp;想對你說："
                    zh_hans="&nbsp;想对你說："
                    en="&nbsp;wants to tell you: "
                  />
                </TextIcon>
              </p>
              <Spacer size="xtight" />
            </section>
          )}
          {<Translate zh_hant={content} zh_hans={content} en={content} />}
        </span>
        <section className="preview-button">
          {tabType === 'request' && <DonationButton supported={false} />}
          {tabType === 'reply' && <DonationButton supported={true} />}
        </section>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SupportPreview
