// ===================== THEME =====================
let darkMode = false;
function toggleTheme() {
  darkMode = !darkMode;
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : '');
  const icon = document.getElementById('theme-icon');
  icon.innerHTML = darkMode
    ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
    : '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
}

// ===================== DATA =====================
const FEATURES = {
  pages:[
    {id:'f-home',name:'Home / Hero section',desc:'Landing area with name, tagline, call-to-action button',price:5000},
    {id:'f-about',name:'About / Bio page',desc:'Personal story, background, skills summary',price:3000},
    {id:'f-portfolio',name:'Portfolio / Work gallery',desc:'Projects, case studies, image gallery with filters',price:4500},
    {id:'f-cv',name:'Resume / CV page',desc:'Work experience, education, skills timeline',price:2000},
    {id:'f-services',name:'Services page',desc:'List of offered services with descriptions and pricing',price:3000},
    {id:'f-blog',name:'Blog / Articles section',desc:'News/blog listing with individual post pages',price:5000},
    {id:'f-contact',name:'Contact page',desc:'Dedicated page with form, map embed, social links',price:1500},
    {id:'f-testimonials',name:'Testimonials section',desc:'Client reviews, success stories, star ratings',price:1500},
    {id:'f-faq',name:'FAQ / Help section',desc:'Accordion FAQ, categorized Q&A',price:1500},
    {id:'f-team',name:'Team / Staff page',desc:'Team profiles with photos, roles, social links',price:2500},
    {id:'f-gallery',name:'Photo/Media gallery',desc:'Full-page media gallery with lightbox',price:2000},
    {id:'f-pricing',name:'Pricing page',desc:'Service tiers, comparison table, CTAs',price:2000},
  ],
  design:[
    {id:'f-responsive',name:'Fully mobile responsive',desc:'Perfect on all screen sizes (phones, tablets, desktop)',price:3000},
    {id:'f-darkmode',name:'Dark/light mode toggle',desc:'User can switch between themes, preference saved',price:2500},
    {id:'f-animations',name:'Scroll animations & micro-interactions',desc:'Elements animate on scroll, hover interactions',price:3500},
    {id:'f-custom-design',name:'Custom branded design',desc:'Unique layout built around client brand identity',price:5000},
    {id:'f-loading',name:'Custom loading screen / preloader',desc:'Branded intro animation on page load',price:1500},
    {id:'f-parallax',name:'Parallax / depth effects',desc:'Immersive scrolling depth on hero sections',price:2000},
    {id:'f-accessibility',name:'Accessibility (WCAG 2.1)',desc:'Screen-reader, keyboard nav, color contrast',price:3000},
  ],
  func:[
    {id:'f-form',name:'Contact form with email delivery',desc:'Working form sending emails via EmailJS or backend',price:2000},
    {id:'f-multilang',name:'Multi-language support',desc:'i18n with language switcher (2 languages)',price:5000},
    {id:'f-social',name:'Social media feed',desc:'Instagram, Telegram channel, or YouTube embed',price:2500},
    {id:'f-analytics',name:'Google Analytics + Search Console',desc:'Full visitor tracking and SEO indexing',price:1000},
    {id:'f-chat',name:'Live chat widget',desc:'Telegram bot or Tawk.to chat integration',price:1500},
    {id:'f-booking',name:'Online booking / appointment',desc:'Calendar scheduling, confirmation emails',price:6000},
    {id:'f-maps',name:'Google Maps integration',desc:'Interactive map with location pinning',price:1000},
    {id:'f-newsletter',name:'Newsletter / email subscription',desc:'Mailchimp or custom email list signup',price:2000},
    {id:'f-search',name:'Site search',desc:'Full-text search across site content',price:3000},
  ],
  content:[
    {id:'f-copywriting',name:'Copywriting / content writing',desc:'Professional text written for all pages',price:4000},
    {id:'f-photo-edit',name:'Photo editing & web optimization',desc:'Resize, compress, color-correct all images',price:1500},
    {id:'f-icons',name:'Custom icon set design',desc:'Unique icon family matching the brand',price:2500},
    {id:'f-video',name:'Video background / intro clip',desc:'Video editing and web-optimized export',price:3500},
    {id:'f-brand',name:'Brand identity creation',desc:'Color palette, typography, brand guide',price:6000},
    {id:'f-infographic',name:'Custom infographics / illustrations',desc:'Original graphics explaining services/stats',price:3000},
  ],
  tech:[
    {id:'f-seo',name:'Basic SEO setup',desc:'Meta tags, Open Graph, sitemap, robots.txt',price:1500},
    {id:'f-advseo',name:'Advanced SEO + schema markup',desc:'Structured data, Google Business, keyword strategy',price:4000},
    {id:'f-hosting-setup',name:'Domain + hosting deployment',desc:'Launch to Netlify/Vercel + domain DNS setup',price:2000},
    {id:'f-ssl',name:'SSL certificate & HTTPS',desc:'Secure site with padlock — recommended by Google',price:500},
    {id:'f-speed',name:'Performance optimization',desc:'Core Web Vitals, lazy loading, caching, 90+ score',price:3000},
    {id:'f-backup',name:'Automated weekly backups',desc:'Automated site and database backup system',price:1500},
    {id:'f-maintenance',name:'Monthly maintenance plan',desc:'Updates, monitoring, security patches (per month)',price:3000},
  ]
};

