import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext } from 'react'

import { Button, Icon, LanguageContext, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import { ModalSwitch } from '~/components/ModalManager'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics, toPath, translate } from '~/common/utils'

import { CreateDraft } from './__generated__/CreateDraft'

interface Props {
  allowed: boolean
}

export const CREATE_DRAFT = gql`
  mutation CreateDraft($title: String!) {
    putDraft(input: { title: $title }) {
      id
      slug
    }
  }
`

const WriteButton = ({
  onClick,
  loading
}: {
  onClick: () => any
  loading?: boolean
}) => {
  const WriteIcon = loading ? (
    <Icon.Spinner size="md" className="u-motion-spin" />
  ) : (
    <Icon.Write size="md" />
  )

  return (
    <>
      <Button
        className="u-sm-down-hide"
        size="lg"
        bgColor="gold"
        aria-label="創作"
        icon={WriteIcon}
        onClick={onClick}
      >
        <Translate zh_hant={TEXT.zh_hant.write} zh_hans={TEXT.zh_hans.write} />
      </Button>

      <Button
        className="u-sm-up-hide"
        bgColor="gold"
        shape="circle"
        aria-label="創作"
        icon={WriteIcon}
        onClick={onClick}
      />
    </>
  )
}

const WriteButtonWithEffect = ({ allowed }: Props) => {
  const { lang } = useContext(LanguageContext)
  const [putDraft, { loading }] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({
        zh_hans: TEXT.zh_hans.untitle,
        zh_hant: TEXT.zh_hant.untitle,
        lang
      })
    }
  })

  if (!allowed) {
    return (
      <ModalSwitch modalId="likeCoinTermModal">
        {(open: any) => <WriteButton onClick={open} />}
      </ModalSwitch>
    )
  }

  return (
    <WriteButton
      onClick={async () => {
        try {
          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_WRITE_BUTTON)
          const { data } = await putDraft()
          const { slug, id } = data?.putDraft || {}

          if (slug && id) {
            const path = toPath({ page: 'draftDetail', slug, id })
            Router.push(path.as)
          }
        } catch (e) {
          // TODO
        }
      }}
      loading={loading}
    />
  )
}

export default WriteButtonWithEffect
