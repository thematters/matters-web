import type { NextApiRequest, NextApiResponse } from 'next'

const HANDOFF_STORAGE_KEY = 'matters.personhood.browserProofHandoff.v1'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "base-uri 'none'",
      "form-action 'none'",
      "frame-ancestors 'none'",
      "img-src 'none'",
      "connect-src 'self'",
      "style-src 'unsafe-inline'",
      "script-src 'unsafe-inline' 'wasm-unsafe-eval'",
      "worker-src 'self' blob:",
    ].join('; ')
  )

  res.status(200).send(getHtml())
}

export default handler

const getHtml = () => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
    <meta name="robots" content="noindex,nofollow" />
    <title>Personhood prover</title>
    <style>
      :root {
        color-scheme: light;
        --green: #0d756d;
        --ink: #111;
        --muted: #737373;
        --line: #e5e5e5;
        --surface: #f7f7f7;
        --negative: #c45454;
      }

      * {
        box-sizing: border-box;
      }

      body {
        max-width: 720px;
        padding: 24px 16px 48px;
        margin: 0 auto;
        font-family:
          -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--ink);
        background: #fff;
      }

      header {
        margin-bottom: 24px;
      }

      h1 {
        margin: 0 0 8px;
        font-size: 28px;
        line-height: 1.2;
      }

      p {
        margin: 0;
        font-size: 15px;
        line-height: 1.6;
        color: var(--muted);
      }

      section {
        padding: 16px;
        margin: 0 0 16px;
        border: 1px solid var(--line);
        border-radius: 8px;
      }

      h2 {
        margin: 0 0 12px;
        font-size: 18px;
      }

      dl {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 8px;
        margin: 0;
      }

      div.metric {
        padding: 12px;
        overflow-wrap: anywhere;
        background: var(--surface);
        border-radius: 6px;
      }

      dt {
        font-size: 12px;
        color: var(--muted);
      }

      dd {
        margin: 4px 0 0;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 14px;
      }

      button,
      a.button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 16px;
        margin: 16px 8px 0 0;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        text-decoration: none;
        background: var(--green);
        border: 0;
        border-radius: 6px;
      }

      button.secondary,
      a.button.secondary {
        color: var(--green);
        background: #fff;
        border: 1px solid var(--green);
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      pre {
        max-height: 360px;
        padding: 16px;
        margin: 0;
        overflow: auto;
        font-size: 12px;
        line-height: 1.5;
        color: #fff;
        white-space: pre-wrap;
        background: #222;
        border-radius: 6px;
      }

      .error {
        color: var(--negative);
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Personhood prover</h1>
      <p>Isolated browser container for the zkID prover.</p>
    </header>

    <section>
      <h2>Readiness</h2>
      <dl id="readiness"></dl>
    </section>

    <section>
      <h2>Handoff</h2>
      <dl id="handoff"></dl>
      <p id="message" class="error"></p>
      <button id="run" disabled>Run browser proof</button>
      <button id="copy" class="secondary">Copy report</button>
      <a id="back" class="button secondary" href="/me/settings/personhood/prove">Back</a>
    </section>

    <section>
      <h2>Report</h2>
      <pre id="report">{}</pre>
    </section>

    <script>
      (() => {
        const storageKey = ${JSON.stringify(HANDOFF_STORAGE_KEY)};
        const maxAgeMs = 15 * 60 * 1000;
        const readinessEl = document.getElementById('readiness');
        const handoffEl = document.getElementById('handoff');
        const messageEl = document.getElementById('message');
        const reportEl = document.getElementById('report');
        const backEl = document.getElementById('back');
        const copyEl = document.getElementById('copy');

        const parseTime = (value) => {
          if (!value) return undefined;
          const numeric = Number(value);
          if (Number.isFinite(numeric)) {
            return numeric > 1000000000000 ? numeric : numeric * 1000;
          }
          const parsed = Date.parse(value);
          return Number.isNaN(parsed) ? undefined : parsed;
        };

        const encodedBytes = (value) => (
          value ? new TextEncoder().encode(value).byteLength : 0
        );

        const formatBytes = (bytes) => {
          if (!bytes) return '0 B';
          if (bytes < 1024) return bytes + ' B';
          return Math.round(bytes / 1024) + ' KiB';
        };

        const metric = (label, value) => {
          const item = document.createElement('div');
          item.className = 'metric';
          const term = document.createElement('dt');
          const description = document.createElement('dd');
          term.textContent = label;
          description.textContent = value;
          item.append(term, description);
          return item;
        };

        const getStoredHandoff = () => {
          for (const storage of [window.sessionStorage, window.localStorage]) {
            try {
              const raw = storage.getItem(storageKey);
              if (!raw) continue;
              return JSON.parse(raw);
            } catch {
              storage.removeItem(storageKey);
            }
          }
          return undefined;
        };

        const isExpired = (handoff) => {
          if (!handoff) return false;
          const savedAt = parseTime(handoff.savedAt);
          const challengeExpiresAt = parseTime(handoff.proofInput?.challengeExpiresAt);
          const handoffExpiresAt = parseTime(handoff.handoffExpiresAt);
          const now = Date.now();
          return (
            (savedAt ? now - savedAt > maxAgeMs : true) ||
            (challengeExpiresAt ? now > challengeExpiresAt : false) ||
            (handoffExpiresAt ? now > handoffExpiresAt : false)
          );
        };

        const readiness = {
          checkedAt: new Date().toISOString(),
          secureContext: window.isSecureContext,
          crossOriginIsolated: window.crossOriginIsolated,
          sharedArrayBuffer: typeof SharedArrayBuffer !== 'undefined',
          webAssembly: typeof WebAssembly !== 'undefined',
          worker: typeof Worker !== 'undefined',
          indexedDB: 'indexedDB' in window,
          decompressionStream: 'DecompressionStream' in window,
          cacheStorage: 'caches' in window,
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language,
        };
        const handoff = getStoredHandoff();
        const expired = isExpired(handoff);

        readinessEl.append(
          metric('Secure context', readiness.secureContext ? 'yes' : 'no'),
          metric('Cross origin isolated', readiness.crossOriginIsolated ? 'yes' : 'no'),
          metric('SharedArrayBuffer', readiness.sharedArrayBuffer ? 'yes' : 'no'),
          metric('WebAssembly', readiness.webAssembly ? 'yes' : 'no'),
          metric('Worker', readiness.worker ? 'yes' : 'no'),
          metric('IndexedDB', readiness.indexedDB ? 'yes' : 'no'),
          metric('DecompressionStream', readiness.decompressionStream ? 'yes' : 'no')
        );

        if (handoff?.returnUrl) {
          backEl.href = handoff.returnUrl;
        }

        if (!handoff) {
          messageEl.textContent = 'No browser handoff was found. Return to Matters and start from the proof page.';
        } else if (expired) {
          messageEl.textContent = 'The browser handoff has expired. Return to Matters and request a fresh TW FidO signature.';
        } else {
          messageEl.textContent = readiness.crossOriginIsolated
            ? 'Isolated prover container is ready. The zkID worker will mount here in the next slice.'
            : 'This page is not isolated. Browser proof cannot run here.';
          messageEl.className = readiness.crossOriginIsolated ? '' : 'error';
        }

        handoffEl.append(
          metric('Handoff', handoff && !expired ? 'ready' : 'missing'),
          metric('APP_ID', handoff?.proofInput?.appId || 'missing'),
          metric('Challenge expires', handoff?.proofInput?.challengeExpiresAt || 'missing'),
          metric('Handoff expires', handoff?.handoffExpiresAt || 'missing'),
          metric('Cert payload', formatBytes(encodedBytes(handoff?.proofInput?.cert))),
          metric('Signature payload', formatBytes(encodedBytes(handoff?.proofInput?.signedResponse))),
          metric('Proof worker', 'pending')
        );

        const report = {
          location: '/api/personhood/prover',
          readiness,
          handoff: handoff
            ? {
                appId: handoff.proofInput?.appId,
                certChainType: handoff.certChainType,
                challenge: handoff.proofInput?.challenge,
                challengeExpiresAt: handoff.proofInput?.challengeExpiresAt,
                handoffExpiresAt: handoff.handoffExpiresAt,
                savedAt: handoff.savedAt,
                source: handoff.source,
                version: handoff.version,
              }
            : undefined,
        };
        reportEl.textContent = JSON.stringify(report, null, 2);
        copyEl.addEventListener('click', async () => {
          await navigator.clipboard?.writeText(reportEl.textContent || '');
          copyEl.textContent = 'Copied';
          window.setTimeout(() => {
            copyEl.textContent = 'Copy report';
          }, 1600);
        });
      })();
    </script>
  </body>
</html>`
