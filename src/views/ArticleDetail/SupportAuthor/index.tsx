import { useState } from 'react'

import { CreditCard } from './CreditCard'
import styles from './styles.module.css'
import DonationTabs, { Step } from './Tabs'
import { BaseSupportAuthorProps } from './types'

export type SupportAuthorProps = BaseSupportAuthorProps

export const SupportAuthor = (props: SupportAuthorProps) => {
  const [step, setStep] = useState<Step>('credit')

  const isCredit = step === 'credit'

  return (
    <>
      <DonationTabs step={step} setStep={setStep} recipient={props.recipient} />
      <section className={styles.content}>
        {isCredit && <CreditCard {...props} />}
      </section>
    </>
  )
}
