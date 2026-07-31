/* ============================================================
   CYBERPULSE — Application Engine
   Elite Threat Intelligence Dashboard
   Zero dependencies. Pure vanilla JavaScript.
   ============================================================ */

// ─── CONFIGURATION ──────────────────────────────────────────
const CONFIG = {
  // CORS Proxy fallback chain (per user's feasibility review)
  proxies: [
    url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    url => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  ],

  // Feed sources
  feeds: [
    {
      id: 'thehackernews',
      name: 'The Hacker News',
      url: 'https://feeds.feedburner.com/TheHackersNews',
      type: 'rss',
      color: '#00b8d4',
      icon: 'newspaper',
      enabled: true,
    },
    {
      id: 'bleepingcomputer',
      name: 'BleepingComputer',
      url: 'https://www.bleepingcomputer.com/feed/',
      type: 'rss',
      color: '#4a90d9',
      icon: 'monitor',
      enabled: true,
    },
    {
      id: 'krebsonsecurity',
      name: 'Krebs on Security',
      url: 'https://krebsonsecurity.com/feed/',
      type: 'rss',
      color: '#c0392b',
      icon: 'search',
      enabled: true,
    },
    {
      id: 'cisa',
      name: 'CISA Advisories',
      url: 'https://www.cisa.gov/cybersecurity-advisories/all.xml',
      type: 'rss',
      color: '#003e6b',
      icon: 'shield',
      enabled: true,
    },
    {
      id: 'darkreading',
      name: 'Dark Reading',
      url: 'https://www.darkreading.com/rss.xml',
      type: 'rss',
      color: '#1a1a2e',
      icon: 'eye',
      enabled: true,
    },
    {
      id: 'securityweek',
      name: 'SecurityWeek',
      url: 'https://feeds.feedpress.me/securityweek',
      type: 'rss',
      color: '#e74c3c',
      icon: 'shield-alert',
      enabled: true,
    },
    {
      id: 'schneier',
      name: 'Schneier on Security',
      url: 'https://www.schneier.com/feed/atom/',
      type: 'atom',
      color: '#8e44ad',
      icon: 'lock',
      enabled: true,
    },
    {
      id: 'sans',
      name: 'SANS ISC',
      url: 'https://isc.sans.edu/rssfeed.xml',
      type: 'rss',
      color: '#2c3e50',
      icon: 'graduation-cap',
      enabled: true,
    },
    {
      id: 'talos',
      name: 'Cisco Talos',
      url: 'https://blog.talosintelligence.com/feeds/posts/default',
      type: 'atom',
      color: '#049fd9',
      icon: 'radar',
      enabled: true,
    },
    {
      id: 'welivesecurity',
      name: 'WeLiveSecurity',
      url: 'https://www.welivesecurity.com/en/rss/feed/',
      type: 'rss',
      color: '#4caf50',
      icon: 'shield-check',
      enabled: true,
    },
    {
      id: 'nakedsecurity',
      name: 'Naked Security',
      url: 'https://nakedsecurity.sophos.com/feed/',
      type: 'rss',
      color: '#0050c5',
      icon: 'eye-off',
      enabled: true,
    },
    {
      id: 'github-advisories',
      name: 'GitHub Advisories',
      url: 'https://api.github.com/advisories?per_page=15&sort=published&direction=desc',
      type: 'github-advisories',
      color: '#f0f6fc',
      icon: 'shield-alert',
      enabled: true,
    },
    {
      id: 'github-tools',
      name: 'GitHub Security Tools',
      url: '__dynamic__',
      type: 'github-tools',
      color: '#58a6ff',
      icon: 'code',
      enabled: true,
    },
  ],

  // Severity classification keywords
  severityKeywords: {
    critical: [
      'zero-day', '0-day', 'zero day', 'rce', 'remote code execution',
      'actively exploited', 'in the wild', 'critical vulnerability',
      'cvss 9', 'cvss 10', 'cvss: 9', 'cvss: 10', 'emergency patch',
      'wormable', 'pre-auth', 'unauthenticated rce', 'critical flaw',
      'nation-state', 'supply chain attack', 'critical severity',
    ],
    high: [
      'high severity', 'ransomware attack', 'data breach', 'million records',
      'apt group', 'supply chain', 'backdoor', 'rootkit',
      'privilege escalation', 'authentication bypass', 'ssrf',
      'sql injection', 'arbitrary code', 'data leak', 'credentials stolen',
      'espionage', 'state-sponsored', 'high vulnerability',
    ],
    medium: [
      'vulnerability', 'cve-', 'patch tuesday', 'security update',
      'security flaw', 'bug bounty', 'xss', 'csrf',
      'denial of service', 'dos attack', 'ddos',
      'phishing campaign', 'security advisory', 'medium severity',
    ],
  },

  // Category classification keywords
  categoryKeywords: {
    vulnerability: [
      'cve-', 'vulnerability', 'zero-day', '0-day', 'exploit', 'rce',
      'xss', 'sql injection', 'buffer overflow', 'use-after-free',
      'privilege escalation', 'auth bypass', 'ssrf', 'deserialization',
      'code execution', 'security flaw', 'bug', 'patch',
    ],
    malware: [
      'malware', 'ransomware', 'trojan', 'botnet', 'rat ', 'worm',
      'spyware', 'adware', 'keylogger', 'infostealer', 'loader',
      'dropper', 'implant', 'payload', 'c2 server', 'command and control',
    ],
    breach: [
      'breach', 'leaked', 'exposed', 'stolen data', 'compromised',
      'hack ', 'hacked', 'data leak', 'records exposed',
      'credentials dump', 'database exposed', 'personal data',
    ],
    tool: [
      'tool', 'framework', 'scanner', 'release', 'github',
      'open source', 'pentest', 'red team', 'blue team',
      'security tool', 'new version', 'nuclei', 'burp',
    ],
    advisory: [
      'advisory', 'alert', 'warning', 'cisa', 'cert',
      'patch tuesday', 'security update', 'bulletin', 'notice',
    ],
  },

  defaultRefreshInterval: 3600000, // 1 hour
  defaultPageSize: 20,
  maxCacheAge: 3600000 * 2, // 2 hours
  githubCacheAge: 3600000, // 1 hour (strict for rate limits)
  tickerItemCount: 15,
};


// ─── UTILITY FUNCTIONS ─────────────────────────────────────
function generateId(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'art_' + Math.abs(hash).toString(36);
}