const BACKEND_FEATURES = {
  cms:[
    {id:'bk-wordpress',name:'WordPress CMS',desc:'Full WordPress setup — client can edit text, images, blog posts',price:8000},
    {id:'bk-strapi',name:'Strapi / Sanity headless CMS',desc:'Modern headless CMS for React/Next.js sites',price:12000},
    {id:'bk-airtable',name:'Airtable as backend',desc:'No-code database for listings, portfolios, staff directories',price:6000},
    {id:'bk-firebase',name:'Firebase / Supabase (serverless)',desc:'Realtime database + auth + storage without managing a server',price:10000},
  ],
  db:[
    {id:'bk-db-design',name:'Database design & setup',desc:'Schema design, tables, relations for your use case',price:8000},
    {id:'bk-admin',name:'Custom admin dashboard',desc:'Web interface to manage products, users, content, orders',price:18000},
    {id:'bk-crud',name:'Full CRUD API',desc:'Create/read/update/delete endpoints for all data types',price:12000},
    {id:'bk-reports',name:'Reports & data export',desc:'PDF/Excel reports, analytics dashboard',price:8000},
  ],
  auth:[
    {id:'bk-login',name:'User login / signup system',desc:'Email/password auth with password reset',price:8000},
    {id:'bk-social-auth',name:'Social login (Google, Facebook)',desc:'OAuth sign-in with Google or Facebook',price:5000},
    {id:'bk-roles',name:'Role-based access (admin/user/staff)',desc:'Different permission levels per user type',price:6000},
    {id:'bk-otp',name:'Phone OTP verification (Telebirr/SMS)',desc:'SMS one-time password for Ethiopian numbers',price:7000},
    {id:'bk-profile',name:'User profile & dashboard',desc:'Editable profile, history, settings for logged-in users',price:10000},
  ],
  ecom:[
    {id:'bk-products',name:'Product catalog & inventory',desc:'Add/edit products, categories, stock management',price:15000},
    {id:'bk-cart',name:'Shopping cart & checkout',desc:'Cart, order summary, discount codes',price:12000},
    {id:'bk-payment-tele',name:'Telebirr payment integration',desc:'Accept Telebirr payments online',price:10000},
    {id:'bk-payment-cbe',name:'CBE Birr / bank API integration',desc:'CBE or Awash bank payment API',price:12000},
    {id:'bk-orders',name:'Order management system',desc:'Order tracking, status updates, delivery management',price:10000},
    {id:'bk-invoice',name:'Auto invoice generation',desc:'PDF invoice sent on every order',price:5000},
  ],
  api:[
    {id:'bk-google',name:'Google Maps / Places API',desc:'Location search, business info auto-fill',price:3000},
    {id:'bk-telegram-bot',name:'Telegram bot notifications',desc:'Auto-notifications via Telegram for orders/leads',price:5000},
    {id:'bk-email-api',name:'Transactional email (SendGrid)',desc:'Professional email system for receipts, resets, alerts',price:4000},
    {id:'bk-whatsapp',name:'WhatsApp Business API',desc:'Send order confirmations and alerts via WhatsApp',price:7000},
    {id:'bk-third',name:'3rd party API integration',desc:'Connect any external service (weather, stock, etc.)',price:8000},
  ],
  infra:[
    {id:'bk-vps',name:'VPS / cloud server setup (DigitalOcean)',desc:'Dedicated server, Nginx, SSL, firewall, PM2',price:8000},
    {id:'bk-ci',name:'CI/CD pipeline (GitHub Actions)',desc:'Auto-deploy on every code push',price:5000},
    {id:'bk-cdn',name:'CDN + media storage (Cloudflare + S3)',desc:'Fast global delivery for images and files',price:6000},
    {id:'bk-monitoring',name:'Uptime monitoring & alerts',desc:'Instant notification if site goes down',price:3000},
    {id:'bk-gdpr',name:'GDPR / privacy compliance setup',desc:'Cookie consent, privacy policy, data request handling',price:5000},
  ]
};

const ADDONS = [
  {id:'a-logo',name:'Logo design package',desc:'Full logo + variations + brand colors + source files',price:7000},
  {id:'a-flyer',name:'Social media flyer pack (5 designs)',desc:'Branded templates for Instagram/Telegram/Facebook',price:4000},
  {id:'a-business-card',name:'Business card design (print-ready)',desc:'Double-sided, CMYK, sent to printer',price:2000},
  {id:'a-letterhead',name:'Letterhead + email signature',desc:'Official branded stationery for documents',price:2500},
  {id:'a-presentation',name:'PowerPoint / Canva pitch deck',desc:'Branded slide deck (10–15 slides)',price:5000},
  {id:'a-maintenance-mo',name:'Monthly maintenance retainer',desc:'Updates, backups, monitoring, content edits (per month)',price:4000,isMonthly:true},
  {id:'a-training',name:'Client training session (2hr)',desc:'Teach client how to manage their site',price:2000},
  {id:'a-seo-monthly',name:'Monthly SEO service',desc:'Keyword tracking, content tips, Google ranking reports',price:6000,isMonthly:true},
  {id:'a-custom',name:'Custom add-on (specify)',desc:'Enter a custom service and its price',price:0,isCustom:true},
];

const TIMELINE_LABELS = ['3 days','5 days','1 week','2 weeks','3 weeks','1 month','6 weeks','2 months'];

const BIZ_TYPES = [
  {id:'individual',icon:'👤',name:'Individual / Freelancer',desc:'Portfolio, CV site'},
  {id:'small',icon:'🏪',name:'Small Business',desc:'1–20 staff, local'},
  {id:'medium',icon:'🏢',name:'Medium Business',desc:'20–100 staff'},
  {id:'enterprise',icon:'🏭',name:'Large Enterprise',desc:'100+ staff'},
  {id:'ngo',icon:'🌍',name:'NGO / Non-profit',desc:'Charity, development'},
  {id:'government',icon:'🏛️',name:'Government / Public',desc:'Municipality, ministry'},
  {id:'startup',icon:'🚀',name:'Startup',desc:'Tech, early-stage'},
  {id:'church',icon:'⛪',name:'Church / Religious',desc:'Congregation, ministry'},
  {id:'school',icon:'🎓',name:'School / Education',desc:'College, training center'},
  {id:'healthcare',icon:'🏥',name:'Healthcare / Clinic',desc:'Hospital, clinic, doctor'},
  {id:'media',icon:'📺',name:'Media / Content',desc:'News, YouTube, blog'},
  {id:'ecommerce',icon:'🛍️',name:'E-commerce',desc:'Online store, products'},
];

const TIERS = [
  {name:'Starter',price:'5,000–15,000',unit:'ETB',desc:'Simple 1–3 page site, no backend. Individual / freelancer.',color:'var(--text2)'},
  {name:'Standard',price:'15,000–40,000',unit:'ETB',desc:'5–8 pages, contact form, SEO. Small business / NGO.',color:'var(--blue)'},
  {name:'Professional',price:'40,000–90,000',unit:'ETB',desc:'Full site + CMS + backend. Medium biz / startup.',color:'var(--accent2)'},
  {name:'Enterprise',price:'90,000–200,000+',unit:'ETB',desc:'Custom platform, DB, integrations. Large org / gov.',color:'var(--red)'},
];

