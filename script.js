document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 2. Magnetic Button Effect ---
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.1)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    // --- 3. Hero Background Canvas Animation (Ambient Orbs) ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 100 + 50;
                this.color = Math.random() > 0.5 ? 'rgba(67, 206, 162, 0.1)' : 'rgba(24, 90, 157, 0.1)'; // Theme colors
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < -this.radius) this.x = width + this.radius;
                if (this.x > width + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = height + this.radius;
                if (this.y > height + this.radius) this.y = -this.radius;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            for (let i = 0; i < 15; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        initParticles();
        animate();
    }

    // --- 4. Force Hero Text Reveal ---
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.classList.add('active');
    }, 100);

    // --- 5. Theme Toggle Implementation ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        // Update icon
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- 5b. Mobile Menu Logic ---
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active'); // Optional: for hamburger animation if added later
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // --- 6. Project Detail Modal Implementation ---

    // DATABASE OF PROJECTS (The "Seductive" Content)
    const projectsData = {
        // --- STICKY CARDS ---
        "sim-web": {
            tag: "Innovation Stratégique",
            title: "Simulateur Web & Analyse Conjointe",
            subtitle: "Décoder l'Irrationalité du Consommateur",
            challenge: "Dans un marché volatile, les méthodes de sondage classiques échouent à prédire le comportement réel d'achat. Les consommateurs déclarent une chose mais en font une autre.",
            solution: "Développement d'un moteur de simulation stochastique basé sur la théorie des jeux. En utilisant l'analyse conjointe (Trade-off), j'ai forcé les utilisateurs à faire des choix réalistes sous contrainte de budget, révélant ainsi leurs véritables hiérarchies de valeurs.",
            impact: "Modèle prédictif atteignant 95% de corrélation avec les ventes réelles post-lancement. A permis de re-pricé une gamme de produits, générant +15% de marge nette.",
            stack: ["Python", "Django", "SciPy", "Chart.js", "Statistical Modeling"]
        },
        "intel-strat": {
            tag: "Market Intelligence",
            title: "Veille Stratégique IA",
            subtitle: "Voir ce que les autres ignorent",
            challenge: "Les signaux faibles annonciateurs de disruption sont noyés dans le bruit assourdissant du Big Data social et médiatique. L'humain seul ne peut plus suivre.",
            solution: "Création d'un pipeline NLP (Traitement du Langage Naturel) temps-réel. L'outil scanne des millions de sources, calcule la 'Share of Voice' et analyse la tonalité émotionnelle pour détecter les micro-tendances émergentes avant qu'elles ne deviennent mainstream.",
            impact: "Identification d'une opportunité de niche 6 mois avant la concurrence, permettant au client de capturer 30% de parts de marché dès l'entrée.",
            stack: ["Python NLP", "Spacy", "Atlas.ti", "React Dashboard", "Twitter API"]
        },
        "lead-qual": {
            tag: "Sales Automation",
            title: "Qualification Automatisée de Leads",
            subtitle: "L'efficacité commerciale réinventée",
            challenge: "Les équipes commerciales perdaient 60% de leur temps à chasser des prospects froids ou mal qualifiés, plombant le coût d'acquisition client (CAC).",
            solution: "Implémentation d'un algorithme de Scoring Prédictif (Machine Learning). Le système analyse les données comportementales et démographiques pour attribuer un score de 'chaleur' dynamique à chaque prospect en temps réel.",
            impact: "Réduction du CAC de 40% et augmentation du taux de conversion de 12% à 28% en moins de deux trimestres.",
            stack: ["Scikit-Learn", "Salesforce API", "Pandas", "Automated Workflows"]
        },

        // --- IMPACT SOCIAL ---
        "impact-1": {
            tag: "ÉdTech & Inclusion",
            title: "Innovation Numérique Inclusive",
            subtitle: "L'éducation technologique comme levier d'émancipation sociale",
            challenge: "Dans les milieux défavorisés, l'absence de formation aux outils numériques et à l'innovation constitue une barrière majeure à l'insertion économique. Cette fracture numérique ne se limite pas à l'accès au matériel, mais touche surtout au manque de compétences pratiques. Sans un accompagnement adapté, les jeunes restent exclus de l'écosystème des startups et les femmes ne parviennent pas à moderniser leurs activités pour accroître leurs revenus.",
            solution: "Conception et animation d'un programme de formation physique complet, axé sur l'innovation et l'entrepreneuriat digital. Contrairement aux approches purement théoriques, ce cursus a été structuré autour de projets concrets : apprentissage des outils numériques, initiation au design de solutions et gestion de micro-entreprises. L'approche pédagogique a été spécialement adaptée aux réalités socioculturelles des participants (enfants, jeunes et femmes) pour garantir une appropriation immédiate des compétences.",
            impact: "Le programme a agi comme un véritable catalyseur de développement local : il a permis l'éclosion de plusieurs startups innovantes portées par des jeunes issus de ces quartiers. Parallèlement, les femmes participantes ont réussi à intégrer le numérique dans leurs activités génératrices de revenus, constatant une augmentation significative de leur chiffre d'affaires. Ce projet prouve que la maîtrise de l'innovation est un puissant moteur de résilience et de croissance économique pour les populations vulnérables.",
            stack: ["Pédagogie Active", "Design Thinking", "Mentorat", "Économie Sociale et Solidaire", "Coaching d'Entrepreneurs","Formation communautaire","Stratégies d'inclusion numérique."]
        },
        "impact-2": {
            tag: "FinTech & Gender",
            title: "Inclusion Financière Féminine",
            subtitle: "La Data au service de l'égalité",
            challenge: "Les femmes entrepreneures du secteur informel sont « invisibles » pour les banques classiques, faute d'historique de crédit standard.",
            solution: "Plateforme d'analyse prédictive utilisant des données alternatives (paiements mobiles, fiabilité sociale) pour créer un 'Score de Résilience'.",
            impact: "Va permettre aux institutions de microfinance de débloquer des crédits pour 2000+ femmes, avec un taux de remboursement supérieur à la moyenne nationale.",
            stack: ["R", "Shiny Apps", "Predictive Modeling", "Alternative Data"]
        },
        "impact-3": {
            tag: "E-Santé & IoT",
            title: "IoT Vigilance des populations vulnérables",
            subtitle: "Sauver des vies par la donnée",
            challenge: "Dans les zones rurales comme urbaines, l'absence de suivi médical continu et l'éloignement des centres de santé contribuent à un taux de mortalité maternelle alarmant. Le problème majeur réside dans la détection tardive des complications physiologiques : sans monitoring en temps réel, les secours interviennent souvent au-delà du seuil critique de survie",
            solution: "Mise en place d'un écosystème de télésurveillance biométrique résilient et à bas coût. Le dispositif repose sur des bracelets connectés et un robot mobile qui collectent les constantes vitales, permettant une connectivité longue portée même dans les zones blanches. Les flux de données sont centralisés sur un hub intelligent où des algorithmes d'analyse identifient les signaux de détresse et déclenchent des alertes automatiques immédiates auprès des personnels soignants et des proches.",
            impact: "Une optimisation sans précédent de la chaîne de secours, réduisant le temps d'intervention médicale critique de 4 heures à seulement 30 minutes dans la zone pilote. Cette réactivité, rendue possible par la transformation de la donnée brute en information décisionnelle, permet de passer d'une médecine réactive à une vigilance proactive pour les populations les plus vulnérables.",
            stack: ["IoT", "Capteurs biométriques", "Robot mobile", "Alerting System"]
        },
        "impact-4": {
            tag: "AgriTech & Climat",
            title: "Accélérateur Green-Tech",
            subtitle: "Cultiver l'avenir",
            challenge: "Les coopératives agricoles féminines subissent de plein fouet le changement climatique sans outils pour s'adapter.",
            solution: "Programme tech installant des sondes d'humidité du sol connectées. Les données alimentent un modèle météo local pour optimiser l'irrigation.",
            impact: "+30% de rendement agricole tout en réduisant la consommation d'eau de 20%.",
            stack: ["Arduino", "Weather APIs", "Data Visualization", "Training"]
        },
        "impact-5": {
            tag: "Gouvernance & Data",
            title: "Budgétisation Sensible au Genre",
            subtitle: "Transformer la finance publique en levier d'équité",
            challenge: "Malgré les cadres législatifs en faveur de l'égalité, les budgets publics conservent souvent une 'neutralité apparente' qui masque des disparités systémiques. Sans une analyse granulaire de la destination réelle des fonds, les allocations financières échouent fréquemment à répondre aux besoins spécifiques des femmes, perpétuant ainsi des barrières invisibles dans l'accès aux infrastructures et aux services de base.",
            solution: "Conception d'un moteur d'audit analytique automatisé capable de scanner et de décortiquer les lignes budgétaires municipales. En utilisant des techniques avancées de traitement de données, l'algorithme catégorise les dépenses et calcule leur impact différencié selon le genre. Cette solution transforme des feuilles de calcul comptables complexes en indicateurs de performance sociale, permettant de passer d'une gestion budgétaire purement administrative à un pilotage stratégique axé sur l'inclusion.",
            impact: "Le déploiement au sein de deux mairies pilotes a permis une réorientation factuelle des ressources vers des investissements à haute valeur sociale. Ce rééquilibrage a conduit au financement d'infrastructures concrètes, telles que le renforcement de la sécurité via l'éclairage public ciblé et la création de crèches communautaires, facilitant directement l'autonomisation économique des femmes et la réduction des inégalités locales.",
            stack: ["Cadres macroéconomiques de budgétisation sensible au genre","Python Pandas", "Data Auditing", "Public Policy Analytics"]
        },

        // --- GALLERY ITEMS ---
        "gal-1": {
            tag: "Data Viz",
            title: "Dashboard Analytics 360",
            subtitle: "La beauté de la complexité",
            challenge: "Rendre intelligibles des millions de lignes de logs serveurs pour des décideurs non-techniques.",
            solution: "Création d'un dashboard interactif et esthétique, privilégiant la clarté visuelle et la narration des données (Data Storytelling).",
            impact: "Adopté comme outil de pilotage quotidien par le CODIR.",
            stack: ["Tableau", "SQL", "UX Design"]
        },
        "gal-2": {
            tag: "IoT Architecture",
            title: "Surveillance des personnes vulnérables",
            subtitle: "Connecter la ville",
            challenge: "Optimiser la gestion des déchets urbains grâce à la tech.",
            solution: "Mise en place d'un écosystème de télésurveillance biométrique",
            impact: "Dispositif médical à bas coût pour un suivi proactif et continu.",
            stack: ["IoT", "Capteurs biométriques", "Robot mobile", "Alerting System"]
        },
        "gal-3": {
            tag: "Education",
            title: "Bootcamp Tech Rural",
            subtitle: "Former la prochaine élite",
            challenge: "Décentraliser l'excellence technologique.",
            solution: "Programme intensif de 3 semaines au cœur des villages pour initier au code et à la data.",
            impact: "50 jeunes formés, 10 startups locales créées.",
            stack: ["Pedagogy", "Community Building", "Python Basics"]
        },
        "gal-4": {
            tag: "Consulting",
            title: "Refonte Stratégie Data",
            subtitle: "De l'intuition à la preuve",
            challenge: "Une PME naviguait à vue sans utiliser son capital de données.",
            solution: "Audit complet et mise en place d'une feuille de route Data sur 3 ans.",
            impact: "Transformation culturelle et doublement du ROI marketing.",
            stack: ["Audit", "Strategy", "Change Management"]
        },
        "gal-5": {
            tag: "Data Science",
            title: "Market Logic Engine",
            subtitle: "L'algorithme du marché",
            challenge: "Comprendre les dynamiques de prix concurrentiels en temps réel.",
            solution: "Scraper intelligent surveillant 50+ sites concurrents.",
            impact: "Ajustement dynamique des prix maximisant la marge.",
            stack: ["Scrapy", "Python", "Price Elasticity Model"]
        },
        "gal-6": {
            tag: "Mobile",
            title: "App Gestion Financière",
            subtitle: "Vos finances, simplifiées",
            challenge: "Aider les jeunes actifs à maîtriser leur budget sans complexité.",
            solution: "Application Flutter minimaliste connectée aux comptes bancaires.",
            impact: "10k+ téléchargements la première année.",
            stack: ["Flutter", "Firebase", "Bank API"]
        }
    };

    // --- LOGIC ---
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const triggers = document.querySelectorAll('[data-project-id]');

    function openModal(id) {
        const data = projectsData[id];
        if (!data) return;

        // Populate Content
        modal.querySelector('.modal-tag').textContent = data.tag;
        modal.querySelector('.modal-title').textContent = data.title;
        modal.querySelector('.modal-subtitle').textContent = data.subtitle;
        modal.querySelector('.modal-challenge').textContent = data.challenge;
        modal.querySelector('.modal-solution').textContent = data.solution;
        modal.querySelector('.modal-impact').textContent = data.impact;

        // Populate Tech Stack
        const stackContainer = modal.querySelector('.tech-stack-list');
        stackContainer.innerHTML = ''; // Clear prev
        data.stack.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            stackContainer.appendChild(span);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event Listeners
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // If it's a gallery item, we might need to prevent default if needed, 
            // but div clicks are fine. 
            // If the element is an anchor inside, better handle bubbling.
            const id = trigger.getAttribute('data-project-id');
            openModal(id);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

});
