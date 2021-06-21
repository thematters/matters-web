import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch, useStep } from '~/components'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'

import SettingsList, { SettingsListDialogButtons } from './List'
import { ToggleAccessProps } from './List/ToggleAccess'
import { SetCoverProps } from './SetCover'

import { SearchExclude } from '@/__generated__/globalTypes'
import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

export type Step =
  | 'list'
  | 'cover'
  | 'tag'
  | 'collection'
  | 'circle'
  | 'confirm'

export type ConfirmStepContentProps = {
  onBack: () => void
  closeDialog: () => void
}

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
  disabled: boolean
  ConfirmStepContent: React.FC<ConfirmStepContentProps>

  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & Omit<SetCoverProps, 'onEdit' | 'onBack'> &
  ToggleAccessProps &
  SettingsListDialogButtons

const DynamicSearchSelectForm = dynamic(
  () => import('~/components/Forms/SearchSelectForm'),
  { loading: Spinner }
)

const DynamicSetCover = dynamic(() => import('./SetCover'), {
  loading: Spinner,
})

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
  license,
  canToggleCircle,

  saving,
  disabled,
  confirmButtonText,
  cancelButtonText,
  ConfirmStepContent,
  onConfirm,

  children,
}: EditorSettingsDialogProps) => {
  const { show, openDialog: baseOpenDialog, closeDialog } = useDialogSwitch(
    true
  )

  const initialStep = 'list'
  const { currStep, forward } = useStep<Step>(initialStep)

  const openDialog = () => {
    forward(initialStep)
    baseOpenDialog()
  }

  const isList = currStep === 'list'
  const isCover = currStep === 'cover'
  const isTag = currStep === 'tag'
  const isCollection = currStep === 'collection'
  // const isCircle = currStep === 'circle'
  const isConfirm = currStep === 'confirm'

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog} fixedHeight>
        {isList && (
          <SettingsList
            saving={saving}
            disabled={disabled}
            forward={forward}
            closeDialog={closeDialog}
            confirmButtonText={confirmButtonText}
            cancelButtonText={cancelButtonText}
            onConfirm={onConfirm}
            cover={cover}
            collectionCount={collection.length}
            tagsCount={tags.length}
            circle={circle}
            editAccess={editAccess}
            accessSaving={accessSaving}
            accessType={accessType}
            license={license}
            canToggleCircle={canToggleCircle}
          />
        )}

        {isCover && (
          <DynamicSetCover
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
            closeDialog={closeDialog}
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
            closeDialog={closeDialog}
          />
        )}

        {isConfirm && (
          <ConfirmStepContent
            onBack={() => forward('list')}
            closeDialog={closeDialog}
          />
        )}
      </Dialog>
    </>
  )
}

export const EditorSettingsDialog = (props: EditorSettingsDialogProps) => (
  <Dialog.Lazy mounted={<BaseEditorSettingsDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
