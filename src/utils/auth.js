/**
 * Simple token-based admin authentication.
 * The token is stored in VITE_ADMIN_TOKEN (env var, never committed).
 * On production, pair this with GitHub OAuth for proper security.
 */

const STORAGE_KEY = 'cs_admin_authed'
const EXPECTED_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || 'change-me-in-env'

export function authenticate(token) {
  if (token === EXPECTED_TOKEN) {
    sessionStorage.setItem(STORAGE_KEY, '1')
    return true
  }
  return false
}

export function isAuthenticated() {
  return sessionStorage.getItem(STORAGE_KEY) === '1'
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEY)
}
