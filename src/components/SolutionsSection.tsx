"use client";

import { motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Megaphone,
  TrendingUp,
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const solutions = [
  {
    icon: Bot,
    title: "FireBuff SDR",
    subtitle: "Agente de Vendas",
    description:
      "Qualifica leads, executa scripts de vendas e agenda reuniões automaticamente via WhatsApp e Instagram.",
    skills: [
      "Lead Qualification",
      "Sales Scripts",
      "Follow Up",
      "Scheduling",
    ],
    metrics: ">85% conversão",
    color: "#FF4DA6",
  },
  {
    icon: Megaphone,
    title: "FireBuff Marketing",
    subtitle: "Agente de Marketing",
    description:
      "Cria campanhas, copywriting, anúncios e planejamento de conteúdo de forma autônoma e multicanal.",
    skills: ["Copywriting", "Ads Creation", "SEO", "Content Planning"],
    metrics: "ROI 8:1",
    color: "#22C55E",
  },
  {
    icon: TrendingUp,
    title: "FireBuff Growth",
    subtitle: "Agente de Crescimento",
    description:
      "Identifica gargalos, oportunidades de receita e estratégias de growth baseadas em dados reais.",
    skills: [
      "Business Analysis",
      "Growth Strategy",
      "Revenue Optimization",
    ],
    metrics: "+40% receita",
    color: "#3B82F6",
  },
  {
    icon: Palette,
    title: "FireBuff UX",
    subtitle: "Agente de Experiência",
    description:
      "Audita experiência do usuário, analisa heatmaps e otimiza conversão em cada ponto de contato.",
    skills: [
      "UX Audit",
      "Heatmap Analysis",
      "Conversion Optimization",
    ],
    metrics: "+32% conversão",
    color: "#F59E0B",
  },
];

export default function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="relative py-24 md:py-32 bg-bg-alt overflow-hidden"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary font-mono tracking-wider uppercase bg-primary/5 border border-primary/10 rounded-full mb-4">
            Agentes FireBuff
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-[1.05] text-ink mb-4">
            Quatro agentes de IA.
            <br />
            <span className="text-primary italic">Um ecossistema.</span>
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-lg">
            Cada FireBuff é especialista em uma área do seu negócio. Juntos,
            formam o sistema operacional de IA mais completo para PMEs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative px-6 py-7 md:px-8 md:py-9 rounded-2xl bg-white border border-line hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/[0.04] hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${solution.color}12`,
                      color: solution.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-lg font-semibold text-ink">
                        {solution.title}
                      </h3>
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/10">
                        {solution.subtitle}
                      </span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {solution.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {solution.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-black/[0.04] text-muted border border-line"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Metric */}
                    <div className="flex items-center gap-2">
                      <Sparkles size={12} style={{ color: solution.color }} />
                      <span
                        className="text-xs font-semibold font-mono"
                        style={{ color: solution.color }}
                      >
                        {solution.metrics}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="#marketplace"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-full transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl"
          >
            Explorar Marketplace de Módulos
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
