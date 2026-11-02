/**
 * Subdomain Detection & Navigation Utilities for Juthika By Momita Atelier
 * Supports both local development (admin.localhost:5173) and production (admin.yourdomain.com)
 */

export const getSubdomain = () => {
  if (typeof window === 'undefined') return null;

  const hostname = window.location.hostname.toLowerCase();

  // Development convenience: allow testing via URL parameter (?subdomain=admin)
  const params = new URLSearchParams(window.location.search);
  if (params.get('subdomain') === 'admin' || params.get('portal') === 'admin') {
    return 'admin';
  }

  // 1. Localhost subdomains: e.g. "admin.localhost"
  if (hostname.includes('localhost')) {
    const parts = hostname.split('.');
    if (parts.length > 1 && parts[0] === 'admin') {
      return 'admin';
    }
    return null;
  }

  // 2. Production domain subdomains: e.g. "admin.juthikabymomita.com"
  const parts = hostname.split('.');
  if (parts.length > 2 && parts[0] === 'admin') {
    return 'admin';
  }

  return null;
};

/**
 * Returns true if the current page is being viewed on the admin subdomain
 */
export const isAdminSubdomain = () => {
  return getSubdomain() === 'admin';
};

/**
 * Returns the full URL to the main customer storefront
 */
export const getMainStoreUrl = (path = '/') => {
  if (typeof window === 'undefined') return path;

  const { protocol, hostname, port } = window.location;
  const portStr = port ? `:${port}` : '';

  // Localhost
  if (hostname.includes('localhost')) {
    return `${protocol}//localhost${portStr}${path}`;
  }

  // Production domain: remove "admin." prefix
  const mainHost = hostname.replace(/^admin\./i, '');
  return `${protocol}//${mainHost}${portStr}${path}`;
};

/**
 * Returns the full URL to the private admin subdomain portal
 */
export const getAdminSubdomainUrl = (path = '/') => {
  if (typeof window === 'undefined') return path;

  const { protocol, hostname, port } = window.location;
  const portStr = port ? `:${port}` : '';

  // Localhost
  if (hostname.includes('localhost')) {
    return `${protocol}//admin.localhost${portStr}${path}`;
  }

  // Production domain: add "admin." prefix if not present
  const cleanHost = hostname.replace(/^www\./i, '').replace(/^admin\./i, '');
  return `${protocol}//admin.${cleanHost}${portStr}${path}`;
};