const EXAMPLE_SITES = [
  {
    cat:'🏢 Corporate / Business / SaaS',
    catDesc:'Show these for businesses, startups, agencies, and professional services',
    sites:[
      {name:'Stripe',url:'https://stripe.com',emoji:'💳',desc:'The gold standard of SaaS design. Precise typography, animated product demos, deep trust signals. Dark hero transitions to light sections seamlessly.',tags:['Dark hero','Animations','Enterprise','Trust']},
      {name:'Linear',url:'https://linear.app',emoji:'⚡',desc:'Minimal dark masterpiece. Every pixel earns its place. Fast animations, monochrome palette with a single accent. Called "the most beautiful dark site" by designers globally.',tags:['Dark','Minimal','Developer','Animations']},
      {name:'Vercel',url:'https://vercel.com',emoji:'▲',desc:'Terminal-aesthetic meets editorial. Bold typography, black-and-white palette broken only by subtle gradients. Zero clutter, infinite authority.',tags:['Dark','Editorial','Bold typography','Clean']},
      {name:'Framer',url:'https://framer.com',emoji:'🎬',desc:'A design tool whose site proves what design tools can do. Buttery scroll animations, micro-interactions, animated text reveals. The "wow" effect done tastefully.',tags:['Animations','Bold','Interactive','Creative']},
      {name:'Pitch',url:'https://pitch.com',emoji:'📊',desc:'Smooth, bold and modern. Dark backgrounds with rich color accents. Buttery animations and confident typography. Screams "premium product".',tags:['Dark','Bold','Colorful','Smooth']},
      {name:'Loom',url:'https://loom.com',emoji:'🎥',desc:'Warm, human, and approachable. Vibrant purple palette, real-person photography. Balances playfulness with professionalism perfectly.',tags:['Colorful','Human','Warm','Friendly']},
      {name:'Raycast',url:'https://raycast.com',emoji:'🚀',desc:'Dark with bold red accents and abstract visuals. Strong personality. Shows how a "developer tool" can have stunning design flair without sacrificing clarity.',tags:['Dark','Bold','Developer','Brand identity']},
    ]
  },
  {
    cat:'👤 Personal Portfolio / CV / Freelancer',
    catDesc:'Perfect examples for doctors, engineers, developers, designers, lawyers, consultants',
    sites:[
      {name:'Rauno Freiberg',url:'https://rauno.me',emoji:'🎨',desc:'Typography-first white portfolio. Perfectly calibrated spacing, zero decoration. Every detail is deliberate. The benchmark for refined minimalism.',tags:['Minimal','Typography','White','Portfolio']},
      {name:'Lee Robinson',url:'https://leerob.io',emoji:'💻',desc:'Senior developer at Vercel. Content-first, ultra-fast, professional. Shows how a portfolio can be powerful through restraint rather than animation.',tags:['Developer','Content','Clean','Fast']},
      {name:'Bruno Simon',url:'https://bruno-simon.com',emoji:'🚗',desc:'3D interactive portfolio — the user drives a toy car to navigate. Wildly memorable. Perfect for creatives who want to make a lasting impression.',tags:['3D','Interactive','Creative','Unique']},
      {name:'Brittany Chiang',url:'https://brittanychiang.com',emoji:'🌊',desc:'Dark teal developer portfolio. Scroll-based reveal animations, sticky side nav, beautifully structured. One of the most cloned portfolios on GitHub.',tags:['Dark','Developer','Animations','Popular']},
      {name:'Josh Comeau',url:'https://joshwcomeau.com',emoji:'✨',desc:'Playful developer blog-portfolio hybrid. Custom animations, candy colors, delightful micro-interactions. Proves technical people can have personality.',tags:['Playful','Colorful','Developer','Blog']},
      {name:'Cassie Evans',url:'https://www.cassie.codes',emoji:'🌸',desc:'Illustrative, hand-drawn aesthetic meets clean code. SVG animations throughout. Great for artists and designers wanting a unique personal identity.',tags:['Illustrative','Animated SVG','Creative','Personal']},
      {name:'Adham Dannaway',url:'https://www.adhamdannaway.com',emoji:'🎭',desc:'Famous for its half-designer / half-developer split-screen toggle. Iconic concept that communicates dual skills at a glance. Unforgettable and shareable.',tags:['Creative concept','Split screen','Memorable','Developer+Designer']},
    ]
  },
  {
    cat:'🌍 NGO / Non-profit / Charity',
    catDesc:'For NGOs, churches, community groups, and cause-driven organizations',
    sites:[
      {name:'charity: water',url:'https://charitywater.org',emoji:'💧',desc:'The benchmark for NGO design. Radical transparency — donors see exactly where money goes. Emotional storytelling + clean data visualization. Won multiple Webby Awards.',tags:['Storytelling','Transparency','Photography','Impact']},
      {name:'Obama Foundation',url:'https://obama.org',emoji:'🌟',desc:'2025 Webby Award Winner. Bold homepage video + unique split-screen scroll interaction. Left panel anchors narrative while right scrolls. Civic, authoritative, beautiful.',tags:['Video hero','Scroll interaction','Award-winning','Civic']},
      {name:'Malala Fund',url:'https://malala.org',emoji:'📚',desc:'Clean navigation, real video content, prominent donation CTA on every page. Shows how to convert emotion into action without overwhelming the user.',tags:['Clean','Video','CTAs','Mission-driven']},
      {name:'Doctors Without Borders',url:'https://msf.org',emoji:'🏥',desc:'Urgency and clarity in perfect tension. High-impact photography combined with clear hierarchy. The donation flow is frictionless. A masterclass in crisis communication design.',tags:['Photography','Urgent','Trust','Clear hierarchy']},
      {name:'WaterAid',url:'https://wateraid.org',emoji:'🚿',desc:'Strong hero video, excellent impact storytelling, intuitive filtering system. Balances emotional pull with informational clarity. Farm Africa-nominated for similar approach.',tags:['Video','Storytelling','Filtering','Impact data']},
      {name:'Gates Foundation',url:'https://gatesfoundation.org',emoji:'🌐',desc:'Corporate-grade nonprofit design. Data storytelling, warm photography, accessibility-first. Shows how large organizations project trust through calm, confident design.',tags:['Data','Trust','Accessibility','Large-scale']},
    ]
  },
  {
    cat:'🏛️ Government / Public Institution / Education',
    catDesc:'For government bodies, universities, schools, hospitals, public services',
    sites:[
      {name:'Gov.uk',url:'https://gov.uk',emoji:'👑',desc:'The world\'s most studied government website. Radical clarity — plain language, maximum accessibility, zero decoration. The UX is the feature. Used as a global benchmark.',tags:['Accessibility','Government','Clarity','Plain language']},
      {name:'Harvard University',url:'https://harvard.edu',emoji:'🎓',desc:'Prestigious and clean. Strong photography, clear information hierarchy. Shows how traditional institutions maintain authority while feeling modern.',tags:['University','Authority','Photography','Editorial']},
      {name:'MIT',url:'https://mit.edu',emoji:'⚗️',desc:'Bold red identity, editorial layout, research-forward. Dense information presented with clarity. Serious academic credibility with modern design sensibility.',tags:['Bold identity','Academic','Research','Editorial']},
      {name:'Khan Academy',url:'https://khanacademy.org',emoji:'🧠',desc:'Friendly, colorful, highly accessible. Designed for maximum inclusivity across ages and languages. The learning-platform aesthetic done right.',tags:['Friendly','Colorful','Educational','Accessible']},
      {name:'WHO',url:'https://who.int',emoji:'🌍',desc:'Global health authority. Neutral, multi-language, data-heavy. Shows how to handle massive content depth while keeping navigation usable.',tags:['Government','Multi-language','Data-heavy','Global']},
      {name:'Space.com / NASA',url:'https://nasa.gov',emoji:'🚀',desc:'NASA\'s site balances public information with genuine awe. Dark backgrounds, stunning imagery, clear mission hierarchy. Shows government sites can still inspire.',tags:['Dark','Inspiring','Government','Photography']},
    ]
  },
  {
    cat:'🛍️ E-commerce / Products / Retail',
    catDesc:'For online stores, restaurants, product businesses, retail brands',
    sites:[
      {name:'Allbirds',url:'https://allbirds.com',emoji:'👟',desc:'Earthy, sustainable aesthetic. Soft colors, generous whitespace, beautiful product photography. The brand story is woven into every scroll. Warm and trustworthy.',tags:['Earthy','Sustainable','Product photos','Brand story']},
      {name:'Ugmonk',url:'https://ugmonk.com',emoji:'📦',desc:'Luxury minimal product design. Editorial photography, refined typography, slow-paced layouts that let products breathe. Feel: a premium magazine come to life.',tags:['Luxury','Minimal','Editorial','Typography']},
      {name:'Glossier',url:'https://glossier.com',emoji:'💄',desc:'Millennial pink, soft, human. User-generated content integrated into the store. Makes beauty feel accessible, community-driven, real.',tags:['Soft','Community','UGC','Feminine']},
      {name:'Cuyana',url:'https://cuyana.com',emoji:'👜',desc:'Luxury fashion done right. Clean white, editorial photography, refined navigation. "Fewer, better things" — the brand philosophy is the design.',tags:['Luxury','Fashion','Clean','Editorial']},
      {name:'Bellroy',url:'https://bellroy.com',emoji:'👝',desc:'Product explanation through beautiful interactive demos. Animated comparisons that literally show how the wallet works. UX innovation meets retail.',tags:['Interactive','Product demos','Animated','Clever UX']},
      {name:'Ceros (creative e-com inspiration)',url:'https://www.ceros.com',emoji:'🎪',desc:'Interactive content at its finest. Every page is an experience. Use this to show clients what "wow" looks like when budget allows.',tags:['Interactive','Creative','High-end','Showcase']},
    ]
  },
  {
    cat:'🏥 Healthcare / Medical / Clinic',
    catDesc:'For doctors, clinics, hospitals, pharmacies, wellness centers',
    sites:[
      {name:'One Medical',url:'https://onemedical.com',emoji:'🩺',desc:'Calm blue-green palette, professional photography, clear service hierarchy. Patients feel safe before they\'ve even read a word. Trust through color and composition.',tags:['Trust','Calm','Medical','Professional']},
      {name:'Hims & Hers',url:'https://forhims.com',emoji:'💊',desc:'Modern, approachable healthcare. Breaks medical sterility with warm tones and direct copy. Clear symptom-to-solution user flows. Converts fear into confidence.',tags:['Modern','Approachable','Clear flows','Warm']},
      {name:'Cleveland Clinic',url:'https://clevelandclinic.org',emoji:'🏥',desc:'World-class hospital with a world-class site. Massive content, exceptional search UX. Patient finder, condition library, and appointment flows all work flawlessly.',tags:['Large-scale','Content-rich','Patient UX','Authority']},
      {name:'Headspace',url:'https://headspace.com',emoji:'🧘',desc:'Wellness and mental health done beautifully. Illustrated characters, soft gradients, playful but calming. Proves healthcare design doesn\'t have to be sterile.',tags:['Illustrated','Soft','Mental health','Calming']},
      {name:'Zocdoc',url:'https://zocdoc.com',emoji:'📅',desc:'Healthcare booking solved. Friction-free appointment scheduling. Search, filter by insurance, see availability in real-time. UX that removes every possible barrier.',tags:['Booking','Functional','Clear UX','Appointments']},
      {name:'Calm',url:'https://calm.com',emoji:'🌊',desc:'Serenity as a design language. Deep blue gradients, ambient animations, whisper-quiet typography. The site itself makes you feel better before you\'ve downloaded the app.',tags:['Serene','Dark blue','Ambient','Wellness']},
    ]
  },
  {
    cat:'🎨 Creative / Artist / Photography Portfolio',
    catDesc:'For artists, photographers, musicians, filmmakers, architects',
    sites:[
      {name:'Awwwards',url:'https://awwwards.com',emoji:'🏆',desc:'The ultimate gallery of award-winning web design. Browse to find cutting-edge creative work that matches any style your client imagines. Essential starting point.',tags:['Awards','Showcase','Cutting-edge','Inspiration']},
      {name:'Bruno Simon',url:'https://bruno-simon.com',emoji:'🚗',desc:'3D interactive portfolio — a toy car navigates the site. The most shared creative portfolio online. Shows what\'s possible when creativity has no limits.',tags:['3D','Interactive','Unique','Viral']},
      {name:'Active Theory',url:'https://activetheory.net',emoji:'🌌',desc:'WebGL-powered immersive portfolio. Dark, cinematic, full-screen 3D environments. The pinnacle of creative agency design in 2024–2025.',tags:['WebGL','3D','Cinematic','Agency']},
      {name:'Wokine',url:'https://wokine.com',emoji:'🎭',desc:'French creative agency. Textured, earthy, analog-meets-digital. Scroll reveals feel like turning pages of a luxury magazine. Deeply distinctive.',tags:['Textured','Earthy','French','Luxury']},
      {name:'Dribbble',url:'https://dribbble.com',emoji:'🎯',desc:'Community of world-class designers. Browse to find any style — minimal, bold, dark, playful, luxury. Share with client and ask "which of these feels right to you?"',tags:['Community','Browse','All styles','Inspiration']},
      {name:'Behance',url:'https://behance.net',emoji:'🖼️',desc:'Adobe\'s portfolio platform. Full case studies from concept to completion. Great for showing clients the design process, not just the result.',tags:['Case studies','Process','Adobe','All styles']},
    ]
  },
  {
    cat:'🍽️ Restaurant / Food / Hospitality',
    catDesc:'For restaurants, cafés, hotels, catering services, food businesses',
    sites:[
      {name:'Nobu Restaurant',url:'https://noburestaurants.com',emoji:'🍣',desc:'Luxury Japanese restaurant chain. Dark, moody photography, elegant typography. The site oozes exclusivity without saying a word.',tags:['Dark','Luxury','Photography','Moody']},
      {name:'Alinea Group',url:'https://alineagroup.com',emoji:'⭐',desc:'Michelin-star restaurant site. Minimal, confident, photography-led. Reservation flow is frictionless. Shows what "fine dining online" should feel like.',tags:['Minimal','Fine dining','Reservations','Photography']},
      {name:'Sweetgreen',url:'https://sweetgreen.com',emoji:'🥗',desc:'Fresh, earthy, and warm. Green palette, natural photography, strong social proof. Makes healthy food feel exciting and accessible.',tags:['Fresh','Green','Earthy','Menu UX']},
      {name:'Momofuku',url:'https://momofuku.com',emoji:'🍜',desc:'Editorial restaurant design. White with bold black typography. Feels like a food magazine. Multi-location navigation handled elegantly.',tags:['Editorial','Bold','Restaurant','Multi-location']},
      {name:'Ace Hotel',url:'https://acehotel.com',emoji:'🏨',desc:'Independent hotel brand. Artistic, neighborhood-focused, editorial. Each city location feels distinct. Strong brand personality without a rigid template.',tags:['Hotel','Artistic','Brand identity','Editorial']},
      {name:'Noma (archived)',url:'https://noma.dk',emoji:'🌿',desc:'The world\'s best restaurant\'s website. Sparse, raw, Nordic. No decoration — just mission and story. For clients who want "less is more" taken to the extreme.',tags:['Sparse','Nordic','Minimal','Story-first']},
    ]
  },
];

