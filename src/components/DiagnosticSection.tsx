"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Globe,
  Smartphone,
  Briefcase,
} from "lucide-react";
import { Input, Label, Button } from "./atoms";

interface DiagnosticResult {
  automationScore: number;
  salesScore: number;
  marketingScore: number;
  digitalPresenceScore: number;
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
}

const industries = [
  { value: "restaurant", label: "Restaurante", icon: Building2 },
  { value: "clinic", label: "Clínica", icon: Briefcase },
  { value: "ecommerce", label: "E-commerce", icon: Globe },
  { value: "realestate", label: "Imobiliária", icon: Building2 },
  { value: "lawfirm", label: "Escritório Jurídico", icon: Briefcase },
  { value: "delivery", label: "Delivery", icon: Smartphone },
  { value: "local", label: "Comércio Local", icon: Building2 },
  { value: "other", label: "Outro", icon: Globe },
];

// Instagram SVG icon component (not available in lucide-react)
function InstagramIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// Industry-specific recommendation mappings
const recommendationMap = {
  restaurant: {
    automation: [
      "Automatize reservas e confirmações via WhatsApp Business API",
      "Implemente sistema inteligente de gestão de filas e tempo de espera",
      "Automatize feedback pós-refeição com pesquisas de satisfação automatizadas"
    ],
    sales: [
      "Implemente upsell automático de sobremesas e bebidas no fechamento da conta",
      "Crie programa de fidelidade digital com recompensas personalizadas",
      "Automatize lembretes de reservas e redução de no-shows"
    ],
    marketing: [
      "Crie campanhas sazonais automatizadas para datas comemorativas",
      "Automatize posts de pratos do dia baseado em ingredientes frescos",
      "Implemente sistema de avaliações automáticas para Google e TripAdvisor"
    ],
    digital: [
      "Otimize seu Google Meu Negócio com atualizações automáticas de horário",
      "Crie cardápio digital interativo com atualização em tempo real",
      "Automatize respostas a perguntas frequentes sobre delivery e horários"
    ]
  },
  clinic: {
    automation: [
      "Automatize agendamento e confirmação de consultas via WhatsApp",
      "Implemente lembrete automático de exames e retorno com redução de faltas",
      "Automatize prontuário digital com pré-anamnese via chatbot"
    ],
    sales: [
      "Crie pacotes de tratamento com pagamento automático recorrente",
      "Implemente upsell de exames preventivos durante agendamento",
      "Automatize solicitação de testes adicionais baseado em sintomas informados"
    ],
    marketing: [
      "Crie conteúdo educacional automático baseado em especialidades médicas",
      "Automatize lembretes de вакцинация и кампаний sazonais de saúde",
      "Implemente sistema de indicações automatizado с наградами"
    ],
    digital: [
      "Оптимизируйте присутствие на платформах здоровья вроде Doctoralia и Apple Здоровье",
      "Автоматизируйте обновление часов и специализаций в медицинских справочниках",
      "Создайте портал пациента с автоматическим доступом к результатам и рецептам"
    ]
  },
  ecommerce: {
    automation: [
      "Автоматизируйте восстановление брошенных корзин с персонализированными предложениями",
      "Внедрите рекомендацию товаров на основе поведения навигации",
      "Автоматизируйте управление запасами с интеллектуальным пополнением на основе продаж"
    ],
    sales: [
      "Внедрите динамическое ценообразование на основе спроса и конкуренции",
      "Автоматизируйте апселл и кросселл в оформлении заказа с рекомендациями в реальном времени",
      "Создайте программу лояльности с автоматическими баллами за поведение при покупке"
    ],
    marketing: [
      "Автоматизируйте email-маркетинг на основе поведения при покупке",
      "Внедрите динамический ретаргетинг с просматриваемыми недавно товарами",
      "Автоматизируйте создание вариантов объявлений на основе эффективности"
    ],
    digital: [
      "Оптимизируйте техническое SEO автоматически с обновлением схемы и метаданных",
      "Автоматизируйте обновление ленты товаров для Google Shopping и Meta",
      "Внедрите чат-бот поддержки с интеграцией в систему заказов"
    ]
  },
  default: {
    automation: [
      "Автоматизируйте follow-up лидов с WhatsApp API",
      "Внедрите интеллектуальный CRM с предиктивным скорингом",
      "Создайте многоавтоматизированный маркетинговый пайплайн",
      "Установите цифровое присутствие с редакционным контентом"
    ],
    sales: [
      "Улучшите процесс квалификации лидов",
      "Внедрите систематическое follow-up после предложений",
      "Автоматизируйте напоминание о продлении контрактов"
    ],
    marketing: [
      "Создайте автоматизированный редакционный календарь на основе сезонных дат",
      "Внедрите питательскую лидов с образовательным контентом",
      "Автоматически",
      "Автоматизируйте посты в социальных сетях на основе вовлеченности"
    ],
    digital: [
      "Оптимизируйте скорость сайта и опыт мобильных устройств",
      "Внедрите интеллектуальную систему захвата лидов",
      "Автоматизируйте резервное копирование и безопасность сайта"
    ]
  }
};

