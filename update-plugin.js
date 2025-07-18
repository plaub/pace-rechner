const fs = require("fs");
const path = require("path");

// Paths
const distPath = path.join(__dirname, "dist", "_nuxt");
const indexPath = path.join(__dirname, "dist", "index.html");
const pluginPath = path.join(
  __dirname,
  "wp-plugin",
  "tri-pace-rechner-plugin.php"
);
const pluginDistPath = path.join(__dirname, "wp-plugin", "dist", "_nuxt");

// Function to extract HTML content from body
function extractBodyContent(htmlFilePath) {
  const htmlContent = fs.readFileSync(htmlFilePath, "utf8");

  // Extract content between <body> and </body> tags
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) {
    throw new Error("Could not find body content in HTML file");
  }

  let bodyContent = bodyMatch[1];

  // Remove teleports div but keep the scripts - we only want to remove empty teleports
  bodyContent = bodyContent.replace(/<div id="teleports"><\/div>/g, "");

  // Clean up extra whitespace but preserve the structure
  bodyContent = bodyContent.trim();

  return bodyContent;
}

// Ensure the plugin dist directory exists
// (This will be handled in the cleanup section below)

// Function to find the main entry JS file (usually the largest one)
function findMainJsFile(directory) {
  const files = fs.readdirSync(directory);
  const jsFiles = files.filter(
    (file) => file.endsWith(".js") && !file.includes("error")
  );

  if (jsFiles.length === 0) return null;

  // Find the largest JS file (likely the main entry)
  let largestFile = jsFiles[0];
  let largestSize = fs.statSync(path.join(directory, largestFile)).size;

  for (const file of jsFiles) {
    const size = fs.statSync(path.join(directory, file)).size;
    if (size > largestSize) {
      largestSize = size;
      largestFile = file;
    }
  }

  return largestFile;
}

// Function to find all JS files (not just the main one)
function findAllJsFiles(directory) {
  const files = fs.readdirSync(directory);
  return files.filter(
    (file) => file.endsWith(".js") && !file.includes("error")
  );
}

// Function to find CSS file
function findMainCssFile(directory) {
  const files = fs.readdirSync(directory);
  return files.find(
    (file) => file.startsWith("entry.") && file.endsWith(".css")
  );
}

// Find the generated files
const jsFile = findMainJsFile(distPath);
const allJsFiles = findAllJsFiles(distPath);
const cssFile = findMainCssFile(distPath);

if (!jsFile || !cssFile || allJsFiles.length === 0) {
  console.error("Could not find generated files in dist/_nuxt/");
  console.log("Available files:", fs.readdirSync(distPath));
  process.exit(1);
}

// Extract HTML content from generated index.html
let bodyContent;
try {
  bodyContent = extractBodyContent(indexPath);
  console.log("Extracted HTML content from index.html");
} catch (error) {
  console.error("Failed to extract HTML content:", error.message);
  process.exit(1);
}

console.log(`Found main JS file: ${jsFile}`);
console.log(`Found all JS files: ${allJsFiles.join(", ")}`);
console.log(`Found CSS file: ${cssFile}`);

// Copy files to plugin directory
const jsSourcePath = path.join(distPath, jsFile);
const cssSourcePath = path.join(distPath, cssFile);
const jsDestPath = path.join(pluginDistPath, jsFile);
const cssDestPath = path.join(pluginDistPath, cssFile);

// Clean up old files in plugin dist directory
if (fs.existsSync(pluginDistPath)) {
  const existingFiles = fs.readdirSync(pluginDistPath);
  existingFiles.forEach((file) => {
    fs.unlinkSync(path.join(pluginDistPath, file));
  });
} else {
  fs.mkdirSync(pluginDistPath, { recursive: true });
}

// Copy CSS file
fs.copyFileSync(cssSourcePath, cssDestPath);
console.log(`Copied ${cssFile} to plugin directory`);