// ── INSPIRATION CONVERSATION STARTERS ──
const CONVERSATION_STARTERS = [
  'Which of these feels closest to what you want?',
  'Do you prefer dark or light backgrounds?',
  'More images or more text?',
  'Bold and animated, or clean and minimal?',
  'Should it feel corporate, warm/friendly, or creative/artistic?',
  'Any colors you love or want to avoid?',
  'Who is your biggest competitor — what does their site look like?',
];

let selectedBizType = '';
let selectedTier = '';

// ===================== INIT =====================
function init() {
  renderBizTypes();
  renderTiers();
  renderFeatureGroup('feat-pages', FEATURES.pages);
  renderFeatureGroup('feat-design', FEATURES.design);
  renderFeatureGroup('feat-func', FEATURES.func);
  renderFeatureGroup('feat-content', FEATURES.content);
  renderFeatureGroup('feat-tech', FEATURES.tech);
  renderFeatureGroup('feat-cms', BACKEND_FEATURES.cms);
  renderFeatureGroup('feat-db', BACKEND_FEATURES.db);
  renderFeatureGroup('feat-auth', BACKEND_FEATURES.auth);
  renderFeatureGroup('feat-ecom', BACKEND_FEATURES.ecom);
  renderFeatureGroup('feat-api', BACKEND_FEATURES.api);
  renderFeatureGroup('feat-infra', BACKEND_FEATURES.infra);
  renderAddons();
  renderExamples();
  calcPricing();
  calcProgress();
}

