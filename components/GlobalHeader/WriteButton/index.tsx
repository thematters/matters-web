import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext } from 'react'
import { Mutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { LanguageContext, Translate } from '~/components/Language'

import { toPath, translate } from '~/common/utils'
import ICON_WRITE from '~/static/icons/write.svg?sprite'

import { CreateDraft } from './__generated__/CreateDraft'

export const CREATE_DRAFT = gql`
  mutation CreateDraft($title: String!) {
    putDraft(input: { title: $title }) {
      id
      slug
    }
  }
`

const WriteButton = () => {
  const { lang } = useContext(LanguageContext)
  const placeholder = translate({ zh_hans: '未命名', zh_hant: '未命名', lang })
  return (
    <Mutation mutation={CREATE_DRAFT} variables={{ title: placeholder }}>
      {putDraft => {
        return (
          <div
            onClick={() => {
              putDraft().then(result => {
                const { data } = result as { data: CreateDraft }
                const { slug, id } = data.putDraft
                const path = toPath({ page: 'draftDetail', slug, id })
                Router.push(path.as)
              })
            }}
          >
            <Button
              className="u-sm-down-hide"
              size="large"
              bgColor="gold"
              icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
            >
              <Translate zh_hant="創作" zh_hans="创作" />
            </Button>
            <Button
              className="u-sm-up-hide"
              bgColor="gold"
              shape="circle"
              icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
            />
          </div>
        )
      }}
    </Mutation>
  )
}

export default WriteButton
