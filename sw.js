// Service worker minimal de Main Basse : aucun cache. Il sert seulement à afficher les
// notifications du jeu (y compris celles poussées par le serveur quand le jeu est fermé) et à rouvrir l'application quand on touche une notification.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
// Notification poussée par le serveur (jeu fermé) : titre et texte déjà dans la langue du joueur.
self.addEventListener('push', (event) => {
  let data;
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {};
  }
  const title = data.title || 'Main Basse';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || '',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      tag: data.tag || 'main-basse',
    }),
  );
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
      for (const w of windows) if ('focus' in w) return w.focus();
      return self.clients.openWindow('./');
    }),
  );
});
