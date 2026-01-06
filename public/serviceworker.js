/* eslint-disable no-restricted-globals */

const CACHE_NAME = "rawedge-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",

  // 🔹 Imágenes principales
  "/assets/RawEdge.png",
  "/assets/ropa.jpg",
  "/assets/ropademoda.png",
  "/assets/accesorios.jpg",
  "/assets/promociones.jpg",
  "/assets/paqueteria.jpg",
  "/assets/pagotarjeta.jpg",
  "/assets/carrito.jpg",
  "/raw.jpg",
  "/assets/playstore.jpg",
  "/assets/whatsapp.png",
  "/assets/facebook.png",
  "/assets/instagram.png",
  "/assets/playstore.png",
  "/assets/appstore.png",
  "/assets/facebooke.png",
  "/assets/fondo.jpg",
  "/assets/fond.jpg",

  // 🔹 Banners
  "/assets/bannerhombre.jpg",
  "/assets/bannermujer.jpg",
  "/assets/banneraccesorios.jpg",
  "/assets/bannerofertas.jpg",
  "/assets/bannernuevo.jpg",

  // 🔹 Nuevas imágenes que faltaban
  "/assets/photo.avif",
  "/assets/oferta.png",
  "/assets/hombre.png",
  "/assets/mujer.png",
  "/assets/card.png",
  "/assets/user.png",
];


// ==========================
// INSTALACIÓN
// ==========================
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Archivos cacheados correctamente 🧩");
      return cache.addAll(urlsToCache);
    })
  );
});

// ==========================
// ACTIVACIÓN: limpiar caché antiguo
// ==========================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const deleteOldCaches = cacheNames.map((name) => {
        if (name !== CACHE_NAME) {
          console.log("Eliminando caché antiguo:", name);
          return caches.delete(name);
        }
        return Promise.resolve();
      });
      return Promise.all(deleteOldCaches);
    })
  );
});

// ==========================
// FETCH: interceptar solicitudes
// ==========================
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // ❌ No cachear Google Auth ni Stripe
  if (
    url.includes("stripe.com") ||
    url.includes("/auth/google") ||
    url.includes("/auth/google/callback")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((response) => {
          // No cachear respuestas parciales (206)
          if (!response || response.status === 206) {
            return response;
          }

          // Cache solo si es GET
          if (event.request.method === "GET") {
            const respClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, respClone);
            });
          }

          return response;
        })
      );
    })
  );
});
