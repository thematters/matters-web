import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Dialog, Spinner, useStep } from '~/components'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'

import SettingsList from './List'
import { ToggleAccessProps } from './List/ToggleAccess'
import SetCover, { SetCoverProps } from './SetCover'

import { SearchExclude } from '@/__generated__/globalTypes'
import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

type Step = 'list' | 'cover' | 'tag' | 'collection' | 'circle'

export type EditorSettingsDialogProps = {
  editCover: (asset?: Asset) => Promise<any>
  coverSaving: boolean

  collection: ArticleDigestDropdownArticle[]
  editCollection: (articles: ArticleDigestDropdownArticle[]) => Promise<any>
  collectionSaving?: boolean

  tags: DigestTag[]
  editTags: (tag: DigestTag[]) => Promise<any>
  tagsSaving: boolean

  saving: boolean
  disabled?: boolean
  footerButtons: React.ReactNode

  children: ({ open }: { open: () => void }) => React.ReactNode
} & Omit<SetCoverProps, 'onEdit' | 'onBack'> &
  ToggleAccessProps

const DynamicSearchSelectForm = dynamic(
  () => import('~/components/Forms/SearchSelectForm'),
  { loading: Spinner }
)

const BaseEditorSettingsDialog = ({
  cover,
  editCover,
  assets,
  refetchAssets,
  entityId,
  entityType,
  coverSaving,

  collection,
  editCollection,
  collectionSaving,

  tags,
  editTags,
  tagsSaving,

  circle,
  editAccess,
  accessSaving,
  accessType,
  canToggleCircle,
  canTogglePaywall,

  saving,
  disabled,
  footerButtons,

  children,
}: EditorSettingsDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)

  const initialStep = 'list'
  const { currStep, forward } = useStep<Step>(initialStep)

  const open = () => {
    forward(initialStep)
    setShowDialog(true)
  }

  const close = () => setShowDialog(false)

  const isList = currStep === 'list'
  const isCover = currStep === 'cover'
  const isTag = currStep === 'tag'
  const isCollection = currStep === 'collection'
  // const isCircle = currStep === 'circle'

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        {isList && (
          <SettingsList
            saving={saving}
            gotoCover={() => forward('cover')}
            gotoTag={() => forward('tag')}
            gotoCollection={() => forward('collection')}
            circle={circle}
            editAccess={editAccess}
            accessSaving={accessSaving}
            accessType={accessType}
            canToggleCircle={canToggleCircle}
            canTogglePaywall={canTogglePaywall}
            footerButtons={footerButtons}
          />
        )}

        {isCover && (
          <SetCover
            onBack={() => forward('list')}
            cover={cover}
            onEdit={editCover}
            assets={assets}
            refetchAssets={refetchAssets}
            entityId={entityId}
            entityType={entityType}
            saving={coverSaving}
          />
        )}

        {isCollection && (
          <DynamicSearchSelectForm
            title="extendArticle"
            hint="hintEditCollection"
            headerLeftButton={
              <Dialog.Header.BackButton onClick={() => forward('list')} />
            }
            searchType="Article"
            searchExclude={SearchExclude.blocked}
            onSave={async (nodes: SearchSelectNode[]) => {
              await editCollection(nodes as ArticleDigestDropdownArticle[])
              forward('list')
            }}
            nodes={collection}
            saving={collectionSaving}
          />
        )}

        {isTag && (
          <DynamicSearchSelectForm
            title="addTag"
            hint="hintAddTag"
            headerLeftButton={
              <Dialog.Header.BackButton onClick={() => forward('list')} />
            }
            searchType="Tag"
            onSave={async (nodes: SearchSelectNode[]) => {
              await editTags(nodes as DigestTag[])
              forward('list')
            }}
            nodes={tags}
            saving={tagsSaving}
            createTag
          />
        )}
      </Dialog>
    </>
  )
}

export const EditorSettingsDialog = (props: EditorSettingsDialogProps) => (
  <Dialog.Lazy mounted={<BaseEditorSettingsDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
