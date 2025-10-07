jQuery(document).ready(function($) {

    // 1. Enhanced Mobile Navigation (Hamburger Menu)
    const hamburger = $('.hamburger');
    const navLinks = $('.nav-links');

    hamburger.on('click', function() {
        navLinks.toggleClass('nav-active');
        hamburger.toggleClass('toggle');
    });

    navLinks.find('a').on('click', function() {
        if (navLinks.hasClass('nav-active')) {
            navLinks.removeClass('nav-active');
            hamburger.removeClass('toggle');
        }
    });

    // 2. Enhanced Header Scroll Effect
    const header = $('.site-header');
    let lastScrollY = window.scrollY;
    
    $(window).on('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for backdrop blur effect
        if (currentScrollY > 50) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
        
        // Hide/show header on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.css('transform', 'translateY(-100%)');
        } else {
            header.css('transform', 'translateY(0)');
        }
        
        lastScrollY = currentScrollY;
    });

    // 3. Enhanced Fade-in animations on scroll with staggered timing
    const faders = $('.fade-in');
    const appearOptions = { 
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" 
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return;
            
            // Add staggered delay for grid items
            const delay = $(entry.target).hasClass('reason-item') || 
                         $(entry.target).hasClass('opportunity-card') ||
                         $(entry.target).hasClass('testimonial-card') ||
                         $(entry.target).hasClass('flip-card') 
                         ? index * 100 : 0;
            
            setTimeout(() => {
                $(entry.target).addClass('visible');
            }, delay);
            
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    
    faders.each(function() { 
        appearOnScroll.observe(this); 
    });

    // Ensure opportunity cards animate even if already in view on load
    const oppCardsForAnim = $('.opportunity-card');
    oppCardsForAnim.each(function(index) {
        const rect = this.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
            setTimeout(() => {
                $(this).addClass('visible');
            }, index * 100);
        }
    });
    
    // 4. Enhanced Active navigation link highlighting on scroll
    const sections = $('section[id]');
    const navLi = $('.nav-links li a');
    const highlightOptions = { rootMargin: '-20% 0px -70% 0px' };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navLi.removeClass('active');
                navLi.filter(`[href="#${currentId}"]`).addClass('active');
            }
        });
    }, highlightOptions);
    
    sections.each(function() { 
        sectionObserver.observe(this); 
    });
    
    // 5. Enhanced Download Modal Logic with better UX
    const modal = $('#downloadModal');
    if(modal.length) {
        const downloadButtons = $('.download-btn');
        const closeButton = $('.close-button');
        const downloadForm = $('#downloadForm');
        const langInput = $('#langInput');
        const formMessage = $('#formMessage');

        downloadButtons.on('click', function() {
            const lang = $(this).data('lang');
            langInput.val(lang);
            formMessage.text('');
            modal.css('display', 'flex');
            
            // Add entrance animation
            setTimeout(() => {
                modal.find('.modal-content').css('transform', 'scale(1)');
            }, 10);
        });
        
        closeButton.on('click', function() { 
            modal.find('.modal-content').css('transform', 'scale(0.9)');
            setTimeout(() => {
                modal.css('display', 'none');
            }, 200);
        });
        
        $(window).on('click', function(event) { 
            if (event.target == modal[0]) {
                modal.find('.modal-content').css('transform', 'scale(0.9)');
                setTimeout(() => {
                    modal.css('display', 'none');
                }, 200);
            }
        });
        
        downloadForm.on('submit', function(event) {
            event.preventDefault(); 
            const email = $('#emailInput').val();
            const lang = langInput.val();
            
            // Enhanced success message with animation
            formMessage.text('Obrigado! O seu download irá começar em breve.');
            formMessage.css({
                'color': 'green',
                'transform': 'scale(1.1)'
            });
            
            setTimeout(() => {
                formMessage.css('transform', 'scale(1)');
            }, 200);
            
            // AJAX call to WordPress
            $.ajax({
                url: ajax_object.ajax_url,
                type: 'POST',
                data: {
                    action: 'handle_download',
                    email: email,
                    language: lang,
                    nonce: ajax_object.nonce
                },
                success: function(response) {
                    if (response.success) {
                        console.log('Download processed:', response.data);
                        setTimeout(() => {
                            modal.css('display', 'none');
                            downloadForm[0].reset();
                        }, 1500);
                    }
                },
                error: function() {
                    formMessage.text('Erro ao processar o download. Tente novamente.');
                    formMessage.css('color', 'red');
                }
            });
        });
    }

    // 6. Enhanced PRINCÍPIOS image with better error handling
    const principiosImg = $('#principios-image');
    const principiosCaption = $('#principios-caption');
    if (principiosImg.length) {
        principiosImg.on('load', function() {
            $(this).css('minHeight', '0');
            console.log('[Principios] Image loaded:', this.currentSrc, this.naturalWidth + 'x' + this.naturalHeight);
        });
        principiosImg.on('error', function() {
            console.error('[Principios] Failed to load image at path:', $(this).attr('src'));
            $(this).css({
                'background': '#fee',
                'border': '1px solid #f99'
            });
            principiosCaption.text('Falha ao carregar a imagem (verifique o caminho: ./images/visual-selection.png)');
        });
    }

    // 7. Enhanced Opportunities Modal with improved animations and content
    const oppCards = $('.opportunity-card[data-key]');
    const oppModal = $('#oppModal');
    const oppBackdrop = oppModal.find('.opp-backdrop');
    const oppClose = oppModal.find('.opp-close');
    const oppImage = $('#oppImage');
    const oppTitle = $('#oppTitle');
    const oppText = $('#oppText');
    const oppDotsWrap = $('#oppDots');

    // Enhanced data map with more detailed content
    const OPPS = {
      'agronegocio': { 
        title: 'Agronegócio',
        text: 'Potencial Agrícola — Cabo Verde possui um clima estável e temperaturas amenas ao longo do ano, permitindo produções agrícolas previsíveis e com menor risco climático. As ilhas de Santiago, S. Antão, Fogo, Brava e S. Nicolau são as ilhas com maior potencial agrícola.\n\nOportunidades de Mercado — Atualmente, cerca de 70% dos alimentos consumidos no país são importados, o que torna os produtos locais altamente competitivos e reduz a dependência externa. O mercado europeu de alimentos orgânicos está avaliado em mais de 50 bilhões de euros, apresentando uma oportunidade para exportação de produtos agrícolas sustentáveis.',
        image: ajax_object.template_url + '/images/agronegocio.jpg'
      },
      'industria': { 
        title: 'Indústria',
        text: 'Cabo Verde oferece excelentes oportunidades para o desenvolvimento industrial, com foco em setores como processamento de alimentos, têxteis, e produtos farmacêuticos. A localização estratégica do país facilita o acesso aos mercados europeu, africano e americano.\n\nO governo cabo-verdiano implementou políticas de incentivo fiscal e infraestruturas modernas para apoiar o crescimento industrial. As zonas económicas especiais oferecem condições vantajosas para investidores, incluindo isenções fiscais e procedimentos administrativos simplificados.',
        image: ajax_object.template_url + '/images/industria.jpg'
      },
      'economia-digital': { 
        title: 'Economia Digital',
        text: 'Cabo Verde está a emergir como um hub tecnológico na África Ocidental, com investimentos significativos em infraestruturas digitais e conectividade. O país oferece oportunidades únicas em desenvolvimento de software, serviços de TI, e-commerce e transformação digital.\n\nCom uma população jovem e tecnologicamente adaptável, Cabo Verde apresenta um ambiente ideal para startups e empresas de tecnologia. O governo apoia ativamente a inovação digital através de programas de incubação e parcerias internacionais.',
        image: ajax_object.template_url + '/images/economia-digital.jpg'
      },
      'turismo': { 
        title: 'Turismo',
        text: 'O turismo é um dos pilares da economia cabo-verdiana, com um potencial de crescimento excecional. O país oferece uma combinação única de praias paradisíacas, cultura rica e hospitalidade excecional.\n\nAs oportunidades incluem desenvolvimento hoteleiro, turismo de experiência, ecoturismo e turismo cultural. O governo implementou políticas para diversificar a oferta turística e atrair investimentos em infraestruturas turísticas de qualidade.',
        image: ajax_object.template_url + '/images/turismo.jpg'
      },
      'economia-verde': { 
        title: 'Economia Verde',
        text: 'Cabo Verde está comprometido com o desenvolvimento sustentável e a transição para uma economia verde. O país oferece oportunidades únicas em energias renováveis, especialmente solar e eólica, aproveitando o clima favorável e a localização geográfica.\n\nOutras áreas de oportunidade incluem gestão de resíduos, agricultura sustentável, e ecoturismo. O governo implementou políticas ambiciosas para alcançar 100% de energia renovável até 2030, criando um ambiente propício para investimentos verdes.',
        image: ajax_object.template_url + '/images/economia-verde.jpg'
      },
      'economia-azul': { 
        title: 'Economia Azul',
        text: 'Com uma zona económica exclusiva de 700.000 km², Cabo Verde possui um potencial excecional na economia azul. O país oferece oportunidades em pesca sustentável, aquacultura, biotecnologia marinha e turismo costeiro.\n\nO governo cabo-verdiano desenvolveu uma estratégia nacional para a economia azul, focada na conservação marinha e no desenvolvimento económico sustentável. As oportunidades incluem desenvolvimento de portos, logística marítima e investigação oceanográfica.',
        image: ajax_object.template_url + '/images/economia-azul.jpg'
      }
    };

    let currentIdx = 0;
    const keys = oppCards.map(function() { return $(this).data('key'); }).get();
    let isAnimatingSlide = false;

    function activateDot(i) {
      if (!oppDotsWrap.length) return;
      oppDotsWrap.find('.opp-dot').each(function(idx) {
        $(this).toggleClass('active', idx === i);
      });
    }

    // Enhanced slide animation with better transitions
    function swapImage(nextIdx) {
      if (isAnimatingSlide || !oppImage.length) return;
      isAnimatingSlide = true;

      const out = oppImage.clone();
      out.css({
        'position': 'absolute',
        'left': '0',
        'top': oppImage.offset().top + 'px',
        'width': oppImage.outerWidth() + 'px',
        'height': oppImage.outerHeight() + 'px',
        'transform': 'translateX(0)',
        'transition': 'transform 420ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      oppImage.parent().append(out);

      const key = keys[nextIdx];
      const data = OPPS[key];

      // Prepare incoming image with enhanced animation
      oppImage.attr('src', data.image);
      oppImage.attr('alt', data.title);
      oppImage.css({
        'transform': 'translateX(100%)',
        'transition': 'transform 420ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });

      requestAnimationFrame(() => {
        out.css('transform', 'translateX(-100%)');
        oppImage.css('transform', 'translateX(0)');
      });

      // Enhanced content animation
      oppTitle.text(data.title);
      const html = (data.text || '').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
      oppText.html(`<p>${html}</p>`);

      setTimeout(() => {
        out.remove();
        isAnimatingSlide = false;
      }, 450);
    }

    function openOpp(index) {
      if (!oppModal.length) return;
      currentIdx = (index + keys.length) % keys.length;
      const key = keys[currentIdx];
      const data = OPPS[key];

      // Build dots on first open with enhanced styling
      if (oppDotsWrap.length && oppDotsWrap.children().length === 0) {
        keys.forEach((_, i) => {
          const dot = $('<button>').attr({
            'type': 'button',
            'class': 'opp-dot' + (i === currentIdx ? ' active' : ''),
            'aria-label': `Ir para slide ${i+1}`
          });
          dot.on('click', function() {
            if (i === currentIdx) return;
            const next = i;
            swapImage(next);
            currentIdx = next;
            activateDot(currentIdx);
          });
          oppDotsWrap.append(dot);
        });
      } else {
        activateDot(currentIdx);
      }

      oppImage.attr('src', data.image);
      oppImage.attr('alt', data.title);
      oppTitle.text(data.title);
      const html = (data.text || '')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
      oppText.html(`<p>${html}</p>`);

      // Enhanced modal opening animation
      oppModal.addClass('show');
      oppModal.attr('aria-hidden', 'false');
      $('body').css('overflow', 'hidden');
      $('body').addClass('opp-dimmed');
      $('html').addClass('modal-open');
    }

    function closeOpp() {
      if (!oppModal.length) return;
      
      // Enhanced closing animation
      oppModal.removeClass('show');
      oppModal.attr('aria-hidden', 'true');
      $('body').css('overflow', '');
      $('body').removeClass('opp-dimmed');
      $('html').removeClass('modal-open');
    }

    if (oppCards.length && oppModal.length) {
      oppCards.on('click', function(e) {
        e.preventDefault();
        const idx = oppCards.index(this);
        openOpp(idx);
      });
      
      oppClose.on('click', closeOpp);
      oppBackdrop.on('click', closeOpp);
      
      // Enhanced keyboard navigation
      $(document).on('keydown', function(e) {
        if (oppModal.hasClass('show')) {
          if (e.key === 'Escape') closeOpp();
          if (e.key === 'ArrowLeft') {
            const next = (currentIdx - 1 + keys.length) % keys.length;
            swapImage(next);
            currentIdx = next;
            activateDot(currentIdx);
          }
          if (e.key === 'ArrowRight') {
            const next = (currentIdx + 1) % keys.length;
            swapImage(next);
            currentIdx = next;
            activateDot(currentIdx);
          }
        }
      });
    }

    // 8. ENHANCED INTERACTIVE SDG WHEEL LOGIC WITH IMPROVED BROWSER COMPATIBILITY
    const sdgWheel = $('#sdg-wheel');
    const hoverImages = $('.sdg-hover-image');
    const sdgInfoContainer = $('#sdg-info-container');
    
    // Enhanced SDG Goals data with all 17 goals having images
    const sdgData = {
        1: { title: "Erradicação da Pobreza", description: "Oportuniza direta e indiretamente o acesso de homens e mulheres a recursos económicos e proteção social.", hasImage: true },
        2: { title: "Fome Zero e Agricultura Sustentável", description: "Contribui para o acesso ao alimento e redução da fome. Oferta de produtos nutritivos e seguros.", hasImage: true },
        3: { title: "Saúde e Bem-estar", description: "Acesso a serviços essenciais para a qualidade de vida dos colaboradores. Exigência na cadeia de abastecimento de condições de trabalho em ambiente saudável e seguro.", hasImage: true },
        4: { title: "Qualidade de Educação", description: "Oportunidades de acesso à educação e desenvolvimento para funcionários, familiares e comunidades do entorno.", hasImage: true },
        5: { title: "Igualdade de Género", description: "Estimula a participação plena e efetiva das mulheres e a igualdade de oportunidades. Fomenta a ocupação de mulheres em cargos de liderança.", hasImage: true },
        6: { title: "Água Potável e Saneamento", description: "Contribui com a qualidade da água e fomenta o uso eficiente do recurso hídrico.", hasImage: true },
        7: { title: "Energia Limpa e Acessível", description: "Adoção de fontes renováveis e incorporação de tecnologias para ampliar a eficiência energética do seu processo produtivo.", hasImage: true },
        8: { title: "Trabalho Decente e Crescimento Económico", description: "Geração de emprego digno e rendimento. Incentivo do trabalho decente na cadeia de valor. Estímulo ao empreendedorismo na comunidade.", hasImage: true },
        9: { title: "Indústria, Inovação e Infraestrutura", description: "Promoção da industrialização inclusiva e sustentável. Modernização da infraestrutura. Fomento à tecnologia, à pesquisa e à inovação.", hasImage: true },
        10: { title: "Redução das Desigualdades", description: "Estímulo ao empoderamento e à promoção da inclusão social e económica.", hasImage: true },
        11: { title: "Cidades e Comunidades Sustentáveis", description: "Fomento à proteção e salvaguarda do património cultural e natural do mundo.", hasImage: true },
        12: { title: "Consumo e Produção Responsáveis", description: "Gestão sustentável e o uso eficiente dos recursos naturais na produção. Redução do desperdício de alimentos. Realização de compras sustentáveis.", hasImage: true },
        13: { title: "Ação contra a Mudança Global do Clima", description: "Otimização do processo para redução das emissões de GEE.", hasImage: true },
        14: { title: "Vida na Água", description: "Realização de campanhas para conservação da zona costeira.", hasImage: true },
        15: { title: "Vida Terrestre", description: "Preservação de fragmentos florestais, inclusive em áreas montanhosas e de terras áridas.", hasImage: true },
        16: { title: "Paz, Justiça e Instituições Eficazes", description: "Atua contra a corrupção e o suborno em todas as suas formas.", hasImage: true },
        17: { title: "Parcerias e Meios de Implementação", description: "Incentivo e promoção de parcerias para o desenvolvimento sustentável.", hasImage: true }
    };
    
    if (sdgWheel.length) {
        // Precise mapping based on actual angle measurements
        const getGoalFromAngleV2 = (angle) => {
            angle = ((angle % 360) + 360) % 360;
            
            const goalRanges = [
                { goal: 1, min: 275.4, max: 297.3 },
                { goal: 2, min: 297.3, max: 318.6 },
                { goal: 3, min: 318.6, max: 340.7 },
                { goal: 4, min: 340.7, max: 360 },
                { goal: 5, min: 0, max: 21.2 },
                { goal: 6, min: 21.2, max: 42.4 },
                { goal: 7, min: 42.4, max: 63.6 },
                { goal: 8, min: 63.6, max: 84.8 },
                { goal: 9, min: 84.8, max: 106.4 },
                { goal: 10, min: 106.4, max: 127.5 },
                { goal: 11, min: 127.5, max: 148.3 },
                { goal: 12, min: 148.3, max: 169.8 },
                { goal: 13, min: 169.8, max: 192 },
                { goal: 14, min: 192, max: 211 },
                { goal: 15, min: 211, max: 233 },
                { goal: 16, min: 233, max: 256 },
                { goal: 17, min: 256, max: 275.4 }
            ];
            
            for (const range of goalRanges) {
                if (range.min <= range.max) {
                    if (angle >= range.min && angle < range.max) {
                        return range.goal;
                    }
                } else {
                    if (angle >= range.min || angle < range.max) {
                        return range.goal;
                    }
                }
            }
            
            return 5;
        };
        
        // Function to hide all hover images and info with better performance
        const hideAllHovers = () => {
            requestAnimationFrame(() => {
                hoverImages.removeClass('visible');
                hideSDGInfo();
            });
        };

        // Enhanced function to show SDG info with accessibility improvements
        const showSDGInfo = (goalNumber) => {
            const data = sdgData[goalNumber];
            if (!data || !sdgInfoContainer.length) return;
            
            sdgInfoContainer.html(`
                <div class="sdg-info-content">
                    <h4>ODS ${goalNumber}: ${data.title}</h4>
                    <p>${data.description}</p>
                </div>
            `);
            
            requestAnimationFrame(() => {
                sdgInfoContainer.addClass('visible');
            });
            
            sdgInfoContainer.attr('aria-label', `ODS ${goalNumber}: ${data.title}`);
        };

        const hideSDGInfo = () => {
            if (sdgInfoContainer.length) {
                sdgInfoContainer.removeClass('visible');
            }
        };

        // Enhanced function to show goal information with better performance
        const showGoal = (goalNumber) => {
            const data = sdgData[goalNumber];
            if (!data) return;

            const imageToShow = $(`#goal-${goalNumber}-image`);
            if (imageToShow.length) {
                hoverImages.removeClass('visible');
                
                requestAnimationFrame(() => {
                    imageToShow.addClass('visible');
                });
                
                showSDGInfo(goalNumber);
            }
        };

        // Enhanced mouse position calculation with better accuracy
        const getMouseAngle = (event) => {
            const rect = sdgWheel[0].getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = event.clientX - centerX;
            const mouseY = event.clientY - centerY;
            
            let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
            
            if (angle < 0) {
                angle += 360;
            }
            
            return angle;
        };

        // Enhanced function to check if mouse/touch is within the wheel
        const isInWheel = (event) => {
            const rect = sdgWheel[0].getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = event.clientX - centerX;
            const mouseY = event.clientY - centerY;
            const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
            
            const outerRadius = Math.min(rect.width, rect.height) / 2;
            const innerRadius = outerRadius * 0.15;
            const tolerance = outerRadius * 0.1;
            
            return distance >= (innerRadius - tolerance) && distance <= (outerRadius + tolerance);
        };

        let currentGoal = null;
        let hoverTimeout = null;

        // Enhanced mouse move handler with improved responsiveness
        const handleMouseMove = (event) => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
            
            hoverTimeout = requestAnimationFrame(() => {
                if (isInWheel(event)) {
                    const angle = getMouseAngle(event);
                    const goal = getGoalFromAngleV2(angle);
                    
                    if (goal !== currentGoal) {
                        hideAllHovers();
                        showGoal(goal);
                        currentGoal = goal;
                        sdgWheel.css('cursor', 'pointer');
                    }
                } else {
                    if (currentGoal !== null) {
                        hideAllHovers();
                        currentGoal = null;
                        sdgWheel.css('cursor', 'default');
                    }
                }
            });
        };

        // Enhanced click handler for touch devices with better feedback
        const handleClick = (event) => {
            event.preventDefault();
            
            if (isInWheel(event)) {
                const angle = getMouseAngle(event);
                const goal = getGoalFromAngleV2(angle);
                
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
                
                if (currentGoal === goal) {
                    hideAllHovers();
                    currentGoal = null;
                } else {
                    hideAllHovers();
                    showGoal(goal);
                    currentGoal = goal;
                }
            } else {
                hideAllHovers();
                currentGoal = null;
            }
        };

        // Enhanced mouse leave handler
        const handleMouseLeave = () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
            hideAllHovers();
            currentGoal = null;
            sdgWheel.css('cursor', 'default');
        };

        // Touch event handlers for better mobile support
        const handleTouchStart = (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            handleClick(touch);
        };

        const handleTouchMove = (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            handleMouseMove(touch);
        };

        // Add event listeners with passive options for better performance
        sdgWheel.on('mousemove', handleMouseMove);
        sdgWheel.on('click', handleClick);
        sdgWheel.on('mouseleave', handleMouseLeave);
        
        // Enhanced touch support
        sdgWheel.on('touchstart', handleTouchStart);
        sdgWheel.on('touchmove', handleTouchMove);
        sdgWheel.on('touchend', handleMouseLeave);

        // Keyboard navigation support for accessibility
        sdgWheel.on('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const nextGoal = currentGoal ? (currentGoal % 17) + 1 : 1;
                hideAllHovers();
                showGoal(nextGoal);
                currentGoal = nextGoal;
            } else if (event.key === 'Escape') {
                hideAllHovers();
                currentGoal = null;
            }
        });

        // Make wheel focusable for keyboard navigation
        sdgWheel.attr({
            'tabindex': '0',
            'role': 'button',
            'aria-label': 'Roda interativa dos Objetivos de Desenvolvimento Sustentável'
        });

        // Hide info when clicking outside the SDG container
        $(document).on('click', function(e) {
            const sdgContainer = $('.sdg-container');
            if (sdgContainer.length && !sdgContainer[0].contains(e.target)) {
                hideAllHovers();
                currentGoal = null;
            }
        });
    }

    // 9. Enhanced Scroll Progress Indicator
    const createScrollProgress = () => {
        const progressBar = $('<div>').css({
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '0%',
            'height': '3px',
            'background': 'linear-gradient(90deg, #0056b3, #0d2f4f)',
            'z-index': '1001',
            'transition': 'width 0.1s ease'
        });
        $('body').append(progressBar);

        $(window).on('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.css('width', scrollPercent + '%');
        });
    };

    createScrollProgress();

    // 10. Enhanced Button Interactions
    $('button, .cta-button, .download-btn').on('mouseenter', function() {
        $(this).css('transform', 'translateY(-2px) scale(1.02)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translateY(0) scale(1)');
    });

    // 11. Enhanced Card Hover Effects
    $('.reason-item, .testimonial-card, .flip-card').on('mouseenter', function() {
        $(this).css('transform', 'translateY(-8px) scale(1.02)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translateY(0) scale(1)');
    });

    // 12. Smooth Scrolling for Navigation Links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            target[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // 13. Flip Card Functionality for Institutions
    $('.flip-card').on('click', function() {
        $(this).toggleClass('flipped');
        
        // Add a subtle animation effect
        $(this).css('transform', 'scale(0.98)');
        setTimeout(() => {
            $(this).css('transform', 'scale(1)');
        }, 150);
    });
    
    // Add hover effect for better UX
    $('.flip-card').on('mouseenter', function() {
        if (!$(this).hasClass('flipped')) {
            $(this).css('transform', 'translateY(-5px)');
        }
    }).on('mouseleave', function() {
        if (!$(this).hasClass('flipped')) {
            $(this).css('transform', 'translateY(0)');
        }
    });

});



