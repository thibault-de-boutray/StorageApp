import path from "node:path"
import fs from "node:fs/promises"
import sharp from "sharp"

const images = ["all-files.png", "documents.png", "photos.png", "videos.png", "music.png", "archives.png"]

const root = process.cwd()
const imagesDir = path.join(root, "public", "images")

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

const cropOne = async (fileName) => {
  const inputPath = path.join(imagesDir, fileName)
  const outputPath = inputPath

  if (!(await fileExists(inputPath))) {
    console.warn(`Missing: ${inputPath}`)
    return
  }

  const image = sharp(inputPath, { animated: false })
  await image.trim().toFile(outputPath + ".tmp")
  await fs.rename(outputPath + ".tmp", outputPath)
  console.log(`Cropped: ${fileName}`)
}

const run = async () => {
  await fs.mkdir(imagesDir, { recursive: true })
  for (const fileName of images) {
    await cropOne(fileName)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
