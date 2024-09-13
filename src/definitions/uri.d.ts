interface Window {
  URI: {
    new (url?: string): URI.URI
  }
}

declare namespace URI {
  interface URI {
    host(): string
    protocol(): string
    domain(): string
    port(): string
    path(): string
    search(): string
  }
}
