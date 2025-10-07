<?php
/**
 * Template for displaying single opportunity posts
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
                            <div class="entry-thumbnail">
                                <?php the_post_thumbnail('large'); ?>
                            </div>
                        <?php endif; ?>
                    </header>

                    <div class="entry-content">
                        <?php
                        the_content();
                        
                        wp_link_pages(array(
                            'before' => '<div class="page-links">',
                            'after'  => '</div>',
                        ));
                        ?>
                    </div>

                    <footer class="entry-footer">
                        <div class="entry-meta">
                            <span class="posted-on">
                                Publicado em: <?php echo get_the_date(); ?>
                            </span>
                        </div>
                    </footer>
                </article>

                <?php
                // Navigation to next/previous opportunity
                the_post_navigation(array(
                    'prev_text' => '<span class="nav-subtitle">Anterior:</span> %title',
                    'next_text' => '<span class="nav-subtitle">Próximo:</span> %title',
                ));
                ?>

            <?php endwhile; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>



