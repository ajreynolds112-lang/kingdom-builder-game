<!doctype html>
<html lang="en">
  <head><script defer data-preview-inject="true" data-app-id="6a14bd7b89dfd6e9813fe173" data-preview-type="latest_preview" data-rum-app-id="db50c921-10c3-4f12-bccb-950fa174b708" data-rum-client-token="pubfe8a4f2972b412b4556fd67e77f82cb4" data-dd-site="datadoghq.com" src="https://app.base44.com/builder-bridge.js?t=1780747416"></script>
    <script>
    (function() {
        var IGNORE = { SCRIPT: 1, STYLE: 1, LINK: 1, META: 1, NOSCRIPT: 1, TEMPLATE: 1 };
        const fire = () => window.parent.postMessage({ type: 'IFRAME_CONTENT_READY' }, '*');
        function check() {
            var body = document.body;
            if (!body) return false;
            for (var idx = 0; idx < body.children.length; idx++) {
                if (!IGNORE[body.children[idx].tagName]) return true;
            }
            return false;
        }
        function start() {
            if (check()) { fire(); return; }
            var observer = new MutationObserver(function() {
                if (check()) { fire(); observer.disconnect(); }
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });
        }
        if (document.body) { start(); }
        else { document.addEventListener('DOMContentLoaded', start, { once: true }); }
    })();
    </script>
    <script>
    (function() {
        if (window.self === window.top) return;
        var APP_ID = "6a14bd7b89dfd6e9813fe173";
        var PREVIEW_TYPE = "latest_preview";
        var on404 = false;
        var booted = false;
        function detect() { return !!document.querySelector('[data-source-location^="PageNotFound:"]'); }
        function payload() { return { app_id: APP_ID, preview_type: PREVIEW_TYPE, url_path: window.location.pathname }; }
        function tick() {
            var now = detect();
            if (now && !on404) {
                on404 = true;
                window.parent.postMessage({ type: 'PREVIEW_PAGE_NOT_FOUND', payload: payload() }, '*');
            } else if (!now && (on404 || !booted)) {
                // On first tick of a fresh document, emit a cleared signal even when
                // not currently on a 404 — the parent may have latched is404=true from
                // a previous document at the same URL (e.g. after an iframe reload).
                on404 = false;
                window.parent.postMessage({ type: 'PREVIEW_PAGE_NOT_FOUND_CLEARED', payload: payload() }, '*');
            }
            booted = true;
        }
        function start() {
            tick();
            new MutationObserver(tick).observe(document.body, { childList: true, subtree: true });
        }
        if (document.body) { start(); }
        else { document.addEventListener('DOMContentLoaded', start, { once: true }); }
    })();
    </script>
    <script>
    (function() {
        if (window.self === window.top) return;
        function postUnsupported(reason) {
            window.parent.postMessage({
                type: 'IFRAME_FIRST_CONTENTFUL_PAINT_UNSUPPORTED',
                payload: { reason: reason, userAgent: navigator.userAgent }
            }, '*');
        }
        if (typeof PerformanceObserver === 'undefined') {
            postUnsupported('no_performance_observer');
            return;
        }
        try {
            var obs = new PerformanceObserver(function(list) {
                var entries = list.getEntries();
                for (var i = 0; i < entries.length; i++) {
                    if (entries[i].name === 'first-contentful-paint') {
                        obs.disconnect();
                        window.parent.postMessage({ type: 'IFRAME_FIRST_CONTENTFUL_PAINT' }, '*');
                        return;
                    }
                }
            });
            obs.observe({ type: 'paint', buffered: true });
        } catch (e) {
            postUnsupported('observe_threw:' + (e && e.name ? e.name : 'Error'));
        }
    })();
    </script>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://base44.com/logo_v2.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="manifest" href="/manifest.json" />
    <title>Base44 APP</title>
    <script type="module" crossorigin src="/assets/index-DAOit7Df.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-DKD_24Yt.css">
    <script type="module">
if (window.self === window.top) {
  let lastPath = "";
  function getPageNameFromPath(path) {
    const segments = path.split("/").filter(Boolean);
    return segments[0] || null;
  }
  function trackPageView() {
    const path = window.location.pathname;
    if (path === lastPath) return;
    lastPath = path;
    const pageName = getPageNameFromPath(path) || "home";
    const appId = "6a14bd7b89dfd6e9813fe173";
    if (!appId) return;
    fetch(`/api/app-logs/${appId}/log-user-in-app/${pageName}`, {
      method: "POST",
    }).catch(() => {});
  }
  const originalPushState = history.pushState.bind(history);
  history.pushState = function (...args) {
    originalPushState(...args);
    trackPageView();
  };
  const originalReplaceState = history.replaceState.bind(history);
  history.replaceState = function (...args) {
    originalReplaceState(...args);
    trackPageView();
  };
  window.addEventListener("popstate", trackPageView);
  trackPageView();
}
</script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
