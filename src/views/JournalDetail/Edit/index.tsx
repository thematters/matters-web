import { Editor } from '@matters/matters-editor'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import JournalEditor from '~/components/Editor/Journal'

import styles from './styles.module.css'

// 创建并触发触摸事件的函数
// function triggerTouchEvent(element: HTMLElement, eventType: string) {
//   const touchObj = new Touch({
//     identifier: Date.now(),
//     target: element,
//     clientX: 30, // 设置触摸点的x坐标
//     clientY: 30, // 设置触摸点的y坐标
//     radiusX: 2.5,
//     radiusY: 2.5,
//     rotationAngle: 10,
//     force: 1,
//   })

//   const touchEvent = new TouchEvent(eventType, {
//     cancelable: true,
//     bubbles: true,
//     touches: [touchObj],
//     targetTouches: [],
//     changedTouches: [touchObj],
//     shiftKey: true, // 其他事件属性可以根据需要设置
//   })

//   element.dispatchEvent(touchEvent)
// }

const Edit = () => {
  const intl = useIntl()
  const [editor, setEditor] = useState<Editor | null>(null)
  const [content, setContent] = useState('')
  const formId = `journal-form`

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {}

  const onUpdate = ({ content: newContent }: { content: string }) => {
    setContent(newContent)
  }

  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        editor.chain().focus().insertContent('test touch event').run()
        // editor.commands.focus()

        console.log({ editor })
        const editorElement = editor.view.dom as HTMLElement
        editorElement.focus()
        console.log({ editorElement })
        // triggerTouchEvent(editorElement, 'touchstart')
        // triggerTouchEvent(editorElement, 'touchend')
      }, 0.5 * 1000)
    }
  }, [editor])

  return (
    <>
      <form
        className={styles.form}
        id={formId}
        onSubmit={handleSubmit}
        aria-label={intl.formatMessage({
          defaultMessage: 'Journal',
          id: 'nJaVYb',
          description: 'src/components/Forms/JournalForm/index.tsx',
        })}
      >
        <section className={styles.content}>
          <JournalEditor
            content={content}
            update={onUpdate}
            // placeholder={placeholder}
            setEditor={(editor) => {
              setEditor(editor)
            }}
          />
        </section>

        {/* <footer className={styles.footer}>
          <section>
            <JournalAssetsUploader
              assets={assets}
              addAssets={addAssets}
              removeAsset={removeAsset}
              isEditing
            />
          </section>
        </footer> */}
      </form>
    </>
  )
}

export default Edit
