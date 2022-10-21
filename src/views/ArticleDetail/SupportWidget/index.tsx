import classNames from 'classnames'
import { useState } from 'react'

import { CircleDigest, Translate, useEventListener } from '~/components'

import { SUPPORT_SUCCESS_ANIMATION } from '~/common/enums'
import { analytics } from '~/common/utils'

import Animation from './Animation'
import DonationButton from './DonationButton'
import Donators from './Donators'
import { fragments } from './gql'
import styles from './styles.css'

import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'

interface DonationProps {
  article: ArticleDetailPublic_article
}

const SupportWidget = ({ article }: DonationProps) => {
  const [showAnimation, setShowAnimation] = useState(false)
  const supportWidgetClasses = classNames({
    'support-widget': true,
    hasCircle: article.access.circle,
  })

  useEventListener(SUPPORT_SUCCESS_ANIMATION, () => {
    setShowAnimation(true)
  })

  return (
    <section className={supportWidgetClasses}>
      <section className="donation">
        <section className="donation-button">
          <DonationButton
            recipient={article.author}
            targetId={article.id}
            article={article}
          />
        </section>

        {showAnimation && (
          <Animation
            callback={() => {
              setShowAnimation(false)
            }}
          />
        )}
        <p>
          <Translate
            zh_hant="喜歡我的文章嗎？"
            zh_hans="喜欢我的文章吗？"
            en="Like my work??"
          />
          <br />
          <Translate
            zh_hant="別忘了給點支持與讚賞，讓我知道創作的路上有你陪伴。"
            zh_hans="别忘了给点支持与赞赏，让我知道创作的路上有你陪伴。"
            en="Don't forget to support or like, so I know you are with me.."
          />
        </p>

        <section className="donators">
          <Donators article={article} />
        </section>
      </section>

      {article.access.circle && (
        <section className="circle">
          <CircleDigest.Rich
            circle={article.access.circle}
            bgColor="grey-lighter"
            hasFooter
            hasPrice
            onClickPrice={() => {
              analytics.trackEvent('click_button', {
                type: 'subscribe_circle_price',
                pageType: 'article_detail',
              })
            }}
          />
        </section>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

SupportWidget.fragments = fragments

export default SupportWidget
