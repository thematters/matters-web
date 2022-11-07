import { useContext } from 'react'
import { animated, useSpring } from 'react-spring'

import {
  DonatorsDialog,
  IconArrowRight16,
  LanguageContext,
  TextIcon,
} from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'

import { IMAGE_PIXEL } from '~/common/enums'
import { translate } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { DonatorsArticle } from './__generated__/DonatorsArticle'

type AvatarItemPros = Pick<AvatarProps, 'user'>

const AvatarItem = ({ user }: AvatarItemPros) => {
  return (
    <Avatar
      user={user || undefined}
      src={user ? undefined : IMAGE_PIXEL}
      size="lg"
    />
  )
}

interface DonatorsProps {
  article: DonatorsArticle
  showAvatarAnimation?: boolean
}

const Donators = ({ article, showAvatarAnimation = false }: DonatorsProps) => {
  const { lang } = useContext(LanguageContext)

  const maxAvatarNum = 9

  const edges = article.donations.edges
  const donatorsCount = article.donations.totalCount
  const donators = (
    edges?.map(({ node }) => node).filter((user) => !!user) || []
  ).slice(0, maxAvatarNum)
  const frontDonators = donators.slice(0, maxAvatarNum - 1)

  const springStyles = useSpring({
    from: { x: -50 },
    to: { x: 0 },
  })

  return (
    <DonatorsDialog article={article}>
      {({ openDialog }) => (
        <section>
          <button
            type="button"
            onClick={openDialog}
            disabled={donatorsCount <= 0}
            aria-label={translate({ id: 'viewDonators', lang })}
            aria-haspopup="true"
          >
            <section className="avatar-list">
              {frontDonators.map((user, index) => {
                return (
                  <>
                    {showAvatarAnimation && (
                      <>
                        {index === 0 && (
                          <animated.div
                            style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: '50%',
                              ...springStyles,
                            }}
                            key={index}
                          >
                            <AvatarItem user={user} key={index} />
                          </animated.div>
                        )}
                        {index !== 0 && <AvatarItem user={user} key={index} />}
                      </>
                    )}
                    {!showAvatarAnimation && (
                      <AvatarItem user={user} key={index} />
                    )}
                  </>
                )
              })}

              {donatorsCount === maxAvatarNum && (
                <AvatarItem
                  user={donators[maxAvatarNum - 1]}
                  key={maxAvatarNum - 1}
                />
              )}

              {donatorsCount > maxAvatarNum && (
                <span className="count">
                  {donatorsCount - (maxAvatarNum - 1)}
                </span>
              )}
            </section>
          </button>
          <section className="avatar-list-footer">
            <button
              type="button"
              onClick={openDialog}
              aria-label={translate({ id: 'viewDonators', lang })}
              aria-haspopup="true"
            >
              <span className="count">{donatorsCount}</span>
              <TextIcon
                icon={<IconArrowRight16 size="xs" />}
                textPlacement="left"
              >
                個人支持過・看全部
              </TextIcon>
            </button>
          </section>

          <style jsx>{styles}</style>
        </section>
      )}
    </DonatorsDialog>
  )
}

Donators.fragments = fragments

export default Donators
