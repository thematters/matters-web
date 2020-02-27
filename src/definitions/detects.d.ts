declare namespace Express {
  export interface Request {
    clientInfo?: {
      isPhone: boolean
      isTablet: boolean
      isMobile: boolean
    }
  }
}
