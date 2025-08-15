document.addEventListener('DOMContentLoaded', () => {

    // 1. Enhanced Mobile Navigation (Hamburger Menu)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // 2. Enhanced Header Scroll Effect
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for backdrop blur effect
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // 3. Enhanced Fade-in animations on scroll with staggered timing
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { 
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" 
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return;
            
            // Add staggered delay for grid items
            const delay = entry.target.classList.contains('reason-item') || 
                         entry.target.classList.contains('opportunity-card') ||
                         entry.target.classList.contains('testimonial-card') ||
                         entry.target.classList.contains('institution-card') 
                         ? index * 100 : 0;
            
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    
    faders.forEach(fader => { 
        appearOnScroll.observe(fader); 
    });

    // Ensure opportunity cards animate even if already in view on load
    const oppCardsForAnim = document.querySelectorAll('.opportunity-card');
    oppCardsForAnim.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        }
    });
    
    // Fallback for cards that might be missed
    setTimeout(() => {
        document.querySelectorAll('.opportunity-card.fade-in').forEach((c, index) => {
            if (!c.classList.contains('visible')) {
                const r = c.getBoundingClientRect();
                if (r.top < window.innerHeight && r.bottom > 0) {
                    setTimeout(() => {
                        c.classList.add('visible');
                    }, index * 100);
                }
            }
        });
    }, 400);
    
    // 4. Enhanced Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.nav-links li a');
    const highlightOptions = { rootMargin: '-20% 0px -70% 0px' };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navLi.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, highlightOptions);
    
    sections.forEach(section => { 
        sectionObserver.observe(section); 
    });
    
    // 5. Enhanced Download Modal Logic with better UX
    const modal = document.getElementById('downloadModal');
    if(modal) {
        const downloadButtons = document.querySelectorAll('.download-btn');
        const closeButton = document.querySelector('.close-button');
        const downloadForm = document.getElementById('downloadForm');
        const langInput = document.getElementById('langInput');
        const formMessage = document.getElementById('formMessage');
        const fileMap = { 
            'pt': './guides/guia_investidor_pt.pdf', 
            'en': './guides/investor_guide_en.pdf', 
            'fr': './guides/guide_investisseur_fr.pdf' 
        };

        downloadButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                langInput.value = lang;
                formMessage.textContent = '';
                modal.style.display = 'flex';
                
                // Add entrance animation
                setTimeout(() => {
                    modal.querySelector('.modal-content').style.transform = 'scale(1)';
                }, 10);
            });
        });
        
        closeButton.addEventListener('click', () => { 
            modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 200);
        });
        
        window.addEventListener('click', (event) => { 
            if (event.target == modal) {
                modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 200);
            }
        });
        
        downloadForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            const email = document.getElementById('emailInput').value;
            const lang = langInput.value;
            console.log(`Email captured: ${email}, Language: ${lang}`);
            
            // Enhanced success message with animation
            formMessage.textContent = 'Obrigado! O seu download irá começar em breve.';
            formMessage.style.color = 'green';
            formMessage.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                formMessage.style.transform = 'scale(1)';
            }, 200);
            
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = fileMap[lang]; 
                link.download = fileMap[lang].split('/').pop();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                modal.style.display = 'none';
                downloadForm.reset();
            }, 1500);
        });
    }

    // 6. Enhanced PRINCÍPIOS image with better error handling
    const principiosImg = document.getElementById('principios-image');
    const principiosCaption = document.getElementById('principios-caption');
    if (principiosImg) {
        principiosImg.addEventListener('load', () => {
            principiosImg.style.minHeight = '0';
            console.log('[Principios] Image loaded:', principiosImg.currentSrc, principiosImg.naturalWidth + 'x' + principiosImg.naturalHeight);
        });
        principiosImg.addEventListener('error', () => {
            console.error('[Principios] Failed to load image at path:', principiosImg.getAttribute('src'));
            principiosImg.style.background = '#fee';
            principiosImg.style.border = '1px solid #f99';
            principiosCaption.textContent = 'Falha ao carregar a imagem (verifique o caminho: ./images/visual-selection.png)';
        });
    }

    // 7. Enhanced Opportunities Modal with improved animations and content
    const oppCards = document.querySelectorAll('.opportunity-card[data-key]');
    const oppModal = document.getElementById('oppModal');
    const oppBackdrop = oppModal ? oppModal.querySelector('.opp-backdrop') : null;
    const oppClose = oppModal ? oppModal.querySelector('.opp-close') : null;
    const oppImage = oppModal ? document.getElementById('oppImage') : null;
    const oppTitle = oppModal ? document.getElementById('oppTitle') : null;
    const oppText  = oppModal ? document.getElementById('oppText')  : null;
    const oppDotsWrap = oppModal ? document.getElementById('oppDots') : null;

    // Enhanced data map with more detailed content
    const OPPS = {
      'agronegocio': { 
        title: 'Agronegócio',
        text: 'Potencial Agrícola — Cabo Verde possui um clima estável e temperaturas amenas ao longo do ano, permitindo produções agrícolas previsíveis e com menor risco climático. As ilhas de Santiago, S. Antão, Fogo, Brava e S. Nicolau são as ilhas com maior potencial agrícola.\n\nOportunidades de Mercado — Atualmente, cerca de 70% dos alimentos consumidos no país são importados, o que torna os produtos locais altamente competitivos e reduz a dependência externa. O mercado europeu de alimentos orgânicos está avaliado em mais de 50 bilhões de euros, apresentando uma oportunidade para exportação de produtos agrícolas sustentáveis.',
        image: './images/agronegocio.jpg'
      },
      'industria': { 
        title: 'Indústria',
        text: 'Cabo Verde oferece excelentes oportunidades para o desenvolvimento industrial, com foco em setores como processamento de alimentos, têxteis, e produtos farmacêuticos. A localização estratégica do país facilita o acesso aos mercados europeu, africano e americano.\n\nO governo cabo-verdiano implementou políticas de incentivo fiscal e infraestruturas modernas para apoiar o crescimento industrial. As zonas económicas especiais oferecem condições vantajosas para investidores, incluindo isenções fiscais e procedimentos administrativos simplificados.',
        image: './images/industria.jpg'
      },
      'economia-digital': { 
        title: 'Economia Digital',
        text: 'Cabo Verde está a emergir como um hub tecnológico na África Ocidental, com investimentos significativos em infraestruturas digitais e conectividade. O país oferece oportunidades únicas em desenvolvimento de software, serviços de TI, e-commerce e transformação digital.\n\nCom uma população jovem e tecnologicamente adaptável, Cabo Verde apresenta um ambiente ideal para startups e empresas de tecnologia. O governo apoia ativamente a inovação digital através de programas de incubação e parcerias internacionais.',
        image: './images/economia-digital.jpg'
      },
      'turismo': { 
        title: 'Turismo',
        text: 'O turismo é um dos pilares da economia cabo-verdiana, com um potencial de crescimento excepcional. O país oferece uma combinação única de praias paradisíacas, cultura rica e hospitalidade excecional.\n\nAs oportunidades incluem desenvolvimento hoteleiro, turismo de experiência, ecoturismo e turismo cultural. O governo implementou políticas para diversificar a oferta turística e atrair investimentos em infraestruturas turísticas de qualidade.',
        image: './images/turismo.jpg'
      },
      'economia-verde': { 
        title: 'Economia Verde',
        text: 'Cabo Verde está comprometido com o desenvolvimento sustentável e a transição para uma economia verde. O país oferece oportunidades únicas em energias renováveis, especialmente solar e eólica, aproveitando o clima favorável e a localização geográfica.\n\nOutras áreas de oportunidade incluem gestão de resíduos, agricultura sustentável, e ecoturismo. O governo implementou políticas ambiciosas para alcançar 100% de energia renovável até 2030, criando um ambiente propício para investimentos verdes.',
        image: './images/economia-verde.jpg'
      },
      'economia-azul': { 
        title: 'Economia Azul',
        text: 'Com uma zona económica exclusiva de 700.000 km², Cabo Verde possui um potencial excecional na economia azul. O país oferece oportunidades em pesca sustentável, aquacultura, biotecnologia marinha e turismo costeiro.\n\nO governo cabo-verdiano desenvolveu uma estratégia nacional para a economia azul, focada na conservação marinha e no desenvolvimento económico sustentável. As oportunidades incluem desenvolvimento de portos, logística marítima e investigação oceanográfica.',
        image: './images/economia-azul.jpg'
      }
    };

    let currentIdx = 0;
    const keys = Array.from(oppCards).map(card => card.getAttribute('data-key'));
    let isAnimatingSlide = false;

    function activateDot(i) {
      if (!oppDotsWrap) return;
      oppDotsWrap.querySelectorAll('.opp-dot').forEach((d, idx) => {
        d.classList.toggle('active', idx === i);
      });
    }

    // Enhanced slide animation with better transitions
    function swapImage(nextIdx) {
      if (isAnimatingSlide || !oppImage) return;
      isAnimatingSlide = true;

      const out = oppImage.cloneNode(true);
      out.style.position = 'absolute';
      out.style.left = '0';
      out.style.top = oppImage.offsetTop + 'px';
      out.style.width = oppImage.offsetWidth + 'px';
      out.style.height = oppImage.offsetHeight + 'px';
      out.style.transform = 'translateX(0)';
      out.style.transition = 'transform 420ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      oppImage.parentElement.appendChild(out);

      const key = keys[nextIdx];
      const data = OPPS[key];

      // Prepare incoming image with enhanced animation
      oppImage.src = data.image;
      oppImage.alt = data.title;
      oppImage.style.transform = 'translateX(100%)';
      oppImage.style.transition = 'transform 420ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      requestAnimationFrame(() => {
        out.style.transform = 'translateX(-100%)';
        oppImage.style.transform = 'translateX(0)';
      });

      // Enhanced content animation
      oppTitle.textContent = data.title;
      const html = (data.text || '').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
      oppText.innerHTML = `<p>${html}</p>`;

      setTimeout(() => {
        out.remove();
        isAnimatingSlide = false;
      }, 450);
    }

    function openOpp(index) {
      if (!oppModal) return;
      currentIdx = (index + keys.length) % keys.length;
      const key = keys[currentIdx];
      const data = OPPS[key];

      // Build dots on first open with enhanced styling
      if (oppDotsWrap && oppDotsWrap.childElementCount === 0) {
        keys.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'opp-dot' + (i === currentIdx ? ' active' : '');
          dot.setAttribute('aria-label', `Ir para slide ${i+1}`);
          dot.addEventListener('click', () => {
            if (i === currentIdx) return;
            const next = i;
            swapImage(next);
            currentIdx = next;
            activateDot(currentIdx);
          });
          oppDotsWrap.appendChild(dot);
        });
      } else {
        activateDot(currentIdx);
      }

      oppImage.src = data.image;
      oppImage.alt = data.title;
      oppTitle.textContent = data.title;
      const html = (data.text || '')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
      oppText.innerHTML = `<p>${html}</p>`;

      // Enhanced modal opening animation
      oppModal.classList.add('show');
      oppModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('opp-dimmed');
      document.documentElement.classList.add('modal-open');
    }

    function closeOpp() {
      if (!oppModal) return;
      
      // Enhanced closing animation
      oppModal.classList.remove('show');
      oppModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.classList.remove('opp-dimmed');
      document.documentElement.classList.remove('modal-open');
    }

    if (oppCards.length && oppModal) {
      oppCards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          openOpp(idx);
        });
      });
      
      oppClose.addEventListener('click', closeOpp);
      oppBackdrop.addEventListener('click', closeOpp);
      
      // Enhanced keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (oppModal.classList.contains('show')) {
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

      // Enhanced touch and trackpad navigation
      const media = oppModal.querySelector('.opp-media');
      if (media) {
        const triggerSwipe = (dir) => {
          if (isAnimatingSlide) return;
          if (dir === 'left') {
            const next = (currentIdx + 1) % keys.length;
            swapImage(next);
            currentIdx = next;
          } else if (dir === 'right') {
            const next = (currentIdx - 1 + keys.length) % keys.length;
            swapImage(next);
            currentIdx = next;
          }
          activateDot(currentIdx);
        };

        let wheelCooldown = false;
        media.addEventListener('wheel', (e) => {
          const absX = Math.abs(e.deltaX);
          const absY = Math.abs(e.deltaY);
          if (absX < 30 || absX < absY) return;
          if (wheelCooldown) return;
          wheelCooldown = true;
          setTimeout(() => (wheelCooldown = false), 350);

          e.preventDefault();

          if (e.deltaX > 0) triggerSwipe('left');
          else triggerSwipe('right');
        }, { passive: false });

        let touchStartX = 0;
        media.addEventListener('touchstart', (e) => {
          if (!e.touches.length) return;
          touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        media.addEventListener('touchend', (e) => {
          const endX = (e.changedTouches && e.changedTouches[0].clientX) || touchStartX;
          const delta = endX - touchStartX;
          if (Math.abs(delta) > 40) triggerSwipe(delta < 0 ? 'left' : 'right');
        }, { passive: true });

        media.addEventListener('dragstart', (e) => e.preventDefault());
      }
    }

    // 7. ENHANCED INTERACTIVE SDG WHEEL LOGIC WITH IMPROVED BROWSER COMPATIBILITY
    const sdgWheel = document.getElementById('sdg-wheel');
    const hoverImages = document.querySelectorAll('.sdg-hover-image');
    const sdgInfoContainer = document.getElementById('sdg-info-container');
    
    // Enhanced SDG Goals data with all 17 goals having images
    const sdgData = {
        1: {
            title: "Erradicação da Pobreza",
            description: "Oportuniza direta e indiretamente o acesso de homens e mulheres a recursos económicos e proteção social.",
            hasImage: true
        },
        2: {
            title: "Fome Zero e Agricultura Sustentável", 
            description: "Contribui para o acesso ao alimento e redução da fome. Oferta de produtos nutritivos e seguros.",
            hasImage: true
        },
        3: {
            title: "Saúde e Bem-estar",
            description: "Acesso a serviços essenciais para a qualidade de vida dos colaboradores. Exigência na cadeia de abastecimento de condições de trabalho em ambiente saudável e seguro.",
            hasImage: true
        },
        4: {
            title: "Qualidade de Educação",
            description: "Oportunidades de acesso à educação e desenvolvimento para funcionários, familiares e comunidades do entorno.",
            hasImage: true
        },
        5: {
            title: "Igualdade de Género",
            description: "Estimula a participação plena e efetiva das mulheres e a igualdade de oportunidades. Fomenta a ocupação de mulheres em cargos de liderança.",
            hasImage: true
        },
        6: {
            title: "Água Potável e Saneamento",
            description: "Contribui com a qualidade da água e fomenta o uso eficiente do recurso hídrico.",
            hasImage: true
        },
        7: {
            title: "Energia Limpa e Acessível",
            description: "Adoção de fontes renováveis e incorporação de tecnologias para ampliar a eficiência energética do seu processo produtivo.",
            hasImage: true
        },
        8: {
            title: "Trabalho Decente e Crescimento Económico",
            description: "Geração de emprego digno e rendimento. Incentivo do trabalho decente na cadeia de valor. Estímulo ao empreendedorismo na comunidade.",
            hasImage: true
        },
        9: {
            title: "Indústria, Inovação e Infraestrutura",
            description: "Promoção da industrialização inclusiva e sustentável. Modernização da infraestrutura. Fomento à tecnologia, à pesquisa e à inovação.",
            hasImage: true
        },
        10: {
            title: "Redução das Desigualdades",
            description: "Estímulo ao empoderamento e à promoção da inclusão social e económica.",
            hasImage: true
        },
        11: {
            title: "Cidades e Comunidades Sustentáveis",
            description: "Fomento à proteção e salvaguarda do património cultural e natural do mundo.",
            hasImage: true
        },
        12: {
            title: "Consumo e Produção Responsáveis",
            description: "Gestão sustentável e o uso eficiente dos recursos naturais na produção. Redução do desperdício de alimentos. Realização de compras sustentáveis.",
            hasImage: true
        },
        13: {
            title: "Ação contra a Mudança Global do Clima",
            description: "Otimização do processo para redução das emissões de GEE.",
            hasImage: true
        },
        14: {
            title: "Vida na Água",
            description: "Realização de campanhas para conservação da zona costeira.",
            hasImage: true
        },
        15: {
            title: "Vida Terrestre",
            description: "Preservação de fragmentos florestais, inclusive em áreas montanhosas e de terras áridas.",
            hasImage: true
        },
        16: {
            title: "Paz, Justiça e Instituições Eficazes",
            description: "Atua contra a corrupção e o suborno em todas as suas formas.",
            hasImage: true
        },
        17: {
            title: "Parcerias e Meios de Implementação",
            description: "Incentivo e promoção de parcerias para o desenvolvimento sustentável.",
            hasImage: true
        }
    };
    
    if (sdgWheel) {
        // Enhanced goal mapping based on the actual SDG wheel image layout
        // Based on the visual analysis of the wheel, goals are arranged clockwise from top-right
        const getGoalFromAngle = (angle) => {
            // Normalize angle to 0-360 range
            angle = ((angle % 360) + 360) % 360;
            
            // Adjust for starting position - SDG 1 is at the top-right (around 45 degrees)
            // Rotate by -45 degrees to align with the actual wheel layout
            angle = (angle - 45 + 360) % 360;
            
            // Each goal occupies 360/17 ≈ 21.176 degrees
            const goalSize = 360 / 17;
            
            // Based on the visual wheel layout, clockwise from top-right:
            // This mapping needs to be calibrated based on the actual wheel image
            const goalOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
            
            // Calculate which segment the angle falls into
            const segment = Math.floor(angle / goalSize);
            
            // Return the corresponding goal (with bounds checking)
            return goalOrder[segment % 17];
        };
        
        // Precise mapping based on actual angle measurements
        const getGoalFromAngleV2 = (angle) => {
            // Normalize angle to 0-360 range
            angle = ((angle % 360) + 360) % 360;
            
            // Define angle ranges for each goal based on the provided measurements
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
            
            // Find which range the angle falls into
            for (const range of goalRanges) {
                if (range.min <= range.max) {
                    // Normal range (e.g., 0-21.2)
                    if (angle >= range.min && angle < range.max) {
                        return range.goal;
                    }
                } else {
                    // Wrapped range (e.g., 340.7-360 or 0-21.2)
                    if (angle >= range.min || angle < range.max) {
                        return range.goal;
                    }
                }
            }
            
            // Fallback to goal 5 if no range matches (shouldn't happen with proper ranges)
            return 5;
        };
        
        // Test function to verify the mapping works correctly
        const testMapping = () => {
            console.log('=== SDG Wheel Mapping Test ===');
            const testAngles = [275.4, 297.3, 318.6, 340.7, 0, 21.2, 42.4, 63.6, 84.8, 106.4, 127.5, 148.3, 169.8, 192, 211, 233, 256];
            
            testAngles.forEach((angle, index) => {
                const goal = getGoalFromAngleV2(angle);
                const expectedGoal = index + 1;
                console.log(`Angle ${angle}°: Expected=${expectedGoal}, Got=${goal} ${goal === expectedGoal ? '✅' : '❌'}`);
            });
        };
        
        // Run mapping test on load
        testMapping();
        
        // Update instruction text for mobile devices
        const instructionElement = document.getElementById('sdg-instruction');
        if (instructionElement && isMobile) {
            instructionElement.textContent = 'Toque nos segmentos para ver os detalhes de cada Objetivo de Desenvolvimento Sustentável.';
        }
        


        // Function to hide all hover images and info with better performance
        const hideAllHovers = () => {
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                hoverImages.forEach(img => {
                    img.classList.remove('visible');
                });
                hideSDGInfo();
                // console.log('Hiding all hover images');
            });
        };

        // Enhanced function to show SDG info with accessibility improvements
        const showSDGInfo = (goalNumber) => {
            const data = sdgData[goalNumber];
            if (!data || !sdgInfoContainer) return;
            
            sdgInfoContainer.innerHTML = `
                <div class="sdg-info-content">
                    <h4>ODS ${goalNumber}: ${data.title}</h4>
                    <p>${data.description}</p>
                </div>
            `;
            
            // Use requestAnimationFrame for smooth transitions
            requestAnimationFrame(() => {
                sdgInfoContainer.classList.add('visible');
            });
            
            // Announce to screen readers
            sdgInfoContainer.setAttribute('aria-label', `ODS ${goalNumber}: ${data.title}`);
        };

        const hideSDGInfo = () => {
            if (sdgInfoContainer) {
                sdgInfoContainer.classList.remove('visible');
            }
        };

        // Enhanced function to show goal information with better performance
        const showGoal = (goalNumber) => {
            const data = sdgData[goalNumber];
            if (!data) return;

            // All goals now have images
            const imageToShow = document.getElementById(`goal-${goalNumber}-image`);
            if (imageToShow) {
                // Hide all other images first
                hoverImages.forEach(img => {
                    img.classList.remove('visible');
                });
                
                // Use requestAnimationFrame for smooth animations
                requestAnimationFrame(() => {
                    imageToShow.classList.add('visible');
                });
                
                // Also show info for accessibility
                showSDGInfo(goalNumber);
                
                // Debug logging
                // console.log(`Showing goal ${goalNumber}: ${data.title}`);
            }
        };

        // Enhanced mouse position calculation with better accuracy
        const getMouseAngle = (event) => {
            const rect = sdgWheel.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = event.clientX - centerX;
            const mouseY = event.clientY - centerY;
            
            // Calculate angle in degrees with improved precision
            let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
            
            // Ensure angle is positive
            if (angle < 0) {
                angle += 360;
            }
            
            // Debug logging (remove in production)
            // console.log(`Mouse angle: ${angle.toFixed(2)}°, Goal: ${getGoalFromAngle(angle)}`);
            
            return angle;
        };

        // Enhanced function to check if mouse/touch is within the wheel
        const isInWheel = (event) => {
            const rect = sdgWheel.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = event.clientX - centerX;
            const mouseY = event.clientY - centerY;
            const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
            
            // More precise radius calculations based on the actual wheel design
            const outerRadius = Math.min(rect.width, rect.height) / 2;
            const innerRadius = outerRadius * 0.15; // Smaller inner radius for better precision
            
            // Add more tolerance for mobile touch interaction
            const tolerance = outerRadius * 0.1; // Increased tolerance for mobile
            
            return distance >= (innerRadius - tolerance) && distance <= (outerRadius + tolerance);
        };

        let currentGoal = null;
        let hoverTimeout = null;
        
        // Detect if we're on a mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                        ('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0);

        // Enhanced mouse move handler with improved responsiveness
        const handleMouseMove = (event) => {
            // On mobile, don't use mouse move for hover effects
            if (isMobile) return;
            
            // Use requestAnimationFrame for smoother performance
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
            
            hoverTimeout = requestAnimationFrame(() => {
                if (isInWheel(event)) {
                    const angle = getMouseAngle(event);
                    // Try the alternative mapping first
                    const goal = getGoalFromAngleV2(angle);
                    
                    if (goal !== currentGoal) {
                        hideAllHovers();
                        showGoal(goal);
                        currentGoal = goal;
                        sdgWheel.style.cursor = 'pointer';
                        
                        // Debug: log the angle and goal (can be removed in production)
                        // console.log(`Angle: ${angle.toFixed(1)}°, Goal: ${goal}`);
                    }
                } else {
                    if (currentGoal !== null) {
                        hideAllHovers();
                        currentGoal = null;
                        sdgWheel.style.cursor = 'default';
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
                
                // Enhanced feedback for mobile devices
                if ('vibrate' in navigator) {
                    navigator.vibrate(50); // Subtle haptic feedback
                }
                
                // For mobile, always show the goal (no toggle behavior)
                hideAllHovers();
                showGoal(goal);
                currentGoal = goal;
                
                // Add visual feedback
                sdgWheel.style.filter = 'brightness(1.1)';
                setTimeout(() => {
                    sdgWheel.style.filter = 'brightness(1)';
                }, 200);
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
            sdgWheel.style.cursor = 'default';
        };

        // Enhanced touch event handlers for better mobile support
        const handleTouchStart = (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            
            // Add visual feedback for touch
            sdgWheel.style.transform = 'scale(0.98)';
            
            // Handle the touch
            handleClick(touch);
        };

        const handleTouchMove = (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            handleMouseMove(touch);
        };
        
        const handleTouchEnd = (event) => {
            // Remove visual feedback
            sdgWheel.style.transform = 'scale(1)';
            
            // Don't hide on touch end for mobile - let user see the result
            // Only hide if they touch outside the wheel
            if (!isInWheel(event.changedTouches[0])) {
                hideAllHovers();
                currentGoal = null;
            }
        };

        // Add event listeners with passive options for better performance
        sdgWheel.addEventListener('mousemove', handleMouseMove, { passive: true });
        sdgWheel.addEventListener('click', handleClick);
        sdgWheel.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        
        // Enhanced touch support
        sdgWheel.addEventListener('touchstart', handleTouchStart, { passive: false });
        sdgWheel.addEventListener('touchmove', handleTouchMove, { passive: false });
        sdgWheel.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Keyboard navigation support for accessibility
        sdgWheel.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                // Cycle through goals with keyboard
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
        sdgWheel.setAttribute('tabindex', '0');
        sdgWheel.setAttribute('role', 'button');
        sdgWheel.setAttribute('aria-label', 'Roda interativa dos Objetivos de Desenvolvimento Sustentável');
        


        // Hide info when clicking outside the SDG container
        document.addEventListener('click', function(e) {
            const sdgContainer = document.querySelector('.sdg-container');
            if (sdgContainer && !sdgContainer.contains(e.target)) {
                hideAllHovers();
                currentGoal = null;
            }
        }, { passive: true });
    }



    // 9. Enhanced Scroll Progress Indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--dark-blue));
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };

    createScrollProgress();

    // 10. Enhanced Button Interactions
    const buttons = document.querySelectorAll('button, .cta-button, .download-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 11. Enhanced Card Hover Effects
    const cards = document.querySelectorAll('.reason-item, .testimonial-card, .institution-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 12. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
