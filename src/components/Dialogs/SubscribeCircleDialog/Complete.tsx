import { toPath } from '~/common/utils'
import { Dialog, Translate } from '~/components'
import { DigestRichCirclePublicFragment } from '~/gql/graphql'

interface CompleteProps {
  circle: DigestRichCirclePublicFragment
}

const Complete: React.FC<CompleteProps> = ({ circle }) => {
  return (
    <>
      <Dialog.Header title="successSubscribeCircle" />

      <Dialog.Content>
        <Dialog.Content.Message align="left" smUpAlign="left">
          <p>
            <Translate
              zh_hant="恭喜成為圍爐一員。現在你可以免費瀏覽圍爐內作品，還可以去圍爐與大家談天說地。"
              zh_hans="恭喜成为围炉一员。现在你可以免费浏览围炉内作品，还可以去围炉与大家谈天说地。"
            />
          </p>
          <br />
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={<Translate zh_hant="馬上逛逛" zh_hans="马上逛逛" />}
            htmlHref={toPath({ page: 'circleDetail', circle }).href}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={<Translate zh_hant="馬上逛逛" zh_hans="马上逛逛" />}
            htmlHref={toPath({ page: 'circleDetail', circle }).href}
          />
        }
      />
    </>
  )
}

export default Complete
