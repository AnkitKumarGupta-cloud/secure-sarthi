// One-off: phone-sized copies of the illustrations (src/assets/img/sm), used through srcset.
import sharp from 'sharp'
const widths = { hero: 560, endowment: 320, ulip: 320, pension: 320, child: 320, calculator: 600, building: 600 }
for (const [name, w] of Object.entries(widths)) {
  const out = `src/assets/img/sm/${name}.webp`
  const info = await sharp(`src/assets/img/${name}.webp`).resize({ width: w }).webp({ quality: 80, alphaQuality: 90, effort: 6 }).toFile(out)
  console.log(out, info.width + 'x' + info.height, Math.round(info.size / 1024) + ' KB')
}
