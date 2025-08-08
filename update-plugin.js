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

  // For SPA mode, we need to create a basic structure since the content is loaded via JS
  if (
    bodyContent.includes('<div id="__nuxt"></div>') &&
    !bodyContent.includes("data-v-")
  ) {
    console.log(
      "Detected SPA mode - using Vue app structure with configuration"
    );
    // For SPA, we need the mount point plus the Nuxt configuration
    const nuxtConfigMatch = htmlContent.match(
      /<script>window\.__NUXT__[\s\S]*?<\/script>/
    );
    let configScript = "";
    if (nuxtConfigMatch) {
      configScript = nuxtConfigMatch[0];
      // Fix the buildAssetsDir path for WordPress
      configScript = configScript.replace(
        /"buildAssetsDir":"[^"]*"/,
        '"buildAssetsDir":"' +
          "' . plugin_dir_url(__FILE__) . 'dist/_nuxt/" +
          '"'
      );
    }

    bodyContent =
      '<div id="__nuxt"></div>' + (configScript ? configScript : "");
  } else {
    // Remove teleports div but keep the scripts - we only want to remove empty teleports
    bodyContent = bodyContent.replace(/<div id="teleports"><\/div>/g, "");
  }

  // Clean up extra whitespace but preserve the structure
  bodyContent = bodyContent.trim();

  return bodyContent;
}

// Function to extract script tags from HTML
function extractScriptTags(htmlFilePath) {
  const htmlContent = fs.readFileSync(htmlFilePath, "utf8");

  // Find all script tags that reference _nuxt files
  const scriptMatches = htmlContent.match(
    /<script[^>]*src="[^"]*\/_nuxt\/[^"]*"[^>]*><\/script>/g
  );

  if (!scriptMatches) {
    console.warn("No _nuxt script tags found in HTML");
    return [];
  }

  return scriptMatches
    .map((script) => {
      // Extract the filename from the src attribute
      const srcMatch = script.match(/src="[^"]*\/_nuxt\/([^"]+)"/);
      const typeMatch = script.match(/type="([^"]+)"/);

      if (!srcMatch) return null;

      return {
        filename: srcMatch[1],
        isModule: typeMatch && typeMatch[1] === "module",
        originalTag: script,
      };
    })
    .filter(Boolean);
}

