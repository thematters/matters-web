import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniqBy from 'lodash/uniqBy'

import { Translate } from '~/components'
import SidebarCollapsable from '~/components/Editor/Sidebar/Collapsable'
import { useMutation } from '~/components/GQL'

import styles from './styles.css'

import {
  AddCoverDraft,
  AddCoverDraft_assets,
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
  `,
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

interface AddCover {
  draft: AddCoverDraft
  setSaveStatus: (status: 'saved' | 'saving' | 'saveFailed') => void
}

type CoverListProps = AddCover & {
  assets: AddCoverDraft_assets[]
  setSaveStatus: (status: 'saved' | 'saving' | 'saveFailed') => void
}

const CoverList = ({ draft, assets, setSaveStatus }: CoverListProps) => {
  const { cover, id } = draft
  const [update] = useMutation<UpdateDraftCover>(UPDATE_COVER)
  const uniqAssets = _uniqBy(assets, 'path')

  return (
    <section>
      {uniqAssets.map((asset, index) => {
        const isSelected = asset.path === cover
        const coverItemClass = classNames({
          'cover-image': true,
          selected: isSelected,
        })

        return (
          <section
            className={coverItemClass}
            style={{ backgroundImage: `url(${asset.path})` }}
            role="button"
            aria-label={`選擇圖 ${index + 1} 作爲作品封面`}
            key={asset.path}
            onClick={async () => {
              setSaveStatus('saving')
              try {
                await update({
                  variables: {
                    id,
                    coverAssetId: asset.id,
                  },
                })
                setSaveStatus('saved')
              } catch (error) {
                setSaveStatus('saveFailed')
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

const AddCover = ({ draft, ...props }: AddCover) => {
  const { assets } = draft
  const imageAssets = assets.filter(
    ({ type }: { type: string }) => type === 'embed'
  )
  const hasAssets = imageAssets && imageAssets.length > 0
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const containerStyle = classNames({
    'cover-container': true,
    'u-area-disable': isPending || isPublished,
  })

  return (
    <SidebarCollapsable
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
        <CoverList draft={draft} assets={imageAssets} {...props} />
      </section>

      <style jsx>{styles}</style>
    </SidebarCollapsable>
  )
}

AddCover.fragments = fragments

export default AddCover