// ===================== BIZ TYPES =====================
function renderBizTypes() {
  const el = document.getElementById('biz-type-grid');
  el.innerHTML = BIZ_TYPES.map(b => `
    <div class="biz-opt" id="biz-${b.id}" onclick="selectBizType('${b.id}')">
      <div class="biz-opt-icon">${b.icon}</div>
      <div class="biz-opt-name">${b.name}</div>
      <div class="biz-opt-desc">${b.desc}</div>
    </div>
  `).join('');
}
function selectBizType(id) {
  selectedBizType = id;
  document.querySelectorAll('.biz-opt').forEach(el => el.classList.remove('biz-selected'));
  document.getElementById('biz-' + id).classList.add('biz-selected');
  calcProgress();
}

// ===================== TIERS =====================
function renderTiers() {
  const el = document.getElementById('tier-grid');
  el.innerHTML = TIERS.map((t,i) => `
    <div class="tier-card" id="tier-${i}" onclick="selectTier(${i})">
      <div class="tier-name">${t.name}</div>
      <div class="tier-price" style="color:${t.color}">${t.price} <small>${t.unit}</small></div>
      <div class="tier-desc">${t.desc}</div>
    </div>
  `).join('');
}
function selectTier(i) {
  selectedTier = i;
  document.querySelectorAll('.tier-card').forEach(el => el.classList.remove('selected'));
  document.getElementById('tier-' + i).classList.add('selected');
}

// ===================== FEATURES =====================
function renderFeatureGroup(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map(f => `
    <div class="feature-item" id="wrap-${f.id}" onclick="toggleFeature('${f.id}')">
      <input type="checkbox" id="${f.id}" onchange="calcPricing()">
      <div class="custom-check">
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2.5"><polyline points="1.5 6 4.5 9 10.5 3"/></svg>
      </div>
      <div class="feature-info">
        <div class="feature-name">${f.name}</div>
        <div class="feature-desc">${f.desc}</div>
      </div>
      <div class="feature-price">+${f.price.toLocaleString()} ETB</div>
    </div>
  `).join('');
}

function toggleFeature(id) {
  const cb = document.getElementById(id);
  cb.checked = !cb.checked;
  document.getElementById('wrap-' + id).classList.toggle('checked', cb.checked);
  calcPricing(); calcProgress();
}

function toggleContentCheck(el, id) {
  const cb = document.getElementById(id);
  cb.checked = !cb.checked;
  el.classList.toggle('checked', cb.checked);
  calcProgress();
}

// ===================== ADDONS =====================
function renderAddons() {
  const el = document.getElementById('addon-list');
  el.innerHTML = ADDONS.map(a => `
    <div class="addon-row" id="addon-row-${a.id}" onclick="toggleAddon('${a.id}',event)">
      <input type="checkbox" id="${a.id}" onchange="calcPricing();calcProgress()" onclick="event.stopPropagation()">
      <div class="addon-lbl-wrap">
        <strong>${a.name}</strong>${a.isMonthly ? ' <span class="pill pill-gold">monthly</span>' : ''}
        <p>${a.desc}</p>
      </div>
      ${a.isCustom
        ? `<input type="number" id="${a.id}-custom-price" class="addon-custom-input" placeholder="ETB" value="0" min="0" oninput="calcPricing()" onclick="event.stopPropagation()">`
        : `<span class="addon-price">${a.price > 0 ? a.price.toLocaleString() + ' ETB' : '—'}</span>`}
    </div>
  `).join('');
}

function toggleAddon(id, e) {
  const cb = document.getElementById(id);
  cb.checked = !cb.checked;
  document.getElementById('addon-row-' + id).classList.toggle('checked-row', cb.checked);
  calcPricing(); calcProgress();
}


