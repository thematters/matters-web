import { Fragment, useContext } from 'react'
import { animated, useSpring } from 'react-spring'

import { IMAGE_PIXEL } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  IconArrowRight16,
  LanguageContext,
  SupportersDialog,
  TextIcon,
  Translate,
  UserDigest,
} from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { DonatorsArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type AvatarItemPros = Pick<AvatarProps, 'user'> & {
  user: { displayName?: string | null }
}

const AvatarItem = ({ user }: AvatarItemPros) => {
  return (
    <Avatar
      user={user || undefined}
      src={user ? undefined : IMAGE_PIXEL}
      size="lg"
      title={user?.displayName || ''}
    />
  )
}

interface DonatorsProps {
  article: DonatorsArticleFragment
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
    <SupportersDialog article={article}>
      {({ openDialog }) => (
        <section>
          <button
            type="button"
            onClick={openDialog}
            disabled={donatorsCount <= 0}
            aria-label={translate({ id: 'viewSupporters', lang })}
            aria-haspopup="dialog"
          >
            <section className={styles.avatarList}>
              {frontDonators.map((user, index) => (
                <Fragment key={index}>
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
                        >
                          <AvatarItem user={user} />
                        </animated.div>
                      )}
                      {index !== 0 && <AvatarItem user={user} />}
                    </>
                  )}
                  {!showAvatarAnimation && <AvatarItem user={user} />}
                </Fragment>
              ))}

              {donatorsCount === maxAvatarNum && (
                <AvatarItem
                  user={donators[maxAvatarNum - 1]}
                  key={maxAvatarNum - 1}
                />
              )}

              {donatorsCount > maxAvatarNum && (
                <span className={styles.count}>
                  {donatorsCount - (maxAvatarNum - 1)}
                </span>
              )}

              {donatorsCount === 1 && (
                <span className={styles.donatorName}>
                  <UserDigest.Plain user={donators[0]} hasUnderline />
                </span>
              )}
            </section>
          </button>
          <section className={styles.avatarListFooter}>
            {donatorsCount === 1 && (
              <section>
                <span>
                  <Translate id="theFirstSupporter" />
                </span>
              </section>
            )}

            {donatorsCount > 1 && (
              <button
                type="button"
                onClick={openDialog}
                aria-label={translate({ id: 'viewSupporters', lang })}
                aria-haspopup="dialog"
              >
                <span className={styles.count}>{donatorsCount}</span>
                <TextIcon
                  icon={<IconArrowRight16 size="xs" />}
                  textPlacement="left"
                  size="xs"
                >
                  <Translate
                    zh_hant="個人支持過本文・查看全部"
                    zh_hans="个人支持过本文・查看全部"
                    en="people have supported the article. All supporters"
                  />
                </TextIcon>
              </button>
            )}
          </section>
        </section>
      )}
    </SupportersDialog>
  )
}

Donators.fragments = fragments

export default Donators
