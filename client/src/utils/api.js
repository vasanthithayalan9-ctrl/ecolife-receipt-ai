const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim();

export function getApiBaseUrl() {
  if (!rawApiUrl) {
    return '';
  }

  return rawApiUrl.replace(/\/$/, '');
}

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${normalizedPath}`;
}
