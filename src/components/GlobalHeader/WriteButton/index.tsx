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
  CustomButton?: React.FC<{
    onClick: (event: React.MouseEvent<HTMLElement>) => void
  }>
}

export const CREATE_DRAFT = gql`
  mutation CreateDraft($title: String!) {
    putDraft(input: { title: $title }) {
      id
      slug
    }
  }
`

const WriteIcon = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return <Icon.Spinner size="md" className="u-motion-spin" />
  }

  return <Icon.Write size="md" />
}

const WriteButton = ({ allowed, CustomButton }: Props) => {
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
        {(open: any) => (
          <Button
            className="u-sm-down-hide"
            size="large"
            bgColor="gold"
            icon={<Icon.Write size="md" />}
            onClick={open}
          >
            <Translate
              zh_hant={TEXT.zh_hant.write}
              zh_hans={TEXT.zh_hans.write}
            />
          </Button>
        )}
      </ModalSwitch>
    )
  }

  const onClick = async () => {
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
  }

  if (CustomButton) {
    return <CustomButton onClick={onClick} />
  }

  return (
    <>
      <Button
        className="u-sm-down-hide"
        size="large"
        bgColor="gold"
        aria-label="創作"
        icon={<WriteIcon loading={loading} />}
        onClick={onClick}
      >
        <Translate zh_hant="創作" zh_hans="创作" />
      </Button>

      <Button
        className="u-sm-up-hide"
        bgColor="gold"
        shape="circle"
        aria-label="創作"
        icon={<WriteIcon loading={loading} />}
        onClick={onClick}
      />
    </>
  )
}

export default WriteButton