// Helper function to generate personalized recommendations
const generateRecommendations = (scores: { automation: number; sales: number; marketing: number; digital: number }, industry: string) => {
  const industryKey = industry as keyof typeof recommendationMap || 'default';
  const industryRecs = recommendationMap[industryKey] || recommendationMap.default;

  const recommendations: string[] = [];

  // Add recommendations based on scores (lower score = higher priority)
  const areas = [
    { key: 'automation', score: scores.automation, label: 'Автоматизация' },
    { key: 'sales', score: scores.sales, label: 'Продажи' },
    { key: 'marketing', score: scores.marketing, label: 'Маркетинг' },
    { key: 'digital', score: scores.digital, label: 'Цифровое Присутствие' }
  ];

  // Sort by score ascending (lowest first)
  areas.sort((a, b) => a.score - b.score);

  // Add top 2 priority areas
  areas.slice(0, 2).forEach(area => {
    const recs = industryRecs[area.key as keyof typeof industryRecs] || [];
    if (recs.length > 0) {
      // Add 1-2 recommendations from each priority area
      const numToAdd = Math.min(2, recs.length);
      recommendations.push(...recs.slice(0, numToAdd));
    }
  });

  // Ensure we have at least 3 recommendations
  if (recommendations.length < 3) {
    const defaultRecs = industryRecs.automation || recommendationMap.default.automation;
    recommendations.push(...defaultRecs.slice(0, 3 - recommendations.length));
  }

  return recommendations.slice(0, 4); // Limit to 4 recommendations
};

// Helper function to determine priority level
const getPriorityLevel = (scores: { automation: number; sales: number; marketing: number; digital: number }) => {
  const avgScore = (scores.automation + scores.sales + scores.marketing + scores.digital) / 4;
  if (avgScore < 40) return 'high';
  if (avgScore < 60) return 'medium';
  return 'low';
};

