import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, TreePine, GraduationCap, ArrowRight, Heart, Globe, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import heroImage from "@/assets/hero-nature.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.13 } },
};

const pillars = [
  {
    icon: TreePine,
    title: "Ambiental",
    description: "Gestão ambiental, sustentabilidade e preservação dos recursos naturais.",
    color: "text-forest-light",
    bg: "bg-forest-light/10",
  },
  {
    icon: Heart,
    title: "Social",
    description: "Programas comunitários, inclusão social e desenvolvimento local para transformar vidas.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: GraduationCap,
    title: "Educacional",
    description: "Capacitação, workshops e conscientização para um futuro sustentável.",
    color: "text-sky",
    bg: "bg-sky/10",
  },
];

const impactNumbers = [
  { number: 50, suffix: "+", label: "Projetos Realizados" },
  { number: 100000, suffix: "+", label: "Pessoas Impactadas" },
  { number: 16, suffix: "+", label: "Anos de Atuação" },
];

const recentProjects = [
  {
    title: "Saneamento Básico – Interior Paulista",
    category: "Ambiental",
    description: "Elaboração dos Planos Municipais de Saneamento Básico de Bariri e Santa Mercedes/SP com mobilização popular e audiências públicas.",
  },
  {
    title: "Economia Solidária – Campinas/SP",
    category: "Social",
    description: "Capacitação de empreendedores e formalização de catadores de recicláveis, impactando mais de 3.000 pessoas em parceria com o Ministério do Trabalho.",
  },
  {
    title: "Jornada Educativa – Maringá/PR",
    category: "Educacional",
    description: "Organização da Jornada Administrativa da Secretaria de Educação de Maringá, impactando 5.000 profissionais da rede municipal.",
  },
];

// Hook para contar números animados
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function AnimatedCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(target, 1600, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const display = target >= 1000 ? count.toLocaleString("pt-BR") : count;

  return (
    <motion.div ref={ref} variants={fadeInUp} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold mb-2">
        {display}{suffix}
      </div>
      <div className="font-body text-sm md:text-base opacity-80">{label}</div>
    </motion.div>
  );
}

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero com parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ backgroundImage: `url(${heroImage})`, y: heroY }}
          className="absolute inset-0 bg-cover bg-center scale-110"
        />
        <div className="absolute inset-0 bg-forest-dark/60" />

        {/* Partículas flutuantes decorativas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block font-body text-sm font-medium bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-white/90"
          >
            Desde 2009 — Empresa Filha da Unesp
          </motion.div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transformando o mundo com responsabilidade
          </h1>
          <p className="font-body text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Projetos Ambientais, Sociais e Educacionais que geram impacto real nas comunidades e no meio ambiente.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="font-body text-base btn-glow">
              <Link to="/projetos">
                Conheça nossos projetos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-body text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/sobre">Sobre a EcosBio</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Pilares */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="font-body text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Nossa Atuação
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos Pilares de Atuação
            </motion.h2>
            <motion.p variants={fadeInUp} className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
              Atuamos em três frentes essenciais para construir um futuro mais justo e sustentável.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pillars.map((p) => (
              <motion.div key={p.title} variants={fadeInUp} className="card-hover">
                <Card className="h-full text-center border-none shadow-lg">
                  <CardContent className="pt-10 pb-8 px-8">
                    <motion.div
                      className={`inline-flex p-4 rounded-2xl ${p.bg} mb-6`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p.icon className={`h-8 w-8 ${p.color}`} />
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">{p.title}</h3>
                    <p className="font-body text-muted-foreground leading-relaxed">{p.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Numbers com contador */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {impactNumbers.map((item) => (
              <AnimatedCounter
                key={item.label}
                target={item.number}
                suffix={item.suffix}
                label={item.label}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="font-body text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                Portfólio
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Projetos em Destaque
              </h2>
              <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
                Conheça alguns dos nossos projetos mais recentes e seu impacto.
              </p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentProjects.map((project, i) => (
                <motion.div key={project.title} variants={fadeInUp} className="card-hover">
                  <Card className="h-full border-none shadow-md">
                    <CardContent className="p-8">
                      <span className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                        {project.category}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">{project.title}</h3>
                      <p className="font-body text-muted-foreground leading-relaxed">{project.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="font-body">
                <Link to="/projetos">Ver todos os projetos <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vamos construir um futuro melhor juntos?
            </motion.h2>
            <motion.p variants={fadeInUp} className="font-body text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Entre em contato e descubra como a EcosBio pode apoiar sua comunidade ou organização.
            </motion.p>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300 }}>
              <Button asChild size="lg" className="font-body text-base btn-glow">
                <Link to="/contato">Fale Conosco <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
