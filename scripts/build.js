// 构建脚本，确保正确生成静态文件
const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("开始构建过程...")

// 步骤1: 清理旧的构建文件
console.log("清理旧的构建文件...")
try {
  if (fs.existsSync(path.join(process.cwd(), "out"))) {
    // 在Windows上可能需要使用不同的命令
    if (process.platform === "win32") {
      execSync("rmdir /s /q out", { stdio: "inherit" })
    } else {
      execSync("rm -rf out", { stdio: "inherit" })
    }
  }
  console.log("清理完成")
} catch (error) {
  console.error("清理过程中出错:", error)
}

// 步骤2: 获取动漫数据
console.log("获取动漫数据...")
try {
  execSync("node scripts/fetch-anime-data.js", { stdio: "inherit" })
  console.log("数据获取完成")
} catch (error) {
  console.error("数据获取过程中出错:", error)
  process.exit(1)
}

// 步骤3: 构建Next.js应用
console.log("构建Next.js应用...")
try {
  execSync("next build", { stdio: "inherit" })
  console.log("Next.js构建完成")
} catch (error) {
  console.error("Next.js构建过程中出错:", error)
  process.exit(1)
}

// 步骤4: 确保JSON文件在out目录中
console.log("确保JSON文件在out目录中...")
try {
  const jsonSourceDir = path.join(process.cwd(), "public/json")
  const jsonDestDir = path.join(process.cwd(), "out/json")

  if (!fs.existsSync(jsonDestDir)) {
    fs.mkdirSync(jsonDestDir, { recursive: true })
  }

  // 复制所有JSON文件
  const jsonFiles = fs.readdirSync(jsonSourceDir)
  jsonFiles.forEach((file) => {
    if (file.endsWith(".json")) {
      fs.copyFileSync(path.join(jsonSourceDir, file), path.join(jsonDestDir, file))
      console.log(`复制 ${file} 到 out/json/`)
    }
  })

  console.log("JSON文件复制完成")
} catch (error) {
  console.error("复制JSON文件过程中出错:", error)
}

// 步骤5: 验证构建结果
console.log("验证构建结果...")
try {
  if (fs.existsSync(path.join(process.cwd(), "out/index.html"))) {
    console.log("构建成功! index.html 文件已生成")
  } else {
    console.error("构建可能不完整，未找到 index.html 文件")
  }
} catch (error) {
  console.error("验证过程中出错:", error)
}

console.log("构建过程完成!")
console.log('您可以使用 "npx serve out" 命令来本地预览网站')
