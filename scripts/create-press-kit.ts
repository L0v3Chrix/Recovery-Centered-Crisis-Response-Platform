import archiver from 'archiver'
import { createWriteStream } from 'fs'
import path from 'path'
import { promises as fs } from 'fs'

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const PARTNER_DIR = path.join(PUBLIC_DIR, 'partner-badges')
const OUTPUT_PATH = path.join(PUBLIC_DIR, 'press-kit.zip')

async function createPressKit() {
  console.log('📦 Creating press kit...')
  
  const output = createWriteStream(OUTPUT_PATH)
  const archive = archiver('zip', {
    zlib: { level: 9 }
  })
  
  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`✅ Press kit created: ${archive.pointer()} bytes`)
      resolve(true)
    })
    
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Warning:', err)
      } else {
        reject(err)
      }
    })
    
    archive.on('error', (err) => {
      reject(err)
    })
    
    archive.pipe(output)
    
    // Add badge files
    archive.file(path.join(PARTNER_DIR, 'badge-pill.svg'), { name: 'badges/badge-pill.svg' })
    archive.file(path.join(PARTNER_DIR, 'badge-pill.png'), { name: 'badges/badge-pill.png' })
    archive.file(path.join(PARTNER_DIR, 'badge-dark.svg'), { name: 'badges/badge-dark.svg' })
    archive.file(path.join(PARTNER_DIR, 'badge-dark.png'), { name: 'badges/badge-dark.png' })
    archive.file(path.join(PARTNER_DIR, 'badge-outline.svg'), { name: 'badges/badge-outline.svg' })
    archive.file(path.join(PARTNER_DIR, 'badge-outline.png'), { name: 'badges/badge-outline.png' })
    archive.file(path.join(PARTNER_DIR, 'embed.html'), { name: 'embed.html' })
    
    // Add README
    const readme = `# HelpNow ATX Partner Kit

Thank you for partnering with HelpNow ATX to help connect Central Texas residents with verified help resources.

## Badge Files

This kit includes three badge designs:
- **badge-pill**: Gradient pill design (recommended)
- **badge-dark**: Dark background variant
- **badge-outline**: Outline design for light backgrounds

Each badge is provided in both SVG (scalable) and PNG formats.

## How to Use

1. Choose your preferred badge design
2. Copy the code from embed.html
3. Paste it into your website's HTML

## Link Back

All badges should link to: https://helpnowatx.org/

The embed code includes UTM tracking parameters to help us understand which partners are driving the most awareness.

## Questions?

Contact us through the website at helpnowatx.org/partners

---

© HelpNow ATX - Real help, verified daily`
    
    archive.append(readme, { name: 'README.txt' })
    
    archive.finalize()
  })
}

createPressKit().catch(console.error)