import { createContext, ReactNode, useState } from 'react'

export const ArticleAppreciationContext = createContext(
  {} as {
    likesReceivedTotal: number
    appreciateLeft: number
    incrementLikesReceivedTotal: () => void
    initArticleAppreciationContext: (
      likesReceivedTotal: number,
      appreciateLeft: number
    ) => void
  }
)

export const ArticleAppreciationProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [likesReceivedTotal, setLikesReceivedTotal] = useState(0)
  const [appreciateLeft, setAppreciateLeft] = useState(0)

  const initArticleAppreciationContext = (
    likesReceivedTotal: number,
    appreciateLeft: number
  ) => {
    setLikesReceivedTotal(likesReceivedTotal)
    setAppreciateLeft(appreciateLeft)
  }

  const incrementLikesReceivedTotal = () => {
    setLikesReceivedTotal((prev) => prev + 1)
    setAppreciateLeft((prev) => prev - 1)
  }

  return (
    <ArticleAppreciationContext.Provider
      value={{
        likesReceivedTotal,
        appreciateLeft,
        initArticleAppreciationContext,
        incrementLikesReceivedTotal,
      }}
    >
      {children}
    </ArticleAppreciationContext.Provider>
  )
}
