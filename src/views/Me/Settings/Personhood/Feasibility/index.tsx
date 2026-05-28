import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout, Spacer } from '~/components'

import SettingsTabs from '../../SettingsTabs'
import settingsStyles from '../../styles.module.css'
import styles from './styles.module.css'

type StorageEstimateReport = {
  quota?: number
  usage?: number
  available?: number
}

type WasmProbeReport = {
  startedAt: string
  endedAt?: string
  completed?: boolean
  totalBytes?: number
  error?: string
  allocations: Array<{
    round: number
    bytes: number
    totalBytes: number
  }>
}

type FeasibilityReport = {
  startedAt: string
  userAgent: string
  platform: string
  language: string
  standalone: boolean
  secureContext: boolean
  crossOriginIsolated: boolean
  checks: {
    webAssembly?: boolean
    serviceWorker?: boolean
    indexedDB?: boolean
    storageManager?: boolean
    hardwareConcurrency?: number | null
    deviceMemory?: number | null
    storageEstimate?: StorageEstimateReport
    wasmMemoryProbe?: WasmProbeReport
  }
}

type SpTicketResponse = {
  appId: string
  apiBaseUrl: string
  challenge: string
  challengeExpiresAt?: string
  deeplink: string
  expiresAt?: string
  signType: string
  spTicket: string
  spTicketId: string
  status: 'ticket_created'
  transactionId: string
}

type SignResultResponse =
  | {
      cert?: string
      certSize: number
      proofInput?: {
        appId: string
        cert: string
        challenge: string
        challengeExpiresAt?: string
        signedResponse: string
      }
      signedResponse?: string
      signedResponseSize: number
      status: 'signed'
    }
  | {
      errorCode: string
      message?: string
      status: 'pending'
    }

type ProofInput = NonNullable<
  Extract<SignResultResponse, { status: 'signed' }>['proofInput']
>

type HelperHandoffPayload = {
  certChainProvingKeyUrl: string
  certChainType: 'rs4096'
  linkVerifyUrl: string
  proofInput: ProofInput
  returnUrl: string
  smtSnapshotUrl: string
  source: 'matters-web'
  userSigProvingKeyUrl: string
  version: 1
}

type TwFidoState = {
  error?: string
  idNum: string
  pollCount: number
  proofInputReady: boolean
  result?: SignResultResponse
  status: 'idle' | 'creating' | 'ticket_created' | 'polling' | 'signed'
  ticket?: SpTicketResponse
}

const POLL_INTERVAL_MS = 4000
const HELPER_DEEPLINK_BASE = 'openac://prove'
const CERT_CHAIN_PROVING_KEY_URL =
  'https://github.com/zkmopro/zkID/releases/download/latest/cert_chain_rs4096_proving.key.gz'
const USER_SIG_PROVING_KEY_URL =
  'https://github.com/zkmopro/zkID/releases/download/latest/user_sig_rs2048_proving.key.gz'
const SMT_SNAPSHOT_URL =
  'https://github.com/moven0831/moica-revocation-smt/releases/download/snapshot-latest/g3-tree-snapshot.json.gz'

const bytesToMiB = (bytes?: number) => {
  if (!bytes) {
    return '0 MiB'
  }
  return `${Math.round(bytes / 1024 / 1024)} MiB`
}

