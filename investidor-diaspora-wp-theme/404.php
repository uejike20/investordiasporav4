<?php
/**
 * Template for displaying 404 error pages
 */

get_header(); ?>

<main>
    <section class="info-section">
        <div class="container">
            <div class="error-404">
                <header class="page-header">
                    <h1 class="page-title"><?php _e('Página não encontrada', 'investidor-diaspora'); ?></h1>
                </header>

                <div class="page-content">
                    <p><?php _e('Desculpe, mas a página que procura não foi encontrada. Pode ter sido movida, eliminada ou o URL pode estar incorreto.', 'investidor-diaspora'); ?></p>
                    
                    <div class="error-actions">
                        <a href="<?php echo home_url(); ?>" class="cta-button">
                            <?php _e('Voltar ao Início', 'investidor-diaspora'); ?>
                        </a>
                    </div>

                    <div class="search-section">
                        <h3><?php _e('Procurar no site:', 'investidor-diaspora'); ?></h3>
                        <?php get_search_form(); ?>
                    </div>

                    <div class="popular-content">
                        <h3><?php _e('Conteúdo popular:', 'investidor-diaspora'); ?></h3>
                        
                        <?php
                        // Show recent opportunities
                        $opportunities = get_posts(array(
                            'post_type' => 'opportunity',
                            'posts_per_page' => 3,
                            'post_status' => 'publish'
                        ));
                        
                        if ($opportunities) : ?>
                            <div class="recent-opportunities">
                                <h4><?php _e('Oportunidades recentes:', 'investidor-diaspora'); ?></h4>
                                <ul>
                                    <?php foreach ($opportunities as $opportunity) : ?>
                                        <li>
                                            <a href="<?php echo get_permalink($opportunity->ID); ?>">
                                                <?php echo $opportunity->post_title; ?>
                                            </a>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        <?php endif; ?>

                        <?php
                        // Show recent institutions
                        $institutions = get_posts(array(
                            'post_type' => 'institution',
                            'posts_per_page' => 3,
                            'post_status' => 'publish'
                        ));
                        
                        if ($institutions) : ?>
                            <div class="recent-institutions">
                                <h4><?php _e('Instituições:', 'investidor-diaspora'); ?></h4>
                                <ul>
                                    <?php foreach ($institutions as $institution) : ?>
                                        <li>
                                            <a href="<?php echo get_permalink($institution->ID); ?>">
                                                <?php echo $institution->post_title; ?>
                                            </a>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<style>
.error-404 {
    text-align: center;
    padding: 4rem 0;
}

.error-404 .page-title {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.error-404 .page-content {
    max-width: 600px;
    margin: 0 auto;
}

.error-404 .page-content p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #666;
}

.error-actions {
    margin: 2rem 0;
}

.search-section {
    margin: 3rem 0;
    padding: 2rem;
    background: #f7f9fa;
    border-radius: 8px;
}

.search-section h3 {
    color: var(--dark-blue);
    margin-bottom: 1rem;
}

.search-section input[type="search"] {
    width: 100%;
    max-width: 400px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
}

.popular-content {
    margin-top: 3rem;
    text-align: left;
}

.popular-content h3 {
    color: var(--dark-blue);
    margin-bottom: 1.5rem;
}

.popular-content h4 {
    color: var(--primary-color);
    margin: 1.5rem 0 1rem 0;
}

.popular-content ul {
    list-style: none;
    padding: 0;
}

.popular-content li {
    margin: 0.5rem 0;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
}

.popular-content a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
}

.popular-content a:hover {
    text-decoration: underline;
}

.recent-opportunities,
.recent-institutions {
    margin: 1.5rem 0;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style>

<?php get_footer(); ?>



