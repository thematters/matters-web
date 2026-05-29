import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout, Spacer } from '~/components'

import SettingsTabs from '../../SettingsTabs'
import settingsStyles from '../../styles.module.css'
import {
  BROWSER_PROOF_ROUTE,
  type BrowserProofHandoff,
  clearBrowserProofHandoff,
  ISOLATED_PROVER_ROUTE,
  loadBrowserProofHandoff,
} from '../handoff'
import styles from './styles.module.css'

type StorageEstimateReport = {
  quota?: number
  usage?: number
  available?: number
}

type BrowserProofReadiness = {
  checkedAt: string
  crossOriginIsolated: boolean
  language: string
  platform: string
  secureContext: boolean
  standalone: boolean
  userAgent: string
  checks: {
    cacheStorage: boolean
    decompressionStream: boolean
    indexedDB: boolean
    serviceWorker: boolean
    sharedArrayBuffer: boolean
    storageEstimate?: StorageEstimateReport
    storageManager: boolean
    webAssembly: boolean
    worker: boolean
  }
}

const FEASIBILITY_ROUTE = '/me/settings/personhood/feasibility'

const bytesToPayloadSize = (bytes?: number) => {
  if (!bytes) {
    return '0 B'
  }

  if (bytes < 1024) {
    return `${bytes} B`
  }

  return `${Math.round(bytes / 1024)} KiB`
}

const bytesToMiB = (bytes?: number) => {
  if (!bytes) {
    return '0 MiB'
  }

  return `${Math.round(bytes / 1024 / 1024)} MiB`
}

const encodedBytes = (value?: string) =>
  value ? new TextEncoder().encode(value).byteLength : 0

const createReadiness = async (): Promise<BrowserProofReadiness> => {
  const nav = window.navigator as Navigator & { standalone?: boolean }
  const storageEstimate = nav.storage?.estimate
    ? await nav.storage.estimate()
    : undefined

  return {
    checkedAt: new Date().toISOString(),
    crossOriginIsolated: window.crossOriginIsolated,
    language: nav.language,
    platform: nav.platform,
    secureContext: window.isSecureContext,
    standalone:
      window.matchMedia('(display-mode: standalone)').matches ||
      nav.standalone === true,
    userAgent: nav.userAgent,
    checks: {
      cacheStorage: 'caches' in window,
      decompressionStream: 'DecompressionStream' in window,
      indexedDB: 'indexedDB' in window,
      serviceWorker: 'serviceWorker' in nav,
      sharedArrayBuffer: typeof SharedArrayBuffer !== 'undefined',
      storageEstimate: storageEstimate
        ? {
            available:
              storageEstimate.quota && storageEstimate.usage
                ? storageEstimate.quota - storageEstimate.usage
                : undefined,
            quota: storageEstimate.quota,
            usage: storageEstimate.usage,
          }
        : undefined,
      storageManager: !!nav.storage,
      webAssembly: typeof WebAssembly !== 'undefined',
      worker: typeof Worker !== 'undefined',
    },
  }
}

const getReadinessStatus = (readiness?: BrowserProofReadiness) => {
  if (!readiness) {
    return 'not checked'
  }

  return readiness.secureContext &&
    readiness.crossOriginIsolated &&
    readiness.checks.webAssembly &&
    readiness.checks.worker &&
    readiness.checks.indexedDB &&
    readiness.checks.decompressionStream
    ? 'ready'
    : 'blocked'
}

const getHandoffStatus = (handoff?: BrowserProofHandoff) =>
  handoff ? 'ready' : 'missing'

