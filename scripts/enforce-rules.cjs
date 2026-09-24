const fs = require('fs');
const path = require('path');

// Rule: The Sparkles icon (and any sparkles iconography) is strictly forbidden in this system.
// As requested by the user: "الايقونه دي شيلها من كل صفحات السستم وحط قاعده انها ما تتحطش تاني ف اي حته ف السستم"
const FORBIDDEN_PATTERNS = [
  { pattern: /\bSparkles\b/, name: 'Sparkles icon' },
  { pattern: /lucide-react.*Sparkles/, name: 'Sparkles import from lucide-react' }
];

function scanDirectory(dir) {
  let errors = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        errors = errors.concat(scanDirectory(fullPath));
      }
    } else if (/\.(tsx|ts|jsx|js|vue|svelte|html)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      FORBIDDEN_PATTERNS.forEach(({ pattern, name }) => {
        if (pattern.test(content)) {
          errors.push(`[RULE VIOLATION]: Found forbidden "${name}" in ${fullPath}. Rule: The Sparkles icon must NEVER be used in the system.`);
        }
      });
    }
  }
  return errors;
}

const srcDir = path.resolve(__dirname, '../src');
const violations = scanDirectory(srcDir);

if (violations.length > 0) {
  console.error('\n❌ SYSTEM RULE ENFORCEMENT FAILED:\n');
  violations.forEach(v => console.error(v));
  console.error('\nPlease remove all prohibited icons before continuing.\n');
  process.exit(1);
} else {
  console.log('✅ Rule enforcement check passed: No prohibited Sparkles icons found.');
}
