import 'photoswipe/dist/photoswipe.css'

import { random } from 'lodash'
import { Gallery, Item } from 'react-photoswipe-gallery'

import { ReactComponent as IconComment } from '@/public/static/icons/24px/comment.svg'
import { ReactComponent as IconLike } from '@/public/static/icons/24px/like.svg'
import { ReactComponent as IconLikeFill } from '@/public/static/icons/24px/like-fill.svg'
import { ReactComponent as IconDot } from '@/public/static/icons/dot.svg'

import { DateTime } from '../DateTime'
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
  const liked = random(0, 1, false) === 1

  const options = {
    padding: { top: 20, bottom: 40, left: 100, right: 100 },
  }

  return (
    <section className={styles.container}>
      <header>
        <b className={styles.say}>说</b>
        <Icon icon={IconDot} color="greyLight" size={18} />
        <DateTime date={createdAt} color="grey" />
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
          <Gallery options={options}>
            {assets.map((asset) => (
              <Item
                key={asset.id}
                original={asset.src}
                thumbnail={asset.src}
                width={asset.width}
                height={asset.height}
              >
                {({ ref, open }) => (
                  <div ref={ref} onClick={open} className={styles.item}>
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
                )}
              </Item>
            ))}
          </Gallery>
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
