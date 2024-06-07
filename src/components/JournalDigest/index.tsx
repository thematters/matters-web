import { random } from 'lodash'

import { ReactComponent as IconComment } from '@/public/static/icons/24px/comment.svg'
import { ReactComponent as IconLike } from '@/public/static/icons/24px/like.svg'
import { ReactComponent as IconLikeFill } from '@/public/static/icons/24px/like-fill.svg'

import { Expandable } from '../Expandable'
import { JournalAsset } from '../FileUploader/JournalAssetsUploader'
import { Icon } from '../Icon'
import { ResponsiveImage } from '../ResponsiveImage'
import styles from './styles.module.css'

export type JournalDigestProps = {
  id: string
  content: string
  assets: JournalAsset[]
  createdAt: string
}

export const JournalDigest: React.FC<JournalDigestProps> = ({
  id,
  content,
  assets,
  createdAt,
}: JournalDigestProps) => {
  const liked = random(0, 2, false) === 1

  return (
    <section className={styles.container}>
      <header>
        <b className={styles.say}>说</b>
      </header>
      {!!content && (
        <section className={styles.content}>
          <Expandable
            content={content}
            limit={4}
            isRichShow={true}
            size={15}
            collapseable={false}
            isComment
          >
            <section
              className={`u-content-comment`}
              dangerouslySetInnerHTML={{
                __html: content || '',
              }}
              // onClick={captureClicks}
              // data-test-id={TEST_ID.COMMENT_CONETNT}
            />
          </Expandable>
        </section>
      )}
      {assets.length > 0 && (
        <section className={styles.assets}>
          {assets.map((asset) => (
            <div key={asset.id} className={styles.item}>
              <ResponsiveImage
                url={asset.src}
                // url={
                //   'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/embed/c768fc54-92d3-4aea-808e-a668b903fc62.png/w=212,h=212,fit=crop,anim=false'
                // }
                width={106}
                height={106}
                smUpWidth={106}
                smUpHeight={106}
              />
            </div>
          ))}
        </section>
      )}
      <footer>
        <button>
          {liked && <Icon icon={IconLikeFill} size={20} color="redLight" />}
          {!liked && <Icon icon={IconLike} size={20} />}
        </button>
        <button>
          <Icon icon={IconComment} size={20} />
        </button>
      </footer>
    </section>
  )
}
