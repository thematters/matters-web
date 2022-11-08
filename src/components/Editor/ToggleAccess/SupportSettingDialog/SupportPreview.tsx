import { Avatar, Spacer, TextIcon, Translate } from '~/components'
import DonationButton from '~/components/Buttons/DonationButton'

import styles from './styles.css'

import { DraftDetailQuery_viewer } from '~/views/Me/DraftDetail/__generated__/DraftDetailQuery'

const SupportPreview = ({
  content,
  tabType,
  viewer,
}: {
  content: string
  tabType: string
  viewer: DraftDetailQuery_viewer | null | undefined
}) => {
  return (
    <section className="donation">
      <span>
        {!content &&
          (tabType === 'request' ? (
            <Translate id="supportRequestDescription" />
          ) : (
            <section className="preview-response">
              <p>
                <Translate
                  zh_hans="🎉感谢支持"
                  zh_hant="🎉 感謝支持！"
                  en="🎉Thanks for your support!"
                />
              </p>
              <Translate id="supportResponseDescription" />
            </section>
          ))}
        {content && tabType === 'reply' && (
          <section>
            <Avatar src={viewer?.avatar} size="xl" />
            <p>
              <TextIcon weight="md">{viewer?.displayName}</TextIcon>
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
      <style jsx>{styles}</style>
    </section>
  )
}

export default SupportPreview
