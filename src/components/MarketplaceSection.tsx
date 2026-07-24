"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Utensils,
  Package,
  Stethoscope,
  Building2,
  Scale,
  ShoppingBag,
  Store,
  ArrowRight,
  Check,
} from "lucide-react";

const modules = [
  {
    icon: Utensils,
    title: "Restaurant",
    description:
      "Gestão de reservas, cardápio digital, pedidos automatizados e CRM para fidelização.",
    popular: true,
    color: "#FF4DA6",
  },
  {
    icon: Package,
    title: "Delivery",
    description:
      "Roteirização inteligente, tracking em tempo real e otimização de entregas.",
    popular: false,
    color: "#22C55E",
  },
  {
    icon: Stethoscope,
    title: "Clinic",
    description:
      "Agendamento, prontuário digital, lembretes inteligentes e gestão de pacientes.",
    popular: true,
    color: "#3B82F6",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "CRM imobiliário, tour virtual, scoring de leads e automação de visitas.",
    popular: false,
    color: "#F59E0B",
  },
  {
    icon: Scale,
    title: "Law Firm",
    description:
      "Gestão de processos, prazos automáticos, triagem de clientes e documentos.",
    popular: false,
    color: "#8B5CF6",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description:
      "Automação de vendas, carrinho abandonado, recomendações IA e pós-venda.",
    popular: true,
    color: "#EC4899",
  },
  {
    icon: Store,
    title: "Local Business",
    description:
      "Presença digital, avaliações, WhatsApp business e campanhas locais.",
    popular: false,
    color: "#14B8A6",
  },
];

export default function MarketplaceSection() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  return (
    <section
      id="marketplace"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
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
            Marketplace
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-[1.05] text-ink mb-4">
            Módulos especializados
            <br />
            <span className="text-primary italic">para o seu segmento.</span>
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-lg">
            Escolha o módulo certo para o seu negócio. Cada um é pré-configurado
            com agentes, automações e integrações específicas do setor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            const isActive = activeModule === i;

            return (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onMouseEnter={() => setActiveModule(i)}
                onMouseLeave={() => setActiveModule(null)}
                className={`relative px-5 py-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "border-primary/30 shadow-lg shadow-primary/[0.04] -translate-y-0.5"
                    : "border-line hover:border-muted"
                }`}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${mod.color}06, transparent)`
                    : "white",
                }}
              >
                {mod.popular && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider uppercase rounded-full bg-primary text-white">
                    Popular
                  </span>
                )}

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${mod.color}12`,
                    color: mod.color,
                  }}
                >
                  <Icon size={20} />
                </div>

                <h3 className="text-base font-semibold text-ink mb-1.5">
                  {mod.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {mod.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <span
                    className="inline-flex items-center gap-1"
                    style={{ color: mod.color }}
                  >
                    <Check size={12} />
                    Disponível
                  </span>
                  <ArrowRight
                    size={12}
                    className={`text-muted transition-all duration-200 ${
                      isActive ? "translate-x-1 text-primary" : ""
                    }`}
                  />
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 rounded-2xl bg-bg-alt border border-line">
            <div className="text-left">
              <p className="text-sm font-semibold text-ink">
                Não encontrou seu segmento?
              </p>
              <p className="text-xs text-muted">
                Montamos um módulo personalizado para o seu negócio.
              </p>
            </div>
            <a
              href="#roi"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-full transition-colors shrink-0"
            >
              Simular ROI Personalizado
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
