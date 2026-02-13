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

    // --- 6. Internationalization (i18n) ---

    const translations = {
        fr: {
            "nav.expertise": "Ingen-sociale",
            "nav.products": "Data Products",
            "nav.market": "Market Intelligence",
            "nav.contact": "Contact",
            "hero.title1": "Données Visionnaires.",
            "hero.title2": "Impact Tangible.",
            "hero.subtitle": "Je transforme l'incertitude algorithmique en <span class=\"highlight\">Dominance Commerciale</span>. Expertise hybride entre <span class=\"highlight\">Data Science</span> et <span class=\"highlight\">Stratégie Business</span>.",
            "hero.scroll": "Explorer",
            "philosophy.statement": "\"La donnée n'est que du bruit sans stratégie. J'architecte des systèmes qui convertissent <span class=\"gradient-text\">des téraoctets en revenus</span> et des <span class=\"gradient-text\">capteurs en solutions</span>.\"",
            "section1.label": "01. Innovation",
            "section1.title": "Architecte d'Avantage Concurrentiel",
            "section1.lead": "Des outils propriétaires conçus pour surperformer le marché.",
            "project.simweb.title": "Simulateur Web & Analyse Conjointe",
            "project.simweb.desc": "<strong>Le Défi :</strong> Prédire l'adoption consommateur dans des marchés ultra-volatiles.<br><strong>La Solution :</strong> Un moteur de simulation stochastique basé sur la théorie des jeux. En utilisant l'analyse conjointe, j'ai modélisé les décisions d'achat avec une précision de 95%.",
            "project.intelstrat.title": "Intelligence Stratégique (Veille)",
            "project.intelstrat.desc": "<strong>Le Défi :</strong> Les signaux faibles du marché sont noyés dans le bruit numérique.<br><strong>La Solution :</strong> Un moteur NLP Temps-Réel qui calcule la \"Share of Voice\" et analyse la pression médiatique pour détecter les opportunités inexploitées avant la concurrence.",
            "project.leadqual.title": "Qualification Automatisée de Leads",
            "project.leadqual.desc": "<strong>Le Défi :</strong> Les équipes commerciales perdent 60% de leur temps sur des prospects froids.<br><strong>La Solution :</strong> Un système de scoring prédictif (Machine Learning) intégrant les données comportementales pour réduire le coût d'acquisition de 40%.",
            "section2.label": "02. Stratégie & Outils",
            "section2.title": "Décoder le Comportement Humain",
            "section2.lead": "Maîtrise complète de la chaîne de valeur Data, de la collecte à l'analyse avancée.",
            "intel.collect.title": "Collecte & Terrain",
            "intel.collect.desc": "Déploiement d'enquêtes complexes et gestion de données terrain.",
            "intel.quant.title": "Analyse Quantitative",
            "intel.quant.desc": "Traitements statistiques avancés, segmentation et modélisation.",
            "intel.qual.title": "Analyse Qualitative",
            "intel.qual.desc": "Codage sémantique, analyse de discours et focus groups.",
            "intel.psycho.title": "Psycho-Sociologie",
            "intel.psycho.desc": "Études U&A, Tracking de Marque et NPS Stratégique.",
            "section3.label": "03. Impact",
            "section3.title": "Le Pont Phygital",
            "iot.block1.title": "<i class=\"fas fa-network-wired\"></i> Architecture Edge Computing",
            "iot.block1.desc": "Conception du système nerveux des infrastructures modernes chez <strong>Orange CI</strong>. Traitement de la donnée à la source (Edge) pour une latence milliseconde critique.",
            "iot.block2.title": "<i class=\"fas fa-seedling\"></i> Ambassadeur Orange Corners",
            "iot.block2.desc": "Je ne construis pas seulement de la tech ; je construis des écosystèmes. Mentorat actif de la prochaine génération de géants de la Tech africaine. Formation aux enjeux DPO/RGPD pour une croissance éthique.",
            "impact.card1.title": "Innovation Numérique Inclusive",
            "impact.label.concept": "Le Concept",
            "impact.card1.concept": "Une incubation technologique au cœur des communautés vulnérables. <br>L’apprentissage par la pratique pour résoudre des défis locaux. <br>Un accompagnement physique vers l'innovation et le numérique. <br>Un parcours d'émancipation sociale par la maîtrise technique. <br>",
            "impact.label.value": "Valeur Ajoutée",
            "impact.card1.value": "Création de startups concrètes par des jeunes de milieux défavorisés. <br>Modernisation digitale et autonomisation économique des femmes. <br>Pilotage de l'impact social par des indicateurs de performance réels. <br>Passage de la fracture numérique à l'opportunité entrepreneuriale. <br>",
            "impact.card2.title": "Inclusion Financière (Gender Analytics)",
            "impact.card2.concept": "Démocratisation du crédit via des indicateurs comportementaux. <br>Évaluation des risques basée sur les données réelles et le comportement transactionnel. <br>Outils d'aide à la décision pour les institutions financières. <br>",
            "impact.card2.value": "Réduction du risque de défaut pour les institutions financières. <br>Accès facilité au financement pour les femmes entrepreneurs. <br>Données fiables pour une meilleure gestion des portefeuilles de crédit. <br>Innovation dans les services financiers digitaux. <br>",
            "impact.card3.title": "IoT Vigilance Maternelle",
            "impact.card3.concept": "Télésurveillance biométrique en temps réel pour les zones isolées.<br>Dispositif médical à bas coût pour un suivi proactif et continu. <br>Capteurs connectés low-cost pour le suivi des constantes des femmes enceintes en zones reculées.",
            "impact.card3.value": "Détection IA des signaux faibles pour réduire la mortalité maternelle (\"Tech for Good\"). <br>Solution opérationnelle en zones blanches (sans couverture mobile). <br>Fiabilisation du suivi médical des populations les plus vulnérables. <br>Transformation de signaux IoT bruts en décisions médicales vitales. <br>",
            "impact.card5.title": "Budgétisation Sensible au Genre",
            "impact.card5.concept": "Audit analytique de la dépense publique sous le prisme du genre.<br>Transformation des données budgétaires en leviers d'équité sociale.<br>Analyse granulaire de l'impact des investissements municipaux.<br>Pilotage financier axé sur la justice distributive et l'inclusion.<br>",
            "impact.card5.value": "Automatisation de l'audit budgétaire pour une transparence totale.<br>Aide à la décision stratégique pour les collectivités territoriales.<br>Passage d'un budget administratif à un budget de performance sociale.<br>Impact direct sur l'équité sociale et la réduction des inégalités.",
            "section4.label": "04. Réalisations",
            "section4.title": "Galerie des Projets",
            "section4.lead": "Panorama visuel des solutions déployées.",
            "gallery.item1.title": "Dashboard Analytics",
            "gallery.item1.cat": "Data Visualization",
            "gallery.item2.title": "Réseau de Capteurs IoT",
            "gallery.item2.cat": "Architecture Edge",
            "gallery.item3.title": "Formation Tech Rurale",
            "gallery.item3.cat": "Impact Social",
            "gallery.item4.title": "Stratégie Business",
            "gallery.item4.cat": "Consulting",
            "gallery.item5.title": "Market Logic",
            "gallery.item5.cat": "Data Science",
            "gallery.item6.title": "Application Financière",
            "gallery.item6.cat": "Mobile Dev",
            "contact.title": "Construisons<br>le Futur.",
            "contact.subtitle": "Disponible pour Consulting Stratégique & Leadership Technique.",
            "contact.cta": "Me Contacter",
            "contact.download_cv": "Télécharger mon CV",
            "modal.challenge": "Le Défi",
            "modal.solution": "La Solution",
            "modal.impact": "L'Impact"
        },
        en: {
            "nav.expertise": "Social Engineering",
            "nav.products": "Data Products",
            "nav.market": "Market Intelligence",
            "nav.contact": "Contact",
            "hero.title1": "Visionary Data.",
            "hero.title2": "Tangible Impact.",
            "hero.subtitle": "I turn algorithmic uncertainty into <span class=\"highlight\">Market Dominance</span>. Hybrid expertise between <span class=\"highlight\">Data Science</span> and <span class=\"highlight\">Business Strategy</span>.",
            "hero.scroll": "Explore",
            "philosophy.statement": "\"Data is just noise without strategy. I architect systems that convert <span class=\"gradient-text\">terabytes into revenue</span> and <span class=\"gradient-text\">sensors into solutions</span>.\"",
            "section1.label": "01. Innovation",
            "section1.title": "Architect of Competitive Advantage",
            "section1.lead": "Proprietary tools designed to outperform the market.",
            "project.simweb.title": "Web Simulator & Conjoint Analysis",
            "project.simweb.desc": "<strong>The Challenge:</strong> Predicting consumer adoption in ultra-volatile markets.<br><strong>The Solution:</strong> A stochastic simulation engine based on game theory. Using conjoint analysis, I modeled purchasing decisions with 95% accuracy.",
            "project.intelstrat.title": "Strategic Intelligence (Monitoring)",
            "project.intelstrat.desc": "<strong>The Challenge:</strong> Weak market signals are drowned in digital noise.<br><strong>The Solution:</strong> A Real-Time NLP engine that calculates \"Share of Voice\" and analyzes media pressure to detect untapped opportunities before the competition.",
            "project.leadqual.title": "Automated Lead Qualification",
            "project.leadqual.desc": "<strong>The Challenge:</strong> Sales teams lose 60% of their time on cold prospects.<br><strong>The Solution:</strong> A predictive scoring system (Machine Learning) integrating behavioral data to reduce acquisition costs by 40%.",
            "section2.label": "02. Strategy & Tools",
            "section2.title": "Decoding Human Behavior",
            "section2.lead": "Complete mastery of the Data value chain, from collection to advanced analysis.",
            "intel.collect.title": "Collection & Fieldwork",
            "intel.collect.desc": "Deployment of complex surveys and field data management.",
            "intel.quant.title": "Quantitative Analysis",
            "intel.quant.desc": "Advanced statistical processing, segmentation, and modeling.",
            "intel.qual.title": "Qualitative Analysis",
            "intel.qual.desc": "Semantic coding, discourse analysis, and focus groups.",
            "intel.psycho.title": "Psycho-Sociology",
            "intel.psycho.desc": "U&A Studies, Brand Tracking, and Strategic NPS.",
            "section3.label": "03. Impact",
            "section3.title": "The Phygital Bridge",
            "iot.block1.title": "<i class=\"fas fa-network-wired\"></i> Edge Computing Architecture",
            "iot.block1.desc": "Designing the nervous system of modern infrastructures at <strong>Orange CI</strong>. Processing data at the source (Edge) for critical millisecond latency.",
            "iot.block2.title": "<i class=\"fas fa-seedling\"></i> Orange Corners Ambassador",
            "iot.block2.desc": "I don't just build tech; I build ecosystems. Active mentorship of the next generation of African Tech giants. Training on DPO/GDPR issues for ethical growth.",
            "impact.card1.title": "Inclusive Digital Innovation",
            "impact.label.concept": "The Concept",
            "impact.card1.concept": "Technological incubation at the heart of vulnerable communities. <br>Learning by doing to solve local challenges. <br>Physical support towards innovation and digital literacy. <br>A path to social emancipation through technical mastery. <br>",
            "impact.label.value": "Value Added",
            "impact.card1.value": "Creation of concrete startups by youth from disadvantaged backgrounds. <br>Digital modernization and economic empowerment of women. <br> Steering social impact through real performance indicators. <br>Turning the digital divide into entrepreneurial opportunity. <br>",
            "impact.card2.title": "Financial Inclusion (Gender Analytics)",
            "impact.card2.concept": "Democratization of credit via behavioral indicators. <br>Risk assessment based on real data and transactional behavior. <br>Decision support tools for financial institutions. <br>",
            "impact.card2.value": "Default risk reduction for financial institutions. <br>Facilitated access to funding for women entrepreneurs. <br>Reliable data for better credit portfolio management. <br>Innovation in digital financial services. <br>",
            "impact.card3.title": "Maternal Vigilance IoT",
            "impact.card3.concept": "Real-time biometric remote monitoring for isolated zones.<br>Low-cost medical device for proactive and continuous tracking. <br>Connected sensors for monitoring vital signs of pregnant women in remote areas.",
            "impact.card3.value": "AI detection of weak signals to reduce maternal mortality (\"Tech for Good\"). <br>Operational solution in dead zones (no mobile coverage). <br>Reliability of medical follow-up for the most vulnerable populations. <br>Transforming raw IoT signals into vital medical decisions. <br>",
            "impact.card5.title": "Gender Responsive Budgeting",
            "impact.card5.concept": "Analytical audit of public spending through the lens of gender.<br>Transforming budgetary data into levers for social equity.<br>Granular analysis of the impact of municipal investments.<br>Financial steering focused on distributive justice and inclusion.<br>",
            "impact.card5.value": "Automation of budgetary audit for total transparency.<br>Strategic decision support for local authorities.<br>Transition from an administrative budget to a social performance budget.<br>Direct impact on social equity and reduction of inequalities.",
            "section4.label": "04. Achievements",
            "section4.title": "Project Gallery",
            "section4.lead": "Visual panorama of deployed solutions.",
            "gallery.item1.title": "Dashboard Analytics",
            "gallery.item1.cat": "Data Visualization",
            "gallery.item2.title": "IoT Sensor Network",
            "gallery.item2.cat": "Edge Architecture",
            "gallery.item3.title": "Rural Tech Training",
            "gallery.item3.cat": "Social Impact",
            "gallery.item4.title": "Business Strategy",
            "gallery.item4.cat": "Consulting",
            "gallery.item5.title": "Market Logic",
            "gallery.item5.cat": "Data Science",
            "gallery.item6.title": "Financial App",
            "gallery.item6.cat": "Mobile Dev",
            "contact.title": "Let's Build<br>the Future.",
            "contact.subtitle": "Available for Strategic Consulting & Technical Leadership.",
            "contact.cta": "Contact Me",
            "contact.download_cv": "Download my CV",
            "modal.challenge": "The Challenge",
            "modal.solution": "The Solution",
            "modal.impact": "The Impact"
        }
    };

    const projectsData = {
        // --- STICKY CARDS ---
        "sim-web": {
            fr: {
                tag: "Innovation Stratégique",
                title: "Simulateur Web & Analyse Conjointe",
                subtitle: "Décoder l'Irrationalité du Consommateur",
                challenge: "Dans un marché volatile, les méthodes de sondage classiques échouent à prédire le comportement réel d'achat. Les consommateurs déclarent une chose mais en font une autre.",
                solution: "Développement d'un moteur de simulation stochastique basé sur la théorie des jeux. En utilisant l'analyse conjointe (Trade-off), j'ai forcé les utilisateurs à faire des choix réalistes sous contrainte de budget, révélant ainsi leurs véritables hiérarchies de valeurs.",
                impact: "Modèle prédictif atteignant 95% de corrélation avec les ventes réelles post-lancement. A permis de re-pricé une gamme de produits, générant +15% de marge nette."
            },
            en: {
                tag: "Strategic Innovation",
                title: "Web Simulator & Conjoint Analysis",
                subtitle: "Decoding Consumer Irrationality",
                challenge: "In a volatile market, classic polling methods fail to predict real purchasing behavior. Consumers say one thing but do another.",
                solution: "Development of a stochastic simulation engine based on game theory. Using conjoint analysis (Trade-off), I forced users to make realistic choices under budget constraints, revealing their true value hierarchies.",
                impact: "Predictive model reaching 95% correlation with real post-launch sales. Allowed repricing a product range, generating +15% net margin."
            },
            stack: ["Python", "Django", "SciPy", "Chart.js", "Statistical Modeling"]
        },
        "intel-strat": {
            fr: {
                tag: "Market Intelligence",
                title: "Veille Stratégique IA",
                subtitle: "Voir ce que les autres ignorent",
                challenge: "Les signaux faibles annonciateurs de disruption sont noyés dans le bruit assourdissant du Big Data social et médiatique. L'humain seul ne peut plus suivre.",
                solution: "Création d'un pipeline NLP (Traitement du Langage Naturel) temps-réel. L'outil scanne des millions de sources, calcule la 'Share of Voice' et analyse la tonalité émotionnelle pour détecter les micro-tendances émergentes avant qu'elles ne deviennent mainstream.",
                impact: "Identification d'une opportunité de niche 6 mois avant la concurrence, permettant au client de capturer 30% de parts de marché dès l'entrée."
            },
            en: {
                tag: "Market Intelligence",
                title: "AI Strategic Monitoring",
                subtitle: "Seeing what others ignore",
                challenge: "Weak signals heralding disruption are drowned in the deafening noise of social and media Big Data. Humans alone can no longer keep up.",
                solution: "Creation of a Real-Time NLP (Natural Language Processing) pipeline. The tool scans millions of sources, calculates 'Share of Voice' and analyzes emotional tone to detect emerging micro-trends before they become mainstream.",
                impact: "Identified a niche opportunity 6 months before the competition, allowing the client to capture 30% market share upon entry."
            },
            stack: ["Python NLP", "Spacy", "Atlas.ti", "React Dashboard", "Twitter API"]
        },
        "lead-qual": {
            fr: {
                tag: "Sales Automation",
                title: "Qualification Automatisée de Leads",
                subtitle: "L'efficacité commerciale réinventée",
                challenge: "Les équipes commerciales perdaient 60% de leur temps à chasser des prospects froids ou mal qualifiés, plombant le coût d'acquisition client (CAC).",
                solution: "Implémentation d'un algorithme de Scoring Prédictif (Machine Learning). Le système analyse les données comportementales et démographiques pour attribuer un score de 'chaleur' dynamique à chaque prospect en temps réel.",
                impact: "Réduction du CAC de 40% et augmentation du taux de conversion de 12% à 28% en moins de deux trimestres."
            },
            en: {
                tag: "Sales Automation",
                title: "Automated Lead Qualification",
                subtitle: "Commercial efficiency reinvented",
                challenge: "Sales teams were losing 60% of their time chasing cold or poorly qualified prospects, dragging down customer acquisition cost (CAC).",
                solution: "Implementation of a Predictive Scoring algorithm (Machine Learning). The system analyzes behavioral and demographic data to assign a dynamic 'heat' score to each prospect in real time.",
                impact: "Reduced CAC by 40% and increased conversion rate from 12% to 28% in less than two quarters."
            },
            stack: ["Scikit-Learn", "Salesforce API", "Pandas", "Automated Workflows"]
        },

        // --- IMPACT SOCIAL ---
        "impact-1": {
            fr: {
                tag: "ÉdTech & Inclusion",
                title: "Innovation Numérique Inclusive",
                subtitle: "L'éducation technologique comme levier d'émancipation sociale",
                challenge: "Dans les milieux défavorisés, l'absence de formation aux outils numériques et à l'innovation constitue une barrière majeure à l'insertion économique. Cette fracture numérique ne se limite pas à l'accès au matériel, mais touche surtout au manque de compétences pratiques. Sans un accompagnement adapté, les jeunes restent exclus de l'écosystème des startups et les femmes ne parviennent pas à moderniser leurs activités pour accroître leurs revenus.",
                solution: "Conception et animation d'un programme de formation physique complet, axé sur l'innovation et l'entrepreneuriat digital. Contrairement aux approches purement théoriques, ce cursus a été structuré autour de projets concrets : apprentissage des outils numériques, initiation au design de solutions et gestion de micro-entreprises. L'approche pédagogique a été spécialement adaptée aux réalités socioculturelles des participants (enfants, jeunes et femmes) pour garantir une appropriation immédiate des compétences.",
                impact: "Le programme a agi comme un véritable catalyseur de développement local : il a permis l'éclosion de plusieurs startups innovantes portées par des jeunes issus de ces quartiers. Parallèlement, les femmes participantes ont réussi à intégrer le numérique dans leurs activités génératrices de revenus, constatant une augmentation significative de leur chiffre d'affaires. Ce projet prouve que la maîtrise de l'innovation est un puissant moteur de résilience et de croissance économique pour les populations vulnérables."
            },
            en: {
                tag: "EdTech & Inclusion",
                title: "Inclusive Digital Innovation",
                subtitle: "Tech education as a lever for social emancipation",
                challenge: "In disadvantaged backgrounds, the lack of training in digital tools and innovation constitutes a major barrier to economic insertion. This digital divide is not limited to hardware access, but mainly affects the lack of practical skills. Without adapted support, young people remain excluded from the startup ecosystem and women fail to modernize their activities to increase their income.",
                solution: "Design and facilitation of a comprehensive physical training program, focused on innovation and digital entrepreneurship. Unlike purely theoretical approaches, this curriculum was structured around concrete projects: learning digital tools, introduction to solution design, and micro-enterprise management. The pedagogical approach was specially adapted to the socio-cultural realities of the participants (children, youth, and women) to ensure immediate skill appropriation.",
                impact: "The program acted as a true catalyst for local development: it allowed the emergence of several innovative startups led by young people from these neighborhoods. At the same time, participating women successfully integrated digital tools into their income-generating activities, noting a significant increase in their turnover. This project proves that mastering innovation is a powerful engine of resilience and economic growth for vulnerable populations."
            },
            stack: ["Pédagogie Active", "Design Thinking", "Mentorat", "Économie Sociale et Solidaire", "Coaching d'Entrepreneurs", "Formation communautaire", "Stratégies d'inclusion numérique."]
        },
        "impact-2": {
            fr: {
                tag: "FinTech & Gender",
                title: "Inclusion Financière Féminine",
                subtitle: "La Data au service de l'égalité",
                challenge: "Les femmes entrepreneures du secteur informel sont « invisibles » pour les banques classiques, faute d'historique de crédit standard.",
                solution: "Plateforme d'analyse prédictive utilisant des données alternatives (paiements mobiles, fiabilité sociale) pour créer un 'Score de Résilience'.",
                impact: "Va permettre aux institutions de microfinance de débloquer des crédits pour 2000+ femmes, avec un taux de remboursement supérieur à la moyenne nationale."
            },
            en: {
                tag: "FinTech & Gender",
                title: "Female Financial Inclusion",
                subtitle: "Data serving equality",
                challenge: "Women entrepreneurs in the informal sector are 'invisible' to classic banks due to a lack of standard credit history.",
                solution: "Predictive analytics platform using alternative data (mobile payments, social reliability) to create a 'Resilience Score'.",
                impact: "Will allow microfinance institutions to unlock loans for 2000+ women, with a repayment rate higher than the national average."
            },
            stack: ["R", "Shiny Apps", "Predictive Modeling", "Alternative Data"]
        },
        "impact-3": {
            fr: {
                tag: "E-Santé & IoT",
                title: "IoT Vigilance des populations vulnérables",
                subtitle: "Sauver des vies par la donnée",
                challenge: "Dans les zones rurales comme urbaines, l'absence de suivi médical continu et l'éloignement des centres de santé contribuent à un taux de mortalité maternelle alarmant. Le problème majeur réside dans la détection tardive des complications physiologiques : sans monitoring en temps réel, les secours interviennent souvent au-delà du seuil critique de survie",
                solution: "Mise en place d'un écosystème de télésurveillance biométrique résilient et à bas coût. Le dispositif repose sur des bracelets connectés et un robot mobile qui collectent les constantes vitales, permettant une connectivité longue portée même dans les zones blanches. Les flux de données sont centralisés sur un hub intelligent où des algorithmes d'analyse identifient les signaux de détresse et déclenchent des alertes automatiques immédiates auprès des personnels soignants et des proches.",
                impact: "Une optimisation sans précédent de la chaîne de secours, réduisant le temps d'intervention médicale critique de 4 heures à seulement 30 minutes dans la zone pilote. Cette réactivité, rendue possible par la transformation de la donnée brute en information décisionnelle, permet de passer d'une médecine réactive à une vigilance proactive pour les populations les plus vulnérables."
            },
            en: {
                tag: "E-Health & IoT",
                title: "IoT Vigilance for Vulnerable Populations",
                subtitle: "Saving lives through data",
                challenge: "In rural and urban areas, the lack of continuous medical follow-up and the distance from health centers contribute to an alarming maternal mortality rate. The major problem lies in the late detection of physiological complications: without real-time monitoring, rescue services often intervene beyond the critical survival threshold.",
                solution: "Implementation of a resilient and low-cost biometric remote monitoring ecosystem. The device relies on connected bracelets and a mobile robot that collect vital signs, allowing long-range connectivity even in dead zones. Data streams are centralized on a smart hub where analysis algorithms identify distress signals and trigger immediate automatic alerts to healthcare personnel and relatives.",
                impact: "Unprecedented optimization of the rescue chain, reducing critical medical intervention time from 4 hours to just 30 minutes in the pilot zone. This responsiveness, made possible by transforming raw data into decision-making information, allows shifting from reactive medicine to proactive vigilance for the most vulnerable populations."
            },
            stack: ["IoT", "Capteurs biométriques", "Robot mobile", "Alerting System"]
        },
        "impact-5": {
            fr: {
                tag: "Gouvernance & Data",
                title: "Budgétisation Sensible au Genre",
                subtitle: "Transformer la finance publique en levier d'équité",
                challenge: "Malgré les cadres législatifs en faveur de l'égalité, les budgets publics conservent souvent une 'neutralité apparente' qui masque des disparités systémiques. Sans une analyse granulaire de la destination réelle des fonds, les allocations financières échouent fréquemment à répondre aux besoins spécifiques des femmes, perpétuant ainsi des barrières invisibles dans l'accès aux infrastructures et aux services de base.",
                solution: "Conception d'un moteur d'audit analytique automatisé capable de scanner et de décortiquer les lignes budgétaires municipales. En utilisant des techniques avancées de traitement de données, l'algorithme catégorise les dépenses et calcule leur impact différencié selon le genre. Cette solution transforme des feuilles de calcul comptables complexes en indicateurs de performance sociale, permettant de passer d'une gestion budgétaire purement administrative à un pilotage stratégique axé sur l'inclusion.",
                impact: "Le déploiement au sein de deux mairies pilotes a permis une réorientation factuelle des ressources vers des investissements à haute valeur sociale. Ce rééquilibrage a conduit au financement d'infrastructures concrètes, telles que le renforcement de la sécurité via l'éclairage public ciblé et la création de crèches communautaires, facilitant directement l'autonomisation économique des femmes et la réduction des inégalités locales."
            },
            en: {
                tag: "Governance & Data",
                title: "Gender Responsive Budgeting",
                subtitle: "Transforming public finance into a lever for equity",
                challenge: "Despite legislative frameworks in favor of equality, public budgets often retain an 'apparent neutrality' that masks systemic disparities. Without granular analysis of the real destination of funds, financial allocations frequently fail to meet the specific needs of women, thus perpetuating invisible barriers in access to infrastructure and basic services.",
                solution: "Design of an automated analytical audit engine capable of scanning and dissecting municipal budget lines. Using advanced data processing techniques, the algorithm categorizes expenses and calculates their differentiated impact according to gender. This solution transforms complex accounting spreadsheets into social performance indicators, generating a shift from purely administrative budget management to strategic steering focused on inclusion.",
                impact: "Deployment within two pilot town halls allowed for factual reorientation of resources towards high social value investments. This rebalancing led to the financing of concrete infrastructure, such as strengthening security via targeted street lighting and the creation of community nurseries, directly facilitating women's economic empowerment and reducing local inequalities."
            },
            stack: ["Cadres macroéconomiques de budgétisation sensible au genre", "Python Pandas", "Data Auditing", "Public Policy Analytics"]
        },

        // --- GALLERY ITEMS ---
        "gal-1": {
            fr: {
                tag: "Data Viz",
                title: "Dashboard Analytics 360",
                subtitle: "La beauté de la complexité",
                challenge: "Rendre intelligibles des millions de lignes de logs serveurs pour des décideurs non-techniques.",
                solution: "Création d'un dashboard interactif et esthétique, privilégiant la clarté visuelle et la narration des données (Data Storytelling).",
                impact: "Adopté comme outil de pilotage quotidien par le CODIR."
            },
            en: {
                tag: "Data Viz",
                title: "Dashboard Analytics 360",
                subtitle: "The beauty of complexity",
                challenge: "Making millions of server log lines intelligible for non-technical decision-makers.",
                solution: "Creation of an interactive and aesthetic dashboard, prioritizing visual clarity and data storytelling.",
                impact: "Adopted as a daily steering tool by the Executive Committee."
            },
            stack: ["Tableau", "SQL", "UX Design"]
        },
        "gal-2": {
            fr: {
                tag: "IoT Architecture",
                title: "Surveillance des personnes vulnérables",
                subtitle: "Connecter la ville",
                challenge: "Optimiser la gestion des déchets urbains grâce à la tech.",
                solution: "Mise en place d'un écosystème de télésurveillance biométrique",
                impact: "Dispositif médical à bas coût pour un suivi proactif et continu."
            },
            en: {
                tag: "IoT Architecture",
                title: "Vulnerable People Monitoring",
                subtitle: "Connect the city",
                challenge: "Optimize urban waste management through tech.",
                solution: "Implementation of a biometric remote monitoring ecosystem",
                impact: "Low-cost medical device for proactive and continuous tracking."
            },
            stack: ["IoT", "Capteurs biométriques", "Robot mobile", "Alerting System"]
        },
        "gal-3": {
            fr: {
                tag: "Education",
                title: "Bootcamp Tech Rural",
                subtitle: "Former la prochaine élite",
                challenge: "Décentraliser l'excellence technologique.",
                solution: "Programme intensif de 3 semaines au cœur des villages pour initier au code et à la data.",
                impact: "50 jeunes formés, 10 startups locales créées."
            },
            en: {
                tag: "Education",
                title: "Rural Tech Bootcamp",
                subtitle: "Training the next elite",
                challenge: "Decentralize technological excellence.",
                solution: "Intensive 3-week program in the heart of villages to introduce code and data.",
                impact: "50 youths trained, 10 local startups created."
            },
            stack: ["Pedagogy", "Community Building", "Python Basics"]
        },
        "gal-4": {
            fr: {
                tag: "Consulting",
                title: "Refonte Stratégie Data",
                subtitle: "De l'intuition à la preuve",
                challenge: "Une PME naviguait à vue sans utiliser son capital de données.",
                solution: "Audit complet et mise en place d'une feuille de route Data sur 3 ans.",
                impact: "Transformation culturelle et doublement du ROI marketing."
            },
            en: {
                tag: "Consulting",
                title: "Data Strategy Revamp",
                subtitle: "From intuition to proof",
                challenge: "A SME was flying blind without using its data capital.",
                solution: "Complete audit and implementation of a 3-year Data roadmap.",
                impact: "Cultural transformation and doubling of marketing ROI."
            },
            stack: ["Audit", "Strategy", "Change Management"]
        },
        "gal-5": {
            fr: {
                tag: "Data Science",
                title: "Market Logic Engine",
                subtitle: "L'algorithme du marché",
                challenge: "Comprendre les dynamiques de prix concurrentiels en temps réel.",
                solution: "Scraper intelligent surveillant 50+ sites concurrents.",
                impact: "Ajustement dynamique des prix maximisant la marge."
            },
            en: {
                tag: "Data Science",
                title: "Market Logic Engine",
                subtitle: "The market algorithm",
                challenge: "Understanding competitive price dynamics in real time.",
                solution: "Smart scraper monitoring 50+ competitor sites.",
                impact: "Dynamic price adjustment maximizing margin."
            },
            stack: ["Scrapy", "Python", "Price Elasticity Model"]
        },
        "gal-6": {
            fr: {
                tag: "Mobile",
                title: "App Gestion Financière",
                subtitle: "Vos finances, simplifiées",
                challenge: "Aider les jeunes actifs à maîtriser leur budget sans complexité.",
                solution: "Application Flutter minimaliste connectée aux comptes bancaires.",
                impact: "10k+ téléchargements la première année."
            },
            en: {
                tag: "Mobile",
                title: "Financial Management App",
                subtitle: "Your finances, simplified",
                challenge: "Helping young professionals master their budget without complexity.",
                solution: "Minimalist Flutter application connected to bank accounts.",
                impact: "10k+ downloads the first year."
            },
            stack: ["Flutter", "Firebase", "Bank API"]
        }
    };

    // --- LOGIC ---
    let currentLang = localStorage.getItem('lang') || 'fr'; // Default to French
    const langToggle = document.getElementById('lang-toggle');
    const langText = langToggle ? langToggle.querySelector('.lang-text') : null;

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        // Update Toggle Text
        if (langText) {
            langText.textContent = lang.toUpperCase();
        }

        // Update DOM Elements
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Check if it's an innerHTML update (for tags inside) or textContent
                if (translations[lang][key].includes('<')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
    }

    // Initialize Language
    updateLanguage(currentLang);

    // Toggle Listener
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            updateLanguage(newLang);
        });
    }

    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const triggers = document.querySelectorAll('[data-project-id]');

    function openModal(id) {
        const data = projectsData[id];
        if (!data) return;

        // Get language specific data
        const langData = data[currentLang];

        // Populate Content
        modal.querySelector('.modal-tag').textContent = langData.tag;
        modal.querySelector('.modal-title').textContent = langData.title;
        modal.querySelector('.modal-subtitle').textContent = langData.subtitle;
        modal.querySelector('.modal-challenge').textContent = langData.challenge;
        modal.querySelector('.modal-solution').textContent = langData.solution;
        modal.querySelector('.modal-impact').textContent = langData.impact;

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
