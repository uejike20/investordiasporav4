# WordPress Migration Guide - Investidor da Diáspora

This guide will help you migrate your HTML website to WordPress using the custom theme provided.

## 📋 Prerequisites

- WordPress hosting account (shared hosting, VPS, or dedicated server)
- Domain name
- FTP access or cPanel File Manager
- Basic knowledge of WordPress administration

## 🚀 Step 1: WordPress Installation

### Option A: One-Click Installation (Recommended)
Most hosting providers offer one-click WordPress installation:

1. **Log into your hosting control panel** (cPanel, Plesk, etc.)
2. **Find "WordPress" or "Website Builder"** section
3. **Click "Install WordPress"**
4. **Fill in the required information:**
   - Domain: your-domain.com
   - Admin username: (choose a secure username)
   - Admin password: (use a strong password)
   - Admin email: your-email@domain.com
5. **Click "Install"**

### Option B: Manual Installation
If one-click installation is not available:

1. **Download WordPress** from [wordpress.org](https://wordpress.org/download/)
2. **Upload files** to your web server's public_html directory
3. **Create a database** in your hosting control panel
4. **Run the WordPress installer** by visiting your-domain.com/wp-admin/install.php
5. **Follow the setup wizard**

## 🎨 Step 2: Install the Custom Theme

### Upload the Theme Files

1. **Access your WordPress site** via FTP or File Manager
2. **Navigate to:** `/wp-content/themes/`
3. **Upload the entire `investidor-diaspora-wp-theme` folder**
4. **Ensure the folder structure is:**
   ```
   /wp-content/themes/investidor-diaspora-wp-theme/
   ├── style.css
   ├── index.php
   ├── header.php
   ├── footer.php
   ├── functions.php
   └── js/
       └── script.js
   ```

### Activate the Theme

1. **Log into WordPress Admin** (your-domain.com/wp-admin)
2. **Go to:** Appearance → Themes
3. **Find "Investidor da Diáspora"** theme
4. **Click "Activate"**

## 📁 Step 3: Upload Images and Assets

### Upload Images to WordPress Media Library

1. **Go to:** Media → Library
2. **Upload all images** from your original `/images/` folder:
   - `hero-background.jpg`
   - `agronegocio.jpg`
   - `industria.jpg`
   - `economia-digital.jpg`
   - `turismo.jpg`
   - `economia-verde.jpg`
   - `economia-azul.jpg`
   - `como-investir-roadmap.png`
   - `visual-selection.png`
   - `download-cover.jpg`
   - `logo-partner-1.png` through `logo-partner-6.png`
   - All ODS images (`ods-1.png` through `ods-17.png`)
   - `ods-pie.png`
   - Testimonial images (`romina.png`, `marcos.png`, `michel.png`)
   - All icon images

### Update Image Paths in Theme

The theme is configured to automatically use the WordPress media library, but you may need to update some hardcoded paths in the theme files if needed.

## 📝 Step 4: Create Content

### Add Opportunities

1. **Go to:** Oportunidades → Adicionar Nova
2. **For each opportunity, add:**
   - **Title:** (e.g., "Agronegócio")
   - **Content:** Detailed description
   - **Featured Image:** Upload the corresponding image
   - **Excerpt:** Short summary

### Add Institutions

1. **Go to:** Instituições → Adicionar Nova
2. **For each institution, add:**
   - **Title:** (e.g., "Ministério das Comunidades")
   - **Featured Image:** Upload the logo
   - **Mission:** In the "Detalhes da Instituição" meta box
   - **Services:** In the "Detalhes da Instituição" meta box
   - **Website:** In the "Detalhes da Instituição" meta box

### Add Testimonials

1. **Go to:** Testemunhos → Adicionar Novo
2. **For each testimonial, add:**
   - **Title:** Person's name
   - **Content:** The testimonial quote
   - **Featured Image:** Person's photo
   - **Position:** In the "Detalhes do Testemunho" meta box

## ⚙️ Step 5: Configure Theme Settings

### Customize Content

1. **Go to:** Appearance → Customize
2. **Configure the following sections:**
   - **Site Identity:** Update site title and tagline
   - **Secção Hero:** Customize hero section text
   - **Etiquetas de Navegação:** Update navigation labels
   - **Additional CSS:** Add any custom styles

### Set Up Menus

1. **Go to:** Appearance → Menus
2. **Create a new menu** called "Main Navigation"
3. **Add custom links** for each section:
   - Início → #hero
   - Porquê Investir → #why-invest
   - Oportunidades → #opportunities
   - Como Investir → #how-to-invest
   - Testemunhos → #testimonials
   - Apoio → #instituicoes
   - Guia → #download
4. **Assign to "Primary Menu" location**

## 🔧 Step 6: Configure Plugins (Optional)

### Recommended Plugins

1. **Contact Form 7** - For contact forms
2. **Yoast SEO** - For search engine optimization
3. **WP Super Cache** - For performance
4. **UpdraftPlus** - For backups
5. **Wordfence Security** - For security

### Install Plugins

1. **Go to:** Plugins → Add New
2. **Search for each plugin** by name
3. **Click "Install Now"** then "Activate"

## 📊 Step 7: Test and Optimize

### Test All Functionality

1. **Test the flip cards** - Click on institution cards
2. **Test the SDG wheel** - Hover over different sections
3. **Test the opportunities modal** - Click on opportunity cards
4. **Test the download form** - Try downloading the guide
5. **Test mobile responsiveness** - Check on different devices

### Performance Optimization

1. **Optimize images** - Use WebP format when possible
2. **Enable caching** - Use WP Super Cache or similar
3. **Minify CSS/JS** - Use optimization plugins
4. **Use a CDN** - Consider Cloudflare or similar

## 🚨 Troubleshooting

### Common Issues

**Theme not appearing:**
- Check file permissions (755 for folders, 644 for files)
- Ensure all theme files are uploaded correctly
- Clear any caching plugins

**Images not loading:**
- Check image paths in theme files
- Ensure images are uploaded to WordPress media library
- Verify file permissions

**JavaScript not working:**
- Check browser console for errors
- Ensure jQuery is loaded
- Verify script file is uploaded correctly

**Flip cards not working:**
- Check if JavaScript is enabled
- Verify the script.js file is loaded
- Check for JavaScript errors in console

### Getting Help

1. **Check WordPress documentation:** [wordpress.org/support](https://wordpress.org/support/)
2. **Contact your hosting provider** for server-related issues
3. **Check theme files** for any syntax errors
4. **Use browser developer tools** to debug JavaScript issues

## 📈 Step 8: Go Live

### Final Checklist

- [ ] All content is added and formatted correctly
- [ ] All images are uploaded and displaying
- [ ] All interactive elements are working
- [ ] Site is mobile-responsive
- [ ] SEO settings are configured
- [ ] Analytics are set up (Google Analytics)
- [ ] Backup system is in place
- [ ] Security measures are implemented

### Launch

1. **Remove "Coming Soon" page** if you have one
2. **Update DNS settings** if using a new domain
3. **Submit sitemap** to Google Search Console
4. **Test everything one final time**
5. **Announce your new WordPress site!**

## 🎉 Congratulations!

Your HTML website has been successfully migrated to WordPress! The new site will be:

- ✅ **Easier to manage** - Update content through WordPress admin
- ✅ **More secure** - WordPress security features and updates
- ✅ **Better for SEO** - WordPress SEO plugins and features
- ✅ **Scalable** - Easy to add new content and features
- ✅ **Maintainable** - Regular updates and backups

## 📞 Support

If you need help with the migration or have questions about the theme, please refer to the WordPress documentation or contact your web developer.

---

**Theme Version:** 1.0  
**WordPress Compatibility:** 5.0+  
**Last Updated:** 2025



