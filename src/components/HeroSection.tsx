"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    const createParticles = () => {
      particles = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Using design system tertiary with alpha for particles
        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            // Using design system primary with alpha for connections
            ctx.strokeStyle = `rgba(11, 61, 79, ${0.06 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    const handleResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // GSAP animation for stat counters
  useEffect(() => {
    if (!statsRef.current) return;

    const numbers = statsRef.current.querySelectorAll(".stat-number");
    const ctx = gsap.context(() => {
      numbers.forEach((el) => {
        const elSpan = el as HTMLElement;
        const text = elSpan.textContent || "";
        const numericValue = parseFloat(text.replace(/[^0-9.]/g, ""));
        if (isNaN(numericValue)) return;
        const suffix = text.replace(/[0-9.]/g, "");

        gsap.fromTo(
          elSpan,
          { textContent: "0" },
          {
            textContent: numericValue,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elSpan,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              const val = this.targets()[0].textContent;
              elSpan.textContent = Math.round(Number(val)) + suffix;
            },
          }
        );
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[90svh] flex items-center overflow-hidden bg-background">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Gradient overlays - using design system colors */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-tertiary/[0.06] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Editorial grid lines - using design system border color */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="container relative z-10 py-12 md:py-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-md mb-4"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary font-mono tracking-wider uppercase">
              AI Business Operating System v1.0
            </span>
          </motion.div>

          {/* Headline - using design system typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 text-text"
          >
            <span className="block text-[3.5rem] font-bold leading-[1.05] tracking-tighter lg:text-[4.5rem] xl:text-[5.5rem]">
              Transforme sua empresa
            </span>
            <span className="block text-primary text-[3.5rem] font-normal italic leading-[1.05] tracking-tighter lg:text-[4.5rem] xl:text-[5.5rem]">
              em uma operação de IA.
            </span>
          </motion.h1>

          {/* Description - using design system typography */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-2xl text-text-md leading-relaxed text-text-muted mb-10"
          >
            Alto Flow OS é o sistema operacional de negócios que integra
            automação, CRM inteligente, marketing autônomo e agentes de IA —
            tudo em uma plataforma unificada para PMEs que querem escalar sem
            complexidade.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <a
              href="#diagnostic"
              className="flex items-center gap-2 px-5 py-3 text-text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-md transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              Fazer Diagnóstico IA
              <ArrowRight size={16} />
            </a>
            <a
              href="#cases"
              className="flex items-center gap-2 px-5 py-3 text-text-sm font-medium text-primary border border-primary hover:bg-primary/10 rounded-md transition-all duration-200"
            >
              Ver Cases
              <Activity size={16} />
            </a>
          </motion.div>

          {/* Stats - using design system typography and spacing */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4 md:gap-6"
          >
            {[
              { value: "80%", label: "Automação" },
              { value: "5s", label: "Tempo de resposta" },
              { value: "20%", label: "Conversão de leads" },
              { value: "70%", label: "Retenção" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="stat-number text-[2.25rem] font-bold tracking-tight text-text md:text-[3rem]">
                  {stat.value}
                </span>
                <span className="text-text-xs font-medium text-text-muted tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}