// ===================== PRICING =====================
function getAllFeatures() {
  return [
    ...FEATURES.pages,...FEATURES.design,...FEATURES.func,...FEATURES.content,...FEATURES.tech,
    ...BACKEND_FEATURES.cms,...BACKEND_FEATURES.db,...BACKEND_FEATURES.auth,
    ...BACKEND_FEATURES.ecom,...BACKEND_FEATURES.api,...BACKEND_FEATURES.infra
  ];
}

function calcPricing() {
  let total = 0;
  const all = getAllFeatures();
  all.forEach(f => { const cb = document.getElementById(f.id); if (cb && cb.checked) total += f.price; });

  const override = parseFloat(document.getElementById('price-override')?.value) || 0;
  const discount = parseFloat(document.getElementById('price-discount')?.value) || 0;
  const rush = document.getElementById('p-rush')?.checked;

  let base = override > 0 ? override : total;

  const support = document.getElementById('support')?.value;
  let supportExtra = 0;
  if (support === '30') supportExtra = 1500;
  if (support === '60') supportExtra = 3500;
  if (support === '90') supportExtra = 6000;

  let addonTotal = 0, addonLines = [];
  ADDONS.forEach(a => {
    const cb = document.getElementById(a.id);
    if (cb && cb.checked) {
      let price = a.isCustom ? (parseFloat(document.getElementById(a.id + '-custom-price')?.value) || 0) : a.price;
      addonTotal += price;
      addonLines.push({name: a.name + (a.isMonthly ? '/mo' : ''), val: price});
    }
  });

  let subtotal = base + addonTotal + supportExtra;
  let rushFee = rush ? Math.round(base * 0.30) : 0;
  subtotal += rushFee;
  const finalTotal = Math.max(0, subtotal - discount);
  const depositPct = parseFloat(document.getElementById('deposit-pct')?.value) || 50;
  const deposit = Math.round(finalTotal * depositPct / 100);
  const remaining = finalTotal - deposit;

  const lines = [];
  if (override > 0) lines.push({lbl:'Base price (override)', val:override});
  else if (base > 0) lines.push({lbl:'Features total', val:base});
  addonLines.forEach(l => lines.push({lbl:l.name, val:l.val}));
  if (supportExtra > 0) lines.push({lbl:'Extended support', val:supportExtra});
  if (rushFee > 0) lines.push({lbl:'Rush delivery (+30%)', val:rushFee});
  if (discount > 0) lines.push({lbl:'Discount', val:-discount});

  const fmt = v => v.toLocaleString() + ' ETB';
  const renderLines = id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = lines.map(l => `
      <div class="sum-line">
        <span class="lbl">${l.lbl}</span>
        <span class="val" style="${l.val<0?'color:var(--green)':''}">${l.val<0?'-':'+'}${Math.abs(l.val).toLocaleString()} ETB</span>
      </div>
    `).join('') + `
      <div class="sum-line" style="font-weight:700;padding-top:8px;border-top:2px solid var(--border2)">
        <span style="color:var(--text)">Total</span>
        <span style="color:var(--accent2);font-family:var(--font-mono)">${finalTotal.toLocaleString()} ETB</span>
      </div>`;
  };

  ['sum-total','sum-total-bk','sum-total2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `${finalTotal.toLocaleString()} ETB<small>${id==='sum-total2'?'total project cost':'estimated total'}</small>`;
  });
  ['sum-deposit','sum-deposit-bk','sum-deposit2'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = fmt(deposit);
  });
  ['sum-remaining','sum-remaining-bk','sum-remaining2'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = fmt(remaining);
  });
  renderLines('sum-lines'); renderLines('sum-lines-bk'); renderLines('sum-lines2');

  window._pricing = {base, total, addonTotal, rushFee, supportExtra, discount, finalTotal, deposit, remaining, depositPct, lines};
}

// ===================== PROGRESS =====================
function calcProgress() {
  const fields = ['c-name','c-email','c-phone','c-type','p-name','p-type','p-goal','p-audience','p-style','p-lang','biz-sector'];
  let filled = fields.filter(id => { const el = document.getElementById(id); return el && el.value && el.value.trim() !== ''; }).length;
  const checked = document.querySelectorAll('.feature-item.checked').length;
  if (checked > 0) filled += Math.min(4, checked);
  if (selectedBizType) filled += 2;
  const pct = Math.min(100, Math.round(filled / (fields.length + 6) * 100));
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('pct-label').textContent = pct + '%';
  const p1 = ['c-name','c-email','c-type'];
  const p2 = ['p-name','p-type','p-goal'];
  if (p1.every(id => document.getElementById(id)?.value)) document.getElementById('tab-client').classList.add('done');
  if (p2.every(id => document.getElementById(id)?.value)) document.getElementById('tab-project').classList.add('done');
  if (selectedBizType) document.getElementById('tab-biz').classList.add('done');
}

// ===================== TIMELINE =====================
function updateTimeline(v) {
  document.getElementById('timeline-val').textContent = TIMELINE_LABELS[v-1] || v + ' weeks';
}

