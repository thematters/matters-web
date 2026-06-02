# Personhood Proving Rollout

## Current split

The personhood rollout now has two proving lanes.

1. Desktop browser proving
   - TW FidO signing still starts on the phone.
   - Matters creates the zkID handoff after the phone returns with a signature.
   - The user can copy a Mac proof link and open it on a desktop browser.
   - The handoff is carried in the URL fragment, so it is not sent in the HTTP request for the isolated prover page.
   - The isolated prover imports the fragment into local storage, removes the fragment from browser history, and runs the browser proof.

2. iPhone Safari proving
   - iPhone Safari exposes the required APIs on the isolated page.
   - The current RS4096 browser prover is not safe to run there because the proof key and wasm allocations can trigger WebKit WebContent process termination.
   - The iPhone path is guarded so users do not repeatedly hit Safari's reload loop.
   - `?force=1` remains available only for controlled debugging.

## Why iPhone is blocked

The current proof path needs a 693 MiB decompressed cert-chain proving key plus wasm runtime and witness memory. Even after streaming the key and proving sequentially, iPhone Safari still reloads the page and eventually shows "A problem repeatedly occurred" on the isolated prover URL. This behavior matches WebKit WebContent memory termination rather than a normal JavaScript exception.

Relevant external notes:

- Apple Developer Forums have recent reports of `com.apple.WebKit.WebContent` being killed by iOS `memorystatus` after hitting an ActiveHard memory limit around 2048 MiB: https://developer.apple.com/forums/thread/823061
- WebKit memory analysis from Catch Metrics describes iOS WebKit page termination by Jetsam under high memory pressure: https://www.catchmetrics.io/blog/deep-dive-ram-internals-webkit
- Existing WebAssembly issue reports from Godot and Emscripten show iOS Safari failures when wasm memory is configured too high or repeatedly loaded: https://github.com/godotengine/godot/issues/70621 and https://github.com/emscripten-core/emscripten/issues/19374

## Next iPhone options

Recommended order:

1. Keep iPhone as TW FidO signer plus handoff carrier, and use desktop browser proof for develop testing.
2. Measure the exact high-water memory on desktop and Android Chrome for the current circuits, then set a browser support matrix.
3. Prototype a server-side proving queue where the server receives only the already-minimized zkID private witness inputs needed for proof generation, never the raw ID number.
4. Revisit iPhone browser proving only if the zkID circuit or proving key can be reduced enough to stay well below iOS WebContent limits.

Non-goals for the next slice:

- Do not ask general users to install Xcode or a native helper app.
- Do not keep retrying the current full RS4096 browser proof on iPhone Safari.
- Do not send TW FidO `signed_response` through query strings or server logs.
