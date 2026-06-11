import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import { EXTERNAL_LINKS } from '~/common/enums'
import {
  Dialog,
  Icon,
  SpinnerBlock,
  useDialogSwitch,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import { CampaignQuotesQuery } from '~/gql/graphql'

import { CAMPAIGN_QUOTES } from './gql'
import QuoteCard from './QuoteCard'
import styles from './styles.module.css'

type QuotesConnection = NonNullable<
  Extract<
    NonNullable<CampaignQuotesQuery['campaign']>,
    { __typename: 'WritingChallenge' }
  >['quotes']
>
type Quote = NonNullable<QuotesConnection['edges']>[0]['node']

const WALL_TAKE = 30

interface QuoteWallDialogProps {
  shortHash: string
  totalCount: number
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseQuoteWallDialog = ({
  shortHash,
  totalCount,
  children,
}: QuoteWallDialogProps) => {
  const viewer = useContext(ViewerContext)
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const { data, loading, refetch } = usePublicQuery<CampaignQuotesQuery>(
    CAMPAIGN_QUOTES,
    { variables: { shortHash, first: WALL_TAKE, random: true } },
    { publicQuery: !viewer.isAuthed }
  )

  const campaign =
    data?.campaign?.__typename === 'WritingChallenge'
      ? data.campaign
      : undefined
  const quotes: Quote[] = (campaign?.quotes?.edges || []).map(({ node }) => node)

  // "shuffle" = refetch a fresh random sample
  const shuffle = () => refetch({ shortHash, first: WALL_TAKE, random: true })

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <>
              <FormattedMessage defaultMessage="Quote wall" id="QuoteWall.title" />{' '}
              {totalCount > 0 && (
                <span className={styles.count}>{totalCount}</span>
              )}
            </>
          }
          titleLeft
          rightBtn={
            <button onClick={closeDialog}>
              <Icon icon={IconTimes} size={24} />
            </button>
          }
        />

        <Dialog.Content>
          <div className={styles.dialogTop}>
            <button className={styles.shuffle} onClick={shuffle}>
              <FormattedMessage defaultMessage="🔀 Shuffle" id="QuoteWall.shuffle" />
            </button>
            <a
              className={styles.museum}
              href={EXTERNAL_LINKS.SEVEN_DAY_BOOK_QUOTE_WALL}
              target="_blank"
              rel="noreferrer"
            >
              <FormattedMessage
                defaultMessage="Full wall / Museum →"
                id="QuoteWall.museum"
              />
            </a>
          </div>

          {loading && <SpinnerBlock />}

          {!loading && quotes.length > 0 && (
            <div className={styles.wall}>
              {quotes.map((quote, i) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  index={i}
                  afterRetract={shuffle}
                />
              ))}
            </div>
          )}
        </Dialog.Content>
      </Dialog>
    </>
  )
}

const QuoteWallDialog = (props: QuoteWallDialogProps) => (
  <Dialog.Lazy mounted={<BaseQuoteWallDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default QuoteWallDialog
