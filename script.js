document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation (Hamburger Menu)
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

    // 2. Fade-in animations on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => { appearOnScroll.observe(fader); });

    // Ensure opportunity cards animate even if already in view on load
    const oppCardsForAnim = document.querySelectorAll('.opportunity-card');
    oppCardsForAnim.forEach(card => {
      // If card is already within viewport on load, add visible to trigger flip-up
      const rect = card.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) card.classList.add('visible');
    });
    // Also add a fallback after a short delay in case fonts/images shift layout
    setTimeout(() => {
      document.querySelectorAll('.opportunity-card.fade-in').forEach(c => {
        if (!c.classList.contains('visible')) {
          const r = c.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) c.classList.add('visible');
        }
      });
    }, 400);
    
    // 3. Active navigation link highlighting on scroll
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
    sections.forEach(section => { sectionObserver.observe(section); });
    
    // 4. Download Modal Logic
    const modal = document.getElementById('downloadModal');
    if(modal) {
        const downloadButtons = document.querySelectorAll('.download-btn');
        const closeButton = document.querySelector('.close-button');
        const downloadForm = document.getElementById('downloadForm');
        const langInput = document.getElementById('langInput');
        const formMessage = document.getElementById('formMessage');
        const fileMap = { 'pt': './guides/guia_investidor_pt.pdf', 'en': './guides/investor_guide_en.pdf', 'fr': './guides/guide_investisseur_fr.pdf' };

        downloadButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                langInput.value = lang;
                formMessage.textContent = '';
                modal.style.display = 'flex';
            });
        });
        closeButton.addEventListener('click', () => { modal.style.display = 'none'; });
        window.addEventListener('click', (event) => { if (event.target == modal) modal.style.display = 'none'; });
        downloadForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            const email = document.getElementById('emailInput').value;
            const lang = langInput.value;
            console.log(`Email captured: ${email}, Language: ${lang}`);
            formMessage.textContent = 'Obrigado! O seu download irá começar em breve.';
            formMessage.style.color = 'green';
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

    // 5. PRINCÍPIOS image: add load/error logging and graceful fallback
    const principiosImg = document.getElementById('principios-image');
    const principiosCaption = document.getElementById('principios-caption');
    if (principiosImg) {
        principiosImg.addEventListener('load', () => {
            // Remove placeholder min-height once real dimensions are known
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

    // 6. Opportunities Modal (cards -> animated popup with nav)
    const oppCards = document.querySelectorAll('.opportunity-card[data-key]');
    const oppModal = document.getElementById('oppModal');
    const oppBackdrop = oppModal ? oppModal.querySelector('.opp-backdrop') : null;
    const oppClose = oppModal ? oppModal.querySelector('.opp-close') : null;
    const oppPrev = null; // arrows removed
    const oppNext = null; // arrows removed
    const oppImage = oppModal ? document.getElementById('oppImage') : null;
    const oppTitle = oppModal ? document.getElementById('oppTitle') : null;
    const oppText  = oppModal ? document.getElementById('oppText')  : null;
    const oppDotsWrap = oppModal ? document.getElementById('oppDots') : null;

    // Data map (placeholder content). You will paste new info and we will replace these strings.
    const OPPS = {
      'agronegocio': { 
        title: 'Agronegócio',
        text: 'Potencial Agrícola — Cabo Verde possui um clima estável e temperaturas amenas ao longo do ano, permitindo produções agrícolas previsíveis e com menor risco climático. As ilhas de Santiago, S. Antão, Fogo, Brava e S. Nicolau são as ilhas com maior potencial agrícola.\n\nOportunidades de Mercado — Atualmente, cerca de 70% dos alimentos consumidos no país são importados, o que torna os produtos locais altamente competitivos e reduz a dependência externa. O mercado europeu de alimentos orgânicos está avaliado em mais de 50 bilhões de euros, apresentando uma oportunidade para exportação de produtos agrícolas sustentáveis.',
        image: './images/agronegocio.jpg'
      },
      'industria': { 
        title: 'Indústria',
        text: 'Conteúdo a atualizar. Forneça 1–2 parágrafos para Indústria.',
        image: './images/industria.jpg'
      },
      'economia-digital': { 
        title: 'Economia Digital',
        text: 'Conteúdo a atualizar. Forneça 1–2 parágrafos para Economia Digital.',
        image: './images/economia-digital.jpg'
      },
      'turismo': { 
        title: 'Turismo',
        text: 'Conteúdo a atualizar. Forneça 1–2 parágrafos para Turismo.',
        image: './images/turismo.jpg'
      },
      'economia-verde': { 
        title: 'Economia Verde',
        text: 'Conteúdo a atualizar. Forneça 1–2 parágrafos para Economia Verde.',
        image: './images/economia-verde.jpg'
      },
      'economia-azul': { 
        title: 'Economia Azul',
        text: 'Conteúdo a atualizar. Forneça 1–2 parágrafos para Economia Azul.',
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

    // slide animation between images
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
      out.style.transition = 'transform 420ms ease';
      oppImage.parentElement.appendChild(out);

      const key = keys[nextIdx];
      const data = OPPS[key];

      // Prepare incoming image
      oppImage.src = data.image;
      oppImage.alt = data.title;
      oppImage.style.transform = 'translateX(100%)';
      oppImage.style.transition = 'transform 420ms ease';

      requestAnimationFrame(() => {
        out.style.transform = 'translateX(-100%)';
        oppImage.style.transform = 'translateX(0)';
      });

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

      // Build dots on first open
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
      // Preserve paragraphs/line breaks when injecting copy
      const html = (data.text || '')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
      oppText.innerHTML = `<p>${html}</p>`;

      oppModal.classList.add('show');
      oppModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Dim whole page while modal is open
      document.body.classList.add('opp-dimmed');
      // Helper class on <html> so the ::after overlay fades in
      document.documentElement.classList.add('modal-open');
    }

    function closeOpp() {
      if (!oppModal) return;
      oppModal.classList.remove('show');
      oppModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // Restore page opacity
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
      // Keyboard nav uses slide animation
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

      // Two-finger hover swipe via trackpad (wheel event with horizontal scroll) + Touch swipe
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

        // Trackpad two-finger swipe detection:
        // Use wheel event and only react to horizontal deltaX with minimal vertical movement.
        let wheelCooldown = false;
        media.addEventListener('wheel', (e) => {
          // Only consider mostly horizontal gestures (ignore normal vertical scrolling)
          const absX = Math.abs(e.deltaX);
          const absY = Math.abs(e.deltaY);
          if (absX < 30 || absX < absY) return; // require strong horizontal signal
          if (wheelCooldown) return;
          wheelCooldown = true;
          setTimeout(() => (wheelCooldown = false), 350);

          // Prevent browser back/forward swipe navigation while interacting with modal
          e.preventDefault();

          if (e.deltaX > 0) triggerSwipe('left');
          else triggerSwipe('right');
        }, { passive: false });

        // Touch swipe (mobile)
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

        // Prevent image dragging ghost effect
        media.addEventListener('dragstart', (e) => e.preventDefault());
      }
    }

    // 7. INTERACTIVE SDG WHEEL LOGIC (FINAL, CORRECTED VERSION)
    const sdgAreas = document.querySelectorAll('map[name="sdg-map"] area');
    const hoverImages = document.querySelectorAll('.sdg-hover-image');
    
    if (sdgAreas.length > 0) {
        
        // Image Preloading for smooth hover effect
        const imageUrls = [];
        hoverImages.forEach(img => imageUrls.push(img.src));
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });

        // Function to hide all hover images
        const hideAllHovers = () => {
            hoverImages.forEach(img => {
                img.classList.remove('visible');
            });
        };

        // Add listeners to each area
        sdgAreas.forEach(area => {
            // Show image when mouse enters a slice
            area.addEventListener('mouseover', function() {
                const goalNumber = this.getAttribute('data-goal');
                const imageToShow = document.getElementById(`goal-${goalNumber}-image`);
                if (imageToShow) {
                    imageToShow.classList.add('visible');
                }
            });

            // Hide image when mouse leaves a slice
            area.addEventListener('mouseleave', () => {
                hideAllHovers();
            });
        });
    }

});
