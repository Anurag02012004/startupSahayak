#!/bin/bash

# StartupSahayak Setup Script
# This script helps you set up the project quickly

echo "🚀 Welcome to StartupSahayak Setup!"
echo "===================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found!"
    echo "Please create a .env.local file with your Grok API key."
    echo ""
    echo "Example .env.local content:"
    echo "XAI_API_KEY=your_grok_api_key_here"
    echo ""
    exit 1
fi

# Check if XAI_API_KEY is set
if grep -q "your_grok_api_key_here" .env.local; then
    echo "⚠️  Warning: Please update your Grok API key in .env.local"
    echo "Get your API key from: https://console.x.ai/"
    echo ""
fi

# Check for package manager
if command -v pnpm &> /dev/null; then
    PKG_MANAGER="pnpm"
elif command -v npm &> /dev/null; then
    PKG_MANAGER="npm"
else
    echo "❌ Error: No package manager found. Please install npm or pnpm."
    exit 1
fi

echo "📦 Installing dependencies using $PKG_MANAGER..."
$PKG_MANAGER install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Ensure you've added your Grok API key to .env.local"
    echo "2. Run: $PKG_MANAGER dev"
    echo "3. Open: http://localhost:3000/chat"
    echo ""
    echo "Happy building! 🚀"
else
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi
