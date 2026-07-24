"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, DollarSign, Users, Zap } from "lucide-react";

interface ROIValues {
  monthlyLeads: number;
  ticketMedio: number;
  conversionRate: number;
  employees: number;
}

export default function ROISection() {
  const [values, setValues] = useState<ROIValues>({
    monthlyLeads: 200,
    ticketMedio: 150,
    conversionRate: 5,
    employees: 3,
  });
  const [showResult, setShowResult] = useState(false);

  const handleChange = (field: keyof ROIValues, value: number) => {
    setValues((prev) => ({ ...prev, [field]: Math.max(0, value) }));
    setShowResult(false);
  };

  // Calculations
  const currentRevenue = values.monthlyLeads * (values.conversionRate / 100) * values.ticketMedio;
  const projectedConversion = Math.min(values.conversionRate * 2.5, 100);
  const projectedRevenue = values.monthlyLeads * (projectedConversion / 100) * values.ticketMedio;
  const monthlyGain = projectedRevenue - currentRevenue;
  const annualGain = monthlyGain * 12;
  const timeSavedHours = values.employees * 4 * 30; // 4h/day saved per employee
  const laborCost = values.employees * 3500; // avg monthly cost
  const laborSavings = laborCost * 0.4; // 40% efficiency gain

  return (
    <section
      id="roi"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary font-mono tracking-wider uppercase bg-primary/5 border border-primary/10 rounded-full mb-4">
            Calculadora ROI
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-[1.05] text-ink mb-4">
            Quanto sua empresa
            <br />
            <span className="text-primary italic">pode ganhar com IA?</span>
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-lg">
            Simule o impacto financeiro do Alto Flow OS no seu negócio com base
            em dados reais dos nossos clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 md:p-8 space-y-5 shadow-sm">
              <h3 className="text-sm font-semibold text-ink font-mono tracking-wider uppercase">
                Seus dados
              </h3>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink flex items-center gap-2">
                  <Users size={14} className="text-muted" />
                  Leads mensais
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={10}
                    max={5000}
                    value={values.monthlyLeads}
                    onChange={(e) =>
                      handleChange("monthlyLeads", Number(e.target.value))
                    }
                    className="flex-1 h-2 rounded-full appearance-none bg-black/[0.08] accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-sm font-mono font-semibold text-ink w-16 text-right">
                    {values.monthlyLeads.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink flex items-center gap-2">
                  <DollarSign size={14} className="text-muted" />
                  Ticket médio (R$)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={20}
                    max={10000}
                    step={10}
                    value={values.ticketMedio}
                    onChange={(e) =>
                      handleChange("ticketMedio", Number(e.target.value))
                    }
                    className="flex-1 h-2 rounded-full appearance-none bg-black/[0.08] accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-sm font-mono font-semibold text-ink w-16 text-right">
                    R$ {values.ticketMedio.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink flex items-center gap-2">
                  <TrendingUp size={14} className="text-muted" />
                  Taxa de conversão atual (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0.5}
                    max={30}
                    step={0.5}
                    value={values.conversionRate}
                    onChange={(e) =>
                      handleChange("conversionRate", Number(e.target.value))
                    }
                    className="flex-1 h-2 rounded-full appearance-none bg-black/[0.08] accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-sm font-mono font-semibold text-ink w-16 text-right">
                    {values.conversionRate}%
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink flex items-center gap-2">
                  <Users size={14} className="text-muted" />
                  Funcionários no comercial
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={values.employees}
                    onChange={(e) =>
                      handleChange("employees", Number(e.target.value))
                    }
                    className="flex-1 h-2 rounded-full appearance-none bg-black/[0.08] accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-sm font-mono font-semibold text-ink w-16 text-right">
                    {values.employees}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowResult(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-full transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl"
              >
                Calcular ROI
                <Zap size={16} />
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {showResult ? (
              <>
                <div className="glass rounded-2xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-sm font-semibold text-ink font-mono tracking-wider uppercase mb-6">
                    Impacto Projetado
                  </h3>

                  {/* Main metric */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-3">
                      <TrendingUp size={32} className="text-primary" />
                    </div>
                    <p className="text-xs text-muted font-mono tracking-wider uppercase mb-1">
                      Ganho mensal estimado
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-ink">
                      R$ {monthlyGain.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted mt-1">
                      {annualGain >= 1000000
                        ? `R$ ${(annualGain / 1000000).toFixed(1)}M/ano`
                        : `R$ ${annualGain.toLocaleString()}/ano`}
                    </p>
                  </div>

                  {/* Detail metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="px-4 py-3 rounded-xl bg-black/[0.03] border border-line">
                      <p className="text-xs text-muted font-mono tracking-wider uppercase">
                        Receita atual
                      </p>
                      <p className="text-lg font-bold text-ink">
                        R$ {currentRevenue.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-muted">/mês</p>
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-black/[0.03] border border-line">
                      <p className="text-xs text-muted font-mono tracking-wider uppercase">
                        Receita projetada
                      </p>
                      <p className="text-lg font-bold text-primary">
                        R$ {projectedRevenue.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-muted">/mês</p>
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-black/[0.03] border border-line">
                      <p className="text-xs text-muted font-mono tracking-wider uppercase">
                        Conversão projetada
                      </p>
                      <p className="text-lg font-bold text-ink">
                        {projectedConversion.toFixed(1)}%
                      </p>
                      <p className="text-[10px] text-primary">+{((projectedConversion / values.conversionRate - 1) * 100).toFixed(0)}%</p>
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-black/[0.03] border border-line">
                      <p className="text-xs text-muted font-mono tracking-wider uppercase">
                        Economia trabalho
                      </p>
                      <p className="text-lg font-bold text-ink">
                        R$ {laborSavings.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-muted">/mês em eficiência</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <a
                    href="#roadmap"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-full transition-all duration-200 shadow-md"
                  >
                    Ver Roadmap de Implementação
                    <ArrowRight size={16} />
                  </a>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center px-8 py-16">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-bg-alt border border-line flex items-center justify-center mb-4">
                    <Zap size={28} className="text-muted" />
                  </div>
                  <p className="text-base font-medium text-ink mb-1">
                    Ajuste os parâmetros ao lado
                  </p>
                  <p className="text-sm text-muted max-w-xs mx-auto">
                    Preencha seus dados e clique em &ldquo;Calcular ROI&rdquo;
                    para ver o impacto estimado no seu negócio.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
