export type Locale = "en" | "fa";

export type Content = {
  title: string;
  location: string;
  firstName: string;
  lastName: string;
  signature: string;
  tagline: string;
  summary: string;
  nav: { label: string; href: string }[];
  ui: {
    downloadCv: string;
    viewWork: string;
    contact: string;
    emailMe: string;
    openMenu: string;
    closeMenu: string;
    code: string;
      liveDemo: string;
      privateUpcoming: string;
      visitLive: string;
      email: string;
    locationLabel: string;
    social: string;
    languages: string;
    academicExperience: string;
    footerNote: string;
    switchToFa: string;
    switchToEn: string;
  };
  about: {
    label: string;
    title: string;
  };
  experience: {
    label: string;
    title: string;
    lead: string;
    jobs: {
      role: string;
      company: string;
      location: string;
      period: string;
      bullets: string[];
    }[];
  };
  projects: {
    label: string;
    title: string;
    lead: string;
    items: {
      title: string;
      year: string;
      description: string;
      tech: string[];
      demoUrl?: string;
      repoUrl?: string;
      badge?: string;
    }[];
  };
  skills: {
    label: string;
    title: string;
    lead: string;
    groups: { label: string; items: string[] }[];
  };
  education: {
    label: string;
    title: string;
    degree: string;
    school: string;
    period: string;
    note: string;
    teachingRole: string;
    teachingSchool: string;
    courses: string[];
    spokenLanguages: { name: string; level: string }[];
  };
  contact: {
    label: string;
    title: string;
    lead: string;
    mailSubject: string;
  };
  interests: string[];
};