// Copy all JS files
allJsFiles.forEach((jsFileName) => {
  const sourcePath = path.join(distPath, jsFileName);
  const destPath = path.join(pluginDistPath, jsFileName);
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Copied ${jsFileName} to plugin directory`);
});

// Read the current plugin file
let pluginContent = fs.readFileSync(pluginPath, "utf8");

// Update version number (increment minor version)
const versionMatch = pluginContent.match(/\$version = '(\d+)\.(\d+)\.(\d+)';/);
if (versionMatch) {
  const major = parseInt(versionMatch[1]);
  const minor = parseInt(versionMatch[2]);
  const patch = parseInt(versionMatch[3]) + 1;
  const newVersion = `${major}.${minor}.${patch}`;

  pluginContent = pluginContent.replace(
    /\$version = '\d+\.\d+\.\d+';/g,
    `$version = '${newVersion}';`
  );

  console.log(`Updated version to: ${newVersion}`);
}

// Generate script registration for all JS files
const scriptRegistrations = allJsFiles
  .map((file, index) => {
    const handle =
      index === 0 ? "pace-rechner_app" : `pace-rechner_chunk_${index}`;
    return `    wp_register_script('${handle}', plugin_dir_url(__FILE__) . 'dist/_nuxt/${file}');`;
  })
  .join("\n");

// Generate script enqueuing for all JS files
const scriptEnqueues = allJsFiles
  .map((file, index) => {
    const handle =
      index === 0 ? "pace-rechner_app" : `pace-rechner_chunk_${index}`;
    return `    wp_enqueue_script('${handle}');`;
  })
  .join("\n");

// Update the script registration function
const funcLoadRegex =
  /(function func_load_pace_rechner_scripts\(\)\s*\{\s*\$version = '[^']+';[\s\S]*?)(wp_register_script[^}]+)(\})/;
if (pluginContent.match(funcLoadRegex)) {
  pluginContent = pluginContent.replace(
    funcLoadRegex,
    `$1${scriptRegistrations}\n$3`
  );
} else {
  console.warn(
    "Could not find func_load_pace_rechner_scripts function to update"
  );
}

// Update the shortcode function to enqueue all scripts
const scriptEnqueueRegex =
  /(\/\/Add Vue\.js\s*)([\s\S]*?)(\/\/Add my code to it)/;
if (pluginContent.match(scriptEnqueueRegex)) {
  pluginContent = pluginContent.replace(
    scriptEnqueueRegex,
    `$1\n${scriptEnqueues}\n    $3`
  );
} else {
  console.warn("Could not find script enqueue section to update");
}

// Update CSS reference
pluginContent = pluginContent.replace(
  /wp_enqueue_style\('pace-rechner', plugin_dir_url\(__FILE__\) \. 'dist\/_nuxt\/[^']+', null\);/,
  `wp_enqueue_style('pace-rechner', plugin_dir_url(__FILE__) . 'dist/_nuxt/${cssFile}', null);`
);

// Update the HTML content in the $str variable
// Escape single quotes in the HTML content for PHP
const escapedHtml = bodyContent.replace(/'/g, "\\'");

// Replace /_nuxt/ paths with the WordPress plugin paths
const correctedHtml = escapedHtml.replace(
  /\/_nuxt\//g,
  "' . plugin_dir_url(__FILE__) . 'dist/_nuxt/"
);

// Find and replace the entire $str assignment - it's all on one very long line
const strRegex = /(\$str = ')([^']*)(';\s*\/\/Return to display)/;
if (pluginContent.match(strRegex)) {
  pluginContent = pluginContent.replace(strRegex, `$1${correctedHtml}$3`);
  console.log("Successfully updated HTML content");
} else {
  // Try a simpler approach - find the string between the assignment and the semicolon
  const simpleRegex = /(\$str = ')([^']*)(';)/;
  if (pluginContent.match(simpleRegex)) {
    pluginContent = pluginContent.replace(simpleRegex, `$1${correctedHtml}$3`);
    console.log("Successfully updated HTML content (fallback method)");
  } else {
    console.warn("Could not find $str variable to update HTML content");
  }
}

// Write the updated plugin file
fs.writeFileSync(pluginPath, pluginContent);

console.log("WordPress plugin updated successfully!");
console.log(`Updated all JS file references: ${allJsFiles.join(", ")}`);
console.log(`Updated CSS reference to: ${cssFile}`);
console.log(`Copied ${allJsFiles.length} JS files to plugin directory`);
console.log(
  `Generated script registration and enqueuing for ${allJsFiles.length} JS files`
);
console.log(
  "Updated HTML content from generated build (including inline scripts)"
);