function timeAgo(date) {
  if (!date) return 'Unknown';
  // Ensure date is a Date object (survives JSON serialization)
  if (!(date instanceof Date)) date = new Date(date);
  if (isNaN(date.getTime())) return 'Unknown';
  const now = new Date();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function stripHtml(html) {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function truncate(str, len) {
  if (!str) return '';
  str = str.trim();
  return str.length > len ? str.substring(0, len).trim() + '...' : str;
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return str.replace(/[&<>"']/g, c => map[c]);
}

function formatCountdown(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}m`;
}


// ─── RSS / ATOM PARSER ──────────────────────────────────────
class RSSParser {

  parse(xmlString, feedType) {
    try {
      // Clean common XML issues
      xmlString = xmlString
        .replace(/&(?!(?:amp|lt|gt|apos|quot|#\d+|#x[\da-fA-F]+);)/g, '&amp;');

      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlString, 'text/xml');

      // Check for parse errors
      const errorNode = doc.querySelector('parsererror');
      if (errorNode) {
        // Try as HTML fallback
        const htmlDoc = parser.parseFromString(xmlString, 'text/html');
        return this._tryExtractFromHtml(htmlDoc);
      }

      // Detect feed type
      const rootTag = doc.documentElement.tagName.toLowerCase();
      if (rootTag === 'feed' || feedType === 'atom') {
        return this._parseAtom(doc);
      }
      return this._parseRSS(doc);
    } catch (e) {
      console.warn('RSS Parse error:', e);
      return [];
    }
  }

  _parseRSS(doc) {
    const items = doc.querySelectorAll('item');
    const articles = [];
    items.forEach(item => {
      try {
        const title = this._getText(item, 'title');
        const link = this._getText(item, 'link') || this._getAttr(item, 'link', 'href');
        const description = this._getText(item, 'content\\:encoded')
          || this._getText(item, 'description')
          || '';
        const pubDate = this._parseDate(
          this._getText(item, 'pubDate')
          || this._getText(item, 'dc\\:date')
          || this._getText(item, 'date')
        );

        if (title && link) {
          articles.push({
            title: stripHtml(title).trim(),
            link: link.trim(),
            description: truncate(stripHtml(description), 400),
            pubDate,
          });
        }
      } catch (e) { /* skip malformed items */ }
    });
    return articles;
  }

  _parseAtom(doc) {
    const entries = doc.querySelectorAll('entry');
    const articles = [];
    entries.forEach(entry => {
      try {
        const title = this._getText(entry, 'title');
        const linkEl = entry.querySelector('link[rel="alternate"]')
          || entry.querySelector('link[href]')
          || entry.querySelector('link');
        const link = linkEl ? linkEl.getAttribute('href') : '';
        const description = this._getText(entry, 'summary')
          || this._getText(entry, 'content')
          || '';
        const pubDate = this._parseDate(
          this._getText(entry, 'published')
          || this._getText(entry, 'updated')
        );

        if (title && link) {
          articles.push({
            title: stripHtml(title).trim(),
            link: link.trim(),
            description: truncate(stripHtml(description), 400),
            pubDate,
          });
        }
      } catch (e) { /* skip */ }
    });
    return articles;
  }

  _tryExtractFromHtml(doc) {
    // Last resort — try to find any links/titles
    return [];
  }

  _getText(parent, tag) {
    // Handle namespaced tags (e.g., content:encoded → try multiple selectors)
    const selectors = [tag, tag.replace('\\:', '\\:')];
    for (const sel of selectors) {
      try {
        const el = parent.querySelector(sel);
        if (el) return el.textContent;
      } catch (e) {
        // querySelector may fail on namespaced selectors in some browsers
      }
    }
    // Fallback: iterate children for namespace support
    const [ns, local] = tag.replace(/\\\:/g, ':').split(':');
    if (local) {
      for (const child of parent.children) {
        if (child.localName === local || child.tagName.toLowerCase().endsWith(':' + local)) {
          return child.textContent;
        }
      }
    }
    return null;
  }

  _getAttr(parent, tag, attr) {
    const el = parent.querySelector(tag);
    return el ? el.getAttribute(attr) : null;
  }

  _parseDate(dateStr) {
    if (!dateStr) return new Date();
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date() : d;
  }
}


// ─── SEVERITY CLASSIFIER ───────────────────────────────────
class SeverityClassifier {

  classify(article) {
    const text = `${article.title} ${article.description}`.toLowerCase();

    for (const keyword of CONFIG.severityKeywords.critical) {
      if (text.includes(keyword)) return 'critical';
    }
    for (const keyword of CONFIG.severityKeywords.high) {
      if (text.includes(keyword)) return 'high';
    }
    for (const keyword of CONFIG.severityKeywords.medium) {
      if (text.includes(keyword)) return 'medium';
    }
    return 'info';
  }
}


// ─── CATEGORY TAGGER ───────────────────────────────────────
class CategoryTagger {

  tag(article) {
    const text = `${article.title} ${article.description}`.toLowerCase();

    // Check each category (order matters — more specific first)
    const categories = ['vulnerability', 'malware', 'breach', 'tool', 'advisory'];
    for (const cat of categories) {
      for (const kw of CONFIG.categoryKeywords[cat]) {
        if (text.includes(kw)) return cat;
      }
    }
    return 'news';
  }
}


// ─── STORAGE MANAGER ───────────────────────────────────────
class StorageManager {

  _get(key, fallback) {
    try {
      const raw = localStorage.getItem(`cyberpulse_${key}`);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  _set(key, value) {
    try {
      localStorage.setItem(`cyberpulse_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write failed:', e);
    }
  }

  // Bookmarks
  getBookmarks() { return this._get('bookmarks', {}); }
  isBookmarked(id) { return !!this.getBookmarks()[id]; }
  toggleBookmark(article) {
    const bookmarks = this.getBookmarks();
    if (bookmarks[article.id]) {
      delete bookmarks[article.id];
    } else {
      bookmarks[article.id] = {
        id: article.id,
        title: article.title,
        link: article.link,
        source: article.source.name,
        severity: article.severity,
        savedAt: new Date().toISOString(),
      };
    }
    this._set('bookmarks', bookmarks);
    return !!bookmarks[article.id];
  }

  // Read state
  getReadArticles() { return this._get('read', {}); }
  isRead(id) { return !!this.getReadArticles()[id]; }
  markAsRead(id) {
    const read = this.getReadArticles();
    read[id] = Date.now();
    // Keep only last 500 read entries
    const keys = Object.keys(read);
    if (keys.length > 500) {
      const sorted = keys.sort((a, b) => read[a] - read[b]);
      sorted.slice(0, keys.length - 500).forEach(k => delete read[k]);
    }
    this._set('read', read);
  }

  // Settings
  getSettings() {
    return this._get('settings', {
      theme: 'dark',
      refreshInterval: CONFIG.defaultRefreshInterval,
      pageSize: CONFIG.defaultPageSize,
      notifications: false,
      disabledFeeds: [],
      viewMode: 'cards',
    });
  }
  saveSettings(settings) { this._set('settings', settings); }

  // Feed cache
  getCachedFeed(sourceId) {
    const cache = this._get(`cache_${sourceId}`, null);
    if (!cache) return null;
    const maxAge = sourceId.startsWith('github') ? CONFIG.githubCacheAge : CONFIG.maxCacheAge;
    if (Date.now() - cache.timestamp > maxAge) return null;
    return cache.articles;
  }
  cacheFeed(sourceId, articles) {
    this._set(`cache_${sourceId}`, { timestamp: Date.now(), articles });
  }

  // Clear all
  clearCache() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('cyberpulse_cache_'));
    keys.forEach(k => localStorage.removeItem(k));
  }
  clearAll() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('cyberpulse_'));
    keys.forEach(k => localStorage.removeItem(k));
  }
}


