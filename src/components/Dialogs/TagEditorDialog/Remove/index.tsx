import { Dialog, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'
import updateTagMaintainers from '~/components/GQL/updates/tagMaintainers'

import { ADD_TOAST } from '~/common/enums'

import { UpdateTagSetting } from '~/components/GQL/mutations/__generated__/UpdateTagSetting'

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
 *     close={() => {}}
 *   />
 * ```
 */
interface Props {
  id: string
  editor: string

  close: () => void
}

const TagRemoveEditor = ({ id, editor, close }: Props) => {
  const [update, { loading }] = useMutation<UpdateTagSetting>(
    UPDATE_TAG_SETTING
  )

  return (
    <>
      <Dialog.Header
        title={<Translate zh_hant="確定移除協作者" zh_hans="确定移除协作者" />}
        close={close}
        closeTextId="cancel"
      />

      <Dialog.Message>
        <p>
          <Translate
            zh_hant="移除後，該用戶將無法繼續參與「精選」作品管理。"
            zh_hans="移除后，该用户将无法继续参与「精选」作品管理。"
          />
        </p>
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button
          bgColor="red"
          textColor="white"
          loading={loading}
          onClick={async () => {
            try {
              const result = await update({
                variables: {
                  input: { id, type: 'remove_editor', editors: [editor] },
                },
                update: (cache) =>
                  updateTagMaintainers({
                    cache,
                    id,
                    type: 'remove',
                    editors: [editor],
                  }),
              })

              if (!result) {
                throw new Error('tag leave failed')
              }

              window.dispatchEvent(
                new CustomEvent(ADD_TOAST, {
                  detail: {
                    color: 'green',
                    content: (
                      <Translate
                        zh_hant="移除協作者成功"
                        zh_hans="移除协作者成功"
                      />
                    ),
                    duration: 2000,
                  },
                })
              )

              close()
            } catch (error) {
              throw error
            }
          }}
        >
          <Translate zh_hant="確認移除" zh_hans="确认移除" />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          textColor="black"
          bgColor="grey-lighter"
          onClick={close}
        >
          <Translate zh_hant="取消" zh_hans="取消" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default TagRemoveEditor
