import { Button, IconDonate24, TextIcon, Translate } from '~/components'

import styles from './styles.css'

const SupportPreview = ({
  content,
  tabType,
}: {
  content: string
  tabType: string
}) => {
  // const [content, setContent] = useState('')
  return (
    <section className="donation">
      <section className="preview">
        <p>
          {!content &&
            (tabType === 'request' ? (
              <Translate
                zh_hant="喜歡我的創作嗎？創作並不容易，別忘了給予支持與讚賞，讓我知道在創作的路上有你陪伴。"
                zh_hans="喜欢我的创作吗？创作并不容易，别忘了给予支持与赞赏，让我知道在创作的路上有你陪伴。"
                en="Don't forget to support or like, so I know you are with me.."
              />
            ) : (
              <section className="preview-response">
                <p>🎉 感謝支持！</p>
                <Translate
                  zh_hant="感謝 Matty 的支持 🥳，創作這條路不容易，有你的支持我將能夠蓄積更多能量創作。"
                  zh_hans="感谢 Matty 的支持 🥳，创作这条路不容易，有你的支持我将能够蓄积更多能量创作。"
                  en="感谢 Matty 的支持 🥳，创作这条路不容易，有你的支持我将能够蓄积更多能量创作。"
                />{' '}
              </section>
            ))}

          {<Translate zh_hant={content} zh_hans={content} en={content} />}
        </p>
        <section className="preview-button">
          {tabType === 'request' && (
            <Button size={['100%', '2.5rem']} bgColor="gold-linear-gradient">
              <TextIcon icon={<IconDonate24 />} weight="md" color="white">
                <Translate id="donation" />
              </TextIcon>
            </Button>
          )}
          {tabType === 'response' && (
            <Button
              size={['100%', '2.5rem']}
              bgColor="yellow-lighter"
              borderColor="gold"
            >
              <TextIcon icon={<IconDonate24 />} weight="md" color="gold">
                <Translate id="donateAgain" />
              </TextIcon>
            </Button>
          )}
        </section>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SupportPreview