export const dictionaries: Record<Locale, Content> = {
  en: {
    title: "Frontend Developer",
    location: "Mazandaran, Iran",
    firstName: "Amirhossein",
    lastName: "Najafi",
    signature: "Crafted interfaces. Reliable systems.",
    tagline:
      "I design and ship polished React interfaces — clear structure, smooth APIs, production-ready detail.",
    summary:
      "Frontend developer focused on clear UI, solid React architecture, and dependable API integration. I care about readable code, thoughtful state management, and interfaces that feel fast. Always refining how I build for the web.",
    nav: [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Work", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Education", href: "#education" },
      { label: "Contact", href: "#contact" },
    ],
    ui: {
      downloadCv: "Download CV",
      viewWork: "Explore work",
      contact: "Contact",
      emailMe: "Send email",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      code: "View code",
      liveDemo: "Live demo",
      privateUpcoming: "Coming soon",
      visitLive: "Visit live site",
      email: "Email",
      locationLabel: "Based in",
      social: "Online",
      languages: "Languages",
      academicExperience: "Teaching",
      footerNote: "Built with Next.js · GSAP · Lenis",
      switchToFa: "FA",
      switchToEn: "EN",
    },
    about: {
      label: "About",
      title: "Detail-driven frontend.",
    },
    experience: {
      label: "Experience",
      title: "Professional work",
      lead: "Building production frontend for a large-scale asset management product.",
      jobs: [
        {
          role: "Frontend Developer",
          company: "Dadeh Negar Eghtesad",
          location: "Mazandaran, Iran",
          period: "Apr 2026 – Present",
          bullets: [
            "Built the frontend for Daraei 360 (daraei.ai) — a production asset-portfolio dashboard",
            "Designed and implemented data-heavy UI: tables, filters, dashboards, and multi-step flows",
            "Connected to team REST APIs and managed client state with Redux",
            "Shipped responsive React/TypeScript interfaces and tightened reliability through testing & debugging",
          ],
        },
      ],
    },
    projects: {
      label: "Selected work",
      title: "Projects that show the craft",
      lead: "From production product work to selected personal and academic builds.",
      items: [
        {
          title: "Daraei 360",
          year: "2026",
          badge: "Production",
          description:
            "Frontend for Daraei 360 (daraei.ai) — a large-scale asset portfolio dashboard. Owned the React/TypeScript UI: data-heavy views, dashboards, and client workflows on top of the team's APIs. Shipped in production at Dadeh Negar Eghtesad.",
          tech: ["React", "TypeScript", "Redux", "REST API", "Dashboard UI"],
          demoUrl: "https://daraei.ai/",
        },
        {
          title: "Restaurant Ordering",
          year: "2023",
          description:
            "Frontend for an online food-ordering flow. Final project for Software Systems Analysis and Design.",
          tech: ["React", "JavaScript", "CSS"],
          repoUrl: "https://github.com/amirhossein-najafi/Restaurant-Project-Front",
        },
        {
          title: "Flight Booking Database",
          year: "2023",
          description:
            "Database design for a Google Flights–style system: bookings and multi-country airport management.",
          tech: ["SQL", "PLpgSQL", "Database Design"],
          repoUrl: "https://github.com/amirhossein-najafi/GoogleFlight_Database",
        },
        {
          title: "Telegram AI Bot",
          year: "2024",
          description:
            "Conversational Telegram bot powered by a local LLM and the ChatGPT API.",
          tech: ["Python", "Telegram API", "LLM"],
        },
        {
          title: "Language Institute",
          year: "2024",
          description:
            "Full website for a language institute — frontend and backend delivered together.",
          tech: ["React", "API", "Full-stack"],
        },
      ],
    },
    skills: {
      label: "Skills",
      title: "What I work with",
      lead: "Frontend first. Comfortable across APIs, databases, and modern tooling.",
      groups: [
        {
          label: "Frontend",
          items: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Redux",
            "HTML",
            "CSS",
            "Tailwind CSS",
          ],
        },
        {
          label: "APIs & tooling",
          items: ["REST API", "Git", "Docker", "Figma", "Postman", "Testing"],
        },
        {
          label: "Backend",
          items: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
        },
      ],
    },
    education: {
      label: "Education",
      title: "Education & teaching",
      degree: "B.Sc. Software Engineering",
      school: "Noshirvani University of Technology, Babol",
      period: "2021 – 2025",
      note: "Graduated in 2025",
      teachingRole: "Teaching Assistant",
      teachingSchool: "Noshirvani University of Technology",
      courses: [
        "Database — supported students with exercises and course projects",
        "Design of Programming Languages — helped with coursework and project work",
        "Computer-Aided Digital System Design — academic support and project guidance",
      ],
      spokenLanguages: [{ name: "English", level: "Intermediate" }],
    },
    contact: {
      label: "Contact",
      title: "Let's build something strong.",
      lead: "Open to frontend roles and focused collaborations. Email is the fastest way in.",
      mailSubject: "Hello Amirhossein",
    },
    interests: ["React", "UI Engineering", "Web Performance", "Clean Architecture"],
  },
  fa: {
    title: "توسعه‌دهنده فرانت‌اند",
    location: "مازندران، ایران",
    firstName: "امیرحسین",
    lastName: "نجفی",
    signature: "رابط کاربری دقیق. سیستم قابل‌اتکا.",
    tagline:
      "رابط‌های React تمیز و آمادهٔ پروداکشن می‌سازم — ساختار روشن، API روان، جزئیات درست.",
    summary:
      "توسعه‌دهنده فرانت‌اند با تمرکز روی UI شفاف، معماری React درست و اتصال مطمئن به API. برایم مهم است کد خوانا باشد، state مدیریت شود و تجربه کاربر سریع حس شود. مدام روش ساخت محصول وب را بهتر می‌کنم.",
    nav: [
      { label: "درباره من", href: "#about" },
      { label: "تجربه کاری", href: "#experience" },
      { label: "کارها", href: "#projects" },
      { label: "مهارت‌ها", href: "#skills" },
      { label: "تحصیلات", href: "#education" },
      { label: "ارتباط", href: "#contact" },
    ],
    ui: {
      downloadCv: "دانلود رزومه",
      viewWork: "مشاهده کارها",
      contact: "ارتباط",
      emailMe: "ارسال ایمیل",
      openMenu: "باز کردن منو",
      closeMenu: "بستن منو",
      code: "مشاهده کد",
      liveDemo: "نسخه آنلاین",
      privateUpcoming: "به‌زودی",
      visitLive: "مشاهده سایت",
      email: "ایمیل",
      locationLabel: "محل سکونت",
      social: "شبکه‌ها",
      languages: "زبان‌ها",
      academicExperience: "تدریس",
      footerNote: "ساخته‌شده با Next.js · GSAP · Lenis",
      switchToFa: "FA",
      switchToEn: "EN",
    },
    about: {
      label: "درباره من",
      title: "فرانت‌اند با دقت روی جزئیات.",
    },
    experience: {
      label: "تجربه کاری",
      title: "مسیر حرفه‌ای",
      lead: "توسعه فرانت‌اند محصول بزرگ مدیریت دارایی در محیط پروداکشن.",
      jobs: [
        {
          role: "توسعه‌دهنده فرانت‌اند",
          company: "داده نگار اقتصاد",
          location: "مازندران، ایران",
          period: "از ۱۵ فروردین ۱۴۰۵ تاکنون",
          bullets: [
            "پیاده‌سازی فرانت‌اند دارایی ۳۶۰ (daraei.ai) — داشبورد مدیریت پورتفوی دارایی",
            "طراحی و ساخت UI داده‌محور: جداول، فیلترها، داشبوردها و جریان‌های چندمرحله‌ای",
            "اتصال به REST APIهای تیم و مدیریت state سمت کلاینت با Redux",
            "تحویل رابط‌های React/TypeScript واکنش‌گرا و افزایش پایداری با تست و دیباگ",
          ],
        },
      ],
    },
    projects: {
      label: "نمونه‌کارها",
      title: "پروژه‌هایی که کیفیت کار را نشان می‌دهند",
      lead: "از محصول واقعی شرکت تا پروژه‌های منتخب دانشگاهی و شخصی.",
      items: [
        {
          title: "دارایی ۳۶۰",
          year: "۱۴۰۵",
          badge: "محصول واقعی",
          description:
            "فرانت‌اند دارایی ۳۶۰ (daraei.ai) — داشبورد بزرگ مدیریت پورتفوی دارایی. مسئول UI با React/TypeScript: نماهای داده‌محور، داشبوردها و جریان‌های کلاینت روی APIهای تیم. تحویل‌شده در پروداکشن داده نگار اقتصاد.",
          tech: ["React", "TypeScript", "Redux", "REST API", "Dashboard UI"],
          demoUrl: "https://daraei.ai/",
        },
        {
          title: "سفارش آنلاین رستوران",
          year: "۱۴۰۲",
          description:
            "فرانت‌اند جریان سفارش آنلاین غذا؛ پروژه نهایی درس تحلیل و طراحی سیستم‌های نرم‌افزاری.",
          tech: ["React", "JavaScript", "CSS"],
          repoUrl: "https://github.com/amirhossein-najafi/Restaurant-Project-Front",
        },
        {
          title: "دیتابیس رزرو پرواز",
          year: "۱۴۰۲",
          description:
            "طراحی پایگاه داده برای سامانه‌ای شبیه Google Flights؛ رزرو پرواز و مدیریت فرودگاه در چند کشور.",
          tech: ["SQL", "PLpgSQL", "Database Design"],
          repoUrl: "https://github.com/amirhossein-najafi/GoogleFlight_Database",
        },
        {
          title: "ربات هوش مصنوعی تلگرام",
          year: "۱۴۰۳",
          description:
            "ربات مکالمه‌ای تلگرام با مدل زبانی محلی و ChatGPT API.",
          tech: ["Python", "Telegram API", "LLM"],
        },
        {
          title: "سایت آموزشگاه زبان",
          year: "۱۴۰۳",
          description:
            "وب‌سایت کامل آموزشگاه زبان — فرانت‌اند و بک‌اند با هم.",
          tech: ["React", "API", "Full-stack"],
        },
      ],
    },
    skills: {
      label: "مهارت‌ها",
      title: "ابزارها و فناوری‌ها",
      lead: "تمرکز اصلی فرانت‌اند؛ با API، پایگاه داده و ابزارهای روز هم راحت کار می‌کنم.",
      groups: [
        {
          label: "فرانت‌اند",
          items: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Redux",
            "HTML",
            "CSS",
            "Tailwind CSS",
          ],
        },
        {
          label: "API و ابزارها",
          items: ["REST API", "Git", "Docker", "Figma", "Postman", "Testing"],
        },
        {
          label: "بک‌اند",
          items: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
        },
      ],
    },
    education: {
      label: "تحصیلات",
      title: "دانشگاه و تدریس",
      degree: "کارشناسی مهندسی نرم‌افزار",
      school: "دانشگاه صنعتی نوشیروانی بابل",
      period: "۱۴۰۰ تا ۱۴۰۴",
      note: "فارغ‌التحصیل ۱۴۰۴",
      teachingRole: "دستیار آموزشی",
      teachingSchool: "دانشگاه صنعتی نوشیروانی بابل",
      courses: [
        "پایگاه داده — راهنمایی دانشجویان در تمرین‌ها و پروژه‌ها",
        "طراحی زبان‌های برنامه‌نویسی — همراهی در تکالیف و پروژه درسی",
        "طراحی سیستم‌های دیجیتال به کمک کامپیوتر — پشتیبانی آموزشی",
      ],
      spokenLanguages: [{ name: "انگلیسی", level: "متوسط" }],
    },
    contact: {
      label: "ارتباط",
      title: "بیایید چیزی قوی بسازیم.",
      lead: "برای موقعیت‌های فرانت‌اند و همکاری جدی آماده‌ام. سریع‌ترین راه، ایمیل است.",
      mailSubject: "سلام امیرحسین",
    },
    interests: ["React", "مهندسی UI", "کارایی وب", "معماری تمیز"],
  },
};