// ===================== PANEL SWITCHING =====================
function switchPanel(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.step-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ===================== COLLECT =====================
function collectData() {
  const gv = function(id) {
    const el = document.getElementById(id);
    return el ? (el.value || '') : '';
  };
  const gc = function(id) {
    const el = document.getElementById(id);
    return el ? (el.checked || false) : false;
  };
  const tlEl = document.getElementById('p-timeline');
  const tl = parseInt(tlEl ? (tlEl.value || 2) : 2);

  const allFeatures = getAllFeatures();
  const checkedFeatures = allFeatures.filter(function(f) {
    const el = document.getElementById(f.id);
    return el && el.checked;
  }).map(function(f) {
    return {name:f.name, price:f.price};
  });

  const checkedAddons = ADDONS.filter(function(a) {
    const el = document.getElementById(a.id);
    return el && el.checked;
  }).map(function(a) {
    const priceEl = document.getElementById(a.id+'-custom-price');
    return {
      name: a.name,
      price: a.isCustom ? (parseFloat(priceEl ? priceEl.value : 0) || 0) : a.price,
      monthly: a.isMonthly || false
    };
  });

  const contentReady = {
    photo:gc('cnt-photo'), bio:gc('cnt-bio'), portfolio:gc('cnt-portfolio'),
    cv:gc('cnt-cv'), domain:gc('cnt-domain'), logo:gc('cnt-logo'),
    products:gc('cnt-products'), hosting:gc('cnt-hosting')
  };

  const bizType = BIZ_TYPES.find(function(b) { return b.id === selectedBizType; });

  return {
    client: {name:gv('c-name'),email:gv('c-email'),phone:gv('c-phone'),city:gv('c-city'),profession:gv('c-profession'),org:gv('c-org'),type:gv('c-type'),source:gv('c-source'),notes:gv('c-notes'),urgency:gv('c-urgency'),confidence:gv('c-confidence'),decision:gv('c-decision'),contactMethod:gv('c-contact'),budget:gv('c-budget')},
    project: {name:gv('p-name'),type:gv('p-type'),goal:gv('p-goal'),audience:gv('p-audience'),style:gv('p-style'),lang:gv('p-lang'),timeline:TIMELINE_LABELS[tl-1],rush:gc('p-rush'),refs:gv('p-refs'),pages:gv('p-pages'),contentReady},
    business: {type:(bizType ? bizType.name : selectedBizType) || '—',size:gv('biz-size'),sector:gv('biz-sector'),revenue:gv('biz-revenue'),existing:gv('biz-existing'),techLevel:gv('biz-tech'),manager:gv('biz-manage'),compliance:gv('biz-compliance')},
    tech: {frontend:gv('bk-frontend'),backend:gv('bk-backend'),database:gv('bk-db'),hosting:gv('bk-hosting')},
    features: checkedFeatures,
    addons: checkedAddons,
    pricing: window._pricing || {},
    terms: {revisions:gv('revisions'),support:gv('support'),depositPct:gv('deposit-pct'),paymentMethod:gv('payment-method'),paymentSchedule:gv('payment-schedule'),currency:gv('invoice-currency')}
  };
}

// ===================== GENERATE MARKDOWN =====================
function generateMarkdown() {
  calcPricing();
  const d = collectData();
  const p = d.pricing;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
  const validUntil = new Date(now.getTime() + 14*24*60*60*1000).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
  
  const contentList = Object.entries(d.project.contentReady).filter(([,v])=>v).map(([k])=>({photo:'Profile photos',bio:'Bio/About text',portfolio:'Portfolio samples',cv:'CV/Resume',domain:'Domain name',logo:'Logo/Brand assets',products:'Product info',hosting:'Hosting account'}[k]||k)).join(', ') || 'None confirmed yet';

  const frontFeatures = d.features.filter(f => {
    const allBk = [...BACKEND_FEATURES.cms,...BACKEND_FEATURES.db,...BACKEND_FEATURES.auth,...BACKEND_FEATURES.ecom,...BACKEND_FEATURES.api,...BACKEND_FEATURES.infra];
    return !allBk.find(b => b.name === f.name);
  });
  const backFeatures = d.features.filter(f => {
    const allBk = [...BACKEND_FEATURES.cms,...BACKEND_FEATURES.db,...BACKEND_FEATURES.auth,...BACKEND_FEATURES.ecom,...BACKEND_FEATURES.api,...BACKEND_FEATURES.infra];
    return allBk.find(b => b.name === f.name);
  });

  const markdown = `# Web Development Client Proposal

**Prepared by:** Yabsira Dejene   
**Date:** ${dateStr}  
**Valid Until:** ${validUntil}  
**Reference:** PROJ-${Date.now().toString().slice(-6)}

---

## 1. Parties

### Freelancer
- **Name:** Yabsira Dejene 
- **Specialty:** Full-Stack Web Development & UI/UX Design
- **Location:** Dire Dawa, Ethiopia

### Client
- **Name:** ${d.client.name || '—'}
- **Email:** ${d.client.email || '—'}
- **Phone:** ${d.client.phone || '—'}
- **Location:** ${d.client.city || '—'}
- **Profession:** ${d.client.profession || '—'}
- **Organization:** ${d.client.org || '—'}
- **Client Type:** ${d.client.type || '—'}
- **Contact Method:** ${d.client.contactMethod || '—'}
- **Source:** ${d.client.source || '—'}

${d.client.notes ? `**Meeting Notes:**  \n> ${d.client.notes}\n` : ''}

---

## 2. Business Profile

| Attribute | Details |
|-----------|---------|
| **Business Type** | ${d.business.type || '—'} |
| **Industry Sector** | ${d.business.sector || '—'} |
| **Team Size** | ${d.business.size || '—'} |
| **Revenue Range** | ${d.business.revenue || '—'} |
| **Existing Site** | ${d.business.existing || 'None — new site'} |
| **Tech Level** | ${d.business.techLevel || '—'} |
| **Who Manages** | ${d.business.manager || '—'} |
| **Compliance Needs** | ${d.business.compliance || 'None specified'} |
| **Budget Range** | ${d.client.budget || '—'} |
| **Urgency Level** | ${d.client.urgency || '—'} |

---

## 3. Project Overview

| Attribute | Details |
|-----------|---------|
| **Project Name** | ${d.project.name || '—'} |
| **Website Type** | ${d.project.type || '—'} |
| **Primary Goal** | ${d.project.goal || '—'} |
| **Target Audience** | ${d.project.audience || '—'} |
| **Design Style** | ${d.project.style || '—'} |
| **Language(s)** | ${d.project.lang || '—'} |
| **Pages Count** | ${d.project.pages || '—'} |
| **Timeline** | ${d.project.timeline}${d.project.rush ? ' ⚠️ **RUSH DELIVERY (+30%)**' : ''} |
| **Content Ready** | ${contentList} |

### Tech Stack Selected
- **Frontend:** ${d.tech.frontend || 'Your choice (recommended)'}
- **Backend:** ${d.tech.backend || 'Your choice (recommended)'}
- **Database:** ${d.tech.database || 'Your choice (recommended)'}
- **Hosting:** ${d.tech.hosting || 'Your choice (recommended)'}

${d.project.refs ? `### References / Inspiration\n${d.project.refs}\n` : ''}

---

## 4. Scope of Work

### Front-End Features
${frontFeatures.length ? frontFeatures.map(f => `- ✅ **${f.name}** — ${f.price.toLocaleString()} ETB`).join('\n') : '—'}

### Back-End / CMS / Database
${backFeatures.length ? backFeatures.map(f => `- ⚙️ **${f.name}** — ${f.price.toLocaleString()} ETB`).join('\n') : '—'}

### Add-On Services
${d.addons.length ? d.addons.map(a => `- ➕ **${a.name}**${a.monthly ? ' *(monthly)*' : ''} — ${a.price.toLocaleString()} ETB`).join('\n') : '—'}

---

## 5. Pricing Breakdown

| Item | Amount (ETB) |
|------|--------------|
${(p.lines||[]).map(l => `| ${l.lbl} | ${l.val<0?'-':'+'}${Math.abs(l.val).toLocaleString()} |`).join('\n')}
| **TOTAL PROJECT COST** | **${(p.finalTotal||0).toLocaleString()} ETB** |
| 💰 **Upfront Deposit (${p.depositPct||50}%)** | **${(p.deposit||0).toLocaleString()} ETB** |
| Balance on Delivery | ${(p.remaining||0).toLocaleString()} ETB |

> **Note:** Prices in Ethiopian Birr (ETB). Quote valid for 14 days.

---

## 6. Terms & Conditions

### Payment & Revisions
- **Revisions:** ${d.terms.revisions || '1'} round(s) included
- **Support Period:** ${d.terms.support !== 'none' ? d.terms.support + ' days bug-fix support' : 'No support period'}
- **Payment Method:** ${d.terms.paymentMethod || '*(not specified)*'}
- **Payment Schedule:** ${d.terms.paymentSchedule || '50% upfront + 50% on delivery'}
- **Invoice Currency:** ${d.terms.currency || 'ETB'}

### Standard Terms
1. A deposit of **${d.terms.depositPct||50}%** before work begins.
2. Client must provide all content (text, images, logo) by agreed deadline. Delays in content delivery will delay the project timeline accordingly.
3. Revisions beyond included rounds billed at **500–2,000 ETB per round** depending on scope.
4. Client owns all final deliverables upon full payment. Freelancer retains right to display project in portfolio.
5. Rush delivery (under 1 week) is subject to a **30% surcharge**.
6. This quote is valid for **14 days** from the proposal date.
7. Any new features added after project start require a new quote.
8. Hosting, domain, and third-party API costs are **NOT included** unless explicitly listed above.

---

## 7. Acceptance

By proceeding with the deposit payment, the client confirms they have read, understood, and agree to all terms in this proposal.

### Signatures

**Freelancer:**  
Yabsira Dejene  _______________________ Date: ___________

**Client:**  
${d.client.name||'Client Name'} _______________________ Date: ___________

---

*End of Proposal — Yabsira Dejene Web Development*
`;

  window._exportMarkdown = markdown;
  window._exportData = d;
  return markdown;
}

// ===================== PREVIEW MODE TOGGLE =====================
let previewMode = 'raw'; // 'raw' or 'rendered'

function togglePreviewMode() {
  const content = document.getElementById('export-preview');
  const toggleText = document.getElementById('preview-toggle-text');
  
  if (!content || !toggleText) {
    console.error('Preview elements not found');
    return;
  }
  
  if (previewMode === 'raw') {
    // Switch to rendered markdown
    const markdown = generateMarkdown();
    if (typeof marked !== 'undefined' && marked.parse) {
      content.innerHTML = marked.parse(markdown);
      content.classList.add('markdown-preview');
      previewMode = 'rendered';
      toggleText.textContent = 'Show Raw';
    } else {
      alert('Markdown library not loaded. Showing raw markdown instead.');
      content.textContent = markdown;
    }
  } else {
    // Switch back to raw
    const markdown = generateMarkdown();
    content.textContent = markdown;
    content.classList.remove('markdown-preview');
    previewMode = 'raw';
    toggleText.textContent = 'Preview';
  }
}

// ===================== DOWNLOAD MARKDOWN =====================
function downloadMarkdown() {
  try {
    const markdown = generateMarkdown();
    const d = window._exportData || collectData();
    const clientName = (d.client && d.client.name) ? d.client.name.replace(/\s+/g,'-').toLowerCase() : 'client';
    const filename = `proposal-${clientName}-${Date.now()}.md`;
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Markdown file downloaded: ' + filename);
  } catch (err) {
    console.error('Download error:', err);
    alert('❌ Failed to download. Error: ' + err.message);
  }
}

// ===================== COPY MARKDOWN =====================
function copyMarkdown() {
  try {
    const markdown = generateMarkdown();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(markdown).then(() => {
        alert('✅ Markdown copied to clipboard! You can now paste it into Telegram, email, or any text editor.');
      }).catch(err => {
        console.error('Copy failed:', err);
        fallbackCopy(markdown);
      });
    } else {
      fallbackCopy(markdown);
    }
  } catch (err) {
    console.error('Copy error:', err);
    alert('❌ Failed to copy. Error: ' + err.message);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    alert('✅ Markdown copied to clipboard!');
  } catch (err) {
    alert('❌ Failed to copy. Please try again or copy manually.');
  }
  document.body.removeChild(textarea);
}

// ===================== PRINT / PDF =====================
// ===================== PRINT / PDF =====================
// PDF generation function is now in pdf-generator.js

// ===================== LEGACY FUNCTIONS (kept for compatibility) =====================
function copyText() {
  copyMarkdown();
}

function saveJSON() {
  try {
    const d = collectData();
    const json = JSON.stringify(d, null, 2);
    const clientName = (d.client && d.client.name) ? d.client.name.replace(/\s+/g,'-').toLowerCase() : 'client';
    const filename = `proposal-data-${clientName}-${Date.now()}.json`;
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ JSON data saved: ' + filename);
  } catch (err) {
    console.error('Save JSON error:', err);
    alert('❌ Failed to save JSON. Error: ' + err.message);
  }
}

function generatePreview() {
  togglePreviewMode();
}

// ===================== LEGACY COPY TEXT =====================
function copyText() {
  generatePreview();
  const text = window._exportText || '';
  navigator.clipboard.writeText(text).then(function() {
    alert('Proposal copied! Paste into Telegram, email, or Word.');
  }).catch(function() {
    alert('Please manually select all text in the preview and copy (Ctrl+A, Ctrl+C).');
  });
}

// ===================== SAVE JSON =====================
function saveJSON() {
  const d = collectData();
  const blob = new Blob([JSON.stringify(d, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `proposal-${(d.client.name||'client').toLowerCase().replace(/\s+/g,'-')}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ===================== RESET =====================
function resetAll() {
  if (!confirm('Reset all data? This cannot be undone.')) return;
  document.querySelectorAll('input[type="text"],input[type="email"],input[type="tel"],textarea').forEach(el => el.value = '');
  document.querySelectorAll('input[type="number"]').forEach(el => el.value = (el.id === 'price-override' || el.id === 'price-discount') ? '0' : el.value);
  document.querySelectorAll('select').forEach(el => el.selectedIndex = 0);
  document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
  document.querySelectorAll('.feature-item').forEach(el => el.classList.remove('checked'));
  document.querySelectorAll('.content-check').forEach(el => el.classList.remove('checked'));
  document.querySelectorAll('.biz-opt').forEach(el => el.classList.remove('biz-selected'));
  document.querySelectorAll('.tier-card').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.addon-row').forEach(el => el.classList.remove('checked-row'));
  selectedBizType = ''; selectedTier = '';
  document.getElementById('p-timeline').value = 2;
  updateTimeline(2);
  calcPricing(); calcProgress();
  switchPanel('client');
}

// ===================== BOOT =====================
init();
