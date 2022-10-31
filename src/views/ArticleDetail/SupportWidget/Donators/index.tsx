import { useContext } from 'react'
import { animated, useSpring } from 'react-spring'

import {
  DonatorsDialog,
  IconArrowRight16,
  LanguageContext,
  TextIcon,
} from '~/components'
import { Avatar } from '~/components/Avatar'

import { IMAGE_PIXEL } from '~/common/enums'
import { translate } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { DonatorsArticle } from './__generated__/DonatorsArticle'

interface DonatorsProps {
  article: DonatorsArticle
  showAvatarAnimation?: boolean
}

const Donators = ({ article, showAvatarAnimation = false }: DonatorsProps) => {
  const { lang } = useContext(LanguageContext)

  const edges = article.donations.edges
  const donatorsCount = article.donations.totalCount
  const donators = (
    edges?.map(({ node }) => node).filter((user) => !!user) || []
  ).slice(0, 10)

  const springStyles = useSpring({
    // loop: true,
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
              {donators.map((user, index) => {
                return (
                  <>
                    {showAvatarAnimation && (
                      <>
                        {index === 0 && (
                          <animated.div
                            style={{
                              width: '1.25rem',
                              height: '1.25rem',
                              borderRadius: '50%',
                              ...springStyles,
                            }}
                            key={index}
                          >
                            <Avatar
                              user={user || undefined}
                              src={user ? undefined : IMAGE_PIXEL}
                              size="sm"
                              key={index}
                            />
                          </animated.div>
                        )}
                        {index !== 0 && (
                          <Avatar
                            user={user || undefined}
                            src={user ? undefined : IMAGE_PIXEL}
                            size="sm"
                            key={index}
                          />
                        )}
                      </>
                    )}
                    {!showAvatarAnimation && (
                      <Avatar
                        user={user || undefined}
                        src={user ? undefined : IMAGE_PIXEL}
                        size="sm"
                        key={index}
                      />
                    )}
                  </>
                )
              })}
              {donatorsCount > 4 && (
                <span className="count">{donatorsCount}</span>
              )}
            </section>
          </button>
          {donatorsCount > 4 && (
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
          )}

          <style jsx>{styles}</style>
        </section>
      )}
    </DonatorsDialog>
  )
}

Donators.fragments = fragments

export default Donators
