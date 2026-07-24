"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Quote,
  Upload,
  Image as ImageIcon,
  Video,
  X,
} from "lucide-react";

const cases = [
  {
    id: 1,
    title: "Ristorante Bella Vita",
    subtitle: "Restaurante · São Paulo, SP",
    industry: "Restaurante",
    metrics: {
      leads: "+340%",
      revenue: "R$ 180K/mês",
      time: "3 meses",
    },
    quote: "O Alto Flow OS automatizou 90% do nosso follow-up de reservas. Nunca mais perdemos um cliente.",
    author: "Marco Rossi",
    role: "Proprietário",
    color: "#22C55E",
  },
  {
    id: 2,
    title: "Clínica Dra. Mendes",
    subtitle: "Saúde · Belo Horizonte, MG",
    industry: "Clínica",
    metrics: {
      leads: "+280%",
      revenue: "R$ 250K/mês",
      time: "4 meses",
    },
    quote: "Reduzimos o absenteísmo em 70% com o sistema de lembretes inteligentes da Alto Flow.",
    author: "Dra. Juliana Mendes",
    role: "Diretora Médica",
    color: "#3B82F6",
  },
  {
    id: 3,
    title: "Mobiliária Prime",
    subtitle: "Imobiliária · Rio de Janeiro, RJ",
    industry: "Imobiliária",
    metrics: {
      leads: "+420%",
      revenue: "R$ 520K/mês",
      time: "5 meses",
    },
    quote: "O scoring preditivo transformou nosso funil. Fechamos contratos 3x mais rápido.",
    author: "Carlos Oliveira",
    role: "CEO",
    color: "#FF4DA6",
  },
  {
    id: 4,
    title: "TechStore Brasil",
    subtitle: "E-commerce · Curitiba, PR",
    industry: "E-commerce",
    metrics: {
      leads: "+560%",
      revenue: "R$ 1.2M/mês",
      time: "6 meses",
    },
    quote: "Campanhas autônomas de marketing nos deram um ROI de 8:1 no primeiro trimestre.",
    author: "Ana Lucia Costa",
    role: "CMO",
    color: "#F59E0B",
  },
];

export default function CasesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaFiles, setMediaFiles] = useState<Record<number, string | null>>(
    {}
  );
  const [mediaTypes, setMediaTypes] = useState<
    Record<number, "image" | "video" | null>
  >({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video") ? "video" : "image";

    setMediaFiles((prev) => ({ ...prev, [activeIndex]: url }));
    setMediaTypes((prev) => ({ ...prev, [activeIndex]: type }));

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearMedia = () => {
    if (mediaFiles[activeIndex]) {
      URL.revokeObjectURL(mediaFiles[activeIndex]!);
    }
    setMediaFiles((prev) => ({ ...prev, [activeIndex]: null }));
    setMediaTypes((prev) => ({ ...prev, [activeIndex]: null }));
  };

  const currentCase = cases[activeIndex];
  const currentMedia = mediaFiles[activeIndex];
  const currentMediaType = mediaTypes[activeIndex];

  return (
    <section
      id="cases"
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
            Cases
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-[1.05] text-ink mb-4">
            Resultados reais,
            <br />
            <span className="text-primary italic">transformação real.</span>
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-lg">
            Veja como empresas como a sua estão escalando com o Alto Flow OS.
          </p>
        </motion.div>

        {/* Case selector */}
        <div className="flex flex-wrap gap-2 mb-10">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 text-xs font-medium font-mono tracking-wider uppercase rounded-full border transition-all duration-200 ${
                i === activeIndex
                  ? "bg-primary text-white border-primary"
                  : "bg-transparent text-muted border-line hover:border-muted hover:text-ink"
              }`}
            >
              {c.industry}
            </button>
          ))}
        </div>

        {/* Active case */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Visual - Media area with upload capability */}
              <div className="lg:col-span-3 relative">
                <div
                  className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-line bg-bg-alt flex items-center justify-center group"
                  style={{
                    background: `linear-gradient(135deg, ${currentCase.color}15, ${currentCase.color}08)`,
                  }}
                >
                  {currentMedia ? (
                    <>
                      {currentMediaType === "video" ? (
                        <video
                          src={currentMedia}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={currentMedia}
                          alt={`Case ${currentCase.industry}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {/* Clear button */}
                      <button
                        onClick={clearMedia}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                        aria-label="Remover mídia"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Upload placeholder */}
                      <div className="flex flex-col items-center gap-3">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{
                            background: `${currentCase.color}20`,
                          }}
                        >
                          <TrendingUp
                            size={28}
                            style={{ color: currentCase.color }}
                          />
                        </div>

                        {/* Upload buttons */}
                        <div className="flex gap-2">
                          <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-white/80 border border-line text-muted hover:text-ink hover:border-muted cursor-pointer transition-colors">
                            <ImageIcon size={12} />
                            Adicionar imagem
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleMediaUpload}
                            />
                          </label>
                          <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-white/80 border border-line text-muted hover:text-ink hover:border-muted cursor-pointer transition-colors">
                            <Video size={12} />
                            Adicionar vídeo
                            <input
                              type="file"
                              accept="video/*"
                              className="hidden"
                              onChange={handleMediaUpload}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Hidden file input for drag-and-drop via the area */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleMediaUpload}
                      />

                      {/* Click area overlay hint */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-white/80 backdrop-blur-sm border border-line text-muted flex items-center gap-1">
                          <Upload size={10} />
                          Arraste ou clique para adicionar mídia
                        </span>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-primary/90 text-white hover:bg-primary transition-colors"
                        >
                          Upload
                        </button>
                      </div>
                    </>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2 flex flex-col justify-center gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-ink leading-tight mb-1">
                    {currentCase.title}
                  </h3>
                  <p className="text-sm text-muted font-mono tracking-wide">
                    {currentCase.subtitle}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="px-4 py-3 rounded-xl bg-black/[0.03] border border-line">
                    <span className="text-xs text-muted font-mono tracking-wider uppercase block mb-0.5">
                      Leads
                    </span>
                    <span
                      className="text-lg font-bold"
                      style={{ color: currentCase.color }}
                    >
                      {currentCase.metrics.leads}
                    </span>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-black/[0.03] border border-line">
                    <span className="text-xs text-muted font-mono tracking-wider uppercase block mb-0.5">
                      Receita
                    </span>
                    <span className="text-lg font-bold text-ink">
                      {currentCase.metrics.revenue}
                    </span>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-black/[0.03] border border-line">
                    <span className="text-xs text-muted font-mono tracking-wider uppercase block mb-0.5">
                      Período
                    </span>
                    <span className="text-lg font-bold text-ink">
                      {currentCase.metrics.time}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative px-6 py-5 rounded-xl bg-bg-alt border border-line">
                  <Quote
                    size={18}
                    className="absolute top-3 left-3 text-primary/20"
                  />
                  <p className="text-sm text-ink leading-relaxed italic pl-4">
                    &ldquo;{currentCase.quote}&rdquo;
                  </p>
                  <div className="mt-3 pl-4">
                    <span className="text-sm font-medium text-ink">
                      {currentCase.author}
                    </span>
                    <span className="text-xs text-muted ml-2">
                      {currentCase.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between">
          <div className="flex gap-2">
            {cases.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-primary"
                    : "bg-black/[0.12] hover:bg-black/[0.2]"
                }`}
                aria-label={`Case ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % cases.length)
            }
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Próximo case
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
