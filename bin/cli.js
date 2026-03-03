#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// 1. Get the project name or use default
const projectName = process.argv[2] || "my-backend-app";

// 2. Define your boilerplate GitHub repository URL
const gitRepo = "https://github.com/Sani-Mohibur/backend-boilerplate.git";

const projectPath = path.join(process.cwd(), projectName);

try {
  console.log(`🚀 Creating a new project in ${projectPath}...`);

  // 3. Clone the repository
  console.log("📥 Downloading boilerplate...");
  execSync(`git clone --depth 1 ${gitRepo} ${projectName}`, {
    stdio: "inherit",
  });

  // 4. Remove the original .git folder
  const gitFolderPath = path.join(projectPath, ".git");
  if (process.platform === "win32") {
    execSync(`rmdir /s /q "${gitFolderPath}"`);
  } else {
    execSync(`rm -rf "${gitFolderPath}"`);
  }

  // 5. Update package.json name
  console.log("📝 Updating project details...");
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  packageJson.name = projectName;
  packageJson.version = "1.0.0";
  packageJson.description = "";

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // 6. Automatically create the .env file
  console.log("⚙️  Setting up environment variables...");
  const envExamplePath = path.join(projectPath, ".env.example");
  const envPath = path.join(projectPath, ".env");
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
  }

  // 7. Install dependencies
  console.log("📦 Installing dependencies...");
  execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });

  console.log("\n🎉 Project setup complete!");
  console.log(`👉 Next steps:`);
  console.log(`   cd ${projectName}`);
  console.log(`   Open the .env file and add your MongoDB URI`);
  console.log(`   npm run dev`);
} catch (error) {
  console.error("\n❌ Failed to create project.", error.message);
  process.exit(1);
}
