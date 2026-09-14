/* ===== KİŞİSELLEŞTİRME REHBERİ =====
   index.html dosyasının üst kısmındaki CONFIG objesini düzenleyerek:
   - PARTNER_NAME: Sevgilinin adı
   - LOVE_MESSAGES: Aşk mesajı kutularındaki notlar
   - PHOTOS: Galeri fotoğrafları (URL veya yerel dosya)
   - FINAL_MESSAGE: Son mektup
   - BIRTHDAY_DATE: Geri sayım için doğum günü tarihi
   Bunları kolayca değiştirebilirsiniz.
================================= */

(function () {
    const C = CONFIG;

    // ===== HERO: İsim göster =====
    document.getElementById('partnerName').textContent = C.PARTNER_NAME;

    // ===== FLOATING HEARTS =====
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSVG = `<svg viewBox="0 0 100 100" width="WIDTH" height="HEIGHT">
        <path d="M50 88 C50 88, 10 60, 10 35 C10 20, 22 12, 32 12 C40 12, 46 17, 50 25 C54 17, 60 12, 68 12 C78 12, 90 20, 90 35 C90 60, 50 88, 50 88 Z"
              fill="COLOR" />
    </svg>`;

    const heartColors = ['#e8586f', '#c9355a', '#f4a0b0', '#d4708a', '#e8908f'];

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        const size = Math.random() * 20 + 12;
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];
        const duration = Math.random() * 8 + 10;
        const drift = (Math.random() - 0.5) * 80;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.3 + 0.15;

        heart.style.left = left + '%';
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.setProperty('--drift', drift + 'px');
        heart.style.animationDuration = duration + 's';
        heart.style.opacity = opacity;
        heart.innerHTML = heartSVG
            .replace('WIDTH', size)
            .replace('HEIGHT', size)
            .replace('COLOR', color);

        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000);
    }

    // İlk kalpleri oluştur
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 800);
    }

    // Sürekli yeni kalpler oluştur
    setInterval(createFloatingHeart, 2000);

    // ===== GERİ SAYIM =====
    const birthday = new Date(C.BIRTHDAY_DATE).getTime();
    let surpriseTriggered = false;

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = birthday - now;

        if (diff <= 0) {
            document.getElementById('cdDays').textContent = '0';
            document.getElementById('cdHours').textContent = '0';
            document.getElementById('cdMins').textContent = '0';
            document.getElementById('cdSecs').textContent = '0';
            // Sürprizi tetikle
            if (!surpriseTriggered) {
                surpriseTriggered = true;
                triggerBirthdaySurprise();
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cdDays').textContent = days;
        document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cdMins').textContent = String(mins).padStart(2, '0');
        document.getElementById('cdSecs').textContent = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ===== GIFT BOXES =====
    const giftGrid = document.getElementById('giftGrid');
    const messages = C.LOVE_MESSAGES;
    const openedBoxes = new Set();

    const giftIcons = ['🎁', '💝', '🎀', '💖', '🌹', '✨', '💋', '🌸', '🎈', '⭐'];

    messages.forEach((msg, index) => {
        const box = document.createElement('button');
        box.className = 'gift-box';
        box.setAttribute('aria-label', `Hediye kutusu ${index + 1}`);
        box.innerHTML = `
            <span class="gift-box-icon">${giftIcons[index % giftIcons.length]}</span>
            <span class="gift-box-number">${String(index + 1).padStart(2, '0')}</span>
        `;
        box.addEventListener('click', () => {
            if (openedBoxes.has(index)) {
                // Zaten açılmış, tekrar göster
                openModal(msg);
                return;
            }
            openedBoxes.add(index);
            box.classList.add('opened');
            openModal(msg);
        });
        giftGrid.appendChild(box);
    });

    // ===== PHOTO GALLERY =====
    const galleryScroll = document.getElementById('galleryScroll');

    C.PHOTOS.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${photo.url}" alt="${photo.caption || ''}" loading="lazy">
            <p class="gallery-item-caption">${photo.caption || ''}</p>
        `;
        item.addEventListener('click', () => openPhoto(photo));
        galleryScroll.appendChild(item);
    });

    // ===== MODAL: MESSAGE =====
    const modalOverlay = document.getElementById('modalOverlay');
    const modalMessage = document.getElementById('modalMessage');

    function openModal(message) {
        modalMessage.textContent = message;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeModal = function () {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // ===== MODAL: PHOTO =====
    const photoOverlay = document.getElementById('photoOverlay');
    const photoViewerImg = document.getElementById('photoViewerImg');
    const photoCaption = document.getElementById('photoCaption');

    function openPhoto(photo) {
        photoViewerImg.src = photo.url;
        photoCaption.textContent = photo.caption || '';
        photoOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closePhoto = function () {
        photoOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    photoOverlay.addEventListener('click', (e) => {
        if (e.target === photoOverlay) closePhoto();
    });

    // ===== LETTER BODY =====
    document.getElementById('letterBody').textContent = C.FINAL_MESSAGE;

    // ===== VİDEO BÖLÜMÜ =====
    const videoContainer = document.getElementById('videoContainer');
    const videoDesc = document.getElementById('videoDesc');
    videoDesc.textContent = C.VIDEO_DESC || '';

    function getYouTubeId(url) {
        const patterns = [
            /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
            /(?:youtu\.be\/)([\w-]{11})/,
            /(?:youtube\.com\/embed\/)([\w-]{11})/,
        ];
        for (const p of patterns) {
            const match = url.match(p);
            if (match) return match[1];
        }
        return null;
    }

    const videoId = getYouTubeId(C.VIDEO_URL);
    if (videoId) {
        videoContainer.innerHTML = `
            <div class="video-placeholder" id="videoPlaceholder">
                <div class="video-play-btn">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
                <p class="video-placeholder-text">${C.VIDEO_TITLE || 'Videoyu izle'}</p>
            </div>
        `;
        const placeholder = document.getElementById('videoPlaceholder');
        placeholder.addEventListener('click', () => {
            // Müzik çalıyorsa duraklat
            if (typeof window.pauseMusicForVideo === 'function') {
                window.pauseMusicForVideo();
            }
            videoContainer.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
                        title="${C.VIDEO_TITLE || 'Video'}"
                        allow="autoplay; encrypted-media"
                        allowfullscreen></iframe>
            `;
            // Video iframe'i takip et, bittiğinde müziği devam ettir
            setTimeout(() => {
                const videoIframe = videoContainer.querySelector('iframe');
                if (videoIframe) {
                    // IFrame API ile video bitişini izle
                    const checkVideoEnd = setInterval(() => {
                        try {
                            videoIframe.contentWindow.postMessage('{"event":"listening"}', '*');
                        } catch(e) {}
                    }, 1000);
                    // 10 saniye sonra kontrolü temizle
                    setTimeout(() => clearInterval(checkVideoEnd), 600000);
                }
            }, 500);
        });
    } else {
        videoContainer.innerHTML = `<p style="padding:2rem;text-align:center;color:var(--color-text-muted)">Video URL bulunamadı. Lütfen geçerli bir YouTube linki girin.</p>`;
    }

    // ===== MÜZİK ÇALAR (YouTube embed + postMessage) =====
    // IFrame API sandbox'ta çalışmadığı için doğrudan iframe + postMessage kullanıyoruz
    const musicPlayer = document.getElementById('musicPlayer');
    const musicInfo = document.getElementById('musicInfo');
    const musicInfoText = document.getElementById('musicInfoText');
    const musicHidden = document.getElementById('musicHidden');
    let musicPlaying = false;
    let musicWasPlayingBeforeVideo = false;
    let musicIframe = null;

    // Şarkı listesinden video ID'leri çıkar — hem string hem object formatı destekle
    const musicItems = (C.MUSIC_PLAYLIST || []).map(item => {
        if (typeof item === 'string') return { url: item, title: '' };
        return item;
    });
    const musicVideoIds = musicItems.map(item => getYouTubeId(item.url)).filter(Boolean);

    // Gizli YouTube iframe oluştur
    if (musicVideoIds.length > 0) {
        const firstId = musicVideoIds[0];
        const playlistParam = musicVideoIds.length > 1 ? '&playlist=' + musicVideoIds.join(',') : '';
        const embedUrl = 'https://www.youtube.com/embed/' + firstId + '?enablejsapi=1&loop=1' + playlistParam + '&controls=0&modestbranding=1&playsinline=1&autoplay=0';

        musicIframe = document.createElement('iframe');
        musicIframe.src = embedUrl;
        musicIframe.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;border:0;';
        musicIframe.allow = 'autoplay; encrypted-media';
        musicIframe.setAttribute('allow', 'autoplay; encrypted-media');
        musicHidden.appendChild(musicIframe);

        // YouTube'dan gelen mesajları dinle
        window.addEventListener('message', function(event) {
            try {
                const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                if (!data || data.event !== 'onStateChange') return;

                // Müzik iframe'ten gelen mesajları işle
                if (musicIframe && event.source === musicIframe.contentWindow) {
                    if (data.info === 1) {
                        // Oynuyor
                        musicPlaying = true;
                        musicPlayer.classList.add('playing');
                        musicInfo.classList.add('show');
                        musicInfoText.textContent = 'Çalıyor...';
                    } else if (data.info === 2) {
                        // Duraklatıldı
                        musicPlaying = false;
                        musicPlayer.classList.remove('playing');
                    }
                }

                // Video iframe'ten gelen mesajları işle
                const videoIframe = videoContainer.querySelector('iframe');
                if (videoIframe && event.source === videoIframe.contentWindow) {
                    if (data.info === 0) {
                        // Video bitti — müziği devam ettir
                        if (typeof window.resumeMusicAfterVideo === 'function') {
                            window.resumeMusicAfterVideo();
                        }
                    }
                }
            } catch(e) {}
        });

        // İframe yüklendiğinde listener gönder
        musicIframe.addEventListener('load', function() {
            setTimeout(function() {
                try {
                    musicIframe.contentWindow.postMessage('{"event":"listening"}', '*');
                } catch(e) {}
            }, 1000);
        });
    }

    // Müzik butonu tıklama
    if (musicVideoIds.length > 0) {
        musicPlayer.addEventListener('click', function() {
            if (!musicIframe) return;

            if (musicPlaying) {
                // Duraklat
                try {
                    musicIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                } catch(e) {}
                musicPlaying = false;
                musicPlayer.classList.remove('playing');
                musicInfoText.textContent = 'Duraklatıldı';
            } else {
                // Başlat
                try {
                    musicIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                } catch(e) {}
                musicPlaying = true;
                musicPlayer.classList.add('playing');
                musicInfo.classList.add('show');
                musicInfoText.textContent = 'Çalıyor...';
            }
        });
    } else {
        musicPlayer.style.display = 'none';
    }

    // Video oynatıldığında müziği duraklat, video bitince devam et
    window.pauseMusicForVideo = function() {
        if (musicPlaying && musicIframe) {
            musicWasPlayingBeforeVideo = true;
            try {
                musicIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch(e) {}
            musicPlaying = false;
            musicPlayer.classList.remove('playing');
            musicInfoText.textContent = 'Video oynatılıyor';
        }
    };

    window.resumeMusicAfterVideo = function() {
        if (musicWasPlayingBeforeVideo && musicIframe) {
            musicWasPlayingBeforeVideo = false;
            try {
                musicIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } catch(e) {}
            musicPlaying = true;
            musicPlayer.classList.add('playing');
            musicInfoText.textContent = 'Çalıyor...';
        }
    };

    // ===== SCROLL TO SECTION =====
    window.scrollToSection = function (id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // ===== KEYBOARD: ESC to close modals =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closePhoto();
        }
    });

    // ===== INTERSECTION OBSERVER: Fade in sections =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-header, .gift-grid, .gallery-scroll, .letter-card').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== DOĞUM GÜNÜ SÜRPRİZİ =====
    function triggerBirthdaySurprise() {
        const surprise = document.getElementById('birthdaySurprise');
        const surpriseName = document.getElementById('surpriseName');
        surpriseName.textContent = C.PARTNER_NAME || 'Aşkım';
        surprise.classList.add('active');

        // Konfetiyi başlat
        startConfetti();

        const cakeContainer = document.getElementById('cakeContainer');
        const candleFlame = document.getElementById('candleFlame');
        const cakeHint = document.getElementById('cakeHint');
        const slideshowContainer = document.getElementById('slideshowContainer');
        const surpriseClose = document.getElementById('surpriseClose');
        const surpriseBox1 = document.getElementById('surpriseBox1');
        const surpriseBox2 = document.getElementById('surpriseBox2');
        const kissMessage = document.getElementById('kissMessage');
        let candleBlown = false;
        let box1Opened = false;
        let box2Opened = false;

        // 1. KUTU — Konfeti + Pasta + Mum
        surpriseBox1.addEventListener('click', function () {
            if (box1Opened) return;
            box1Opened = true;
            surpriseBox1.classList.add('opened');

            // Konfeti patlaması
            burstConfetti();

            // Pastayı göster
            cakeContainer.style.display = 'flex';
            cakeHint.style.display = 'block';
        });

        // Herhangi bir yere dokununca mum sönsün
        document.addEventListener('click', function (e) {
            if (candleBlown) return;
            if (!box1Opened) return;
            // Sürpriz ekranı aktif mi kontrol et
            if (!surprise.classList.contains('active')) return;

            candleBlown = true;
            candleFlame.classList.add('out');
            cakeHint.textContent = 'Dilek tut! 🌟';

            // 2 saniye sonra slayt gösterisini başlat
            setTimeout(function () {
                cakeHint.style.display = 'none';
                slideshowContainer.style.display = 'block';
                startSlideshow();
            }, 2000);

            // 4 saniye sonra kapat butonunu göster
            setTimeout(function () {
                surpriseClose.style.display = 'inline-block';
            }, 4000);
        });

        // 2. KUTU — Öpücük mesajı + uçuşan öpücükler
        surpriseBox2.addEventListener('click', function () {
            if (box2Opened) return;
            box2Opened = true;
            surpriseBox2.classList.add('opened');

            // Öpücük mesajını göster
            kissMessage.style.display = 'block';

            // Uçuşan öpücükler başlat
            startFlyingKisses();
        });

        // Sürpriz ekranını kapat
        surpriseClose.addEventListener('click', function () {
            surprise.classList.remove('active');
            stopConfetti();
        });
    }

    // ===== KONFETİ PATLAMASI (tek seferlik) =====
    function burstConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        if (!canvas.classList.contains('active')) {
            startConfetti();
        }
        // Ek konfeti patlat
        const colors = ['#e8586f', '#c9355a', '#f4a0b0', '#ffd700', '#ff8c00', '#ffffff', '#d4708a'];
        for (let i = 0; i < 50; i++) {
            confettiParticles.push({
                x: Math.random() * (canvas.width || window.innerWidth),
                y: -20,
                w: 8 + Math.random() * 8,
                h: 6 + Math.random() * 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 8,
                vy: 2 + Math.random() * 6,
                rot: Math.random() * 360,
                vrot: (Math.random() - 0.5) * 15,
            });
        }
    }

    // ===== UÇUŞAN ÖPÜCÜKLER =====
    function startFlyingKisses() {
        const kissEmojis = ['💋', '😘', '💕', '💖', '💞'];
        let kissCount = 0;
        const maxKisses = 25;

        function spawnKiss() {
            if (kissCount >= maxKisses) return;
            kissCount++;

            const kiss = document.createElement('div');
            kiss.className = 'flying-kiss';
            kiss.textContent = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];
            kiss.style.left = (10 + Math.random() * 80) + '%';
            kiss.style.bottom = '10%';
            kiss.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
            document.body.appendChild(kiss);

            setTimeout(function () {
                kiss.remove();
            }, 2500);

            if (kissCount < maxKisses) {
                setTimeout(spawnKiss, 150 + Math.random() * 200);
            }
        }

        spawnKiss();
    }

    // ===== KONFETİ ANİMASYONU =====
    let confettiCtx = null;
    let confettiAnimId = null;
    let confettiParticles = [];

    function startConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        canvas.classList.add('active');
        confettiCtx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#e8586f', '#c9355a', '#f4a0b0', '#ffd700', '#ff8c00', '#ffffff', '#d4708a'];

        for (let i = 0; i < 80; i++) {
            confettiParticles.push({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * 100,
                w: 8 + Math.random() * 8,
                h: 6 + Math.random() * 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 4,
                vy: 2 + Math.random() * 4,
                rot: Math.random() * 360,
                vrot: (Math.random() - 0.5) * 10,
            });
        }

        animateConfetti();
    }

    function animateConfetti() {
        if (!confettiCtx) return;
        const canvas = confettiCtx.canvas;
        confettiCtx.clearRect(0, 0, canvas.width, canvas.height);

        confettiParticles.forEach(function (p) {
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vrot;

            if (p.y > canvas.height + 20) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }

            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate((p.rot * Math.PI) / 180);
            confettiCtx.fillStyle = p.color;
            confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            confettiCtx.restore();
        });

        confettiAnimId = requestAnimationFrame(animateConfetti);
    }

    function stopConfetti() {
        if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
        confettiAnimId = null;
        confettiParticles = [];
        const canvas = document.getElementById('confettiCanvas');
        if (canvas) {
            canvas.classList.remove('active');
            if (confettiCtx) confettiCtx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    // ===== SLAYT GÖSTERİSİ =====
    function startSlideshow() {
        const slideshowImg = document.getElementById('slideshowImg');
        const slideshowCaption = document.getElementById('slideshowCaption');
        const photos = C.PHOTOS || [];
        if (photos.length === 0) return;

        let currentIdx = 0;

        function showPhoto() {
            const photo = photos[currentIdx];
            slideshowImg.src = photo.url;
            slideshowCaption.textContent = photo.caption || '';
            // Animasyonu yeniden tetikle
            slideshowImg.style.animation = 'none';
            void slideshowImg.offsetWidth; // reflow
            slideshowImg.style.animation = 'slideFade 0.8s ease-out';
        }

        showPhoto();
        setInterval(function () {
            currentIdx = (currentIdx + 1) % photos.length;
            showPhoto();
        }, 3500);
    }

})();
