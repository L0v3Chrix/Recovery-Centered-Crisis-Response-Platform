#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import archiver from 'archiver'

const createPressKit = async () => {
  const publicDir = path.join(process.cwd(), 'public')
  const badgesDir = path.join(publicDir, 'assets', 'badges')
  const pressKitPath = path.join(publicDir, 'press-kit.zip')
  
  // Create embed.html template
  const embedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Central Texas Resources - Badge Embed</title>
</head>
<body>
  <h1>Central Texas Resources Badge Embed Examples</h1>
  
  <h2>Blue Light Badge</h2>
  <a href="https://YOURDOMAIN/?utm_source=partner&utm_medium=badge&utm_campaign=backlink" aria-label="Central Texas Resources">
    <img src="https://YOURDOMAIN/assets/badges/help-now-badge-blue-light.svg" alt="Get Help Now — Central Texas Resources" width="240" height="64" />
  </a>
  
  <h2>Blue Dark Badge</h2>
  <a href="https://YOURDOMAIN/?utm_source=partner&utm_medium=badge&utm_campaign=backlink" aria-label="Central Texas Resources">
    <img src="https://YOURDOMAIN/assets/badges/help-now-badge-blue-dark.svg" alt="Get Help Now — Central Texas Resources" width="240" height="64" />
  </a>
  
  <h2>Neutral Light Badge</h2>
  <a href="https://YOURDOMAIN/?utm_source=partner&utm_medium=badge&utm_campaign=backlink" aria-label="Central Texas Resources">
    <img src="https://YOURDOMAIN/assets/badges/help-now-badge-neutral-light.svg" alt="Get Help Now — Central Texas Resources" width="240" height="64" />
  </a>
  
  <h2>Neutral Dark Badge</h2>
  <a href="https://YOURDOMAIN/?utm_source=partner&utm_medium=badge&utm_campaign=backlink" aria-label="Central Texas Resources">
    <img src="https://YOURDOMAIN/assets/badges/help-now-badge-neutral-dark.svg" alt="Get Help Now — Central Texas Resources" width="240" height="64" />
  </a>
</body>
</html>`

  // Create brand usage guidelines
  const brandGuidelinesPdf = `# Brand Usage Guidelines - Central Texas Resources

## Badge Usage
- Use badges to help people find crisis resources
- Link directly to our homepage with provided UTM parameters
- Maintain original proportions and colors
- Choose appropriate badge color for your website background

## Do's
✅ Use badges to help people find crisis resources
✅ Link directly to our homepage
✅ Use provided UTM parameters
✅ Maintain original proportions
✅ Choose appropriate color for your site

## Don'ts
❌ Modify badge colors or text
❌ Use badges for commercial promotion
❌ Link to pages other than our homepage
❌ Stretch or distort badge dimensions
❌ Remove attribution or UTM parameters

## Technical Specifications
- Badge dimensions: 240 × 64 pixels
- File formats: SVG (recommended), PNG available
- Link target: https://YOURDOMAIN/?utm_source=partner&utm_medium=badge&utm_campaign=backlink
- Alt text: "Get Help Now — Central Texas Resources"

## Contact
For questions about badge usage or partnership opportunities, please contact us through our website.

Published by Raise the Vibe
Website: https://raisethevibe.com`

  try {
    // Create zip archive
    const output = fs.createWriteStream(pressKitPath)
    const archive = archiver('zip', { zlib: { level: 9 } })
    
    output.on('close', () => {
      console.log(`✅ Press kit created: ${archive.pointer()} total bytes`)
      console.log(`📦 Location: ${pressKitPath}`)
    })
    
    archive.on('error', (err) => {
      throw err
    })
    
    archive.pipe(output)
    
    // Add badge SVG files
    if (fs.existsSync(badgesDir)) {
      const badgeFiles = fs.readdirSync(badgesDir).filter(file => file.endsWith('.svg'))
      badgeFiles.forEach(file => {
        archive.file(path.join(badgesDir, file), { name: `badges/${file}` })
      })
    }
    
    // Add embed.html template
    archive.append(embedHtml, { name: 'embed.html' })
    
    // Add brand guidelines
    archive.append(brandGuidelinesPdf, { name: 'brand-usage-guidelines.txt' })
    
    // Add favicon if it exists
    const faviconPath = path.join(publicDir, 'favicon.ico')
    if (fs.existsSync(faviconPath)) {
      archive.file(faviconPath, { name: 'favicon.ico' })
    }
    
    // Finalize archive
    await archive.finalize()
    
  } catch (error) {
    console.error('❌ Error creating press kit:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  createPressKit()
}

export default createPressKit