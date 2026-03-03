#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

// 1. Get the target directory name
const projectName = process.argv[2] || "my-backend-app";
const targetPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, "../template");

console.log(`🚀 Creating your new project in: ${targetPath}...`);

try {
  // 2. Copy local template
  fs.copySync(templatePath, targetPath);

  // 3. Update package.json name and version
  const packageJsonPath = path.join(targetPath, "package.json");
  const packageJson = fs.readJsonSync(packageJsonPath);
  packageJson.name = projectName;
  packageJson.version = "1.0.0";
  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

  // 4. Create .env from .env.example
  const envExamplePath = path.join(targetPath, ".env.example");
  if (fs.existsSync(envExamplePath)) {
    fs.copySync(envExamplePath, path.join(targetPath, ".env"));
  }

  // 5. Install dependencies
  console.log("📦 Installing dependencies (this might take a moment)...");
  execSync("npm install", { cwd: targetPath, stdio: "inherit" });

  // 6. Success message with clear instructions
  console.log(`\n🎉 Project setup complete!`);
  console.log(`👉 Next steps:`);
  console.log(`   1. cd ${projectName}`);
  console.log(`   2. Open the .env file in your code editor`);
  console.log(`   3. Update DATABASE_URL with your MongoDB connection string`);
  console.log(`   4. Run 'npm run dev' to start the server`);
} catch (err) {
  console.error("❌ Failed to create project:", err);
  process.exit(1);
}
