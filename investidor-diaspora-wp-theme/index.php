<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 */

get_header(); ?>

<main>
    <!-- Hero Section -->
    <section class="hero" id="hero">
        <div class="hero-content fade-in">
            <h1><?php echo get_theme_mod('hero_title', 'ÉS MEMBRO DA <strong>DIÁSPORA</strong> CABO-VERDIANA E GOSTARIAS DE CONHECER AS MELHORES <strong>OPORTUNIDADES DE INVESTIMENTO EM CABO VERDE</strong>?'); ?></h1>
            <p><?php echo get_theme_mod('hero_subtitle', 'Então estás no lugar certo. Este site foi criado para lhe apresentar o "Guia do Investidor da Diáspora", uma ferramenta pensada para ajudar os membros da diáspora cabo-verdiana a descobrirem as melhores oportunidades de investimento em Cabo Verde.'); ?></p>
            <a href="#download" class="cta-button"><?php echo get_theme_mod('hero_button_text', 'Fazer Download do Guia'); ?></a>
        </div>
    </section>

    <!-- Why Invest Section -->
    <section class="info-section" id="why-invest">
        <div class="container">
            <h2 class="fade-in"><?php echo get_theme_mod('why_invest_title', 'Porquê investir em Cabo Verde?'); ?></h2>
            <p class="section-subtitle fade-in"><?php echo get_theme_mod('why_invest_subtitle', 'Cabo Verde tem um ambiente de negócios atrativo e propício ao investimento, com diversas vantagens estratégicas que fortalecem a confiança dos investidores:'); ?></p>
            
            <div class="reasons-grid">
                <?php
                $reasons = get_theme_mod('investment_reasons', array(
                    array('icon' => 'icon-location.png', 'title' => 'Localização Estratégica', 'description' => 'Situado no cruzamento entre Europa, África e América, Cabo Verde é um ponto de conexão para comércio e negócios internacionais.'),
                    array('icon' => 'icon-stability.png', 'title' => 'Estabilidade Política e Social', 'description' => 'O país é reconhecido pela sua democracia consolidada, paz social e governança estável, fatores fundamentais para a segurança do investimento.'),
                    array('icon' => 'icon-infra.png', 'title' => 'Infraestruturas Modernas', 'description' => 'Investimentos contínuos em portos, aeroportos, estradas e redes energéticas garantem boas condições para o desenvolvimento empresarial.'),
                    array('icon' => 'icon-euro.svg', 'title' => 'Paridade com o Euro', 'description' => 'A moeda nacional (Escudo Cabo-verdiano) está indexada ao Euro, proporcionando estabilidade cambial para investidores estrangeiros.'),
                    array('icon' => 'icon-climate.svg', 'title' => 'Clima Estável e Sem Riscos de Saúde', 'description' => 'Cabo Verde possui um clima tropical moderado e estável ao longo do ano, sem registro de epidemias ou riscos significativos à saúde pública.'),
                    array('icon' => 'icon-capital.svg', 'title' => 'Livre Movimentação de Capitais', 'description' => 'Políticas económicas permitem a transferência de fundos e repatriação de capitais sem restrições, favorecendo investimentos internacionais.'),
                    array('icon' => 'icon-law.svg', 'title' => 'Estado de Direito e Transparência', 'description' => 'O país mantém um forte compromisso com o Estado de Direito, promovendo um ambiente seguro e previsível para negócios.'),
                    array('icon' => 'icon-population.svg', 'title' => 'População Jovem e Qualificada', 'description' => 'Cabo Verde conta com uma população jovem e capacitada, com crescente qualificação técnica e profissional, tornando-se um atrativo para setores inovadores e tecnológicos.')
                ));
                
                foreach ($reasons as $reason) : ?>
                    <div class="reason-item fade-in">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/<?php echo $reason['icon']; ?>" alt="<?php echo $reason['title']; ?>" class="reason-icon">
                        <h3><?php echo $reason['title']; ?></h3>
                        <p><?php echo $reason['description']; ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Opportunities Section -->
    <section class="info-section alternate-bg" id="opportunities">
        <div class="container">
            <h2 class="fade-in"><?php echo get_theme_mod('opportunities_title', 'Oportunidades de Negócio'); ?></h2>
            <div class="opportunities-grid">
                <?php
                $opportunities = get_posts(array(
                    'post_type' => 'opportunity',
                    'posts_per_page' => -1,
                    'post_status' => 'publish'
                ));
                
                if ($opportunities) :
                    foreach ($opportunities as $opportunity) :
                        $image = get_the_post_thumbnail_url($opportunity->ID, 'large');
                        if (!$image) {
                            $image = get_template_directory_uri() . '/images/agronegocio.jpg'; // Default image
                        }
                        ?>
                        <a href="#" class="opportunity-card fade-in" data-key="<?php echo $opportunity->post_name; ?>" style="background-image: url('<?php echo $image; ?>');">
                            <div class="card-overlay">
                                <h3><?php echo $opportunity->post_title; ?></h3>
                            </div>
                        </a>
                    <?php endforeach;
                else : ?>
                    <!-- Default opportunities if no custom posts exist -->
                    <a href="#" class="opportunity-card fade-in" data-key="agronegocio" style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/agronegocio.jpg');">
                        <div class="card-overlay"><h3>Agronegócio</h3></div>
                    </a>
                    <a href="#" class="opportunity-card fade-in" data-key="industria" style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/industria.jpg');">
                        <div class="card-overlay"><h3>Indústria</h3></div>
                    </a>
                    <a href="#" class="opportunity-card fade-in" data-key="economia-digital" style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/economia-digital.jpg');">
                        <div class="card-overlay"><h3>Economia Digital</h3></div>
                    </a>
                    <a href="#" class="opportunity-card fade-in" data-key="turismo" style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/turismo.jpg');">
                        <div class="card-overlay"><h3>Turismo</h3></div>
                    </a>
                    <a href="#" class="opportunity-card fade-in" data-key="economia-verde" style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/economia-verde.jpg');">
                        <div class="card-overlay"><h3>Economia Verde</h3></div>
                    </a>
                    <a href="#" class="opportunity-card fade-in" data-key="economia-azul" style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/economia-azul.jpg');">
                        <div class="card-overlay"><h3>Economia Azul</h3></div>
                    </a>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- How to Invest Section -->
    <section class="info-section" id="how-to-invest">
        <div class="container">
            <h2 class="fade-in"><?php echo get_theme_mod('how_to_invest_title', 'Como Investir?'); ?></h2>
            <p class="section-subtitle fade-in"><?php echo get_theme_mod('how_to_invest_subtitle', 'O processo de investimento em Cabo Verde é estruturado para ser transparente e seguro. Siga as etapas e consulte os recursos disponíveis para garantir o sucesso do seu projeto.'); ?></p>
            
            <img src="<?php echo get_template_directory_uri(); ?>/images/como-investir-roadmap.png" alt="Roteiro de como investir em Cabo Verde" class="roadmap-image fade-in">
        </div>
    </section>

    <!-- SDG Section -->
    <section class="info-section alternate-bg" id="principios-orientadores">
        <div class="container">
            <h2 class="fade-in"><?php echo get_theme_mod('sdg_title', 'Princípios Orientadores do Negócio'); ?></h2>
            <p class="section-subtitle fade-in" id="sdg-instruction"><?php echo get_theme_mod('sdg_subtitle', 'Passe o rato sobre os segmentos para ver os detalhes de cada Objetivo de Desenvolvimento Sustentável.'); ?></p>
            
            <div class="sdg-container fade-in">
                <img src="<?php echo get_template_directory_uri(); ?>/images/ods-pie.png" alt="Roda dos Objetivos de Desenvolvimento Sustentável" class="sdg-base" id="sdg-wheel">
                <!-- SDG hover images -->
                <?php for ($i = 1; $i <= 17; $i++) : ?>
                    <img src="<?php echo get_template_directory_uri(); ?>/images/ods-<?php echo $i; ?>.png" alt="Informação sobre ODS <?php echo $i; ?>" class="sdg-hover-image" id="goal-<?php echo $i; ?>-image">
                <?php endfor; ?>
            </div>
            <div id="sdg-info-container" class="sdg-info-container" aria-live="polite"></div>

            <!-- Business Principles Image -->
            <div class="principios-figure fade-in" style="margin-top: 2rem;">
                <figure style="margin:0; text-align:center;">
                    <img id="principios-image" src="<?php echo get_template_directory_uri(); ?>/images/visual-selection.png" alt="Iniciativas de Responsabilidade Social" style="display:block; width:100%; max-width:1000px; margin:0 auto; height:auto; border-radius:8px; background:#f0f3f6; min-height:220px;">
                    <figcaption id="principios-caption" style="font-size:.9rem; color:#666; margin-top:.5rem;"></figcaption>
                </figure>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="info-section" id="testimonials">
        <div class="container">
            <h2 class="fade-in"><?php echo get_theme_mod('testimonials_title', 'Vozes da Diáspora'); ?></h2>
            <div class="testimonials-grid">
                <?php
                $testimonials = get_posts(array(
                    'post_type' => 'testimonial',
                    'posts_per_page' => 3,
                    'post_status' => 'publish'
                ));
                
                if ($testimonials) :
                    foreach ($testimonials as $testimonial) :
                        $avatar = get_the_post_thumbnail_url($testimonial->ID, 'thumbnail');
                        if (!$avatar) {
                            $avatar = get_template_directory_uri() . '/images/romina.png'; // Default avatar
                        }
                        ?>
                        <div class="testimonial-card fade-in">
                            <div class="testimonial-avatar">
                                <img src="<?php echo $avatar; ?>" alt="<?php echo $testimonial->post_title; ?>" class="avatar-img">
                            </div>
                            <p class="quote"><?php echo $testimonial->post_content; ?></p>
                            <p class="author"><strong><?php echo $testimonial->post_title; ?></strong><br><?php echo get_post_meta($testimonial->ID, 'testimonial_position', true); ?></p>
                        </div>
                    <?php endforeach;
                else : ?>
                    <!-- Default testimonials -->
                    <div class="testimonial-card fade-in">
                        <div class="testimonial-avatar">
                            <img src="<?php echo get_template_directory_uri(); ?>/images/romina.png" alt="Foto de Romina Dias" class="avatar-img">
                        </div>
                        <p class="quote">"É preciso planear, ter muita força de vontade, determinação, coragem e ir 'com tudo'. O que nos move é o amor a esta terra que nos faz enfrentar seus desafios."</p>
                        <p class="author"><strong>Romina Dias</strong><br>Empresária, Setor da Saúde</p>
                    </div>
                    <div class="testimonial-card fade-in">
                        <div class="testimonial-avatar">
                            <img src="<?php echo get_template_directory_uri(); ?>/images/marcos.png" alt="Foto de Marcos Rodrigues" class="avatar-img">
                        </div>
                        <p class="quote">"A mola propulsora dos negócios que criamos foi o desejo de ajudar no desenvolvimento do país onde nasci."</p>
                        <p class="author"><strong>Marcos Rodrigues</strong><br>Fundador, Empresa de Tecnologia</p>
                    </div>
                    <div class="testimonial-card fade-in">
                        <div class="testimonial-avatar">
                            <img src="<?php echo get_template_directory_uri(); ?>/images/michel.png" alt="Foto de Michel dos Santos" class="avatar-img">
                        </div>
                        <p class="quote">"Encorajo que façam o trabalho de campo, que falem com as pessoas e identifiquem as oportunidades."</p>
                        <p class="author"><strong>Michel dos Santos</strong><br>Investidor</p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- Institutions Section -->
    <section class="info-section alternate-bg" id="instituicoes">
        <div class="container">
            <h2 class="fade-in"><?php echo get_theme_mod('institutions_title', 'INSTITUIÇÕES E SERVIÇOS PÚBLICOS RELEVANTES'); ?></h2>
            <p class="section-subtitle fade-in"><?php echo get_theme_mod('institutions_subtitle', 'Instituições públicas essenciais para facilitar o investimento da diáspora em Cabo Verde, oferecendo serviços especializados e apoio institucional.'); ?></p>
            
            <div class="institutions-grid">
                <?php
                $institutions = get_posts(array(
                    'post_type' => 'institution',
                    'posts_per_page' => -1,
                    'post_status' => 'publish'
                ));
                
                if ($institutions) :
                    foreach ($institutions as $institution) :
                        $logo = get_the_post_thumbnail_url($institution->ID, 'medium');
                        if (!$logo) {
                            $logo = get_template_directory_uri() . '/images/logo-partner-1.png'; // Default logo
                        }
                        ?>
                        <div class="flip-card fade-in">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <div class="institution-logo">
                                        <img src="<?php echo $logo; ?>" alt="<?php echo $institution->post_title; ?>" class="institution-logo-img">
                                        <p class="click-hint">Clique para ver mais informações</p>
                                    </div>
                                </div>
                                <div class="flip-card-back">
                                    <div class="institution-content">
                                        <h3><?php echo $institution->post_title; ?></h3>
                                        <p><strong>Missão:</strong> <?php echo get_post_meta($institution->ID, 'institution_mission', true); ?></p>
                                        <div class="services-list">
                                            <h4>Serviços:</h4>
                                            <?php echo get_post_meta($institution->ID, 'institution_services', true); ?>
                                        </div>
                                        <div class="contact-info">
                                            <p><strong>Website:</strong> <a href="<?php echo get_post_meta($institution->ID, 'institution_website', true); ?>" target="_blank" rel="noopener"><?php echo get_post_meta($institution->ID, 'institution_website', true); ?></a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach;
                else : ?>
                    <!-- Default institutions -->
                    <div class="flip-card fade-in">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <div class="institution-logo">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/logo-partner-1.png" alt="Ministério das Comunidades" class="institution-logo-img">
                                    <p class="click-hint">Clique para ver mais informações</p>
                                </div>
                            </div>
                            <div class="flip-card-back">
                                <div class="institution-content">
                                    <h3>Ministério das Comunidades</h3>
                                    <p><strong>Missão:</strong> Facilitar e acreditar o investimento da diáspora em Cabo Verde, promovendo a integração dos investidores cabo-verdianos no exterior.</p>
                                    <div class="services-list">
                                        <h4>Serviços:</h4>
                                        <ul>
                                            <li>Certificação de investidores da diáspora</li>
                                            <li>Assistência na obtenção de benefícios fiscais</li>
                                            <li>Facilitação de parcerias estratégicas para projetos de desenvolvimento</li>
                                        </ul>
                                    </div>
                                    <div class="contact-info">
                                        <p><strong>Website:</strong> <a href="https://www.gov.cv" target="_blank" rel="noopener">www.gov.cv</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flip-card fade-in">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <div class="institution-logo">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/logo-partner-2.png" alt="Pró-Empresa" class="institution-logo-img">
                                    <p class="click-hint">Clique para ver mais informações</p>
                                </div>
                            </div>
                            <div class="flip-card-back">
                                <div class="institution-content">
                                    <h3>Pró-Empresa</h3>
                                    <p><strong>Missão:</strong> Apoiar a criação e desenvolvimento de pequenas e médias empresas.</p>
                                    <div class="services-list">
                                        <h4>Serviços:</h4>
                                        <ul>
                                            <li>Acompanhamento no processo de registo de empresas</li>
                                            <li>Financiamento</li>
                                            <li>Consultoria de negócios</li>
                                        </ul>
                                    </div>
                                    <div class="contact-info">
                                        <p><strong>Website:</strong> <a href="https://www.proempresa.cv" target="_blank" rel="noopener">www.proempresa.cv</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flip-card fade-in">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <div class="institution-logo">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/logo-partner-3.png" alt="Cabo Verde TradeInvest" class="institution-logo-img">
                                    <p class="click-hint">Clique para ver mais informações</p>
                                </div>
                            </div>
                            <div class="flip-card-back">
                                <div class="institution-content">
                                    <h3>Pró-Capital</h3>
                                    <p><strong>Missão:</strong> Fornecer soluções de financiamento, especialmente através de capital de risco, para projetos inovadores.</p>
                                    <div class="services-list">
                                        <h4>Serviços:</h4>
                                        <ul>
                                            <li>Apoio ao financiamento de startups</li>
                                            <li>Financiamento de empresas em expansão</li>
                                            <li>Foco em inovação</li>
                                        </ul>
                                    </div>
                                    <div class="contact-info">
                                        <p><strong>Website:</strong> <a href="https://www.procapital.cv" target="_blank" rel="noopener">www.procapital.cv</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flip-card fade-in">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <div class="institution-logo">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/logo-partner-4.png" alt="United Nations Cabo Verde" class="institution-logo-img">
                                    <p class="click-hint">Clique para ver mais informações</p>
                                </div>
                            </div>
                            <div class="flip-card-back">
                                <div class="institution-content">
                                    <h3>Direções Gerais e Institutos Públicos</h3>
                                    <p><strong>Missão:</strong> Regulação e apoio aos diversos setores económicos de Cabo Verde.</p>
                                    <div class="services-list">
                                        <h4>Áreas de Atuação:</h4>
                                        <ul>
                                            <li><strong>Comércio:</strong> Regulação das atividades comerciais, apoio ao licenciamento</li>
                                            <li><strong>Ambiente:</strong> Licenciamento ambiental para projetos que possam impactar o ecossistema</li>
                                            <li><strong>Agricultura e Pescas:</strong> Regulação e promoção do setor agropecuário e pesqueiro</li>
                                            <li><strong>Indústria e Turismo:</strong> Apoio ao desenvolvimento de empreendimentos industriais e turísticos, fornecendo licenças e regulando o setor</li>
                                        </ul>
                                        
                                        <h4>Câmaras de Comércio (Barlavento e Sotavento):</h4>
                                        <p><strong>Missão:</strong> Facilitar o diálogo entre o setor privado e o governo, promovendo o crescimento empresarial.</p>
                                        <ul>
                                            <li>Consultoria</li>
                                            <li>Registo de empresas</li>
                                            <li>Promoção de parcerias estratégicas</li>
                                        </ul>
                                    </div>
                                    <div class="contact-info">
                                        <p><strong>Website:</strong> <a href="https://www.gov.cv" target="_blank" rel="noopener">www.gov.cv</a></p>
                                        <p><strong>Câmaras de Comércio:</strong> <a href="https://www.ccb.cv" target="_blank" rel="noopener">www.ccb.cv</a> (Barlavento) | <a href="https://www.ccs.cv" target="_blank" rel="noopener">www.ccs.cv</a> (Sotavento)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- Download Section -->
    <section class="info-section" id="download">
        <div class="container content-split">
            <div class="text-content fade-in">
                <h2><?php echo get_theme_mod('download_title', 'Faça o Download do Guia'); ?></h2>
                <p><?php echo get_theme_mod('download_subtitle', 'Obtenha a versão completa do "Guia do Investidor da Diáspora" para aceder a todas as informações detalhadas, contactos e recursos necessários.'); ?></p>
                <div class="download-buttons">
                    <button class="download-btn" data-lang="pt">Português</button>
                    <button class="download-btn" data-lang="en">English</button>
                    <button class="download-btn" data-lang="fr">Français</button>
                </div>
            </div>
            <div class="image-content fade-in">
                <img src="<?php echo get_template_directory_uri(); ?>/images/download-cover.jpg" alt="Capa do Guia">
            </div>
        </div>
    </section>
</main>

<!-- Download Modal -->
<div id="downloadModal" class="modal">
    <div class="modal-content">
        <span class="close-button">×</span>
        <h3>Download do Guia</h3>
        <form id="downloadForm">
            <input type="email" id="emailInput" placeholder="seu.email@exemplo.com" required>
            <input type="hidden" id="langInput" value="">
            <button type="submit">Receber o Guia</button>
        </form>
        <p id="formMessage" class="form-message"></p>
    </div>
</div>

<!-- Opportunities Modal -->
<div id="oppModal" class="opp-modal" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="opp-backdrop"></div>
    <div class="opp-dialog" role="document">
        <button class="opp-close" aria-label="Fechar">×</button>
        <div class="opp-media">
            <img id="oppImage" alt="">
        </div>
        <div class="opp-body">
            <h3 id="oppTitle"></h3>
            <p id="oppText"></p>
        </div>
        <div class="opp-dots" id="oppDots" aria-label="Navegação de slides"></div>
    </div>
</div>

<?php get_footer(); ?>

