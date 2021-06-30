import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  DonationDialog,
  IconDonate24,
  LoginButton,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { analytics, numAbbr } from '~/common/utils'

import { DonationButtonArticle } from './__generated__/DonationButtonArticle'

interface DonationButtonProps {
  article: DonationButtonArticle
  disabled: boolean
}

const fragments = {
  article: gql`
    fragment DonationButtonArticle on Article {
      id
      donationsToolbar: transactionsReceivedBy(
        input: { first: 0, purpose: donation }
      ) {
        totalCount
      }
      author {
        ...UserDonationRecipient
      }
    }
    ${DonationDialog.fragments.recipient}
  `,
}

const DonationButton = ({ article, disabled }: DonationButtonProps) => {
  const viewer = useContext(ViewerContext)

  const forbid = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id="FORBIDDEN_BY_STATE" />,
        },
      })
    )
  }

  const showLoginToast = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="請登入／註冊支持作者"
              zh_hans="请登入／注册支持作者"
              en="Please login to support the author"
            />
          ),
          customButton: <LoginButton isPlain />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <section className="container">
      <DonationDialog recipient={article.author} targetId={article.id}>
        {({ openDialog }) => (
          <Button
            spacing={['xtight', 'xtight']}
            bgActiveColor="grey-lighter"
            aria-label={TEXT.zh_hant.donation}
            disabled={disabled || article.author.id === viewer.id}
            onClick={() => {
              analytics.trackEvent('click_button', { type: 'donate' })
              if (!viewer.isAuthed) {
                showLoginToast()
                return
              }
              if (viewer.isFrozen) {
                forbid()
                return
              }
              openDialog()
            }}
          >
            <TextIcon
              icon={<IconDonate24 size="md-s" />}
              weight="md"
              spacing="xtight"
              size="sm"
            >
              {article.donationsToolbar.totalCount > 0
                ? numAbbr(article.donationsToolbar.totalCount)
                : undefined}
            </TextIcon>
          </Button>
        )}
      </DonationDialog>
    </section>
  )
}

DonationButton.fragments = fragments

export default DonationButton
