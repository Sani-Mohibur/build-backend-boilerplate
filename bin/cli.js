#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");
const chalk = require("chalk");
const ora = require("ora");

// 1. Check for help or version flags
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: npx build-backend-boilerplate <project-name>');
  process.exit(0);
}

if (process.argv.includes('--version') || process.argv.includes('-v')) {
  const pkg = require('../package.json');
  console.log(pkg.version);
  process.exit(0);
}

// 2. Get the target directory name
const projectName = process.argv[2] || "my-backend-app";

if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
  console.error(chalk.red('❌ Project name must only contain letters, numbers, hyphens, and underscores.'));
  process.exit(1);
}

const targetPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, "../template");

if (fs.existsSync(targetPath)) {
  console.error(chalk.red(`❌ Directory "${projectName}" already exists. Aborting.`));
  process.exit(1);
}

console.log(chalk.cyan(`🚀 Creating your new project in: ${targetPath}...`));

try {
  // 2. Copy local template
  fs.copySync(templatePath, targetPath, {
    filter: (src) => !src.includes('node_modules'),
  });

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
  const spinner = ora('📦 Installing dependencies (this might take a moment)...').start();
  try {
    execSync("npm install", { cwd: targetPath, stdio: "ignore" });
    spinner.succeed(chalk.green('Dependencies installed successfully!'));
  } catch (err) {
    spinner.fail(chalk.red('Failed to install dependencies. You may need to run npm install manually.'));
  }

  // 6. Success message with clear instructions
  console.log(chalk.green(`\n🎉 Project setup complete!`));
  console.log(chalk.blue(`👉 Next steps:`));
  console.log(chalk.white(`   1. cd ${projectName}`));
  console.log(chalk.white(`   2. Open the .env file in your code editor`));
  console.log(chalk.white(`   3. Update DATABASE_URL with your MongoDB connection string`));
  console.log(chalk.white(`   4. Run 'npm run dev' to start the server`));
} catch (err) {
  console.error(chalk.red("❌ Failed to create project:"), err);
  process.exit(1);
}
