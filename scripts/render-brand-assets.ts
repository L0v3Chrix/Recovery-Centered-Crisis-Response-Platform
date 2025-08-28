import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const BRAND_DIR = path.join(process.cwd(), 'public', 'brand')
const PUBLIC_DIR = path.join(process.cwd(), 'public')
const OG_DIR = path.join(PUBLIC_DIR, 'og')
const PARTNER_DIR = path.join(PUBLIC_DIR, 'partner-badges')

// Create directories if they don't exist
async function ensureDir(dir: string) {
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

// Aurora gradient background SVG
const createBackgroundSVG = (width: number, height: number) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="aurora" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1B2A5B" />
      <stop offset="25%" style="stop-color:#2B50E2" />
      <stop offset="75%" style="stop-color:#6BA9FF" />
      <stop offset="100%" style="stop-color:#3EC6FF" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#aurora)" />
</svg>`

// Logo SVG (simplified for embedding)
const logoSVG = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1B2A5B" />
      <stop offset="50%" style="stop-color:#2B50E2" />
      <stop offset="100%" style="stop-color:#6BA9FF" />
    </linearGradient>
  </defs>
  <rect x="40" y="30" width="50" height="140" rx="26" fill="url(#pillarGradient)" />
  <rect x="110" y="30" width="50" height="140" rx="26" fill="url(#pillarGradient)" />
  <polyline points="20,100 50,100 60,100 65,85 70,115 75,85 80,100 120,100 130,100 135,85 140,115 145,85 150,100 180,100" stroke="#3EC6FF" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`

async function renderFavicons() {
  console.log('📦 Rendering favicons...')
  
  const logoBuffer = Buffer.from(logoSVG)
  
  // Favicon sizes
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon.ico' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
  ]
  
  for (const { size, name } of sizes) {
    await sharp(logoBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(PUBLIC_DIR, name))
    console.log(`  ✅ ${name}`)
  }
}