const encodeBase64Url = (value: string) => {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return window
    .btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

const buildHelperHandoffUrl = (proofInput: ProofInput) => {
  if (typeof window === 'undefined') {
    return undefined
  }

  const payload: HelperHandoffPayload = {
    certChainProvingKeyUrl: CERT_CHAIN_PROVING_KEY_URL,
    certChainType: 'rs4096',
    linkVerifyUrl: `${window.location.origin}/api/personhood/zkid/link-verify`,
    proofInput,
    returnUrl: window.location.href,
    smtSnapshotUrl: SMT_SNAPSHOT_URL,
    source: 'matters-web',
    userSigProvingKeyUrl: USER_SIG_PROVING_KEY_URL,
    version: 1,
  }
  const encoded = encodeBase64Url(JSON.stringify(payload))
  const url = new URL(HELPER_DEEPLINK_BASE)
  url.searchParams.set('payload', encoded)
  return url.toString()
}

const createInitialReport = (): FeasibilityReport => {
  if (typeof window === 'undefined') {
    return {
      startedAt: '',
      userAgent: '',
      platform: '',
      language: '',
      standalone: false,
      secureContext: false,
      crossOriginIsolated: false,
      checks: {},
    }
  }

  const nav = window.navigator as Navigator & { standalone?: boolean }

  return {
    startedAt: new Date().toISOString(),
    userAgent: nav.userAgent,
    platform: nav.platform,
    language: nav.language,
    standalone:
      window.matchMedia('(display-mode: standalone)').matches ||
      nav.standalone === true,
    secureContext: window.isSecureContext,
    crossOriginIsolated: window.crossOriginIsolated,
    checks: {},
  }
}

const PersonhoodFeasibility = () => {
  const intl = useIntl()
  const [report, setReport] = useState<FeasibilityReport>(createInitialReport)
  const [running, setRunning] = useState<'basic' | 'wasm' | null>(null)
  const [copied, setCopied] = useState(false)
  const [helperCopied, setHelperCopied] = useState(false)
  const [twFido, setTwFido] = useState<TwFidoState>({
    idNum: '',
    pollCount: 0,
    proofInputReady: false,
    status: 'idle',
  })
  const pollingRef = useRef<number | null>(null)

  const reportText = useMemo(() => JSON.stringify(report, null, 2), [report])
  const canCreateTicket =
    twFido.status !== 'creating' &&
    twFido.status !== 'polling' &&
    /^[A-Z][0-9A-Z]{9}$/.test(twFido.idNum.trim().toUpperCase())

  const runBasicChecks = useCallback(async () => {
    if (typeof window === 'undefined') {
      return
    }

    setRunning('basic')
    const nav = window.navigator as Navigator & {
      deviceMemory?: number
    }

    const nextReport = createInitialReport()
    nextReport.checks = {
      webAssembly: typeof WebAssembly !== 'undefined',
      serviceWorker: 'serviceWorker' in nav,
      indexedDB: 'indexedDB' in window,
      storageManager: !!nav.storage,
      hardwareConcurrency: nav.hardwareConcurrency || null,
      deviceMemory: nav.deviceMemory || null,
    }

    if (nav.storage?.estimate) {
      const estimate = await nav.storage.estimate()
      nextReport.checks.storageEstimate = {
        quota: estimate.quota,
        usage: estimate.usage,
        available:
          estimate.quota && estimate.usage
            ? estimate.quota - estimate.usage
            : undefined,
      }
    }

    setReport(nextReport)
    setRunning(null)
  }, [])

  const runWasmProbe = useCallback(async () => {
    if (typeof WebAssembly === 'undefined') {
      return
    }

    setRunning('wasm')
    const allocations: WasmProbeReport['allocations'] = []
    const memories: WebAssembly.Memory[] = []
    let totalBytes = 0
    const pages = 256
    const maxRounds = 64

    const probe: WasmProbeReport = {
      startedAt: new Date().toISOString(),
      allocations,
    }

    setReport((current) => ({
      ...current,
      checks: { ...current.checks, wasmMemoryProbe: probe },
    }))

    try {
      for (let i = 0; i < maxRounds; i += 1) {
        const memory = new WebAssembly.Memory({ initial: pages })
        const bytes = memory.buffer.byteLength
        memories.push(memory)
        totalBytes += bytes
        allocations.push({ round: i + 1, bytes, totalBytes })

        setReport((current) => ({
          ...current,
          checks: {
            ...current.checks,
            wasmMemoryProbe: {
              ...probe,
              totalBytes,
              allocations: [...allocations],
            },
          },
        }))

        await new Promise((resolve) => setTimeout(resolve, 50))
      }

      probe.completed = true
    } catch (error) {
      probe.completed = false
      probe.error =
        error instanceof Error ? error.message : 'Unknown WASM memory error'
    } finally {
      probe.endedAt = new Date().toISOString()
      probe.totalBytes = totalBytes
      memories.length = 0
      setReport((current) => ({
        ...current,
        checks: {
          ...current.checks,
          wasmMemoryProbe: {
            ...probe,
            allocations: [...allocations],
          },
        },
      }))
      setRunning(null)
    }
  }, [])

  const copyReport = useCallback(async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(reportText)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }, [reportText])

  const copyHelperLink = useCallback(async (helperUrl?: string) => {
    if (!helperUrl || !navigator.clipboard) {
      return
    }
    await navigator.clipboard.writeText(helperUrl)
    setHelperCopied(true)
    window.setTimeout(() => setHelperCopied(false), 1600)
  }, [])

  const pollSignResult = useCallback(
    async (spTicket?: string) => {
      const ticket = spTicket || twFido.ticket?.spTicket
      if (!ticket) {
        return
      }

      setTwFido((current) => ({
        ...current,
        error: undefined,
        pollCount: current.pollCount + 1,
        status: 'polling',
      }))

      try {
        const response = await fetch('/api/personhood/tw-fido/result', {
          body: JSON.stringify({
            appId: twFido.ticket?.appId,
            challenge: twFido.ticket?.challenge,
            challengeExpiresAt: twFido.ticket?.challengeExpiresAt,
            spTicket: ticket,
          }),
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        })
        const body = await response.json()

        if (!response.ok) {
          throw new Error(body.error || `HTTP ${response.status}`)
        }

        if (body.status === 'signed') {
          setTwFido((current) => ({
            ...current,
            proofInputReady: !!body.proofInput,
            result: body,
            status: 'signed',
          }))
          return
        }

        setTwFido((current) => ({
          ...current,
          result: body,
          status: 'ticket_created',
        }))
      } catch (error) {
        setTwFido((current) => ({
          ...current,
          error: error instanceof Error ? error.message : 'Unknown error',
          status: current.ticket ? 'ticket_created' : 'idle',
        }))
      }
    },
    [
      twFido.ticket?.appId,
      twFido.ticket?.challenge,
      twFido.ticket?.challengeExpiresAt,
      twFido.ticket?.spTicket,
    ]
  )

  const createTicket = useCallback(async () => {
    if (!canCreateTicket || typeof window === 'undefined') {
      return
    }

    const idNum = twFido.idNum.trim().toUpperCase()
    setTwFido((current) => ({
      ...current,
      error: undefined,
      pollCount: 0,
      proofInputReady: false,
      result: undefined,
      status: 'creating',
      ticket: undefined,
    }))

    try {
      const response = await fetch('/api/personhood/tw-fido/sp-ticket', {
        body: JSON.stringify({
          idNum,
          returnUrl: window.location.href,
        }),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
      const body = await response.json()

      if (!response.ok) {
        throw new Error(body.error || `HTTP ${response.status}`)
      }

      setTwFido((current) => ({
        ...current,
        idNum,
        status: 'ticket_created',
        ticket: body,
      }))
    } catch (error) {
      setTwFido((current) => ({
        ...current,
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 'idle',
      }))
    }
  }, [canCreateTicket, twFido.idNum])

  useEffect(() => {
    if (twFido.status !== 'ticket_created' || !twFido.ticket) {
      return
    }

    pollingRef.current = window.setTimeout(() => {
      pollSignResult(twFido.ticket?.spTicket)
    }, POLL_INTERVAL_MS)

    return () => {
      if (pollingRef.current) {
        window.clearTimeout(pollingRef.current)
      }
    }
  }, [pollSignResult, twFido.status, twFido.ticket])

  const storage = report.checks.storageEstimate
  const wasmProbe = report.checks.wasmMemoryProbe
  const signedResult =
    twFido.result?.status === 'signed' ? twFido.result : undefined
  const helperHandoffUrl = useMemo(
    () =>
      signedResult?.proofInput
        ? buildHelperHandoffUrl(signedResult.proofInput)
        : undefined,
    [signedResult?.proofInput]
  )
  const helperHandoffBytes = helperHandoffUrl
    ? new TextEncoder().encode(helperHandoffUrl).byteLength
    : 0

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Personhood" id="fbxogW" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Personhood',
          id: 'fbxogW',
        })}
      />

      <SettingsTabs />

      <section className={settingsStyles.container}>
        <section className={styles.panel}>
          <header className={styles.header}>
            <h2>
              <FormattedMessage
                defaultMessage="TW FidO mobile flow"
                id="C1yL+d"
              />
            </h2>
            <p>
              <FormattedMessage
                defaultMessage="Create a signing ticket, open the TW FidO app, then return here for the proof input check."
                id="t2rFN5"
              />
            </p>
          </header>

          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>
                <FormattedMessage defaultMessage="ID number" id="pw6gGa" />
              </span>
              <input
                autoCapitalize="characters"
                autoComplete="off"
                autoCorrect="off"
                inputMode="text"
                onChange={(event) =>
                  setTwFido((current) => ({
                    ...current,
                    idNum: event.target.value,
                  }))
                }
                placeholder="A123456789"
                spellCheck={false}
                type="text"
                value={twFido.idNum}
              />
            </label>
            <button
              className={styles.button}
              disabled={!canCreateTicket}
              onClick={createTicket}
              type="button"
            >
              {twFido.status === 'creating' ? (
                <FormattedMessage defaultMessage="Creating" id="xhfdqv" />
              ) : (
                <FormattedMessage defaultMessage="Create ticket" id="ABDljA" />
              )}
            </button>
          </div>

          <section className={styles.actions}>
            <a
              aria-disabled={!twFido.ticket}
              className={styles.linkButton}
              href={twFido.ticket?.deeplink || undefined}
            >
              <FormattedMessage defaultMessage="Open TW FidO" id="G/jeUL" />
            </a>
            <button
              className={styles.buttonSecondary}
              disabled={!twFido.ticket || twFido.status === 'polling'}
              onClick={() => pollSignResult()}
              type="button"
            >
              {twFido.status === 'polling' ? (
                <FormattedMessage defaultMessage="Checking" id="lTleCS" />
              ) : (
                <FormattedMessage defaultMessage="Check result" id="VFQGq7" />
              )}
            </button>
          </section>

          <section className={styles.actions}>
            <a
              aria-disabled={!helperHandoffUrl}
              className={styles.linkButton}
              href={helperHandoffUrl || undefined}
            >
              <FormattedMessage
                defaultMessage="Open proof helper"
                id="y1YAx4"
              />
            </a>
            <button
              className={styles.buttonSecondary}
              disabled={!helperHandoffUrl}
              onClick={() => copyHelperLink(helperHandoffUrl)}
              type="button"
            >
              {helperCopied ? (
                <FormattedMessage defaultMessage="Copied" id="p556q3" />
              ) : (
                <FormattedMessage
                  defaultMessage="Copy helper link"
                  id="RcFIF3"
                />
              )}
            </button>
          </section>

          <dl className={styles.metrics}>
            <div>
              <dt>Status</dt>
              <dd>{twFido.status}</dd>
            </div>
            <div>
              <dt>APP_ID</dt>
              <dd>{twFido.ticket?.appId || 'not created'}</dd>
            </div>
            <div>
              <dt>Challenge</dt>
              <dd>{twFido.ticket?.challenge || 'not created'}</dd>
            </div>
            <div>
              <dt>Challenge expires</dt>
              <dd>{twFido.ticket?.challengeExpiresAt || 'not created'}</dd>
            </div>
            <div>
              <dt>Ticket ID</dt>
              <dd>{twFido.ticket?.spTicketId || 'not created'}</dd>
            </div>
            <div>
              <dt>Sign type</dt>
              <dd>{twFido.ticket?.signType || 'not created'}</dd>
            </div>
            <div>
              <dt>Poll count</dt>
              <dd>{twFido.pollCount}</dd>
            </div>
            <div>
              <dt>Proof input</dt>
              <dd>{twFido.proofInputReady ? 'ready' : 'server held'}</dd>
            </div>
            <div>
              <dt>Helper handoff</dt>
              <dd>{helperHandoffUrl ? 'ready' : 'not ready'}</dd>
            </div>
            <div>
              <dt>Helper URL bytes</dt>
              <dd>{helperHandoffBytes}</dd>
            </div>
            <div>
              <dt>Certificate bytes</dt>
              <dd>{signedResult?.certSize || 0}</dd>
            </div>
            <div>
              <dt>Signature bytes</dt>
              <dd>{signedResult?.signedResponseSize || 0}</dd>
            </div>
          </dl>

          {twFido.error && <p className={styles.error}>{twFido.error}</p>}
        </section>

        <section className={styles.panel}>
          <header className={styles.header}>
            <h2>
              <FormattedMessage defaultMessage="PWA feasibility" id="DCgQVz" />
            </h2>
            <p>
              <FormattedMessage
                defaultMessage="Browser signals for the carbon based badge prover."
                id="DW68ct"
              />
            </p>
          </header>

          <section className={styles.actions}>
            <button
              className={styles.button}
              disabled={running !== null}
              onClick={runBasicChecks}
              type="button"
            >
              <FormattedMessage defaultMessage="Run checks" id="CFtbZu" />
            </button>
            <button
              className={styles.button}
              disabled={running !== null}
              onClick={runWasmProbe}
              type="button"
            >
              <FormattedMessage defaultMessage="WASM memory" id="N73cBw" />
            </button>
            <button
              className={styles.buttonSecondary}
              disabled={running !== null}
              onClick={copyReport}
              type="button"
            >
              {copied ? (
                <FormattedMessage defaultMessage="Copied" id="p556q3" />
              ) : (
                <FormattedMessage defaultMessage="Copy report" id="/H/Ei0" />
              )}
            </button>
          </section>

          <dl className={styles.metrics}>
            <div>
              <dt>Standalone</dt>
              <dd>{report.standalone ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>Secure context</dt>
              <dd>{report.secureContext ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>Cross origin isolated</dt>
              <dd>{report.crossOriginIsolated ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>Storage quota</dt>
              <dd>{bytesToMiB(storage?.quota)}</dd>
            </div>
            <div>
              <dt>WASM allocated</dt>
              <dd>{bytesToMiB(wasmProbe?.totalBytes)}</dd>
            </div>
            <div>
              <dt>WASM result</dt>
              <dd>
                {wasmProbe
                  ? wasmProbe.completed === false
                    ? 'failed'
                    : wasmProbe.completed
                      ? 'completed'
                      : 'running'
                  : 'not run'}
              </dd>
            </div>
          </dl>

          <pre className={styles.report}>{reportText}</pre>
        </section>
      </section>

      <Spacer size="sp32" />
    </Layout.Main>
  )
}

export default PersonhoodFeasibility
