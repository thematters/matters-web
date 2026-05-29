import type { NextApiRequest, NextApiResponse } from 'next'

const HANDOFF_STORAGE_KEY = 'matters.personhood.browserProofHandoff.v1'
const PROVER_ASSET_BASE = '/api/personhood/prover/assets'

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
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob:",
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
        const assetBase = ${JSON.stringify(PROVER_ASSET_BASE)};
        const maxAgeMs = 15 * 60 * 1000;
        const readinessEl = document.getElementById('readiness');
        const handoffEl = document.getElementById('handoff');
        const messageEl = document.getElementById('message');
        const reportEl = document.getElementById('report');
        const backEl = document.getElementById('back');
        const copyEl = document.getElementById('copy');
        const runEl = document.getElementById('run');

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

        const proofWorker = {
          status: 'pending',
          inputStatus: 'not_started',
          warmupStatus: 'pending',
          witnessStatus: 'pending',
          proofStatus: 'pending',
          submitStatus: 'pending',
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
            ? 'Isolated prover container is ready. Run the browser proof to build zkID inputs, generate proofs, and submit the claim.'
            : 'This page is not isolated. Browser proof cannot run here.';
          messageEl.className = readiness.crossOriginIsolated ? '' : 'error';
        }

        const canRun = !!handoff && !expired && readiness.crossOriginIsolated &&
          readiness.sharedArrayBuffer && readiness.webAssembly && readiness.worker;
        runEl.disabled = !canRun;

        const renderHandoff = () => {
          handoffEl.innerHTML = '';
          handoffEl.append(
            metric('Handoff', handoff && !expired ? 'ready' : 'missing'),
            metric('APP_ID', handoff?.proofInput?.appId || 'missing'),
            metric('Challenge expires', handoff?.proofInput?.challengeExpiresAt || 'missing'),
            metric('Handoff expires', handoff?.handoffExpiresAt || 'missing'),
            metric('Cert payload', formatBytes(encodedBytes(handoff?.proofInput?.cert))),
            metric('Signature payload', formatBytes(encodedBytes(handoff?.proofInput?.signedResponse))),
            metric('Proof worker', proofWorker.status),
            metric('Input builder', proofWorker.inputStatus),
            metric('Warmup', proofWorker.warmupStatus || 'pending'),
            metric('Witness', proofWorker.witnessStatus || 'pending'),
            metric('Proof', proofWorker.proofStatus || 'pending'),
            metric('Submit', proofWorker.submitStatus || 'pending'),
            metric('Issuer bits', proofWorker.issuerBits ? String(proofWorker.issuerBits) : 'pending'),
            metric('Certificate serial', proofWorker.serialParsed ? 'parsed' : 'pending'),
            metric('Cert input', proofWorker.certInputBytes ? formatBytes(proofWorker.certInputBytes) : 'pending'),
            metric('User-sig input', proofWorker.userSigInputBytes ? formatBytes(proofWorker.userSigInputBytes) : 'pending'),
            metric('Cert proof', proofWorker.certProofBytes ? formatBytes(proofWorker.certProofBytes) : 'pending'),
            metric('User-sig proof', proofWorker.userSigProofBytes ? formatBytes(proofWorker.userSigProofBytes) : 'pending'),
            metric('Total time', proofWorker.totalMs ? Math.round(proofWorker.totalMs / 1000) + ' s' : 'pending')
          );
        };

        renderHandoff();

        const report = {
          location: '/api/personhood/prover',
          readiness,
          proofWorker,
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
        const renderReport = () => {
          report.proofWorker = proofWorker;
          reportEl.textContent = JSON.stringify(report, null, 2);
        };
        renderReport();

        const setWorkerState = (patch) => {
          Object.assign(proofWorker, patch);
          renderHandoff();
          renderReport();
        };

        const createWorkerSource = () => {
          const moduleUrl = new URL(assetBase + '/spartan2_wasm.js', location.origin).href;
          const wasmUrl = new URL(assetBase + '/spartan2_wasm_bg.wasm', location.origin).href;
          const issuerCertUrl = new URL(assetBase + '/moica-g3.cer', location.origin).href;
          const witnessCalculatorUrl = new URL(assetBase + '/witness_calculator.js', location.origin).href;
          const certPkUrl = new URL(assetBase + '/cert_chain_rs4096_proving.key.gz', location.origin).href;
          const userSigPkUrl = new URL(assetBase + '/user_sig_rs2048_proving.key.gz', location.origin).href;
          const certWitnessUrl = new URL(assetBase + '/certChainRS4096.wasm.gz', location.origin).href;
          const userSigWitnessUrl = new URL(assetBase + '/userSigRS2048.wasm.gz', location.origin).href;

          return \`
            const assetCacheName = 'matters-personhood-prover-assets-v1';
            const witnessCalculators = new Map();
            let witnessBuilder;

            const postProgress = (stage, status, extra = {}) => {
              self.postMessage({ type: 'progress', stage, status, ...extra });
            };

            const base64ToBytes = (value) => {
              const normalized = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
              const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
              const raw = atob(padded);
              const bytes = new Uint8Array(raw.length);
              for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i);
              return bytes;
            };

            const bytesToBase64 = (bytes) => {
              let binary = '';
              const chunkSize = 0x8000;
              for (let i = 0; i < bytes.length; i += chunkSize) {
                binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
              }
              return btoa(binary);
            };

            const byteLength = (value) => new TextEncoder().encode(value).byteLength;

            const gzipIsize = (bytes) => {
              if (bytes.byteLength < 4) throw new Error('gzip asset is too small');
              const view = new DataView(bytes.buffer, bytes.byteOffset + bytes.byteLength - 4, 4);
              return view.getUint32(0, true);
            };

            const cachedFetch = async (url) => {
              const request = new Request(url, { cache: 'force-cache' });
              if ('caches' in self) {
                const cache = await caches.open(assetCacheName);
                const cached = await cache.match(request);
                if (cached) return cached;
                const response = await fetch(request);
                if (!response.ok) {
                  throw new Error('Fetch failed for ' + url + ': ' + response.status);
                }
                await cache.put(request, response.clone()).catch(() => {});
                return response;
              }
              const response = await fetch(request);
              if (!response.ok) {
                throw new Error('Fetch failed for ' + url + ': ' + response.status);
              }
              return response;
            };

            const fetchBytes = async (url) => {
              const response = await cachedFetch(url);
              return new Uint8Array(await response.arrayBuffer());
            };

            const decompressGzipToBytes = async (compressed, label) => {
              postProgress('warmup', 'decompressing_' + label);
              const reader = new Blob([compressed])
                .stream()
                .pipeThrough(new DecompressionStream('gzip'))
                .getReader();
              const chunks = [];
              let total = 0;
              for (;;) {
                const next = await reader.read();
                if (next.done) break;
                chunks.push(next.value);
                total += next.value.byteLength;
              }
              const out = new Uint8Array(total);
              let offset = 0;
              for (const chunk of chunks) {
                out.set(chunk, offset);
                offset += chunk.byteLength;
              }
              return out;
            };

            const loadBuilder = async () => {
              if (witnessBuilder) return witnessBuilder;
              const response = await cachedFetch(\${JSON.stringify(witnessCalculatorUrl)});
              const rawSource = await response.text();
              const source = rawSource.replace(
                'a = flatArray(input);',
                'let a = flatArray(input);'
              );
              const wrapped = [
                'const module = { exports: undefined };',
                source,
                'export default module.exports;',
              ].join(String.fromCharCode(10));
              const blobUrl = URL.createObjectURL(new Blob([wrapped], {
                type: 'text/javascript',
              }));
              try {
                const mod = await import(blobUrl);
                witnessBuilder = mod.default;
                return witnessBuilder;
              } finally {
                URL.revokeObjectURL(blobUrl);
              }
            };

            const calculateWitness = async (kind, inputJson, witnessWasmBytes) => {
              let calculator = witnessCalculators.get(kind);
              if (!calculator) {
                const builder = await loadBuilder();
                calculator = await builder(witnessWasmBytes.slice().buffer, {
                  sanityCheck: true,
                });
                witnessCalculators.set(kind, calculator);
              }
              return calculator.calculateWTNSBin(JSON.parse(inputJson), true);
            };

            const loadProvingKey = async (zkid, kind, url, label) => {
              postProgress('warmup', 'downloading_' + label);
              const compressed = await fetchBytes(url);
              const totalSize = gzipIsize(compressed);
              postProgress('warmup', 'loading_' + label, {
                asset: label,
                bytesDone: 0,
                bytesTotal: totalSize,
              });
              zkid.load_pk_begin(kind, totalSize, true);
              let committed = false;
              let bytesDone = 0;
              try {
                const reader = new Blob([compressed])
                  .stream()
                  .pipeThrough(new DecompressionStream('gzip'))
                  .getReader();
                for (;;) {
                  const next = await reader.read();
                  if (next.done) break;
                  bytesDone += next.value.byteLength;
                  zkid.load_pk_chunk(kind, next.value);
                  postProgress('warmup', 'loading_' + label, {
                    asset: label,
                    bytesDone,
                    bytesTotal: totalSize,
                  });
                }
                zkid.load_pk_finish(kind);
                committed = true;
              } finally {
                if (!committed) {
                  try {
                    zkid.load_pk_cancel(kind);
                  } catch {}
                }
              }
            };

            self.onmessage = async (event) => {
              const handoff = event.data?.handoff;
              const startedAt = performance.now();
              try {
                postProgress('input', 'importing_wasm');
                const zkid = await import(\${JSON.stringify(moduleUrl)});

                postProgress('input', 'initializing_wasm');
                await zkid.default(\${JSON.stringify(wasmUrl)});
                zkid.wasm_init?.();

                postProgress('input', 'loading_certificates');
                const userCertDer = base64ToBytes(handoff.proofInput.cert);
                const issuerCertRes = await fetch(\${JSON.stringify(issuerCertUrl)}, {
                  cache: 'force-cache',
                });
                if (!issuerCertRes.ok) {
                  throw new Error('MOICA-G3 certificate fetch failed: ' + issuerCertRes.status);
                }
                const issuerCertDer = new Uint8Array(await issuerCertRes.arrayBuffer());

                postProgress('input', 'building_inputs');
                const serialHex = zkid.cert_serial_hex(userCertDer);
                const issuerBits = zkid.cert_modulus_bits(issuerCertDer);
                const appIdBytes = new TextEncoder().encode(handoff.proofInput.appId);
                const splitInputs = zkid.build_split_inputs(
                  userCertDer,
                  issuerCertDer,
                  handoff.proofInput.signedResponse,
                  appIdBytes,
                  serialHex,
                  null,
                  34,
                  17,
                  handoff.proofInput.challenge
                );
                const certJson = JSON.stringify(splitInputs.cert_chain);
                const userSigJson = JSON.stringify(splitInputs.user_sig);

                self.postMessage({
                  type: 'input_ready',
                  issuerBits,
                  appIdBytes: appIdBytes.byteLength,
                  certInputBytes: byteLength(certJson),
                  userSigInputBytes: byteLength(userSigJson),
                });

                const certKind = zkid.CircuitKind.CertChainRs4096;
                const userSigKind = zkid.CircuitKind.UserSigRs2048;

                await loadProvingKey(
                  zkid,
                  certKind,
                  \${JSON.stringify(certPkUrl)},
                  'cert_pk'
                );
                await loadProvingKey(
                  zkid,
                  userSigKind,
                  \${JSON.stringify(userSigPkUrl)},
                  'user_sig_pk'
                );

                postProgress('warmup', 'downloading_cert_witness');
                const certWitnessWasm = await decompressGzipToBytes(
                  await fetchBytes(\${JSON.stringify(certWitnessUrl)}),
                  'cert_witness'
                );
                postProgress('warmup', 'downloading_user_sig_witness');
                const userSigWitnessWasm = await decompressGzipToBytes(
                  await fetchBytes(\${JSON.stringify(userSigWitnessUrl)}),
                  'user_sig_witness'
                );
                postProgress('warmup', 'ready');

                postProgress('witness', 'cert_chain');
                const certWitnessStart = performance.now();
                const certWitness = await calculateWitness('certChainRS4096', certJson, certWitnessWasm);
                const certWitnessMs = performance.now() - certWitnessStart;

                postProgress('proof', 'cert_chain');
                const certProveStart = performance.now();
                const certProofOut = zkid.prove(certKind, certWitness);
                const certProveMs = performance.now() - certProveStart;
                const certProofBytes = new Uint8Array(certProofOut.proof);

                postProgress('witness', 'user_sig');
                const userSigWitnessStart = performance.now();
                const userSigWitness = await calculateWitness('userSigRS2048', userSigJson, userSigWitnessWasm);
                const userSigWitnessMs = performance.now() - userSigWitnessStart;

                postProgress('proof', 'user_sig');
                const userSigProveStart = performance.now();
                const userSigProofOut = zkid.prove(userSigKind, userSigWitness);
                const userSigProveMs = performance.now() - userSigProveStart;
                const userSigProofBytes = new Uint8Array(userSigProofOut.proof);

                self.postMessage({
                  type: 'proof_ready',
                  certProofBytes: certProofBytes.byteLength,
                  userSigProofBytes: userSigProofBytes.byteLength,
                  certWitnessMs,
                  certProveMs,
                  userSigWitnessMs,
                  userSigProveMs,
                });

                postProgress('submit', 'submitting');
                const linkVerifyUrl = handoff.linkVerifyUrl || '/api/personhood/zkid/link-verify';
                const submitResponse = await fetch(linkVerifyUrl, {
                  method: 'POST',
                  credentials: 'same-origin',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    handoffToken: handoff.handoffToken,
                    certChainType: 'rs4096',
                    certChainProof: bytesToBase64(certProofBytes),
                    userSigProof: bytesToBase64(userSigProofBytes),
                  }),
                });
                const submitText = await submitResponse.text();
                let submitJson;
                try {
                  submitJson = submitText ? JSON.parse(submitText) : {};
                } catch {
                  submitJson = { raw: submitText };
                }
                if (!submitResponse.ok) {
                  throw new Error('Submit failed ' + submitResponse.status + ': ' + (submitJson.error || submitResponse.statusText));
                }
                self.postMessage({
                  type: 'complete',
                  claimStatus: submitJson.status || 'claimed',
                  badges: submitJson.user?.info?.badges?.map((badge) => badge.type) || [],
                  totalMs: performance.now() - startedAt,
                });
              } catch (error) {
                self.postMessage({
                  type: 'error',
                  message: error instanceof Error ? error.message : String(error),
                });
              }
            };
          \`;
        };

        runEl.addEventListener('click', () => {
          if (!canRun || !handoff) return;
          runEl.disabled = true;
          setWorkerState({
            status: 'running',
            inputStatus: 'starting',
            warmupStatus: 'pending',
            witnessStatus: 'pending',
            proofStatus: 'pending',
            submitStatus: 'pending',
          });
          messageEl.textContent = 'Starting zkID browser proof. Keep this page open until the claim result appears.';
          messageEl.className = '';

          const workerUrl = URL.createObjectURL(new Blob([createWorkerSource()], {
            type: 'text/javascript',
          }));
          const worker = new Worker(workerUrl, { type: 'module' });
          worker.onmessage = (event) => {
            const data = event.data || {};
            if (data.type === 'progress') {
              if (data.stage === 'input') {
                setWorkerState({ inputStatus: data.status });
              } else if (data.stage === 'warmup') {
                const suffix = data.bytesTotal
                  ? ' ' + Math.round((data.bytesDone / data.bytesTotal) * 100) + '%'
                  : '';
                setWorkerState({ warmupStatus: data.status + suffix });
              } else if (data.stage === 'witness') {
                setWorkerState({ witnessStatus: data.status });
              } else if (data.stage === 'proof') {
                setWorkerState({ proofStatus: data.status });
              } else if (data.stage === 'submit') {
                setWorkerState({ submitStatus: data.status });
              }
              return;
            }
            if (data.type === 'input_ready') {
              setWorkerState({
                status: 'input_ready',
                inputStatus: 'ready',
                serialParsed: true,
                issuerBits: data.issuerBits,
                appIdBytes: data.appIdBytes,
                certInputBytes: data.certInputBytes,
                userSigInputBytes: data.userSigInputBytes,
              });
              return;
            }
            if (data.type === 'proof_ready') {
              setWorkerState({
                status: 'proof_ready',
                witnessStatus: 'ready',
                proofStatus: 'ready',
                certProofBytes: data.certProofBytes,
                userSigProofBytes: data.userSigProofBytes,
                certWitnessMs: data.certWitnessMs,
                certProveMs: data.certProveMs,
                userSigWitnessMs: data.userSigWitnessMs,
                userSigProveMs: data.userSigProveMs,
              });
              messageEl.textContent = 'Proofs are ready. Submitting claim to Matters.';
              return;
            }
            if (data.type === 'complete') {
              setWorkerState({
                status: data.claimStatus || 'claimed',
                submitStatus: 'claimed',
                badges: data.badges || [],
                totalMs: data.totalMs,
              });
              messageEl.textContent = 'Personhood proof accepted. Return to Matters to view the badge.';
              worker.terminate();
              URL.revokeObjectURL(workerUrl);
              return;
            }
            if (data.type === 'error') {
              setWorkerState({ status: 'error', submitStatus: data.message || 'failed' });
              messageEl.textContent = data.message || 'zkID browser proof failed.';
              messageEl.className = 'error';
              worker.terminate();
              URL.revokeObjectURL(workerUrl);
              runEl.disabled = false;
            }
          };
          worker.onerror = (event) => {
            setWorkerState({ status: 'error', inputStatus: event.message || 'worker crashed' });
            messageEl.textContent = event.message || 'zkID worker crashed.';
            messageEl.className = 'error';
            worker.terminate();
            URL.revokeObjectURL(workerUrl);
            runEl.disabled = false;
          };
          worker.postMessage({ handoff });
        });

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
