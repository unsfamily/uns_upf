#!/bin/bash

# Font Installation Script for Certificate Generation
# This script installs the required fonts for the Peace Pledge certificate generator

set -e

echo "🔤 Installing fonts for certificate generation..."
echo "================================================"

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    echo "❌ Cannot detect OS. Please install DejaVu fonts manually."
    exit 1
fi

case "$OS" in
    ubuntu|debian)
        echo "📦 Detected Debian/Ubuntu system"
        echo "Installing DejaVu fonts..."
        sudo apt-get update
        sudo apt-get install -y fonts-dejavu fonts-dejavu-core fonts-dejavu-extra
        ;;
    centos|rhel|fedora)
        echo "📦 Detected Red Hat/CentOS/Fedora system"
        echo "Installing DejaVu fonts..."
        sudo yum install -y dejavu-sans-fonts dejavu-serif-fonts
        ;;
    alpine)
        echo "📦 Detected Alpine Linux"
        echo "Installing DejaVu fonts..."
        sudo apk add --no-cache ttf-dejavu
        ;;
    *)
        echo "❌ Unsupported OS: $OS"
        echo "Please manually install DejaVu fonts for your system."
        exit 1
        ;;
esac

echo ""
echo "✅ Fonts installed successfully!"
echo ""
echo "Installed fonts location:"
if [ -d "/usr/share/fonts/truetype/dejavu" ]; then
    ls -la /usr/share/fonts/truetype/dejavu/
elif [ -d "/usr/share/fonts/dejavu" ]; then
    ls -la /usr/share/fonts/dejavu/
else
    echo "Font directory varies by system. Run: fc-list | grep -i dejavu"
fi

echo ""
echo "🔄 Please restart your Node.js application for changes to take effect:"
echo "   pm2 restart all"
echo "   # OR"
echo "   npm start"
echo ""
echo "✨ Certificate generation should now work correctly!"
