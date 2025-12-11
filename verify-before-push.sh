#!/bin/bash
# Quick verification script before pushing to GitHub

echo "🔍 Pre-Push Security Verification"
echo "=================================="
echo ""

# Check 1: .env not tracked
if git ls-files | grep -q "^.env$"; then
    echo "❌ FAIL: .env is tracked in git!"
    exit 1
else
    echo "✅ PASS: .env is not tracked"
fi

# Check 2: SECURITY.md not tracked
if git ls-files | grep -q "^SECURITY.md$"; then
    echo "❌ FAIL: SECURITY.md is tracked in git!"
    exit 1
else
    echo "✅ PASS: SECURITY.md is not tracked"
fi

# Check 3: node_modules not tracked
if git ls-files | grep -q "node_modules/"; then
    echo "❌ FAIL: node_modules is tracked in git!"
    exit 1
else
    echo "✅ PASS: node_modules is not tracked"
fi

# Check 4: No uploaded files tracked
if git ls-files | grep -q "uploads/.*\.(png\|jpg\|jpeg)"; then
    echo "❌ FAIL: Uploaded files are tracked in git!"
    exit 1
else
    echo "✅ PASS: No uploaded files tracked"
fi

# Check 5: Verify .env.example exists
if git ls-files | grep -q "^.env.example$"; then
    echo "✅ PASS: .env.example is tracked"
else
    echo "⚠️  WARNING: .env.example should be tracked"
fi

echo ""
echo "=================================="
echo "✅ All security checks passed!"
echo ""
echo "You can safely push to GitHub:"
echo "  git push -u origin master"
echo ""

