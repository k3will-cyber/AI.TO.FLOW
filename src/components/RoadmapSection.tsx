"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Settings,
  Users,
  BarChart3,
  Rocket,
  Target,
} from "lucide-react";

const steps = [
  {
    phase: "Fase 1",
    title: "Diagnóstico e Planejamento",
    subtitle: "Semana 1-2",
    icon: Target,
    color: "#FF4DA6",
    items: [
      "Diagnóstico completo de maturidade digital",
      "Mapeamento de processos e gargalos",
      "Definição de KPIs e metas",
      "Plano de implementação personalizado",
    ],
  },
  {
    phase: "Fase 2",
    title: "Infraestrutura e Base",
    subtitle: "Semana 3-4",
    icon: Settings,
    color: "#22C55E",
    items: [
      "Configuração do ambiente Alto Flow OS",
      "Integração com WhatsApp e Instagram",
      "Setup do CRM inteligente",
      "Migração de dados existentes",
    ],
  },
  {
    phase: "Fase 3",
    title: "Agentes e Automações",
    subtitle: "Semana 5-6",
    icon: Users,
    color: "#3B82F6",
    items: [
      "Ativação dos agentes FireBuff",
      "Configuração de pipelines de vendas",
      "Automação de marketing multicanal",
      "Treinamento dos agentes com dados do negócio",
    ],
  },
  {
    phase: "Fase 4",
    title: "Otimização e Escala",
    subtitle: "Semana 7-8",
    icon: Rocket,
    color: "#F59E0B",
    items: [
      "Análise de primeiros resultados",
      "Ajustes e otimizações",
      "Expansão para novos canais",
      "Ativação de módulos do marketplace",
    ],
  },
  {
    phase: "Fase 5",
    title: "Operação Autônoma",
    subtitle: "Mês 3+",
    icon: BarChart3,
    color: "#8B5CF6",
    items: [
      "Operação assistida por IA em piloto automático",
      "Relatórios executivos semanais",
      "Otimização contínua com machine learning",
      "Suporte dedicado e atualizações",
    ],
  },
];

export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="relative py-24 md:py-32 bg-bg-alt overflow-hidden"
    >
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary font-mono tracking-wider uppercase bg-primary/5 border border-primary/10 rounded-full mb-4">
            Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-[1.05] text-ink mb-4">
            Sua jornada de transformação
            <br />
            <span className="text-primary italic">em 8 semanas.</span>
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-lg">
            Implementação estruturada e progressiva. Cada fase prepara o terreno
            para a próxima, garantindo resultados consistentes.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-black/[0.08] md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-white border-2 -translate-x-1/2 mt-6 z-10"
                    style={{ borderColor: step.color }}
                  />

                  {/* Content card */}
                  <div
                    className={`relative w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 ${
                      isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
                    }`}
                  >
                    <div
                      className="px-5 py-5 rounded-2xl bg-white border border-line hover:border-muted transition-colors duration-200 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-3 md:justify-start"
                        style={isLeft ? {} : { flexDirection: 'row' }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background: `${step.color}12`,
                            color: step.color,
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <span
                            className="text-[10px] font-mono font-semibold tracking-wider uppercase"
                            style={{ color: step.color }}
                          >
                            {step.phase}
                          </span>
                          <span className="text-[10px] text-muted font-mono ml-2">
                            {step.subtitle}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base font-semibold text-ink mb-3">
                        {step.title}
                      </h3>

                      <ul className="space-y-1.5">
                        {step.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted"
                            style={
                              isLeft
                                ? {}
                                : { flexDirection: 'row' }
                            }
                          >
                            <CheckCircle2
                              size={14}
                              className="shrink-0 mt-0.5"
                              style={{ color: step.color }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 rounded-2xl glass shadow-sm">
            <Clock size={20} className="text-primary shrink-0" />
            <div className="text-left">
              <p className="text-sm font-semibold text-ink">
                Pronto para começar sua transformação?
              </p>
              <p className="text-xs text-muted">
                Primeira semana de diagnóstico é gratuita.
              </p>
            </div>
            <a
              href="#diagnostic"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-full transition-colors shrink-0"
            >
              Iniciar Diagnóstico Gratuito
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
