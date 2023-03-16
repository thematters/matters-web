import { Editor } from '@tiptap/react'

import styles from './styles.css'

type MenuBarProps = {
  editor: Editor
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <section>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        Code
      </button>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleLink({ href: 'https://google.com', target: '_blank' })
            .run()
        }
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('link') ? 'is-active' : ''}
      >
        Link
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        Ordered List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        Code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        Blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        Horizontal Rule
      </button>
      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFigureImage({
              src: 'https://assets-develop.matters.news/processed/1080w/embed/2bacd4f4-e2f3-4786-8948-ec301ca2ad5b.webp',
              caption: 'image caption',
            })
            .run()
        }}
      >
        Image
      </button>
      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFigureAudio({
              src: 'https://file-examples.com/storage/fe0b804ac5640668798b8d0/2017/11/file_example_MP3_700KB.mp3',
              caption: 'audio placeholder',
              title: 'audio title',
              duration: '00:27',
            })
            .run()
        }}
      >
        Audio
      </button>
      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFigureEmbed({
              src: 'https://youtu.be/ARJ8cAGm6JE?t=30',
              caption: 'youtube placeholder',
            })
            .run()
        }}
      >
        Embed YouTube
      </button>
      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFigureEmbed({
              src: 'https://vimeo.com/332732612',
              caption: 'vimeo placeholder',
            })
            .run()
        }}
      >
        Embed Vimeo
      </button>
      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFigureEmbed({
              src: 'https://twitter.com/jack/status/20?s=20',
              caption: 'twitter placeholder',
            })
            .run()
        }}
      >
        Embed Twitter
      </button>
      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFigureEmbed({
              src: 'https://www.instagram.com/p/CkszmehL4hF/?utm_source=ig_web_copy_link',
              caption: 'instagram placeholder',
            })
            .run()
        }}
      >
        Embed Instagram
      </button>
      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFigureEmbed({
              src: 'https://www.bilibili.com/video/BV1bW411n7fY',
              caption: 'bilibili placeholder',
            })
            .run()
        }}
      >
        Embed Bilibili
      </button>
      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFigureEmbed({
              src: 'http://jsfiddle.net/kizu/zfUyN/',
              caption: 'JSFiddle placeholder',
            })
            .run()
        }}
      >
        Embed JSFiddle
      </button>
      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFigureEmbed({
              src: 'https://codepen.io/ykadosh/pen/jOwjmJe',
              caption: 'CodePen placeholder',
            })
            .run()
        }}
      >
        Embed CodePen
      </button>

      <style jsx>{styles}</style>
    </section>
  )
}

export default MenuBar
