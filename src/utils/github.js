/**
 * GitHub Contents API utility
 * Used by the Admin panel to commit content changes directly to the repo.
 *
 * Required: VITE_GITHUB_TOKEN and VITE_GITHUB_REPO in your .env file.
 * These are NEVER exposed publicly — they only live in your local env and
 * GitHub Actions secrets, never committed.
 */

const GITHUB_API = 'https://api.github.com'
const REPO = import.meta.env.VITE_GITHUB_REPO   // e.g. "chandan-satapathy/chandan-satapathy.github.io"
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN  // GitHub PAT with repo scope

const headers = () => ({
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'Content-Type': 'application/json',
})

/**
 * Fetch the current SHA of a file (required for updates)
 */
async function getFileSha(path) {
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${path}`, {
    headers: headers(),
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.sha
}

/**
 * Commit a file to the repo via the GitHub Contents API
 * @param {string} path - file path in repo e.g. "src/data/resume.json"
 * @param {string} content - file content (will be base64-encoded)
 * @param {string} message - commit message
 */
export async function commitFile(path, content, message) {
  const sha = await getFileSha(path)

  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
    ...(sha ? { sha } : {}),
  }

  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'GitHub API error')
  }

  return await res.json()
}

/**
 * Save updated resume JSON to the repo
 */
export async function saveResume(resumeData) {
  return commitFile(
    'src/data/resume.json',
    JSON.stringify(resumeData, null, 2),
    'chore: update resume content via admin panel'
  )
}

/**
 * Save a new or updated blog post as a markdown file
 * @param {object} post - { slug, title, date, content }
 */
export async function saveBlogPost(post) {
  const markdown = `---
title: "${post.title}"
date: "${post.date}"
slug: "${post.slug}"
---

${post.content}`

  return commitFile(
    `src/data/blogs/${post.slug}.md`,
    markdown,
    `feat: publish blog post "${post.title}"`
  )
}

/**
 * Save updated blogs index JSON
 */
export async function saveBlogsIndex(blogs) {
  return commitFile(
    'src/data/blogs.json',
    JSON.stringify(blogs, null, 2),
    'chore: update blogs index'
  )
}
