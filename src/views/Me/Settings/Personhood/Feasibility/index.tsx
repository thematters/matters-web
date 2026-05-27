import { useCallback, useMemo, useState } from 'react'
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

const bytesToMiB = (bytes?: number) => {
  if (!bytes) {
    return '0 MiB'
  }
  return `${Math.round(bytes / 1024 / 1024)} MiB`
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

  const reportText = useMemo(() => JSON.stringify(report, null, 2), [report])

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

  const storage = report.checks.storageEstimate
  const wasmProbe = report.checks.wasmMemoryProbe

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Personhood" id="SHrdDe" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Personhood',
          id: 'SHrdDe',
        })}
      />

      <SettingsTabs />

      <section className={settingsStyles.container}>
        <section className={styles.panel}>
          <header className={styles.header}>
            <h2>
              <FormattedMessage defaultMessage="PWA feasibility" id="TGe3wU" />
            </h2>
            <p>
              <FormattedMessage
                defaultMessage="Browser signals for the carbon based badge prover."
                id="FRyXpx"
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
              <FormattedMessage defaultMessage="Run checks" id="1cza4C" />
            </button>
            <button
              className={styles.button}
              disabled={running !== null}
              onClick={runWasmProbe}
              type="button"
            >
              <FormattedMessage defaultMessage="WASM memory" id="gxHC1l" />
            </button>
            <button
              className={styles.buttonSecondary}
              disabled={running !== null}
              onClick={copyReport}
              type="button"
            >
              {copied ? (
                <FormattedMessage defaultMessage="Copied" id="m/wW4D" />
              ) : (
                <FormattedMessage defaultMessage="Copy report" id="qh8Srq" />
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
