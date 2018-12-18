self.addEventListener('install', (event) => {
  console.log('SW Installed');
});

self.addEventListener('activate', () => {
  console.log('SW Activated');
});
