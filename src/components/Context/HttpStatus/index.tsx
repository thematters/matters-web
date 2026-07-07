import { createContext, ReactNode, useContext } from 'react'

/**
 * Lets deeply nested components (e.g. <Throw404>) mark the SSR response
 * status. `_app` passes a shared object into the `getDataFromTree` render
 * pass and applies `statusCode` to `ctx.res` afterwards, so error pages can
 * respond with a real HTTP 404 instead of a soft 404.
 */
export type HttpStatus = { statusCode?: number }

const HttpStatusContext = createContext<HttpStatus>({})

export const HttpStatusProvider = ({
  httpStatus,
  children,
}: {
  httpStatus?: HttpStatus
  children: ReactNode
}) => (
  <HttpStatusContext.Provider value={httpStatus || {}}>
    {children}
  </HttpStatusContext.Provider>
)

export const useHttpStatus = () => useContext(HttpStatusContext)
