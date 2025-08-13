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

    // 7. INTERACTIVE SDG WHEEL LOGIC (JAVASCRIPT-BASED APPROACH)
    const sdgWheel = document.getElementById('sdg-wheel');
    const hoverImages = document.querySelectorAll('.sdg-hover-image');
    
    // SDG Goals data with Portuguese descriptions
    const sdgData = {
        1: {
            title: "Erradicação da Pobreza",
            description: "Oportuniza direta e indiretamente o acesso de homens e mulheres a recursos económicos e proteção social.",
            hasImage: false
        },
        2: {
            title: "Fome Zero e Agricultura Sustentável", 
            description: "Contribui para o acesso ao alimento e redução da fome. Oferta de produtos nutritivos e seguros.",
            hasImage: false
        },
        3: {
            title: "Saúde e Bem-estar",
            description: "Acesso a serviços essenciais para a qualidade de vida dos colaboradores. Exigência na cadeia de abastecimento de condições de trabalho em ambiente saudável e seguro.",
            hasImage: false
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
            hasImage: false
        },
        11: {
            title: "Cidades e Comunidades Sustentáveis",
            description: "Fomento à proteção e salvaguarda do património cultural e natural do mundo.",
            hasImage: false
        },
        12: {
            title: "Consumo e Produção Responsáveis",
            description: "Gestão sustentável e o uso eficiente dos recursos naturais na produção. Redução do desperdício de alimentos. Realização de compras sustentáveis.",
            hasImage: false
        },
        13: {
            title: "Ação contra a Mudança Global do Clima",
            description: "Otimização do processo para redução das emissões de GEE.",
            hasImage: false
        },
        14: {
            title: "Vida na Água",
            description: "Realização de campanhas para conservação da zona costeira.",
            hasImage: false
        },
        15: {
            title: "Vida Terrestre",
            description: "Preservação de fragmentos florestais, inclusive em áreas montanhosas e de terras áridas.",
            hasImage: false
        },
        16: {
            title: "Paz, Justiça e Instituições Eficazes",
            description: "Atua contra a corrupção e o suborno em todas as suas formas.",
            hasImage: false
        },
        17: {
            title: "Parcerias e Meios de Implementação",
            description: "Incentivo e promoção de parcerias para o desenvolvimento sustentável.",
            hasImage: false
        }
    };
    
    if (sdgWheel) {
        
        // Function to get goal number from angle (17 segments, starting from top)
        const getGoalFromAngle = (angle) => {
            // Normalize angle to 0-360 degrees
            angle = ((angle % 360) + 360) % 360;
            
            // Each segment is 360/17 = ~21.18 degrees
            const segmentSize = 360 / 17;
            
            // Start from top (goal 1) and go clockwise
            // Goal 1 is at the top (270 degrees in standard coords, but we adjust for starting at top)
            const adjustedAngle = (angle + 90) % 360; // Rotate so 0 degrees is at top
            
            const segmentIndex = Math.floor(adjustedAngle / segmentSize);
            
            // Map segment index to goal number (clockwise from goal 1 at top)
            const goalMapping = [1, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            
            return goalMapping[segmentIndex] || 1;
        };

        // Function to hide all hover images and info
        const hideAllHovers = () => {
            hoverImages.forEach(img => {
                img.classList.remove('visible');
            });
            hideSDGInfo();
        };

        // Function to show SDG info as overlay text when no image is available
        const showSDGInfo = (goalNumber) => {
            const data = sdgData[goalNumber];
            if (!data) return;
            
            let infoBox = document.getElementById('sdg-info-box');
            if (!infoBox) {
                infoBox = document.createElement('div');
                infoBox.id = 'sdg-info-box';
                infoBox.className = 'sdg-info-overlay';
                document.querySelector('.sdg-container').appendChild(infoBox);
            }
            
            infoBox.innerHTML = `
                <div class="sdg-info-content">
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                </div>
            `;
            infoBox.classList.add('visible');
        };

        const hideSDGInfo = () => {
            const infoBox = document.getElementById('sdg-info-box');
            if (infoBox) {
                infoBox.classList.remove('visible');
            }
        };

        // Function to show goal information (image or text overlay)
        const showGoal = (goalNumber) => {
            const data = sdgData[goalNumber];
            if (!data) return;

            if (data.hasImage) {
                // Show hover image if available
                const imageToShow = document.getElementById(`goal-${goalNumber}-image`);
                if (imageToShow) {
                    imageToShow.classList.add('visible');
                }
            } else {
                // Show text overlay for goals without images
                showSDGInfo(goalNumber);
            }
        };

        // Get mouse position relative to the wheel center
        const getMouseAngle = (event) => {
            const rect = sdgWheel.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = event.clientX - centerX;
            const mouseY = event.clientY - centerY;
            
            // Calculate angle in degrees
            let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
            
            return angle;
        };

        // Check if mouse is within the wheel (not in the center hole)
        const isInWheel = (event) => {
            const rect = sdgWheel.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = event.clientX - centerX;
            const mouseY = event.clientY - centerY;
            const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
            
            // Wheel outer radius (half of image width) and inner radius (for the center hole)
            const outerRadius = rect.width / 2;
            const innerRadius = outerRadius * 0.3; // Adjust based on your wheel's inner hole size
            
            return distance >= innerRadius && distance <= outerRadius;
        };

        let currentGoal = null;

        // Mouse move handler for hover effects
        const handleMouseMove = (event) => {
            if (isInWheel(event)) {
                const angle = getMouseAngle(event);
                const goal = getGoalFromAngle(angle);
                
                if (goal !== currentGoal) {
                    hideAllHovers();
                    showGoal(goal);
                    currentGoal = goal;
                    sdgWheel.style.cursor = 'pointer';
                }
            } else {
                if (currentGoal !== null) {
                    hideAllHovers();
                    currentGoal = null;
                    sdgWheel.style.cursor = 'default';
                }
            }
        };

        // Click handler for mobile/touch devices
        const handleClick = (event) => {
            if (isInWheel(event)) {
                const angle = getMouseAngle(event);
                const goal = getGoalFromAngle(angle);
                
                // Toggle the display - if same goal clicked, hide it
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

        // Mouse leave handler
        const handleMouseLeave = () => {
            hideAllHovers();
            currentGoal = null;
            sdgWheel.style.cursor = 'default';
        };

        // Add event listeners
        sdgWheel.addEventListener('mousemove', handleMouseMove);
        sdgWheel.addEventListener('click', handleClick);
        sdgWheel.addEventListener('mouseleave', handleMouseLeave);

        // Hide info when clicking outside the SDG container
        document.addEventListener('click', function(e) {
            const sdgContainer = document.querySelector('.sdg-container');
            if (sdgContainer && !sdgContainer.contains(e.target)) {
                hideAllHovers();
                currentGoal = null;
            }
        });
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
