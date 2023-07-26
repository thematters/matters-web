import { Dialog, toast, Translate, useMutation } from '~/components'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'
import updateTagMaintainers from '~/components/GQL/updates/tagMaintainers'
import { TagMaintainersQuery, UpdateTagSettingMutation } from '~/gql/graphql'

import styles from './styles.module.css'

/**
 * This a sub-component of <TagEditorDialog>. It ask user to confirm
 * of removal of selected editor.
 *
 * Usage:
 *
 * ```tsx
 *   <TagRemoveEditor
 *     id={id}
 *     editor={''}
 *     closeDialog={() => {}}
 *   />
 * ```
 */

type TagMaintainersNodeTagEditor = NonNullable<
  NonNullable<TagMaintainersQuery['node'] & { __typename: 'Tag' }>['editors']
>[0]

interface Props {
  id: string
  editor: TagMaintainersNodeTagEditor

  closeDialog: () => void
}

const TagRemoveEditor = ({ id, editor, closeDialog }: Props) => {
  const [update, { loading }] =
    useMutation<UpdateTagSettingMutation>(UPDATE_TAG_SETTING)

  const onClick = async () => {
    const result = await update({
      variables: {
        input: { id, type: 'remove_editor', editors: [editor.id] },
      },
      update: (cache) =>
        updateTagMaintainers({
          cache,
          id,
          type: 'remove',
          editors: [editor.id],
        }),
    })

    if (!result) {
      throw new Error('tag leave failed')
    }

    toast.success({
      message: (
        <Translate
          zh_hant="移除協作者成功"
          zh_hans="移除协作者成功"
          en="successfully removed collaborator"
        />
      ),
    })

    closeDialog()
  }

  return (
    <>
      <Dialog.Header
        title={
          <Translate
            zh_hant="確定移除協作者"
            zh_hans="确定移除协作者"
            en="confirm collaborator removal"
          />
        }
      />

      <Dialog.Message>
        <p>
          <Translate
            zh_hant="移除後， "
            zh_hans="移除后， "
            en="After removal, "
          />
          <span className={styles.name}>{editor.displayName}</span>{' '}
          <Translate
            zh_hant="將無法繼續參與「精選」作品管理。"
            zh_hans="将无法继续参与「精选」作品管理。"
            en="user will not be able to manage selected feed."
          />
        </p>
      </Dialog.Message>

      <Dialog.Footer
        closeDialog={closeDialog}
        btns={
          <Dialog.RoundedButton
            text={
              <Translate
                zh_hant="確認移除"
                zh_hans="确认移除"
                en="Confirm Removal"
              />
            }
            color={loading ? 'green' : 'red'}
            onClick={onClick}
            loading={loading}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={
              <Translate
                zh_hant="確認移除"
                zh_hans="确认移除"
                en="Confirm Removal"
              />
            }
            color={loading ? 'green' : 'red'}
            onClick={onClick}
            loading={loading}
          />
        }
      />
    </>
  )
}

export default TagRemoveEditor