export default function DiagnosticSection() {
  const [step, setStep] = useState<"form" | "result">("form");
  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    instagram: "",
    whatsapp: "",
    industry: "",
  });
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const automationScore = Math.floor(Math.random() * 40) + 30;
      const salesScore = Math.floor(Math.random() * 40) + 30;
      const marketingScore = Math.floor(Math.random() * 40) + 30;
      const digitalPresenceScore = Math.floor(Math.random() * 40) + 30;

      const scores = {
        automation: automationScore,
        sales: salesScore,
        marketing: marketingScore,
        digital: digitalPresenceScore
      };

      setResult({
        automationScore,
        salesScore,
        marketingScore,
        digitalPresenceScore,
        recommendations: generateRecommendations(scores, formData.industry || 'default'),
        priority: getPriorityLevel(scores)
      });
      setIsAnalyzing(false);
      setStep("result");
    }, 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const ScoreBar = ({
    label,
    score,
    color,
  }: {
    label: string;
    score: number;
    color: string;
  }) => (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-text-sm font-medium text-text">{label}</span>
        <span className="text-text-sm font-mono font-medium text-text-muted">
          {score}%
        </span>
      </div>
      <div className="h-2.5 bg-border/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
        />
      </div>
    </div>
  );

  return (
    <section
      id="diagnostic"
      className="relative py-12 md:py-16 bg-background/50 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(11,61,79,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-text-xs font-medium text-text-muted font-mono tracking-wider uppercase bg-primary/10 border border-primary/20 rounded-full mb-4">
            Diagnóstico IA
          </span>
          <h2 className="text-text-xl sm:text-text-2xl md:text-text-3xl font-serif font-normal leading-[1.05] text-text mb-4">
            Descubra o potencial de IA
            <br />
            <span className="text-primary italic">do seu negócio.</span>
          </h2>
          <p className="text-text-base text-text-muted leading-relaxed max-w-lg mx-auto">
            Responda algumas perguntas e nossa IA analisará a maturidade digital
            da sua empresa em segundos.
          </p>
        </motion.div>

        {step === "form" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-lg mx-auto"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-xl p-6 md:p-8 space-y-5 shadow-sm"
            >
              <div className="space-y-1.5">
                <Label htmlFor="businessName" required>
                  Nome do negócio
                </Label>
                <Input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Ex: Minha Empresa Ltda"
                  startIcon={<Building2 size={14} className="text-text-muted" />}
                />
              </div>

              <div className="space-y-1.5">
                1.5">
                <Label htmlFor="industry" required>
                  Segmento
                </Label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-4 py-3 text-text-sm font-medium text-text bg-background border border-border
                    rounded-xl focus:ring-2 focus-ring-primary/20 focus:border-primary
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200 appearance-none
                    bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%235A6B72\'><path d=\'M19 9l-7 7-7-7\'/></svg>')_right-3_center_no-repeat]
                    pr-11"
                >
                  <option value="">Selecione seu segmento</option>
                  {industries.map((ind) => (
                    <option key={ind.value} value={ind.value}>
                      {ind.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="website">
                    Website
                  </Label>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="seu-site.com.br"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="instagram">
                    Instagram
                  </Label>
                  <div className="relative">
                    <InstagramIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <Input
                      id="instagram"
                      name="instagram"
                      type="text"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="@seumarca"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="whatsapp">
                  WhatsApp (com DDD)
                </Label>
                <div className="relative">
                  <Smartphone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isAnalyzing || !formData.businessName || !formData.industry}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-full transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25"
              >
                {isAnalyzing ? (
                  <>
                    <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    Iniciar Diagnóstico
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass rounded-xl p-6 md:p-8 shadow-sm">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <span className="text-2xl font-bold text-primary font-mono">
                    {Math.round(
                      ((result?.automationScore || 0) +
                        (result?.salesScore || 0) +
                        (result?.marketingScore || 0) +
                        (result?.digitalPresenceScore || 0)) /
                        4
                    )}
                    %
                  </span>
                </div>
                <h3 className="text-text-lg font-semibold text-text">
                  Diagnóstico Completo
                </h3>
                <p className="text-text-sm text-text-muted mt-1">
                  Análise de maturidade digital para{" "}
                  <strong className="text-text">{formData.businessName}</strong>
                </p>
                {result?.priority === 'high' && (
                  <div className="flex items-center justify-center mb-4 p-3 bg-destructive/10 rounded-xl">
                    <span className="mr-2 text-destructive font-medium">Prioridade Alta</span>
                    <span className="text-destructive">Seu negócio tem grande oportunidade de melhoria com automação inteligente</span>
                  </div>
                )}
                {result?.priority === 'medium' && (
                  <div className="flex items-center justify-center mb-4 p-3 bg-warning/10 rounded-xl">
                    <span className="mr-2 text-warning font-medium">Prioridade Média</span>
                    <span className="text-warning">Algumas áreas podem se beneficiar com automação específica</span>
                  </div>
                )}
                {result?.priority === 'low' && (
                  <div className="flex items-center justify-center mb-4 p-3 bg-success/10 rounded-xl">
                    <span className="mr-2 text-success font-medium">Prioridade Baixa</span>
                    <span className="text-success">Seu negócio já tem bom nível de automação - foque em otimizações avançadas</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <ScoreBar
                  label="Automação"
                  score={result?.automationScore || 0}
                  color="#FF4DA6"
                />
                <ScoreBar
                  label="Vendas"
                  score={result?.salesScore || 0}
                  color="#22C55E"
                />
                <ScoreBar
                  label="Marketing"
                  score={result?.marketingScore || 0}
                  color="#3B82F6"
                />
                <ScoreBar
                  label="Presença Digital"
                  score={result?.digitalPresenceScore || 0}
                  color="#F59E0B"
                />
              </div>

              <div>
                <h4 className="text-text-sm font-semibold text-text mb-3">
                  Recomendações Personalizadas
                </h4>
                <div className="space-y-2">
                  {result?.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 px-4 py-3 rounded-xl bg-border/5 border border-border"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-text-sm text-text">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setStep("form")}
                  variant="outline"
                  size="md"
                  className="flex-1 px-6 py-3 text-sm font-medium text-text bg-border/10 hover:bg-border/20 rounded-full"
                >
                  Refazer Diagnóstico
                </Button>
                <Button
                  asChild
                  href="#solutions"
                  variant="primary"
                  size="md"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-full"
                >
                  Ver Soluções
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}