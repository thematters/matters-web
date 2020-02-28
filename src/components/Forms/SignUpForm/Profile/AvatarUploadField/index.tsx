import { AvatarUploader, AvatarUploaderProps, Translate } from '~/components'

import styles from './styles.css'

type AvatarUploadFieldProps = AvatarUploaderProps

const AvatarUploadField: React.FC<AvatarUploadFieldProps> = props => {
  return (
    <section className="container">
      <AvatarUploader {...props} />

      <p className="hint">
        <Translate
          zh_hant="上傳圖片作為大頭照 (5 MB 內)"
          zh_hans="上传图片作为头像 (5 MB 內)"
        />
      </p>

      <style jsx>{styles}</style>
    </section>
  )
}

export default AvatarUploadField
