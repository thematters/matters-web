export type PersonhoodProofInput = {
  appId: string
  cert: string
  challenge: string
  challengeExpiresAt?: string
  signedResponse: string
}

export type BrowserProofHandoff = {
  certChainProvingKeyUrl: string
  certChainType: 'rs4096'
  handoffExpiresAt?: string
  handoffToken: string
  linkVerifyUrl: string
  proofInput: PersonhoodProofInput
  returnUrl: string
  savedAt: string
  smtSnapshotUrl: string
  source: 'matters-web'
  userSigProvingKeyUrl: string
  version: 1
}

export const BROWSER_PROOF_ROUTE = '/me/settings/personhood/prove'
export const BROWSER_PROOF_HANDOFF_STORAGE_KEY =
  'matters.personhood.browserProofHandoff.v1'

export const CERT_CHAIN_PROVING_KEY_URL =
  'https://github.com/zkmopro/zkID/releases/download/latest/cert_chain_rs4096_proving.key.gz'
export const USER_SIG_PROVING_KEY_URL =
  'https://github.com/zkmopro/zkID/releases/download/latest/user_sig_rs2048_proving.key.gz'
export const SMT_SNAPSHOT_URL =
  'https://github.com/moven0831/moica-revocation-smt/releases/download/snapshot-latest/g3-tree-snapshot.json.gz'

const BROWSER_PROOF_HANDOFF_MAX_AGE_MS = 15 * 60 * 1000

export const parseHandoffTime = (value?: string) => {
  if (!value) {
    return undefined
  }

  const numeric = Number(value)
  if (Number.isFinite(numeric)) {
    return numeric > 1_000_000_000_000 ? numeric : numeric * 1000
  }

  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

const getBrowserProofHandoffStorages = () => {
  if (typeof window === 'undefined') {
    return []
  }

  return [window.sessionStorage, window.localStorage]
}

export const isExpiredBrowserProofHandoff = (handoff: BrowserProofHandoff) => {
  const savedAt = parseHandoffTime(handoff.savedAt)
  const challengeExpiresAt = parseHandoffTime(
    handoff.proofInput.challengeExpiresAt
  )
  const handoffExpiresAt = parseHandoffTime(handoff.handoffExpiresAt)
  const now = Date.now()

  return (
    (savedAt ? now - savedAt > BROWSER_PROOF_HANDOFF_MAX_AGE_MS : true) ||
    (challengeExpiresAt ? now > challengeExpiresAt : false) ||
    (handoffExpiresAt ? now > handoffExpiresAt : false)
  )
}

export const buildBrowserProofHandoff = ({
  handoffExpiresAt,
  handoffToken,
  origin,
  proofInput,
  returnUrl,
}: {
  handoffExpiresAt?: string
  handoffToken: string
  origin: string
  proofInput: PersonhoodProofInput
  returnUrl: string
}): BrowserProofHandoff => ({
  certChainProvingKeyUrl: CERT_CHAIN_PROVING_KEY_URL,
  certChainType: 'rs4096',
  handoffExpiresAt,
  handoffToken,
  linkVerifyUrl: `${origin}/api/personhood/zkid/link-verify`,
  proofInput,
  returnUrl,
  savedAt: new Date().toISOString(),
  smtSnapshotUrl: SMT_SNAPSHOT_URL,
  source: 'matters-web',
  userSigProvingKeyUrl: USER_SIG_PROVING_KEY_URL,
  version: 1,
})

export const saveBrowserProofHandoff = (handoff: BrowserProofHandoff) => {
  if (typeof window === 'undefined') {
    return
  }

  const value = JSON.stringify(handoff)
  for (const storage of getBrowserProofHandoffStorages()) {
    try {
      storage.setItem(BROWSER_PROOF_HANDOFF_STORAGE_KEY, value)
    } catch {
      // Keep navigation usable if one storage backend is unavailable.
    }
  }
}

export const loadBrowserProofHandoff = () => {
  if (typeof window === 'undefined') {
    return undefined
  }

  for (const storage of getBrowserProofHandoffStorages()) {
    try {
      const raw = storage.getItem(BROWSER_PROOF_HANDOFF_STORAGE_KEY)
      if (!raw) {
        continue
      }

      const handoff = JSON.parse(raw) as BrowserProofHandoff
      if (!handoff.proofInput || !handoff.handoffToken) {
        storage.removeItem(BROWSER_PROOF_HANDOFF_STORAGE_KEY)
        continue
      }

      if (isExpiredBrowserProofHandoff(handoff)) {
        storage.removeItem(BROWSER_PROOF_HANDOFF_STORAGE_KEY)
        continue
      }

      return handoff
    } catch {
      storage.removeItem(BROWSER_PROOF_HANDOFF_STORAGE_KEY)
    }
  }

  return undefined
}

export const clearBrowserProofHandoff = () => {
  if (typeof window === 'undefined') {
    return
  }

  for (const storage of getBrowserProofHandoffStorages()) {
    try {
      storage.removeItem(BROWSER_PROOF_HANDOFF_STORAGE_KEY)
    } catch {
      // Ignore storage cleanup failures.
    }
  }
}