// ─── TOAST MANAGER ──────────────────────────────────────────
class ToastManager {

  constructor() {
    this.container = document.getElementById('toast-container');
  }

  show(message, type = 'info') {
    const icons = {
      success: 'check-circle',
      error: 'x-circle',
      info: 'info',
      warning: 'alert-triangle',
    };
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<i data-lucide="${icons[type] || 'info'}"></i><span>${escapeHtml(message)}</span>`;
    this.container.appendChild(toast);

    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [toast] });

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 3200);
  }
}


// ─── PARTICLE BACKGROUND ───────────────────────────────────
class ParticleBackground {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener('resize', debounce(() => this.resize(), 200));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this._initParticles();
  }

  _initParticles() {
    const count = Math.min(60, Math.floor((this.canvas.width * this.canvas.height) / 18000));
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  start() {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this._draw();
    };
    animate();
  }

  stop() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  _draw() {
    const { ctx, canvas, particles } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const theme = document.documentElement.getAttribute('data-theme');
    const color = theme === 'hacker' ? '0, 255, 65' : theme === 'light' ? '0, 100, 180' : '0, 229, 255';
    const lineDistance = 120;

    // Update & draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
      ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < lineDistance) {
          const opacity = (1 - dist / lineDistance) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color}, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
}


// ─── COUNTDOWN TIMER ────────────────────────────────────────
class CountdownTimer {

  constructor() {
    this.ring = document.getElementById('countdown-ring');
    this.text = document.getElementById('countdown-text');
    this.circumference = 2 * Math.PI * 17; // r=17
    this.intervalId = null;
    this.endTime = 0;
    this.duration = 0;
  }

  start(durationMs) {
    this.duration = durationMs;
    this.endTime = Date.now() + durationMs;
    if (this.ring) {
      this.ring.style.strokeDasharray = this.circumference;
    }
    this.stop();
    this.intervalId = setInterval(() => this._update(), 1000);
    this._update();
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  _update() {
    const remaining = Math.max(0, this.endTime - Date.now());
    const progress = 1 - (remaining / this.duration);
    const offset = this.circumference * progress;

    if (this.ring) {
      this.ring.style.strokeDashoffset = offset;
    }
    if (this.text) {
      this.text.textContent = formatCountdown(remaining);
    }
  }
}


// ─── FEED ENGINE ────────────────────────────────────────────
class FeedEngine {

  constructor(storage) {
    this.storage = storage;
    this.parser = new RSSParser();
    this.classifier = new SeverityClassifier();
    this.tagger = new CategoryTagger();
    this.sourceStatus = {};
  }

  async fetchAll(enabledFeeds) {
    const promises = enabledFeeds.map(source => this._fetchSource(source));
    const results = await Promise.allSettled(promises);

    let allArticles = [];
    results.forEach((result, i) => {
      if (result.status === 'fulfilled' && result.value) {
        allArticles = allArticles.concat(result.value);
      }
    });

    // Deduplicate by title similarity
    const seen = new Map();
    allArticles = allArticles.filter(article => {
      const key = article.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 60);
      if (seen.has(key)) return false;
      seen.set(key, true);
      return true;
    });

    // Sort by date (newest first)
    allArticles.sort((a, b) => b.pubDate - a.pubDate);

    return allArticles;
  }

  async _fetchSource(source) {
    this.sourceStatus[source.id] = 'loading';

    // Check cache first
    const cached = this.storage.getCachedFeed(source.id);
    if (cached) {
      this.sourceStatus[source.id] = 'cached';
      // Rehydrate Date objects lost during JSON serialization
      return cached.map(a => {
        if (a.pubDate && !(a.pubDate instanceof Date)) a.pubDate = new Date(a.pubDate);
        return a;
      });
    }

    try {
      let articles;

      if (source.type === 'github-advisories') {
        articles = await this._fetchGitHubAdvisories(source);
      } else if (source.type === 'github-tools') {
        articles = await this._fetchGitHubTools(source);
      } else {
        articles = await this._fetchRSS(source);
      }

      // Classify & tag each article
      articles = articles.map(article => {
        article.id = generateId(article.link || article.title);
        article.source = { id: source.id, name: source.name, color: source.color, icon: source.icon };
        article.severity = article.severity || this.classifier.classify(article);
        article.category = article.category || this.tagger.tag(article);
        return article;
      });

      // Cache results
      this.storage.cacheFeed(source.id, articles);
      this.sourceStatus[source.id] = 'ok';
      return articles;
    } catch (e) {
      console.warn(`Failed to fetch ${source.name}:`, e.message);
      this.sourceStatus[source.id] = 'error';

      // Fall back to stale cache
      const staleCache = this.storage._get(`cache_${source.id}`, null);
      if (staleCache && staleCache.articles) {
        this.sourceStatus[source.id] = 'stale';
        return staleCache.articles.map(a => {
          if (a.pubDate && !(a.pubDate instanceof Date)) a.pubDate = new Date(a.pubDate);
          return a;
        });
      }
      return [];
    }
  }

  async _fetchRSS(source) {
    const rawXml = await this._fetchViaProxy(source.url);
    if (!rawXml) throw new Error('Empty response');
    return this.parser.parse(rawXml, source.type);
  }

  async _fetchViaProxy(url) {
    let lastError;
    for (const proxyFn of CONFIG.proxies) {
      try {
        const proxyUrl = proxyFn(url);
        const resp = await fetch(proxyUrl, {
          signal: AbortSignal.timeout(25000),
          headers: { 'Accept': 'application/rss+xml, application/xml, text/xml, */*' },
        });

        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

        const contentType = resp.headers.get('content-type') || '';
        let text;

        // allorigins returns JSON wrapper
        if (contentType.includes('application/json')) {
          const json = await resp.json();
          text = json.contents || json.body || JSON.stringify(json);
        } else {
          text = await resp.text();
        }

        if (text && text.length > 100) return text;
        throw new Error('Response too short');
      } catch (e) {
        lastError = e;
        continue; // Try next proxy
      }
    }
    throw lastError || new Error('All proxies failed');
  }

  async _fetchGitHubAdvisories(source) {
    try {
      const resp = await fetch(source.url, {
        signal: AbortSignal.timeout(10000),
        headers: { 'Accept': 'application/vnd.github+json' },
      });
      if (!resp.ok) throw new Error(`GitHub API ${resp.status}`);

      const data = await resp.json();
      return (Array.isArray(data) ? data : []).map(adv => {
        const severityMap = { critical: 'critical', high: 'high', medium: 'medium', low: 'info' };
        return {
          title: adv.summary || adv.cve_id || 'GitHub Advisory',
          link: adv.html_url || `https://github.com/advisories/${adv.ghsa_id}`,
          description: truncate(stripHtml(adv.description || ''), 400),
          pubDate: new Date(adv.published_at || adv.updated_at),
          severity: severityMap[adv.severity] || 'info',
          category: 'vulnerability',
          cveId: adv.cve_id,
          ghsaId: adv.ghsa_id,
        };
      });
    } catch (e) {
      throw e;
    }
  }

  async _fetchGitHubTools(source) {
    try {
      const twoWeeksAgo = new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0];
      const query = encodeURIComponent(`topic:security topic:hacking created:>${twoWeeksAgo}`);
      const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=10`;

      const resp = await fetch(url, {
        signal: AbortSignal.timeout(10000),
        headers: { 'Accept': 'application/vnd.github+json' },
      });
      if (!resp.ok) throw new Error(`GitHub API ${resp.status}`);

      const data = await resp.json();
      return (data.items || []).map(repo => ({
        title: `${repo.full_name} — ${repo.description || 'Security tool'}`,
        link: repo.html_url,
        description: `⭐ ${repo.stargazers_count.toLocaleString()} stars · ${repo.language || 'Multi'} · ${(repo.topics || []).slice(0, 5).join(', ')}`,
        pubDate: new Date(repo.created_at),
        severity: 'tool',
        category: 'tool',
        stars: repo.stargazers_count,
        language: repo.language,
      }));
    } catch (e) {
      throw e;
    }
  }
}


// ─── NOTIFICATION MANAGER ───────────────────────────────────
class NotificationManager {

  constructor() {
    this.enabled = false;
  }

  async requestPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') {
      this.enabled = true;
      return true;
    }
    if (Notification.permission !== 'denied') {
      const perm = await Notification.requestPermission();
      this.enabled = perm === 'granted';
      return this.enabled;
    }
    return false;
  }

  notify(article) {
    if (!this.enabled) return;
    try {
      const n = new Notification(`🛡️ ${article.severity.toUpperCase()}: ${article.title}`, {
        body: `${article.source.name} · ${article.description.substring(0, 100)}`,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">🛡️</text></svg>',
        tag: article.id,
        requireInteraction: false,
      });
      n.onclick = () => { window.open(article.link, '_blank'); n.close(); };
      setTimeout(() => n.close(), 8000);
    } catch (e) { /* notifications may fail silently */ }
  }
}


// ─── MAIN APP CONTROLLER ───────────────────────────────────
class App {

  constructor() {
    this.storage = new StorageManager();
    this.toast = new ToastManager();
    this.feedEngine = new FeedEngine(this.storage);
    this.countdown = new CountdownTimer();
    this.notifications = new NotificationManager();
    this.particles = null;

    this.allArticles = [];
    this.filteredArticles = [];
    this.displayedCount = 0;
    this.selectedIndex = -1;
    this.showingBookmarks = false;
    this.refreshTimerId = null;
    this.isRefreshing = false;

    // Load settings
    this.settings = this.storage.getSettings();
  }

  async init() {
    // Apply theme
    this._applyTheme(this.settings.theme);

    // Init particle background
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
      this.particles = new ParticleBackground(canvas);
      this.particles.start();
    }

    // Setup all event listeners
    this._setupEventListeners();
    this._setupKeyboardShortcuts();

    // Apply saved settings to UI
    this._applySavedSettings();

    // Create icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Generate settings sources list
    this._renderSettingsSources();

    // ── Instant cache load: show cached data immediately, then refresh silently ──
    const cachedArticles = this._loadAllCached();
    if (cachedArticles.length > 0) {
      // Render cached data instantly — no loading screen
      this.allArticles = cachedArticles;
      this.allArticles.forEach(a => {
        a.isRead = this.storage.isRead(a.id);
        a.isBookmarked = this.storage.isBookmarked(a.id);
      });
      this._applyFiltersAndRender();
      this._updateStats();
      this._updateTicker();
      this._updateSyncStatus();

      // Then refresh silently in the background
      this._silentRefresh();
    } else {
      // First-ever visit: no cache at all → show loading screen
      await this.refreshFeeds();
    }

    // Start auto-refresh
    this._startAutoRefresh();
  }

  // ── Load all cached articles (instant, no network) ─────────
  _loadAllCached() {
    const enabledFeeds = CONFIG.feeds.filter(f =>
      f.enabled && !this.settings.disabledFeeds.includes(f.id)
    );

    let allArticles = [];
    for (const source of enabledFeeds) {
      const cached = this.storage.getCachedFeed(source.id);
      // Also accept stale cache for instant display
      const stale = !cached ? this.storage._get(`cache_${source.id}`, null) : null;
      const articles = cached || (stale ? stale.articles : null);
      if (articles && articles.length > 0) {
        const hydrated = articles.map(a => {
          if (a.pubDate && !(a.pubDate instanceof Date)) a.pubDate = new Date(a.pubDate);
          // Ensure source info exists
          if (!a.source) {
            a.source = { id: source.id, name: source.name, color: source.color, icon: source.icon };
          }
          return a;
        });
        allArticles = allArticles.concat(hydrated);
        this.feedEngine.sourceStatus[source.id] = cached ? 'cached' : 'stale';
      }
    }

    // Deduplicate
    const seen = new Map();
    allArticles = allArticles.filter(article => {
      const key = article.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 60);
      if (seen.has(key)) return false;
      seen.set(key, true);
      return true;
    });

    // Sort newest first
    allArticles.sort((a, b) => b.pubDate - a.pubDate);
    return allArticles;
  }

  // ── Silent background refresh (no loading screen) ──────────
  async _silentRefresh() {
    if (this.isRefreshing) return;
    this.isRefreshing = true;
    this._updateRefreshButton(true);

    const enabledFeeds = CONFIG.feeds.filter(f =>
      f.enabled && !this.settings.disabledFeeds.includes(f.id)
    );

    try {
      const previousCriticalIds = new Set(
        this.allArticles.filter(a => a.severity === 'critical').map(a => a.id)
      );

      this.allArticles = await this.feedEngine.fetchAll(enabledFeeds);

      this.allArticles.forEach(a => {
        a.isRead = this.storage.isRead(a.id);
        a.isBookmarked = this.storage.isBookmarked(a.id);
      });

      // Notify on new critical articles
      if (this.settings.notifications) {
        this.allArticles
          .filter(a => a.severity === 'critical' && !previousCriticalIds.has(a.id))
          .slice(0, 3)
          .forEach(a => this.notifications.notify(a));
      }

      this._applyFiltersAndRender();
      this._updateStats();
      this._updateTicker();
      this._updateSyncStatus();

      this.toast.show(`Synced ${this.allArticles.length} articles from ${enabledFeeds.length} sources`, 'success');
    } catch (e) {
      console.error('Background refresh failed:', e);
    } finally {
      this.isRefreshing = false;
      this._updateRefreshButton(false);
    }
  }

  // ── Feed Fetching (with loading screen — for first load & manual refresh) ──
  async refreshFeeds() {
    if (this.isRefreshing) return;
    this.isRefreshing = true;

    // Show loading state
    this._showLoading(true);
    this._updateRefreshButton(true);

    const enabledFeeds = CONFIG.feeds.filter(f =>
      f.enabled && !this.settings.disabledFeeds.includes(f.id)
    );

    // Show loading source indicators
    this._renderLoadingSources(enabledFeeds);

    try {
      const previousCriticalIds = new Set(
        this.allArticles.filter(a => a.severity === 'critical').map(a => a.id)
      );

      this.allArticles = await this.feedEngine.fetchAll(enabledFeeds);

      // Restore read/bookmark state
      this.allArticles.forEach(a => {
        a.isRead = this.storage.isRead(a.id);
        a.isBookmarked = this.storage.isBookmarked(a.id);
      });

      // Notify on new critical articles
      if (this.settings.notifications) {
        this.allArticles
          .filter(a => a.severity === 'critical' && !previousCriticalIds.has(a.id))
          .slice(0, 3)
          .forEach(a => this.notifications.notify(a));
      }

      this._applyFiltersAndRender();
      this._updateStats();
      this._updateTicker();
      this._updateSyncStatus();

      this.toast.show(`Synced ${this.allArticles.length} articles from ${enabledFeeds.length} sources`, 'success');
    } catch (e) {
      console.error('Refresh failed:', e);
      this.toast.show('Some feeds failed to load. Showing cached data.', 'warning');
    } finally {
      this.isRefreshing = false;
      this._showLoading(false);
      this._updateRefreshButton(false);
    }
  }

  // ── Filtering & Rendering ─────────────────────────────────
  _applyFiltersAndRender() {
    let articles = this.showingBookmarks
      ? this.allArticles.filter(a => a.isBookmarked)
      : [...this.allArticles];

    // Category filter
    const activeTab = document.querySelector('.tab.active');
    const category = activeTab ? activeTab.dataset.category : 'all';
    if (category !== 'all') {
      articles = articles.filter(a => a.category === category);
    }

    // Severity filter
    const severityFilter = document.getElementById('severity-filter').value;
    if (severityFilter !== 'all') {
      articles = articles.filter(a => a.severity === severityFilter);
    }

    // Time filter
    const timeFilter = document.getElementById('time-filter').value;
    if (timeFilter !== 'all') {
      const now = Date.now();
      const durations = { '1h': 3600000, '6h': 21600000, '24h': 86400000, '7d': 604800000, '30d': 2592000000 };
      const cutoff = now - (durations[timeFilter] || Infinity);
      articles = articles.filter(a => a.pubDate && a.pubDate.getTime() > cutoff);
    }

    // Search filter
    const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
    if (searchQuery) {
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(searchQuery)
        || a.description.toLowerCase().includes(searchQuery)
        || (a.source && a.source.name.toLowerCase().includes(searchQuery))
        || (a.cveId && a.cveId.toLowerCase().includes(searchQuery))
      );
    }

    // Sort
    const sortBy = document.getElementById('sort-filter').value;
    if (sortBy === 'oldest') {
      articles.sort((a, b) => a.pubDate - b.pubDate);
    } else if (sortBy === 'severity') {
      const order = { critical: 0, high: 1, medium: 2, tool: 3, info: 4 };
      articles.sort((a, b) => (order[a.severity] ?? 4) - (order[b.severity] ?? 4));
    } else {
      articles.sort((a, b) => b.pubDate - a.pubDate);
    }

    this.filteredArticles = articles;
    this.displayedCount = 0;
    this.selectedIndex = -1;
    this._renderCards();
  }

  _renderCards() {
    const feed = document.getElementById('feed');
    const emptyState = document.getElementById('empty-state');
    const loadMoreEl = document.getElementById('load-more');
    const pageSize = this.settings.pageSize || CONFIG.defaultPageSize;

    const startIdx = this.displayedCount;
    const endIdx = Math.min(startIdx + pageSize, this.filteredArticles.length);
    const articlesToRender = this.filteredArticles.slice(startIdx, endIdx);

    if (startIdx === 0) {
      feed.innerHTML = '';
    }

    if (this.filteredArticles.length === 0) {
      emptyState.style.display = 'flex';
      loadMoreEl.style.display = 'none';
      return;
    }
    emptyState.style.display = 'none';

    // Apply view mode
    const viewMode = this.settings.viewMode || 'cards';
    feed.className = viewMode === 'list' ? 'feed feed--list' : 'feed';

    articlesToRender.forEach((article, i) => {
      const card = this._createCard(article, startIdx + i);
      feed.appendChild(card);
    });

    this.displayedCount = endIdx;

    // Load more button
    if (endIdx < this.filteredArticles.length) {
      loadMoreEl.style.display = 'flex';
      document.getElementById('load-more-count').textContent =
        `Showing ${endIdx} of ${this.filteredArticles.length}`;
    } else {
      loadMoreEl.style.display = 'none';
    }

    // Recreate icons for new cards
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  _createCard(article, index) {
    const card = document.createElement('article');
    const severityClass = article.severity === 'tool' ? 'tool' : article.severity;
    card.className = `news-card news-card--${severityClass}`;
    card.dataset.index = index;
    card.dataset.id = article.id;
    card.style.animationDelay = `${(index % 20) * 40}ms`;

    if (article.isRead) card.classList.add('news-card--read');

    // Severity labels
    const severityLabels = {
      critical: 'CRITICAL',
      high: 'HIGH',
      medium: 'MEDIUM',
      info: 'INFO',
      tool: 'TOOL',
    };

    // Category icons
    const categoryIcons = {
      vulnerability: 'bug',
      malware: 'skull',
      breach: 'unlock',
      tool: 'wrench',
      advisory: 'shield-check',
      news: 'newspaper',
    };

    const sourceStyle = `background: ${article.source.color}15; color: ${article.source.color}; border-color: ${article.source.color}30;`;
    const bookmarkIcon = article.isBookmarked ? 'bookmark-check' : 'bookmark';
    const bookmarkClass = article.isBookmarked ? ' card-action-btn--bookmarked' : '';

    card.innerHTML = `
      <div class="news-card__header">
        <span class="news-card__severity-badge news-card__severity-badge--${severityClass}">
          <span class="news-card__severity-dot"></span>
          ${severityLabels[article.severity] || 'INFO'}
        </span>
        <h3 class="news-card__title">${escapeHtml(article.title)}</h3>
      </div>
      ${article.description ? `<p class="news-card__description">${escapeHtml(article.description)}</p>` : ''}
      <div class="news-card__meta">
        <span class="news-card__source-badge" style="${sourceStyle}">
          <i data-lucide="${article.source.icon}" style="width:11px;height:11px;"></i>
          ${escapeHtml(article.source.name)}
        </span>
        <span class="news-card__category-tag">
          <i data-lucide="${categoryIcons[article.category] || 'tag'}"></i>
          ${article.category}
        </span>
        <span class="news-card__time">
          <i data-lucide="clock"></i>
          ${timeAgo(article.pubDate)}
        </span>
      </div>
      <div class="news-card__actions">
        <button class="card-action-btn" data-action="open" title="Open article (O)">
          <i data-lucide="external-link"></i> Read
        </button>
        <button class="card-action-btn${bookmarkClass}" data-action="bookmark" title="Bookmark (S)">
          <i data-lucide="${bookmarkIcon}"></i> Save
        </button>
        <button class="card-action-btn" data-action="copy" title="Copy link">
          <i data-lucide="copy"></i> Copy
        </button>
        <button class="card-action-btn" data-action="detail" title="View detail">
          <i data-lucide="maximize-2"></i> Detail
        </button>
      </div>
    `;

    // Card actions
    card.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('[data-action]');
      if (actionBtn) {
        e.stopPropagation();
        this._handleCardAction(actionBtn.dataset.action, article, card);
        return;
      }
      // Click on card itself → open detail
      this._openArticleDetail(article);
      this._markAsRead(article, card);
    });

    return card;
  }

  _handleCardAction(action, article, card) {
    switch (action) {
      case 'open':
        window.open(article.link, '_blank', 'noopener,noreferrer');
        this._markAsRead(article, card);
        break;
      case 'bookmark':
        const isNowBookmarked = this.storage.toggleBookmark(article);
        article.isBookmarked = isNowBookmarked;
        this.toast.show(isNowBookmarked ? 'Article bookmarked' : 'Bookmark removed', 'success');
        this._updateBookmarkCount();
        // Refresh the card's bookmark button
        const btn = card.querySelector('[data-action="bookmark"]');
        if (btn) {
          btn.classList.toggle('card-action-btn--bookmarked', isNowBookmarked);
          const icon = btn.querySelector('i');
          if (icon) icon.setAttribute('data-lucide', isNowBookmarked ? 'bookmark-check' : 'bookmark');
          if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [btn] });
        }
        // If in bookmarks view and un-bookmarked, re-render
        if (this.showingBookmarks && !isNowBookmarked) {
          this._applyFiltersAndRender();
        }
        break;
      case 'copy':
        navigator.clipboard.writeText(article.link).then(
          () => this.toast.show('Link copied to clipboard', 'success'),
          () => this.toast.show('Failed to copy link', 'error')
        );
        break;
      case 'detail':
        this._openArticleDetail(article);
        this._markAsRead(article, card);
        break;
    }
  }

  _markAsRead(article, card) {
    if (!article.isRead) {
      article.isRead = true;
      this.storage.markAsRead(article.id);
      if (card) card.classList.add('news-card--read');
    }
  }

  // ── Article Detail Modal ───────────────────────────────────
  _openArticleDetail(article) {
    const modal = document.getElementById('article-modal');
    document.getElementById('article-modal-title').textContent = article.title;

    const sourceStyle = `background: ${article.source.color}15; color: ${article.source.color}; border-color: ${article.source.color}30;`;
    const severityClass = article.severity === 'tool' ? 'tool' : article.severity;
    const severityLabels = { critical: 'CRITICAL', high: 'HIGH', medium: 'MEDIUM', info: 'INFO', tool: 'TOOL' };

    document.getElementById('article-modal-meta').innerHTML = `
      <span class="news-card__severity-badge news-card__severity-badge--${severityClass}">
        <span class="news-card__severity-dot"></span>
        ${severityLabels[article.severity] || 'INFO'}
      </span>
      <span class="news-card__source-badge" style="${sourceStyle}">
        <i data-lucide="${article.source.icon}" style="width:11px;height:11px;"></i>
        ${escapeHtml(article.source.name)}
      </span>
      <span class="news-card__time">
        <i data-lucide="clock" style="width:11px;height:11px;"></i>
        ${timeAgo(article.pubDate)}
      </span>
      ${article.cveId ? `<span class="news-card__category-tag">${escapeHtml(article.cveId)}</span>` : ''}
    `;

    document.getElementById('article-modal-body').innerHTML =
      `<p>${article.description || 'No description available.'}</p>`;

    document.getElementById('article-modal-actions').innerHTML = `
      <a href="${escapeHtml(article.link)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
        <i data-lucide="external-link"></i> Read Full Article
      </a>
      <button class="btn btn--glass" onclick="app.storage.toggleBookmark(${JSON.stringify(article).replace(/"/g, '&quot;')}); app.toast.show('Bookmark toggled', 'success');">
        <i data-lucide="bookmark"></i> Bookmark
      </button>
      <button class="btn btn--glass" onclick="navigator.clipboard.writeText('${escapeHtml(article.link)}'); app.toast.show('Copied!', 'success');">
        <i data-lucide="copy"></i> Copy Link
      </button>
    `;

    modal.style.display = 'flex';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ── UI Updates ─────────────────────────────────────────────
  _updateStats() {
    const articles = this.allArticles;
    const counts = { critical: 0, high: 0, medium: 0, info: 0, tool: 0 };
    articles.forEach(a => { counts[a.severity] = (counts[a.severity] || 0) + 1; });

    document.getElementById('stat-total-value').textContent = articles.length;
    document.getElementById('stat-critical-value').textContent = counts.critical;
    document.getElementById('stat-high-value').textContent = counts.high;
    document.getElementById('stat-medium-value').textContent = counts.medium;
    document.getElementById('stat-info-value').textContent = counts.info + counts.tool;

    const activeSourceCount = Object.values(this.feedEngine.sourceStatus).filter(s => s === 'ok' || s === 'cached').length;
    document.getElementById('stat-sources-value').textContent = activeSourceCount;

    this._updateBookmarkCount();
  }

  _updateBookmarkCount() {
    const count = Object.keys(this.storage.getBookmarks()).length;
    const badge = document.getElementById('bookmark-count');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  _updateTicker() {
    const container = document.getElementById('ticker-content');
    if (!container) return;

    // Get top articles for ticker (most recent critical/high first, then others)
    const tickerArticles = [...this.allArticles]
      .sort((a, b) => {
        const order = { critical: 0, high: 1, medium: 2, tool: 3, info: 4 };
        const diff = (order[a.severity] ?? 4) - (order[b.severity] ?? 4);
        return diff !== 0 ? diff : b.pubDate - a.pubDate;
      })
      .slice(0, CONFIG.tickerItemCount);

    if (tickerArticles.length === 0) {
      container.innerHTML = '<span class="ticker__item ticker__item--placeholder">No articles yet...</span>';
      return;
    }

    // Duplicate content for seamless scroll
    const buildItems = (articles) => articles.map(a => `
      <span class="ticker__item" data-link="${escapeHtml(a.link)}" title="${escapeHtml(a.title)}">
        <span class="ticker__item-severity ticker__item-severity--${a.severity}"></span>
        ${escapeHtml(truncate(a.title, 80))}
      </span>
      <span class="ticker__separator">◆</span>
    `).join('');

    container.innerHTML = buildItems(tickerArticles) + buildItems(tickerArticles);

    // Click on ticker item opens article
    container.querySelectorAll('.ticker__item').forEach(el => {
      el.addEventListener('click', () => {
        const link = el.dataset.link;
        if (link) window.open(link, '_blank', 'noopener,noreferrer');
      });
    });
  }

  _updateSyncStatus() {
    const statusEl = document.getElementById('sync-status');
    const sourceStatusEl = document.getElementById('source-status');

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    statusEl.innerHTML = `<i data-lucide="check-circle" style="width:12px;height:12px;color:var(--accent-green);"></i> Last synced ${timeStr} · ${this.allArticles.length} articles`;

    // Source dots
    const dots = CONFIG.feeds.map(f => {
      const status = this.feedEngine.sourceStatus[f.id];
      const cls = (status === 'ok' || status === 'cached' || status === 'stale')
        ? 'footer__source-dot--ok' : (status === 'error' ? 'footer__source-dot--err' : '');
      return `<span class="footer__source-dot ${cls}" title="${f.name}: ${status || 'pending'}"></span>`;
    }).join('');
    sourceStatusEl.innerHTML = dots;

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  _showLoading(show) {
    const loadingEl = document.getElementById('loading-state');
    const feedEl = document.getElementById('feed');
    const emptyEl = document.getElementById('empty-state');

    if (show) {
      loadingEl.style.display = 'flex';
      if (this.allArticles.length === 0) {
        feedEl.style.display = 'none';
        emptyEl.style.display = 'none';
      }
    } else {
      loadingEl.style.display = 'none';
      feedEl.style.display = '';
    }
  }

  _renderLoadingSources(feeds) {
    const container = document.getElementById('loading-sources');
    container.innerHTML = feeds.map(f =>
      `<span class="loading-source loading-source--active" id="loading-${f.id}">
        <span class="loading-source__dot"></span> ${f.name}
      </span>`
    ).join('');
  }

  _updateRefreshButton(spinning) {
    const btn = document.getElementById('btn-refresh');
    if (spinning) {
      btn.classList.add('spin');
    } else {
      btn.classList.remove('spin');
    }
  }

  // ── Auto Refresh ───────────────────────────────────────────
  _startAutoRefresh() {
    if (this.refreshTimerId) clearInterval(this.refreshTimerId);
    const interval = this.settings.refreshInterval || CONFIG.defaultRefreshInterval;
    this.countdown.start(interval);

    this.refreshTimerId = setInterval(() => {
      this.refreshFeeds();
      this.countdown.start(interval);
    }, interval);
  }

  // ── Theme ──────────────────────────────────────────────────
  _applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.settings.theme = theme;
    this.storage.saveSettings(this.settings);

    // Update theme button icon
    const btn = document.getElementById('btn-theme');
    if (btn) {
      const iconName = theme === 'dark' ? 'moon' : theme === 'light' ? 'sun' : 'terminal';
      btn.querySelector('i')?.setAttribute('data-lucide', iconName);
      if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [btn] });
    }

    // Update theme buttons in settings
    document.querySelectorAll('.theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === theme);
    });
  }

  _cycleTheme() {
    const themes = ['dark', 'light', 'hacker'];
    const current = this.settings.theme || 'dark';
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    this._applyTheme(next);
    this.toast.show(`Theme: ${next.charAt(0).toUpperCase() + next.slice(1)}`, 'info');
  }

  // ── Settings ───────────────────────────────────────────────
  _applySavedSettings() {
    const s = this.settings;

    // Refresh interval select
    const refreshSelect = document.getElementById('settings-refresh-interval');
    if (refreshSelect) refreshSelect.value = s.refreshInterval;

    // Page size select
    const pageSizeSelect = document.getElementById('settings-page-size');
    if (pageSizeSelect) pageSizeSelect.value = s.pageSize;

    // Notifications toggle
    const notifToggle = document.getElementById('settings-notifications');
    if (notifToggle) notifToggle.checked = s.notifications;

    // View mode
    this._setViewMode(s.viewMode || 'cards');
  }

  _renderSettingsSources() {
    const container = document.getElementById('settings-sources');
    if (!container) return;

    container.innerHTML = CONFIG.feeds.map(f => {
      const checked = !this.settings.disabledFeeds.includes(f.id) ? 'checked' : '';
      return `
        <label class="settings-source">
          <input type="checkbox" data-source-id="${f.id}" ${checked} />
          <span style="color: ${f.color};">●</span>
          <span>${f.name}</span>
        </label>
      `;
    }).join('');
  }

  _setViewMode(mode) {
    this.settings.viewMode = mode;
    const cardsBtn = document.getElementById('btn-view-cards');
    const listBtn = document.getElementById('btn-view-list');
    if (cardsBtn) cardsBtn.classList.toggle('icon-btn--active', mode === 'cards');
    if (listBtn) listBtn.classList.toggle('icon-btn--active', mode === 'list');
  }

  // ── Export ─────────────────────────────────────────────────
  _exportBookmarks() {
    const bookmarks = this.storage.getBookmarks();
    const data = JSON.stringify(bookmarks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberpulse-bookmarks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.toast.show('Bookmarks exported', 'success');
  }

  // ── Event Listeners ────────────────────────────────────────
  _setupEventListeners() {
    // Refresh button
    document.getElementById('btn-refresh')?.addEventListener('click', () => {
      this.storage.clearCache();
      this.refreshFeeds();
      this.countdown.start(this.settings.refreshInterval || CONFIG.defaultRefreshInterval);
    });

    // Search
    document.getElementById('search-input')?.addEventListener('input',
      debounce(() => this._applyFiltersAndRender(), 250)
    );

    // Category tabs
    document.getElementById('category-tabs')?.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      this.showingBookmarks = false;
      this._applyFiltersAndRender();
    });

    // Severity filter
    document.getElementById('severity-filter')?.addEventListener('change', () => this._applyFiltersAndRender());

    // Time filter
    document.getElementById('time-filter')?.addEventListener('change', () => this._applyFiltersAndRender());

    // Sort filter
    document.getElementById('sort-filter')?.addEventListener('change', () => this._applyFiltersAndRender());

    // View toggle
    document.getElementById('btn-view-cards')?.addEventListener('click', () => {
      this._setViewMode('cards');
      this.storage.saveSettings(this.settings);
      this._applyFiltersAndRender();
    });
    document.getElementById('btn-view-list')?.addEventListener('click', () => {
      this._setViewMode('list');
      this.storage.saveSettings(this.settings);
      this._applyFiltersAndRender();
    });

    // Load more
    document.getElementById('btn-load-more')?.addEventListener('click', () => this._renderCards());

    // Bookmarks toggle
    document.getElementById('btn-bookmarks')?.addEventListener('click', () => {
      this.showingBookmarks = !this.showingBookmarks;
      document.getElementById('btn-bookmarks')?.classList.toggle('icon-btn--active', this.showingBookmarks);
      if (this.showingBookmarks) {
        this.toast.show('Showing bookmarks', 'info');
      }
      this._applyFiltersAndRender();
    });

    // Notifications
    document.getElementById('btn-notifications')?.addEventListener('click', async () => {
      const granted = await this.notifications.requestPermission();
      if (granted) {
        this.settings.notifications = true;
        this.storage.saveSettings(this.settings);
        this.toast.show('Desktop notifications enabled', 'success');
      } else {
        this.toast.show('Notification permission denied', 'warning');
      }
    });

    // Theme cycle
    document.getElementById('btn-theme')?.addEventListener('click', () => this._cycleTheme());

    // Settings modal
    document.getElementById('btn-settings')?.addEventListener('click', () => {
      document.getElementById('settings-modal').style.display = 'flex';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    document.getElementById('settings-modal-close')?.addEventListener('click', () => {
      document.getElementById('settings-modal').style.display = 'none';
    });

    // Shortcuts modal
    document.getElementById('btn-shortcuts')?.addEventListener('click', () => {
      document.getElementById('shortcuts-modal').style.display = 'flex';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    document.getElementById('shortcuts-modal-close')?.addEventListener('click', () => {
      document.getElementById('shortcuts-modal').style.display = 'none';
    });

    // Article modal close
    document.getElementById('article-modal-close')?.addEventListener('click', () => {
      document.getElementById('article-modal').style.display = 'none';
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.style.display = 'none';
      });
    });

    // Settings changes
    document.getElementById('settings-refresh-interval')?.addEventListener('change', (e) => {
      this.settings.refreshInterval = parseInt(e.target.value);
      this.storage.saveSettings(this.settings);
      this._startAutoRefresh();
      this.toast.show('Refresh interval updated', 'success');
    });

    document.getElementById('settings-page-size')?.addEventListener('change', (e) => {
      this.settings.pageSize = parseInt(e.target.value);
      this.storage.saveSettings(this.settings);
      this._applyFiltersAndRender();
    });

    document.getElementById('settings-notifications')?.addEventListener('change', async (e) => {
      if (e.target.checked) {
        const granted = await this.notifications.requestPermission();
        if (!granted) {
          e.target.checked = false;
          this.toast.show('Notification permission denied', 'warning');
          return;
        }
      }
      this.settings.notifications = e.target.checked;
      this.storage.saveSettings(this.settings);
    });

    // Theme buttons in settings
    document.getElementById('theme-options')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.theme-btn');
      if (!btn) return;
      this._applyTheme(btn.dataset.theme);
    });

    // Source toggles in settings
    document.getElementById('settings-sources')?.addEventListener('change', (e) => {
      if (e.target.type !== 'checkbox') return;
      const sourceId = e.target.dataset.sourceId;
      if (e.target.checked) {
        this.settings.disabledFeeds = this.settings.disabledFeeds.filter(id => id !== sourceId);
      } else {
        if (!this.settings.disabledFeeds.includes(sourceId)) {
          this.settings.disabledFeeds.push(sourceId);
        }
      }
      this.storage.saveSettings(this.settings);
    });

    // Export bookmarks
    document.getElementById('btn-export-bookmarks')?.addEventListener('click', () => this._exportBookmarks());

    // Clear cache
    document.getElementById('btn-clear-cache')?.addEventListener('click', () => {
      this.storage.clearAll();
      this.toast.show('All cached data cleared', 'success');
      this.settings = this.storage.getSettings();
      this._applySavedSettings();
    });
  }

  // ── Keyboard Shortcuts ─────────────────────────────────────
  _setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't handle shortcuts when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        if (e.key === 'Escape') {
          e.target.blur();
          return;
        }
        return;
      }

      // Close modals
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
        return;
      }

      const cards = document.querySelectorAll('.news-card');

      switch (e.key.toLowerCase()) {
        case 'j': // Next article
          e.preventDefault();
          this.selectedIndex = Math.min(this.selectedIndex + 1, cards.length - 1);
          this._highlightCard(cards);
          break;

        case 'k': // Previous article
          e.preventDefault();
          this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
          this._highlightCard(cards);
          break;

        case 'o': // Open selected
        case 'enter':
          if (this.selectedIndex >= 0 && this.selectedIndex < this.filteredArticles.length) {
            e.preventDefault();
            const article = this.filteredArticles[this.selectedIndex];
            window.open(article.link, '_blank', 'noopener,noreferrer');
            this._markAsRead(article, cards[this.selectedIndex]);
          }
          break;

        case 's': // Bookmark selected
          if (this.selectedIndex >= 0 && this.selectedIndex < this.filteredArticles.length) {
            e.preventDefault();
            const article = this.filteredArticles[this.selectedIndex];
            const card = cards[this.selectedIndex];
            this._handleCardAction('bookmark', article, card);
          }
          break;

        case 'r': // Refresh
          e.preventDefault();
          this.storage.clearCache();
          this.refreshFeeds();
          this.countdown.start(this.settings.refreshInterval || CONFIG.defaultRefreshInterval);
          break;

        case '/': // Focus search
          e.preventDefault();
          document.getElementById('search-input')?.focus();
          break;

        case 't': // Toggle theme
          e.preventDefault();
          this._cycleTheme();
          break;

        case '?': // Show shortcuts
          e.preventDefault();
          document.getElementById('shortcuts-modal').style.display = 'flex';
          if (typeof lucide !== 'undefined') lucide.createIcons();
          break;

        case 'b': // Toggle bookmarks
          e.preventDefault();
          document.getElementById('btn-bookmarks')?.click();
          break;

        case 'g': // Go to top
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;

        case '1': case '2': case '3': case '4': case '5': case '6': case '7':
          e.preventDefault();
          const tabs = document.querySelectorAll('.tab');
          const idx = parseInt(e.key) - 1;
          if (tabs[idx]) tabs[idx].click();
          break;
      }
    });
  }

  _highlightCard(cards) {
    cards.forEach(c => c.classList.remove('news-card--selected'));
    if (this.selectedIndex >= 0 && cards[this.selectedIndex]) {
      cards[this.selectedIndex].classList.add('news-card--selected');
      cards[this.selectedIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}


// ─── INITIALIZATION ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
  window.app.init();
});