// Function to copy entire _nuxt directory
function copyNuxtDirectory(sourcePath, destPath) {
  // Remove existing directory if it exists
  if (fs.existsSync(destPath)) {
    fs.rmSync(destPath, { recursive: true, force: true });
  }

  // Create destination directory
  fs.mkdirSync(destPath, { recursive: true });

  // Copy all files recursively
  function copyRecursive(src, dest) {
    const items = fs.readdirSync(src);

    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = fs.statSync(srcPath);

      if (stat.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  copyRecursive(sourcePath, destPath);
}

// Function to find CSS file
function findMainCssFile(directory) {
  const files = fs.readdirSync(directory);
  return files.find(
    (file) => file.startsWith("entry.") && file.endsWith(".css")
  );
}

// Find the generated files
const cssFile = findMainCssFile(distPath);
const scriptTags = extractScriptTags(indexPath);

if (!cssFile || scriptTags.length === 0) {
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

console.log(`Found CSS file: ${cssFile}`);
console.log(
  `Found script tags: ${scriptTags.map((s) => s.filename).join(", ")}`
);

// Copy entire _nuxt directory to plugin
console.log("Copying entire _nuxt directory...");
copyNuxtDirectory(distPath, pluginDistPath);
console.log("Successfully copied _nuxt directory");

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

// Generate script registration for all JS files based on HTML script tags
const scriptRegistrations = scriptTags
  .map((script, index) => {
    const handle = `pace-rechner_script_${index}`;
    const moduleType = script.isModule
      ? ", array(), $version, true"
      : ", array(), $version, true";
    return `    wp_register_script('${handle}', plugin_dir_url(__FILE__) . 'dist/_nuxt/${script.filename}'${moduleType});`;
  })
  .join("\n");

// Add the filter function for ES6 modules
const moduleFilterFunction = `

// Function to add type="module" to pace-rechner scripts that need it
function add_module_to_pace_rechner_scripts($tag, $handle, $src) {
    // List of scripts that should be modules (based on original HTML)
    $module_scripts = array(${scriptTags
      .map((script, index) =>
        script.isModule ? `'pace-rechner_script_${index}'` : null
      )
      .filter(Boolean)
      .join(", ")});
    
    if (in_array($handle, $module_scripts)) {
        $tag = str_replace('<script ', '<script type="module" defer ', $tag);
    } else if (strpos($handle, 'pace-rechner_script_') === 0) {
        $tag = str_replace('<script ', '<script defer ', $tag);
    }
    return $tag;
}`;

const scriptRegistrationsWithFilter =
  scriptRegistrations +
  `
    
    // Add module type for ES6 imports
    add_filter('script_loader_tag', 'add_module_to_pace_rechner_scripts', 10, 3);`;

// Generate script enqueuing for all JS files (in correct order from HTML)
const scriptEnqueues = scriptTags
  .map((script, index) => {
    const handle = `pace-rechner_script_${index}`;
    return `    wp_enqueue_script('${handle}');`;
  })
  .join("\n");

// Update the script registration function
const funcLoadRegex =
  /(function func_load_pace_rechner_scripts\(\)\s*\{\s*\$version = '[^']+';[\s\S]*?)(wp_register_script[^}]+)(\})/;
if (pluginContent.match(funcLoadRegex)) {
  pluginContent = pluginContent.replace(
    funcLoadRegex,
    `$1${scriptRegistrationsWithFilter}\n$3`
  );
} else {
  console.warn(
    "Could not find func_load_pace_rechner_scripts function to update"
  );
}

// Add the module filter function after the main function if it doesn't exist
if (!pluginContent.includes("add_module_to_pace_rechner_scripts")) {
  const insertAfterRegex =
    /(add_action\('wp_enqueue_scripts', 'func_load_pace_rechner_scripts'\);)/;
  if (pluginContent.match(insertAfterRegex)) {
    pluginContent = pluginContent.replace(
      insertAfterRegex,
      `$1${moduleFilterFunction}`
    );
  }
}

// Update the shortcode function to enqueue all scripts
const scriptEnqueueRegex =
  /(\/\/ Enqueue the single script that was generated\s*)([\s\S]*?)(wp_enqueue_style)/;
if (pluginContent.match(scriptEnqueueRegex)) {
  pluginContent = pluginContent.replace(
    scriptEnqueueRegex,
    `$1\n${scriptEnqueues}\n    $3`
  );
  console.log("Successfully updated script enqueue section");
} else {
  // Alternative pattern
  const altPattern = /(\/\/Add Vue\.js\s*)([\s\S]*?)(wp_enqueue_style)/;
  if (pluginContent.match(altPattern)) {
    pluginContent = pluginContent.replace(
      altPattern,
      `$1\n${scriptEnqueues}\n    $3`
    );
    console.log(
      "Successfully updated script enqueue section (alternative pattern)"
    );
  } else {
    console.warn("Could not find script enqueue section to update");
    console.log("Looking for enqueue patterns...");
    const enqueueIndex = pluginContent.indexOf("wp_enqueue_script");
    if (enqueueIndex !== -1) {
      console.log("Found wp_enqueue_script at position:", enqueueIndex);
      const contextStart = Math.max(0, enqueueIndex - 100);
      const contextEnd = Math.min(pluginContent.length, enqueueIndex + 200);
      console.log(
        "Context:",
        pluginContent.substring(contextStart, contextEnd)
      );
    }
  }
}

// Update CSS reference
pluginContent = pluginContent.replace(
  /wp_enqueue_style\('pace-rechner', plugin_dir_url\(__FILE__\) \. 'dist\/_nuxt\/[^']+', null, \$version\);/,
  `wp_enqueue_style('pace-rechner', plugin_dir_url(__FILE__) . 'dist/_nuxt/${cssFile}', null, $version);`
);

// Also update older format without version parameter
pluginContent = pluginContent.replace(
  /wp_enqueue_style\('pace-rechner', plugin_dir_url\(__FILE__\) \. 'dist\/_nuxt\/[^']+', null\);/,
  `wp_enqueue_style('pace-rechner', plugin_dir_url(__FILE__) . 'dist/_nuxt/${cssFile}', null, $version);`
);

// Update the HTML content in the $str variable
// Escape single quotes in the HTML content for PHP
const escapedHtml = bodyContent.replace(/'/g, "\\'");

// Replace /_nuxt/ paths with the WordPress plugin paths
const correctedHtml = escapedHtml.replace(
  /\/_nuxt\//g,
  "' . plugin_dir_url(__FILE__) . 'dist/_nuxt/"
);

// Find and replace the $str assignment - handle multiline strings
const strRegexMultiline = /(\$str = ')([^']*)(';\s*\/\/Return to display)/s;
if (pluginContent.match(strRegexMultiline)) {
  pluginContent = pluginContent.replace(
    strRegexMultiline,
    `$1${correctedHtml}$3`
  );
  console.log("Successfully updated HTML content (multiline)");
} else {
  // Try to find the start and end of the string assignment more flexibly
  const strStartRegex = /(\$str = ')(.*?)(?=';[\s\S]*?\/\/Return to display)/s;
  if (pluginContent.match(strStartRegex)) {
    pluginContent = pluginContent.replace(strStartRegex, `$1${correctedHtml}`);
    console.log("Successfully updated HTML content (flexible method)");
  } else {
    console.warn("Could not find $str variable to update HTML content");
    console.log("Searching for $str pattern...");
    const strIndex = pluginContent.indexOf("$str = ");
    if (strIndex !== -1) {
      console.log("Found $str at position:", strIndex);
      // Show some context around the $str assignment
      const contextStart = Math.max(0, strIndex - 50);
      const contextEnd = Math.min(pluginContent.length, strIndex + 200);
      console.log(
        "Context:",
        pluginContent.substring(contextStart, contextEnd)
      );
    }
  }
}

// Write the updated plugin file
fs.writeFileSync(pluginPath, pluginContent);

console.log("WordPress plugin updated successfully!");
console.log(
  `Updated script references: ${scriptTags.map((s) => s.filename).join(", ")}`
);
console.log(`Updated CSS reference to: ${cssFile}`);
console.log(`Copied entire _nuxt directory with ${scriptTags.length} JS files`);
console.log(
  `Generated script registration and enqueuing for ${scriptTags.length} JS files in correct order`
);
console.log(
  "Updated HTML content from generated build (including inline scripts)"
);
