<?php
/**
 * Template for displaying single institution posts
 */

get_header(); ?>

<main>
    <section class="info-section">
        <div class="container">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <h1 class="entry-title"><?php the_title(); ?></h1>
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="institution-logo-single">
                                <?php the_post_thumbnail('institution-logo'); ?>
                            </div>
                        <?php endif; ?>
                    </header>

                    <div class="entry-content">
                        <?php
                        // Display mission
                        $mission = get_post_meta(get_the_ID(), 'institution_mission', true);
                        if ($mission) {
                            echo '<div class="institution-mission">';
                            echo '<h3>Missão:</h3>';
                            echo '<p>' . esc_html($mission) . '</p>';
                            echo '</div>';
                        }
                        
                        // Display main content
                        the_content();
                        
                        // Display services
                        $services = get_post_meta(get_the_ID(), 'institution_services', true);
                        if ($services) {
                            echo '<div class="institution-services">';
                            echo '<h3>Serviços:</h3>';
                            echo wp_kses_post($services);
                            echo '</div>';
                        }
                        
                        // Display website
                        $website = get_post_meta(get_the_ID(), 'institution_website', true);
                        if ($website) {
                            echo '<div class="institution-website">';
                            echo '<h3>Website:</h3>';
                            echo '<p><a href="' . esc_url($website) . '" target="_blank" rel="noopener">' . esc_html($website) . '</a></p>';
                            echo '</div>';
                        }
                        
                        wp_link_pages(array(
                            'before' => '<div class="page-links">',
                            'after'  => '</div>',
                        ));
                        ?>
                    </div>

                    <footer class="entry-footer">
                        <div class="entry-meta">
                            <span class="posted-on">
                                Última atualização: <?php echo get_the_modified_date(); ?>
                            </span>
                        </div>
                    </footer>
                </article>

                <?php
                // Navigation to next/previous institution
                the_post_navigation(array(
                    'prev_text' => '<span class="nav-subtitle">Anterior:</span> %title',
                    'next_text' => '<span class="nav-subtitle">Próximo:</span> %title',
                ));
                ?>

            <?php endwhile; ?>
        </div>
    </section>
</main>

<style>
.institution-logo-single {
    text-align: center;
    margin: 2rem 0;
}

.institution-logo-single img {
    max-width: 300px;
    max-height: 200px;
    object-fit: contain;
}

.institution-mission,
.institution-services,
.institution-website {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f7f9fa;
    border-radius: 8px;
}

.institution-mission h3,
.institution-services h3,
.institution-website h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.institution-website a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
}

.institution-website a:hover {
    text-decoration: underline;
}
</style>

<?php get_footer(); ?>



