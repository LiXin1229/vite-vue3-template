#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectName = process.argv[2] || 'my-vue-app'

if (!projectName) {
  console.error('Please specify the project name: npx create-my-vue-app <project-name>')
  process.exit(1)
}

const targetDir = path.resolve(process.cwd(), projectName)

if (fs.existsSync(targetDir)) {
  console.error(`Directory ${projectName} already exists!`)
  process.exit(1)
}

console.log(`Creating project in ${targetDir}...`)

// 复制 template 目录
fs.cpSync(path.join(__dirname, 'template'), targetDir, { recursive: true })

// 可选：替换 package.json 中的 name
const pkgPath = path.join(targetDir, 'package.json')
let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
pkg.name = projectName
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

// 自动安装依赖（可选）
console.log('Installing dependencies...')
execSync('npm install', { cwd: targetDir, stdio: 'inherit' })

console.log(`\nDone! Now run:\n\n  cd ${projectName}\n  npm run dev\n`)