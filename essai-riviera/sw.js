/* global self */
// Service worker minimal de Main Basse : aucun cache. Il sert seulement à afficher les
// notifications du jeu et à rouvrir l'application quand on touche une notification.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
      for (const w of windows) if ('focus' in w) return w.focus();
      return self.clients.openWindow('./');
    }),
  );
});
