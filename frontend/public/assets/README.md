# Assets Directory

This directory should contain all image assets for the application.

## Required Images

Please add the following images to this directory:

1. **logo.png** - Universal Peace Foundation logo (for header)
2. **hero-image.png** - Main hero section image
3. **ggmahan.png** - Portrait of His Holiness Gurumahan (circular crop recommended)
4. **peace.png** - Peace background image (for pledge quote section)
5. **bg1.png** - Background image for pledge form section
6. **favicon.ico** - Website favicon

## Image Specifications

- **logo.png**: Transparent PNG, ~200x80px recommended
- **hero-image.png**: High quality, 800x600px or larger
- **ggmahan.png**: Square format, 512x512px or larger
- **peace.png**: Wide format for background, 1920x1080px recommended
- **bg1.png**: Wide format for background, 1920x1080px recommended
- **favicon.ico**: 32x32px or 64x64px

## Notes

- Use optimized images (compress before adding)
- Maintain transparency where needed
- Use high-quality images for better appearance
- All images will be referenced from the public/assets directory

## Current Setup

The application is currently configured to use:

- External hosted images for certificates (Supabase URLs)
- Local images for the main UI components

You can update the certificate image URLs in:

- `frontend/src/components/CertificateGenerator.js`
- `frontend/src/components/CertificatePreview.js`
