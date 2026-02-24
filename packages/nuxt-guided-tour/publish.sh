#!/usr/bin/env bash
set -euo pipefail

PKG_DIR="$(cd "$(dirname "$0")" && pwd)"
PKG_JSON="$PKG_DIR/package.json"

CURRENT_VERSION=$(node -p "require('$PKG_JSON').version")
echo "Current version: $CURRENT_VERSION"

IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

echo ""
echo "Bump type:"
echo "  1) patch  → $MAJOR.$MINOR.$((PATCH + 1))"
echo "  2) minor  → $MAJOR.$((MINOR + 1)).0"
echo "  3) major  → $((MAJOR + 1)).0.0"
echo ""
read -rp "Select [1/2/3]: " CHOICE

case "$CHOICE" in
  1) NEW_VERSION="$MAJOR.$MINOR.$((PATCH + 1))" ;;
  2) NEW_VERSION="$MAJOR.$((MINOR + 1)).0" ;;
  3) NEW_VERSION="$((MAJOR + 1)).0.0" ;;
  *) echo "Invalid choice"; exit 1 ;;
esac

echo ""
echo "Bumping version: $CURRENT_VERSION → $NEW_VERSION"

# Update version in package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$PKG_JSON', 'utf8'));
pkg.version = '$NEW_VERSION';
fs.writeFileSync('$PKG_JSON', JSON.stringify(pkg, null, 2) + '\n');
"

echo "Updated package.json to $NEW_VERSION"
echo ""

# Build
echo "Building..."
cd "$PKG_DIR"
npm run build
echo ""

# Dry run
echo "Running publish dry run..."
echo ""
if npm publish --dry-run 2>&1; then
  echo ""
  read -rp "Dry run succeeded. Publish v$NEW_VERSION to npm? [y/N]: " CONFIRM
  if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
    npm publish --access public
    echo ""
    echo "Published nuxt-guided-tour@$NEW_VERSION"
  else
    echo "Publish cancelled. package.json version remains at $NEW_VERSION."
  fi
else
  echo ""
  echo "Dry run failed. Reverting version to $CURRENT_VERSION."
  node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('$PKG_JSON', 'utf8'));
  pkg.version = '$CURRENT_VERSION';
  fs.writeFileSync('$PKG_JSON', JSON.stringify(pkg, null, 2) + '\n');
  "
  exit 1
fi
