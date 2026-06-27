// ═══════════════════════════════════════════════════════
//  MOE.DEV — Service Worker  v2.0.0
//  Strategy: Cache-First for assets, SWR for pages
//  Flutter Portfolio Pro Max V2
// ═══════════════════════════════════════════════════════

const APP_VERSION   = 'v2.0.0';
const STATIC_CACHE  = `moe-static-${APP_VERSION}`;
const DYNAMIC_CACHE = `moe-dynamic-${APP_VERSION}`;
const IMAGE_CACHE   = `moe-images-${APP_VERSION}`;
const FONT_CACHE    = `moe-fonts-${APP_VERSION}`;

const ALL_CACHES = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, FONT_CACHE];

// Assets to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Font origins to cache
const FONT_ORIGINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

// CDN origins to cache dynamically
const CDN_ORIGINS = [
  'res.cloudinary.com',
];

// ── INSTALL ──────────────────────────────────────────
self.addEventListener('install', event => {
  console.log(`[SW] Installing ${APP_VERSION}`);
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        // Add what we can, fail silently on missing optional assets
        return Promise.allSettled(
          PRECACHE_URLS.map(url => cache.add(url).catch(() => {}))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ─────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log(`[SW] Activating ${APP_VERSION}`);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => !ALL_CACHES.includes(key))
          .map(key => {
            console.log(`[SW] Deleting old cache: ${key}`);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH ─────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, non-http
  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;
  // Skip analytics, tracking
  if (url.pathname.includes('analytics')) return;

  // ① Fonts → Cache-First (long-lived)
  if (FONT_ORIGINS.some(o => url.hostname.includes(o))) {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // ② Images (Cloudinary, local) → Cache-First
  if (
    CDN_ORIGINS.some(o => url.hostname.includes(o)) ||
    /\.(png|jpg|jpeg|webp|svg|gif|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // ③ Static assets (JS, CSS) → Cache-First
  if (/\.(js|css|woff2?|ttf|otf)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // ④ Same-origin HTML → Stale-While-Revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    return;
  }

  // ⑤ Everything else → Network-First with fallback
  event.respondWith(networkFirst(request));
});

// ── STRATEGIES ───────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200 && response.type !== 'opaque') {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return offlineFallback(request);
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then(response => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  return cached || fetchPromise || offlineFallback(request);
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || offlineFallback(request);
  }
}

function offlineFallback(request) {
  if (request.mode === 'navigate') {
    return caches.match('/index.html');
  }
  return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
}

// ── BACKGROUND SYNC ──────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  // Retry queued contact form submissions when back online
  console.log('[SW] Background sync: contact form');
}

// ── PUSH NOTIFICATIONS ───────────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Check out the latest updates on Moe.dev!',
    icon: '/icon-192.png',
    badge: '/icon-96.png',
    tag: 'moe-portfolio-push',
    renotify: false,
    silent: false,
    requireInteraction: false,
    data: {
      url: data.url || '/',
      timestamp: Date.now()
    },
    actions: [
      { action: 'view', title: 'View Portfolio' },
      { action: 'contact', title: 'Contact Moe' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'Moe Kyaw Aung · Portfolio',
      options
    )
  );
});

// ── NOTIFICATION CLICK ───────────────────────────────
self.addEventListener('notificationclick', event => {
  event.notification.close();

  let targetUrl = '/';
  if (event.action === 'contact') targetUrl = '/#contact';
  else if (event.notification.data?.url) targetUrl = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(windowClients => {
        for (const client of windowClients) {
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow(targetUrl);
      })
  );
});

// ── MESSAGE HANDLER ──────────────────────────────────
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: APP_VERSION });
  }
  if (event.data?.type === 'CLEAR_CACHE') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
  }
});

console.log(`[SW] Moe.dev Service Worker ${APP_VERSION} loaded`);
