import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniqBy from 'lodash/uniqBy'
import { useContext } from 'react'

import { Translate } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Mutation } from '~/components/GQL'

import Collapsable from '../Collapsable'
import { AddCoverDraft } from './__generated__/AddCoverDraft'
import styles from './styles.css'

const fragments = {
  draft: gql`
    fragment AddCoverDraft on Draft {
      id
      publishState
      cover
      assets {
        id
        type
        path
      }
    }
  `
}

const UPDATE_COVER = gql`
  mutation UpdateDraftCover($id: ID!, $coverAssetId: ID!) {
    putDraft(input: { id: $id, coverAssetId: $coverAssetId }) {
      id
      ...AddCoverDraft
    }
  }
  ${fragments.draft}
`

const CoverList = ({
  draftId,
  update,
  updateHeaderState,
  cover,
  assets
}: {
  draftId: string
  update: any
  updateHeaderState: any
  cover: string | null
  assets: any
}) => {
  const uniqAssets = _uniqBy(assets, 'path') as any
  return uniqAssets.map((asset: any, index: number) => {
    const css = classNames({
      'cover-image': true,
      'cover-selected': asset.path === cover
    })
    return (
      <div
        key={asset.path}
        className={css}
        style={{ backgroundImage: `url(${asset.path})` }}
        onClick={async () => {
          updateHeaderState({ type: 'draft', state: 'saving', draftId })
          try {
            await update({ variables: { id: draftId, coverAssetId: asset.id } })
            updateHeaderState({ type: 'draft', state: 'saved', draftId })
          } catch (error) {
            updateHeaderState({ type: 'draft', state: 'saveFailed', draftId })
          }
        }}
      >
        <style jsx>{styles}</style>
      </div>
    )
  })
}

const AddCover = ({ draft }: { draft: AddCoverDraft }) => {
  const { updateHeaderState } = useContext(HeaderContext)
  const { id: draftId, cover, assets } = draft
  const imageAssets = assets.filter(
    ({ type }: { type: string }) => type === 'embed'
  )
  const hasAssets = imageAssets && imageAssets.length > 0
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const containerStyle = classNames({
    'cover-container': true,
    'u-area-disable': isPending || isPublished
  })

  return (
    <Collapsable
      title={<Translate zh_hans="封面" zh_hant="封面" />}
      defaultCollapsed={!hasAssets}
    >
      <p className="cover-intro">
        <Translate
          zh_hant="選擇一張圖片作為封面"
          zh_hans="选择一張圖片作為封面"
        />
      </p>
      <section className={containerStyle}>
        <Mutation mutation={UPDATE_COVER}>
          {(update: any) => (
            <CoverList
              draftId={draftId}
              updateHeaderState={updateHeaderState}
              update={update}
              cover={cover}
              assets={imageAssets}
            />
          )}
        </Mutation>
      </section>
      <style jsx>{styles}</style>
    </Collapsable>
  )
}

AddCover.fragments = fragments

export default AddCover
