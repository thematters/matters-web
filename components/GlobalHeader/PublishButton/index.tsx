import gql from 'graphql-tag'
import { useState } from 'react'
import { Mutation } from 'react-apollo'

import { Button, Icon, Translate } from '~/components'

import ICON_SPINNER from '~/static/icons/spinner.svg?sprite'
import ICON_WRITE from '~/static/icons/write.svg?sprite'

export const PUBLISH_ARTICLE = gql`
  mutation PublishArticle($draftId: ID!) {
    publishArticle(input: { id: $draftId, delay: 0 }) {
      id
      publishState
    }
  }
`

export default ({ draftId }: { draftId: string }) => {
  const [showLoader, setLoader] = useState(false)

  const icon = showLoader ? ICON_SPINNER : ICON_WRITE

  return (
    <Mutation mutation={PUBLISH_ARTICLE}>
      {publishArticle => (
        <div
          onClick={() => {
            setLoader(true)
            publishArticle({ variables: { draftId } })
          }}
        >
          <Button
            size="large"
            bgColor="green"
            icon={
              <Icon
                id={icon.id}
                viewBox={icon.viewBox}
                className={showLoader && 'u-motion-spin'}
              />
            }
          >
            <Translate zh_hant="發佈" zh_hans="发布" />
          </Button>
        </div>
      )}
    </Mutation>
  )
}
