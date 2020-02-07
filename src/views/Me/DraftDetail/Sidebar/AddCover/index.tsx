import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniqBy from 'lodash/uniqBy'
import { useContext } from 'react'

import { Translate } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { useMutation } from '~/components/GQL'

import Collapsable from '../Collapsable'
import styles from './styles.css'

import {
  AddCoverDraft,
  AddCoverDraft_assets
} from './__generated__/AddCoverDraft'
import { UpdateDraftCover } from './__generated__/UpdateDraftCover'

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
  mutation UpdateDraftCover($id: ID!, $coverAssetId: ID) {
    putDraft(input: { id: $id, coverAssetId: $coverAssetId }) {
      id
      ...AddCoverDraft
    }
  }
  ${fragments.draft}
`

const CoverList = ({
  draftId,
  cover,
  assets
}: {
  draftId: string
  cover: string | null
  assets: AddCoverDraft_assets[]
}) => {
  const [update] = useMutation<UpdateDraftCover>(UPDATE_COVER)
  const { updateHeaderState } = useContext(HeaderContext)

  const uniqAssets = _uniqBy(assets, 'path')

  return (
    <section>
      {uniqAssets.map((asset, index) => {
        const isSelected = asset.path === cover
        const coverItemClass = classNames({
          'cover-image': true,
          selected: isSelected
        })

        return (
          <section
            className={coverItemClass}
            style={{ backgroundImage: `url(${asset.path})` }}
            role="button"
            aria-label={`選擇圖 ${index + 1} 作爲作品封面`}
            key={asset.path}
            onClick={async () => {
              updateHeaderState({ type: 'draft', state: 'saving', draftId })
              try {
                await update({
                  variables: {
                    id: draftId,
                    coverAssetId: asset.id
                  }
                })
                updateHeaderState({ type: 'draft', state: 'saved', draftId })
              } catch (error) {
                updateHeaderState({
                  type: 'draft',
                  state: 'saveFailed',
                  draftId
                })
              }
            }}
          >
            <style jsx>{styles}</style>
          </section>
        )
      })}
    </section>
  )
}

const AddCover = ({ draft }: { draft: AddCoverDraft }) => {
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
      defaultCollapsed={false}
    >
      <p className="cover-intro">
        {hasAssets ? (
          <Translate
            zh_hant="選擇一張圖片作爲作品封面吧！"
            zh_hans="选择一张图片作为作品封面吧！"
          />
        ) : (
          <Translate
            zh_hant="你的作品還沒有可用作封面的圖片，在文中插入一張試試吧。"
            zh_hans="你的作品还没有可用作封面的图片，在文中插入一张试试吧。"
          />
        )}
      </p>

      <section className={containerStyle}>
        <CoverList draftId={draftId} cover={cover} assets={imageAssets} />
      </section>

      <style jsx>{styles}</style>
    </Collapsable>
  )
}

AddCover.fragments = fragments

export default AddCover