async function renderSocialImages() {
  console.log('🎨 Rendering social/OG images...')
  await ensureDir(OG_DIR)
  
  // Social image configurations
  const configs = [
    { width: 1200, height: 630, name: 'default-1200x630.png', desc: 'Facebook/LinkedIn' },
    { width: 1200, height: 675, name: 'default-1200x675.png', desc: 'X/Twitter' },
    { width: 1080, height: 1080, name: 'instagram-1080.png', desc: 'Instagram Square' },
    { width: 1080, height: 1350, name: 'instagram-1080x1350.png', desc: 'Instagram Portrait' },
    { width: 1080, height: 1920, name: 'story-1080x1920.png', desc: 'Stories' },
  ]
  
  // Read the horizontal wordmark
  const wordmarkPath = path.join(BRAND_DIR, 'wordmark-horizontal.svg')
  const wordmarkBuffer = await fs.readFile(wordmarkPath)
  
  for (const config of configs) {
    // Create background
    const bgBuffer = Buffer.from(createBackgroundSVG(config.width, config.height))
    const background = await sharp(bgBuffer).png().toBuffer()
    
    // Resize wordmark to fit (max 80% width, 60% height)
    const maxWidth = Math.floor(config.width * 0.8)
    const maxHeight = Math.floor(config.height * 0.6)
    
    const wordmark = await sharp(wordmarkBuffer)
      .resize(maxWidth, maxHeight, { 
        fit: 'inside',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer()
    
    // Composite wordmark over background
    await sharp(background)
      .composite([{
        input: wordmark,
        gravity: 'center'
      }])
      .png()
      .toFile(path.join(OG_DIR, config.name))
    
    console.log(`  ✅ ${config.name} (${config.desc})`)
  }
}

async function renderPartnerBadges() {
  console.log('🤝 Rendering partner badges...')
  await ensureDir(PARTNER_DIR)
  
  // Badge configurations
  const badges = [
    {
      name: 'badge-pill',
      svg: `<svg width="360" height="110" viewBox="0 0 360 110" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pillBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1B2A5B" />
            <stop offset="50%" style="stop-color:#2B50E2" />
            <stop offset="100%" style="stop-color:#6BA9FF" />
          </linearGradient>
        </defs>
        <rect width="360" height="110" rx="55" fill="url(#pillBg)" />
        
        <!-- Mini logo -->
        <g transform="translate(20, 25) scale(0.3)">
          <rect x="40" y="30" width="50" height="140" rx="26" fill="white" opacity="0.9" />
          <rect x="110" y="30" width="50" height="140" rx="26" fill="white" opacity="0.9" />
          <polyline points="20,100 50,100 65,85 70,115 75,85 80,100 120,100 135,85 140,115 145,85 150,100 180,100" 
            stroke="#3EC6FF" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </g>
        
        <text x="90" y="45" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800" fill="white">
          Get Help Now
        </text>
        <text x="90" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="white" opacity="0.9">
          HelpNow ATX • Verified resources
        </text>
      </svg>`
    },
    {
      name: 'badge-dark',
      svg: `<svg width="360" height="110" viewBox="0 0 360 110" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="110" rx="12" fill="#1B2A5B" />
        
        <!-- Mini logo -->
        <g transform="translate(20, 25) scale(0.3)">
          <rect x="40" y="30" width="50" height="140" rx="26" fill="#3EC6FF" />
          <rect x="110" y="30" width="50" height="140" rx="26" fill="#3EC6FF" />
          <polyline points="20,100 50,100 65,85 70,115 75,85 80,100 120,100 135,85 140,115 145,85 150,100 180,100" 
            stroke="white" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </g>
        
        <text x="90" y="45" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800" fill="white">
          Get Help Now
        </text>
        <text x="90" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#3EC6FF">
          HelpNow ATX • Verified resources
        </text>
      </svg>`
    },
    {
      name: 'badge-outline',
      svg: `<svg width="360" height="110" viewBox="0 0 360 110" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="110" rx="12" fill="white" stroke="#2B50E2" stroke-width="2" />
        
        <!-- Mini logo -->
        <g transform="translate(20, 25) scale(0.3)">
          <rect x="40" y="30" width="50" height="140" rx="26" fill="#2B50E2" />
          <rect x="110" y="30" width="50" height="140" rx="26" fill="#2B50E2" />
          <polyline points="20,100 50,100 65,85 70,115 75,85 80,100 120,100 135,85 140,115 145,85 150,100 180,100" 
            stroke="#3EC6FF" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </g>
        
        <text x="90" y="45" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800" fill="#1B2A5B">
          Get Help Now
        </text>
        <text x="90" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#2B50E2">
          HelpNow ATX • Verified resources
        </text>
      </svg>`
    }
  ]
  
  for (const badge of badges) {
    // Save SVG
    await fs.writeFile(
      path.join(PARTNER_DIR, `${badge.name}.svg`),
      badge.svg
    )
    
    // Render PNG
    await sharp(Buffer.from(badge.svg))
      .png()
      .toFile(path.join(PARTNER_DIR, `${badge.name}.png`))
    
    console.log(`  ✅ ${badge.name}.svg & .png`)
  }
  
  // Create embed.html
  const embedHtml = `<!-- HelpNow ATX Partner Badge -->
<a href="https://helpnowatx.org/?utm_source=partner&utm_medium=badge&utm_campaign=backlink"
   target="_blank" rel="noopener noreferrer"
   aria-label="HelpNow ATX — Find verified help">
  <img src="https://helpnowatx.org/partner-badges/badge-pill.svg"
       alt="Get Help Now — HelpNow ATX (verified resources)"
       width="360" height="110"
       style="max-width:100%;height:auto;border:0;border-radius:18px" />
</a>`
  
  await fs.writeFile(path.join(PARTNER_DIR, 'embed.html'), embedHtml)
  console.log(`  ✅ embed.html`)
}

async function main() {
  console.log('🚀 Starting brand asset generation...\n')
  
  try {
    await renderFavicons()
    console.log('')
    await renderSocialImages()
    console.log('')
    await renderPartnerBadges()
    console.log('\n✨ All brand assets generated successfully!')
  } catch (error) {
    console.error('❌ Error generating assets:', error)
    process.exit(1)
  }
}

main()