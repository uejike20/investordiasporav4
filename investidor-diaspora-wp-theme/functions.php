<?php
/**
 * Investidor da Diáspora Theme Functions
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme setup
 */
function investidor_diaspora_setup() {
    // Add theme support for various features
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Add custom image sizes
    add_image_size('institution-logo', 300, 200, true);
    add_image_size('testimonial-avatar', 100, 100, true);
    add_image_size('opportunity-thumb', 400, 300, true);
}
add_action('after_setup_theme', 'investidor_diaspora_setup');

/**
 * Enqueue scripts and styles
 */
function investidor_diaspora_scripts() {
    // Enqueue main stylesheet
    wp_enqueue_style('investidor-diaspora-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Enqueue custom JavaScript
    wp_enqueue_script('investidor-diaspora-script', get_template_directory_uri() . '/js/script.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('investidor-diaspora-script', 'ajax_object', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('investidor_diaspora_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'investidor_diaspora_scripts');

/**
 * Register custom post types
 */
function investidor_diaspora_register_post_types() {
    // Opportunities Post Type
    register_post_type('opportunity', array(
        'labels' => array(
            'name' => 'Oportunidades',
            'singular_name' => 'Oportunidade',
            'add_new' => 'Adicionar Nova',
            'add_new_item' => 'Adicionar Nova Oportunidade',
            'edit_item' => 'Editar Oportunidade',
            'new_item' => 'Nova Oportunidade',
            'view_item' => 'Ver Oportunidade',
            'search_items' => 'Procurar Oportunidades',
            'not_found' => 'Nenhuma oportunidade encontrada',
            'not_found_in_trash' => 'Nenhuma oportunidade encontrada no lixo'
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-chart-line',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest' => true
    ));
    
    // Institutions Post Type
    register_post_type('institution', array(
        'labels' => array(
            'name' => 'Instituições',
            'singular_name' => 'Instituição',
            'add_new' => 'Adicionar Nova',
            'add_new_item' => 'Adicionar Nova Instituição',
            'edit_item' => 'Editar Instituição',
            'new_item' => 'Nova Instituição',
            'view_item' => 'Ver Instituição',
            'search_items' => 'Procurar Instituições',
            'not_found' => 'Nenhuma instituição encontrada',
            'not_found_in_trash' => 'Nenhuma instituição encontrada no lixo'
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-building',
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true
    ));
    
    // Testimonials Post Type
    register_post_type('testimonial', array(
        'labels' => array(
            'name' => 'Testemunhos',
            'singular_name' => 'Testemunho',
            'add_new' => 'Adicionar Novo',
            'add_new_item' => 'Adicionar Novo Testemunho',
            'edit_item' => 'Editar Testemunho',
            'new_item' => 'Novo Testemunho',
            'view_item' => 'Ver Testemunho',
            'search_items' => 'Procurar Testemunhos',
            'not_found' => 'Nenhum testemunho encontrado',
            'not_found_in_trash' => 'Nenhum testemunho encontrado no lixo'
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-format-quote',
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true
    ));
}
add_action('init', 'investidor_diaspora_register_post_types');

/**
 * Add custom meta boxes
 */
function investidor_diaspora_add_meta_boxes() {
    // Institution meta box
    add_meta_box(
        'institution_details',
        'Detalhes da Instituição',
        'investidor_diaspora_institution_meta_box',
        'institution',
        'normal',
        'high'
    );
    
    // Testimonial meta box
    add_meta_box(
        'testimonial_details',
        'Detalhes do Testemunho',
        'investidor_diaspora_testimonial_meta_box',
        'testimonial',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'investidor_diaspora_add_meta_boxes');

/**
 * Institution meta box callback
 */
function investidor_diaspora_institution_meta_box($post) {
    wp_nonce_field('investidor_diaspora_institution_meta_box', 'investidor_diaspora_institution_meta_box_nonce');
    
    $mission = get_post_meta($post->ID, 'institution_mission', true);
    $services = get_post_meta($post->ID, 'institution_services', true);
    $website = get_post_meta($post->ID, 'institution_website', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="institution_mission">Missão:</label></th>';
    echo '<td><textarea id="institution_mission" name="institution_mission" rows="3" cols="50">' . esc_textarea($mission) . '</textarea></td></tr>';
    echo '<tr><th><label for="institution_services">Serviços:</label></th>';
    echo '<td><textarea id="institution_services" name="institution_services" rows="5" cols="50">' . esc_textarea($services) . '</textarea></td></tr>';
    echo '<tr><th><label for="institution_website">Website:</label></th>';
    echo '<td><input type="url" id="institution_website" name="institution_website" value="' . esc_url($website) . '" size="50" /></td></tr>';
    echo '</table>';
}

/**
 * Testimonial meta box callback
 */
function investidor_diaspora_testimonial_meta_box($post) {
    wp_nonce_field('investidor_diaspora_testimonial_meta_box', 'investidor_diaspora_testimonial_meta_box_nonce');
    
    $position = get_post_meta($post->ID, 'testimonial_position', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="testimonial_position">Posição/Cargo:</label></th>';
    echo '<td><input type="text" id="testimonial_position" name="testimonial_position" value="' . esc_attr($position) . '" size="50" /></td></tr>';
    echo '</table>';
}

/**
 * Save meta box data
 */
function investidor_diaspora_save_meta_box($post_id) {
    // Institution meta box
    if (isset($_POST['investidor_diaspora_institution_meta_box_nonce']) && 
        wp_verify_nonce($_POST['investidor_diaspora_institution_meta_box_nonce'], 'investidor_diaspora_institution_meta_box')) {
        
        if (isset($_POST['institution_mission'])) {
            update_post_meta($post_id, 'institution_mission', sanitize_textarea_field($_POST['institution_mission']));
        }
        if (isset($_POST['institution_services'])) {
            update_post_meta($post_id, 'institution_services', wp_kses_post($_POST['institution_services']));
        }
        if (isset($_POST['institution_website'])) {
            update_post_meta($post_id, 'institution_website', esc_url_raw($_POST['institution_website']));
        }
    }
    
    // Testimonial meta box
    if (isset($_POST['investidor_diaspora_testimonial_meta_box_nonce']) && 
        wp_verify_nonce($_POST['investidor_diaspora_testimonial_meta_box_nonce'], 'investidor_diaspora_testimonial_meta_box')) {
        
        if (isset($_POST['testimonial_position'])) {
            update_post_meta($post_id, 'testimonial_position', sanitize_text_field($_POST['testimonial_position']));
        }
    }
}
add_action('save_post', 'investidor_diaspora_save_meta_box');

/**
 * Customizer settings
 */
function investidor_diaspora_customize_register($wp_customize) {
    // Hero Section
    $wp_customize->add_section('hero_section', array(
        'title' => 'Secção Hero',
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('hero_title', array(
        'default' => 'ÉS MEMBRO DA <strong>DIÁSPORA</strong> CABO-VERDIANA E GOSTARIAS DE CONHECER AS MELHORES <strong>OPORTUNIDADES DE INVESTIMENTO EM CABO VERDE</strong>?',
        'sanitize_callback' => 'wp_kses_post',
    ));
    
    $wp_customize->add_control('hero_title', array(
        'label' => 'Título Principal',
        'section' => 'hero_section',
        'type' => 'textarea',
    ));
    
    $wp_customize->add_setting('hero_subtitle', array(
        'default' => 'Então estás no lugar certo. Este site foi criado para lhe apresentar o "Guia do Investidor da Diáspora", uma ferramenta pensada para ajudar os membros da diáspora cabo-verdiana a descobrirem as melhores oportunidades de investimento em Cabo Verde.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    $wp_customize->add_control('hero_subtitle', array(
        'label' => 'Subtítulo',
        'section' => 'hero_section',
        'type' => 'textarea',
    ));
    
    $wp_customize->add_setting('hero_button_text', array(
        'default' => 'Fazer Download do Guia',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('hero_button_text', array(
        'label' => 'Texto do Botão',
        'section' => 'hero_section',
        'type' => 'text',
    ));
    
    // Site Identity
    $wp_customize->add_setting('site_logo_text', array(
        'default' => 'Investidor da Diáspora',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('site_logo_text', array(
        'label' => 'Texto do Logo',
        'section' => 'title_tagline',
        'type' => 'text',
    ));
    
    // Navigation Labels
    $wp_customize->add_section('navigation_labels', array(
        'title' => 'Etiquetas de Navegação',
        'priority' => 35,
    ));
    
    $nav_labels = array(
        'nav_hero' => 'Início',
        'nav_why_invest' => 'Porquê Investir',
        'nav_opportunities' => 'Oportunidades',
        'nav_how_to_invest' => 'Como Investir',
        'nav_testimonials' => 'Testemunhos',
        'nav_institutions' => 'Apoio',
        'nav_download' => 'Guia'
    );
    
    foreach ($nav_labels as $setting => $default) {
        $wp_customize->add_setting($setting, array(
            'default' => $default,
            'sanitize_callback' => 'sanitize_text_field',
        ));
        
        $wp_customize->add_control($setting, array(
            'label' => ucfirst(str_replace('nav_', '', $setting)),
            'section' => 'navigation_labels',
            'type' => 'text',
        ));
    }
}
add_action('customize_register', 'investidor_diaspora_customize_register');

/**
 * AJAX handler for download form
 */
function investidor_diaspora_handle_download() {
    check_ajax_referer('investidor_diaspora_nonce', 'nonce');
    
    $email = sanitize_email($_POST['email']);
    $language = sanitize_text_field($_POST['language']);
    
    // Here you would typically:
    // 1. Save the email to a database or send to email service
    // 2. Send the appropriate PDF file
    // 3. Log the download
    
    wp_send_json_success(array(
        'message' => 'Download iniciado com sucesso!',
        'email' => $email,
        'language' => $language
    ));
}
add_action('wp_ajax_handle_download', 'investidor_diaspora_handle_download');
add_action('wp_ajax_nopriv_handle_download', 'investidor_diaspora_handle_download');

/**
 * Add admin menu for theme settings
 */
function investidor_diaspora_admin_menu() {
    add_theme_page(
        'Configurações do Tema',
        'Configurações do Tema',
        'manage_options',
        'investidor-diaspora-settings',
        'investidor_diaspora_settings_page'
    );
}
add_action('admin_menu', 'investidor_diaspora_admin_menu');

/**
 * Settings page callback
 */
function investidor_diaspora_settings_page() {
    ?>
    <div class="wrap">
        <h1>Configurações do Tema Investidor da Diáspora</h1>
        <p>Use o <a href="<?php echo admin_url('customize.php'); ?>">Personalizador</a> para configurar as opções do tema.</p>
        
        <h2>Post Types Disponíveis</h2>
        <ul>
            <li><strong>Oportunidades:</strong> <a href="<?php echo admin_url('edit.php?post_type=opportunity'); ?>">Gerir Oportunidades</a></li>
            <li><strong>Instituições:</strong> <a href="<?php echo admin_url('edit.php?post_type=institution'); ?>">Gerir Instituições</a></li>
            <li><strong>Testemunhos:</strong> <a href="<?php echo admin_url('edit.php?post_type=testimonial'); ?>">Gerir Testemunhos</a></li>
        </ul>
        
        <h2>Instruções</h2>
        <ol>
            <li>Adicione as suas oportunidades de negócio no menu "Oportunidades"</li>
            <li>Configure as instituições no menu "Instituições"</li>
            <li>Adicione testemunhos no menu "Testemunhos"</li>
            <li>Use o Personalizador para ajustar textos e configurações</li>
            <li>Faça upload das imagens necessárias na biblioteca de media</li>
        </ol>
    </div>
    <?php
}
?>



