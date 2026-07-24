/**
 * Alto Flow OS — Site Configuration
 * Centralized data from the Alto Flow OS JSON spec.
 * Edit this file to change site content.
 */

export const siteConfig = {
  project: {
    name: "Alto Flow OS",
    version: "1.0.0",
    type: "AI Business Operating System" as const,
    objective:
      "Transformar empresas tradicionais em operações assistidas por inteligência artificial através de automação, CRM inteligente, marketing autônomo e experiências digitais avançadas.",
  },

  branding: {
    primaryColor: "#FF4DA6",
    secondaryColor: "#050505",
    backgroundColor: "#FFFFFF",
    style: "Editorial Futurista" as const,
    visualReferences: [
      "Studio Noteform",
      "Forme Studio",
      "Linear",
      "Stripe",
      "Vercel",
    ],
  },

  firebuff: {
    role: "Central AI Orchestrator",
    mode: "Multi-Agent" as const,
    visibility: "Persistent" as const,
    behavior: {
      proactive: true,
      contextAware: true,
      goalDriven: true,
      consultative: true,
    },
  },

  sections: [
    {
      id: "hero",
      name: "Hero Inteligente",
      purpose: "Capturar interesse e iniciar diagnóstico automático",
    },
    {
      id: "diagnostic",
      name: "Diagnóstico IA",
      purpose: "Avaliar maturidade digital do visitante",
    },
    {
      id: "cases",
      name: "Cases Dinâmicos",
      purpose: "Mostrar transformação e resultados",
    },
    {
      id: "solutions",
      name: "Soluções",
      purpose: "Apresentar produtos e módulos",
    },
    {
      id: "marketplace",
      name: "Marketplace",
      purpose: "Oferecer módulos especializados",
    },
    {
      id: "roi",
      name: "Calculadora ROI",
      purpose: "Simular ganhos potenciais",
    },
    {
      id: "roadmap",
      name: "Roadmap Estratégico",
      purpose: "Exibir jornada de implementação",
    },
  ],

  agents: [
    {
      name: "FireBuff SDR",
      objective: "Qualificar leads e agendar reuniões",
      skills: [
        "Lead Qualification",
        "Sales Scripts",
        "Follow Up",
        "Scheduling",
      ],
    },
    {
      name: "FireBuff Marketing",
      objective: "Criar campanhas automaticamente",
      skills: ["Copywriting", "Ads Creation", "SEO", "Content Planning"],
    },
    {
      name: "FireBuff Growth",
      objective: "Identificar gargalos e oportunidades",
      skills: ["Business Analysis", "Growth Strategy", "Revenue Optimization"],
    },
    {
      name: "FireBuff UX",
      objective: "Melhorar experiência e conversão",
      skills: ["UX Audit", "Heatmap Analysis", "Conversion Optimization"],
    },
  ],

  diagnosticEngine: {
    enabled: true,
    inputFields: [
      "businessName",
      "website",
      "instagram",
      "whatsapp",
      "industry",
    ],
    output: {
      automationScore: 0,
      salesScore: 0,
      marketingScore: 0,
      digitalPresenceScore: 0,
      recommendations: [],
    },
  },

  marketplace: {
    modules: [
      "Restaurant",
      "Delivery",
      "Clinic",
      "Real Estate",
      "Law Firm",
      "E-commerce",
      "Local Business",
    ],
  },

  designSystem: {
    animations: true,
    microInteractions: true,
    parallax: true,
    glassmorphism: true,
    aiAdaptiveUI: true,
    responsive: true,
  },

  advancedFeatures: [
    {
      name: "Living Website",
      description: "O site adapta conteúdo conforme perfil do visitante.",
    },
    {
      name: "AI Consultant Mode",
      description: "A IA conduz uma jornada personalizada.",
    },
    {
      name: "Competitor Intelligence",
      description: "Monitoramento automático de concorrentes.",
    },
    {
      name: "Autonomous Marketing",
      description: "Criação e publicação de campanhas automatizadas.",
    },
    {
      name: "Executive Dashboard",
      description: "Painel simplificado para tomada de decisão.",
    },
  ],

  objectiveMetrics: {
    leadConversionRate: ">20%",
    responseTime: "<5s",
    automationCoverage: ">80%",
    customerRetention: ">70%",
  },
};

export type SiteConfig = typeof siteConfig;
