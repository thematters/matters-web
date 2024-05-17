import { createContext, useState } from 'react'

export const PaymentPasswordContext = createContext(
  {} as {
    hasPaymentPassword: boolean
    setHasPaymentPassword: (hasPaymentPassword: boolean) => void
  }
)

export const PaymentPasswordProvider = ({
  children,
  hasPaymentPassword: _hasPaymentPassword,
}: {
  children: React.ReactNode
  hasPaymentPassword: boolean
}) => {
  const [hasPaymentPassword, setHasPaymentPassword] =
    useState(_hasPaymentPassword)

  return (
    <PaymentPasswordContext.Provider
      value={{ hasPaymentPassword, setHasPaymentPassword }}
    >
      {children}
    </PaymentPasswordContext.Provider>
  )
}
