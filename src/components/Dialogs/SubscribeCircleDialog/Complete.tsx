import { Dialog, Translate } from '~/components'

import { toPath } from '~/common/utils'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

interface CompleteProps {
  circle: DigestRichCirclePublic
}

const Complete: React.FC<CompleteProps> = ({ circle }) => {
  return (
    <>
      <Dialog.Message align="left">
        <p>
          <Translate
            zh_hant="恭喜成為圍爐一員。現在你可以免費瀏覽圍爐內作品，還可以去圍爐與大家談天說地。"
            zh_hans="恭喜成为围炉一员。现在你可以免费浏览围炉内作品，还可以去围炉与大家谈天说地。"
          />
        </p>
        <br />
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button
          textColor="black"
          bgColor="grey-lighter"
          htmlHref={toPath({ page: 'circleDetail', circle }).href}
        >
          <Translate zh_hant="馬上逛逛" zh_hans="马上逛逛" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Complete
