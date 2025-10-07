<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
    
    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<!-- Header & Navigation -->
<header class="site-header">
    <div class="container">
        <nav class="main-nav">
            <a href="<?php echo home_url(); ?>" class="logo"><?php echo get_theme_mod('site_logo_text', 'Investidor da Diáspora'); ?></a>
            <ul class="nav-links">
                <li><a href="#hero"><?php echo get_theme_mod('nav_hero', 'Início'); ?></a></li>
                <li><a href="#why-invest"><?php echo get_theme_mod('nav_why_invest', 'Porquê Investir'); ?></a></li>
                <li><a href="#opportunities"><?php echo get_theme_mod('nav_opportunities', 'Oportunidades'); ?></a></li>
                <li><a href="#how-to-invest"><?php echo get_theme_mod('nav_how_to_invest', 'Como Investir'); ?></a></li>
                <li><a href="#testimonials"><?php echo get_theme_mod('nav_testimonials', 'Testemunhos'); ?></a></li>
                <li><a href="#instituicoes"><?php echo get_theme_mod('nav_institutions', 'Apoio'); ?></a></li>
                <li><a href="#download"><?php echo get_theme_mod('nav_download', 'Guia'); ?></a></li>
            </ul>
            <div class="hamburger">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
        </nav>
    </div>
</header>