const PersonhoodProve = () => {
  const intl = useIntl()
  const [handoff, setHandoff] = useState<BrowserProofHandoff>()
  const [readiness, setReadiness] = useState<BrowserProofReadiness>()
  const [running, setRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const refreshReadiness = useCallback(async () => {
    setRunning(true)
    try {
      setReadiness(await createReadiness())
    } finally {
      setRunning(false)
    }
  }, [])

  useEffect(() => {
    setHandoff(loadBrowserProofHandoff())
    refreshReadiness()
  }, [refreshReadiness])

  const reportText = useMemo(
    () =>
      JSON.stringify(
        {
          handoff: handoff
            ? {
                appId: handoff.proofInput.appId,
                certChainType: handoff.certChainType,
                challenge: handoff.proofInput.challenge,
                challengeExpiresAt: handoff.proofInput.challengeExpiresAt,
                handoffExpiresAt: handoff.handoffExpiresAt,
                savedAt: handoff.savedAt,
                source: handoff.source,
                version: handoff.version,
              }
            : undefined,
          location: BROWSER_PROOF_ROUTE,
          readiness,
        },
        null,
        2
      ),
    [handoff, readiness]
  )

  const copyReport = useCallback(async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(reportText)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }, [reportText])

  const clearHandoff = useCallback(() => {
    clearBrowserProofHandoff()
    setHandoff(undefined)
  }, [])

  const returnToTwFido = useCallback(() => {
    window.location.assign(handoff?.returnUrl || FEASIBILITY_ROUTE)
  }, [handoff?.returnUrl])

  const openIsolatedProver = useCallback(() => {
    window.location.assign(ISOLATED_PROVER_ROUTE)
  }, [])

  const readinessStatus = getReadinessStatus(readiness)
  const storage = readiness?.checks.storageEstimate

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Browser proof" id="RYc4X0" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Browser proof',
          id: 'RYc4X0',
        })}
      />

      <SettingsTabs />

      <section className={settingsStyles.container}>
        <section className={styles.panel}>
          <header className={styles.header}>
            <h2>
              <FormattedMessage
                defaultMessage="PWA proof handoff"
                id="I3v/Va"
              />
            </h2>
            <p>
              <FormattedMessage
                defaultMessage="Signed TW FidO proof input is kept in this browser for the next proving step."
                id="cB6zjC"
              />
            </p>
          </header>

          <section className={styles.actions}>
            <button
              className={styles.button}
              disabled={running}
              onClick={refreshReadiness}
              type="button"
            >
              <FormattedMessage defaultMessage="Run checks" id="CFtbZu" />
            </button>
            <button
              className={styles.buttonSecondary}
              disabled={!handoff}
              onClick={returnToTwFido}
              type="button"
            >
              <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
            </button>
            <button
              className={styles.buttonSecondary}
              disabled={!handoff}
              onClick={clearHandoff}
              type="button"
            >
              <FormattedMessage defaultMessage="Clear" id="/GCoTA" />
            </button>
            <button
              className={styles.buttonSecondary}
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
              <dt>Handoff</dt>
              <dd>{getHandoffStatus(handoff)}</dd>
            </div>
            <div>
              <dt>Browser</dt>
              <dd>{readinessStatus}</dd>
            </div>
            <div>
              <dt>Secure context</dt>
              <dd>{readiness?.secureContext ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>Cross origin isolated</dt>
              <dd>{readiness?.crossOriginIsolated ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>SharedArrayBuffer</dt>
              <dd>{readiness?.checks.sharedArrayBuffer ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>DecompressionStream</dt>
              <dd>{readiness?.checks.decompressionStream ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>IndexedDB</dt>
              <dd>{readiness?.checks.indexedDB ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>Storage quota</dt>
              <dd>{bytesToMiB(storage?.quota)}</dd>
            </div>
            <div>
              <dt>APP_ID</dt>
              <dd>{handoff?.proofInput.appId || 'missing'}</dd>
            </div>
            <div>
              <dt>Challenge expires</dt>
              <dd>{handoff?.proofInput.challengeExpiresAt || 'missing'}</dd>
            </div>
            <div>
              <dt>Handoff expires</dt>
              <dd>{handoff?.handoffExpiresAt || 'missing'}</dd>
            </div>
            <div>
              <dt>Cert payload</dt>
              <dd>
                {bytesToPayloadSize(encodedBytes(handoff?.proofInput.cert))}
              </dd>
            </div>
            <div>
              <dt>Signature payload</dt>
              <dd>
                {bytesToPayloadSize(
                  encodedBytes(handoff?.proofInput.signedResponse)
                )}
              </dd>
            </div>
            <div>
              <dt>Proof worker</dt>
              <dd>pending</dd>
            </div>
          </dl>

          {!handoff && (
            <p className={styles.error}>
              <FormattedMessage
                defaultMessage="No signed proof input was found. Return to the TW FidO step and check the result again."
                id="kqQp7b"
              />
            </p>
          )}

          {readinessStatus === 'blocked' && (
            <p className={styles.error}>
              <FormattedMessage
                defaultMessage="Browser handoff is ready. Browser proving is pending until the prover runs in a cross-origin isolated page."
                id="FXgOAP"
              />
            </p>
          )}
        </section>

        <section className={styles.panel}>
          <header className={styles.header}>
            <h2>
              <FormattedMessage defaultMessage="Proof worker" id="NloKwX" />
            </h2>
            <p>
              <FormattedMessage
                defaultMessage="Open the isolated browser container. It does not load the normal Matters bundle, so cross-origin isolation can be enabled for the zkID worker."
                id="dWt8c/"
              />
            </p>
          </header>

          <button
            className={styles.button}
            disabled={!handoff}
            onClick={openIsolatedProver}
            type="button"
          >
            <FormattedMessage
              defaultMessage="Open isolated prover"
              id="atmn17"
            />
          </button>
        </section>

        <pre className={styles.report}>{reportText}</pre>
      </section>

      <Spacer size="sp32" />
    </Layout.Main>
  )
}

export default PersonhoodProve
