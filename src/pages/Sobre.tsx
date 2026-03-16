import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Clock, Sparkles, GraduationCap, Users, MapPin, Building2, ExternalLink } from "lucide-react";
import unespSelo from "@/assets/unesp-selo.png";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.13 } } };

const values = [
  { icon: Heart, title: "Compromisso Social", description: "Trabalhamos para reduzir desigualdades e promover inclusão em comunidades vulneráveis." },
  { icon: Sparkles, title: "Base Científica", description: "Como empresa filha da Unesp, toda metodologia tem fundamento acadêmico e científico." },
  { icon: Award, title: "Excelência Técnica", description: "Mais de 15 anos de atuação com atestados de capacidade técnica em todo o Brasil." },
];

const timeline = [
  {
    year: "2009",
    title: "Fundação da EcosBio",
    description: "A EcosBio nasce em Dracena/SP com a missão de unir desenvolvimento socioambiental e educação, conectando conhecimento científico a impacto real nas comunidades.",
  },
  {
    year: "2013",
    title: "Primeiros Contratos Públicos",
    description: "Execução dos Planos Municipais de Saneamento Básico em Bariri e Santa Mercedes/SP, com mobilização e sensibilização de centenas de cidadãos em audiências públicas.",
  },
  {
    year: "2014–2015",
    title: "Expansão para Educação e Economia Solidária",
    description: "Capacitação de professores em Monte Castelo/SP e projetos de economia solidária em Rio Claro/SP atendendo artesãos, músicos, agricultores e catadores de recicláveis.",
  },
  {
    year: "2016–2018",
    title: "Grande Parceria com Campinas",
    description: "Contratos com o Ministério do Trabalho e Emprego via Secretaria de Campinas: mais de 3.000 pessoas impactadas, capacitando empreendedores e formalizando catadores de material reciclável.",
  },
  {
    year: "2019",
    title: "Empresa Filha da Unesp",
    description: "A EcosBio recebe a honraria de 'Empresa Filha da Unesp', reconhecimento que certifica o conhecimento acadêmico-científico como base metodológica da empresa.",
  },
  {
    year: "2020–2021",
    title: "Adaptação Digital e Pandemia",
    description: "Adaptação dos serviços ao formato on-line, atendendo redes municipais de ensino como Bebedouro e Adamantina/SP com formações para centenas de professores e gestores.",
  },
  {
    year: "2022–2023",
    title: "Presença em Novas Regiões",
    description: "Expansão para o Paraná com projetos em Maringá, alcançando 500 profissionais da educação em eventos científicos e culturais. Atuação também em Nova Guataporanga e Santo Antônio do Aracanguá/SP.",
  },
  {
    year: "2024–2025",
    title: "Consolidação Nacional",
    description: "Jornada Administrativa em Maringá impacta 5.000 funcionários da Secretaria de Educação. Contratos com SENAC, Taquaral/SP e novas prefeituras consolidam a EcosBio como referência nacional em formação educacional.",
  },
];

const numbers = [
  { icon: Users, value: "3 Milhões+", label: "Pessoas Impactadas Diretamente e Indiretamente" },
  { icon: Building2, value: "100+", label: "Contratos" },
  { icon: MapPin, value: "50+", label: "Municípios Atendidos" },
  { icon: GraduationCap, value: "16+", label: "Anos de Atuação" },
];

const Sobre = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-4"
          >
            Sobre a EcosBio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg opacity-90 max-w-2xl mx-auto"
          >
            Desde 2009 unindo ciência, educação e responsabilidade socioambiental para transformar comunidades em todo o Brasil.
          </motion.p>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">Missão</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed">
                Promover o desenvolvimento sustentável por meio de projetos sociais, ambientais e educacionais que transformam comunidades e capacitam profissionais, tendo o conhecimento científico como base metodológica de todas as nossas ações.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">Visão</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed">
                Ser referência nacional em formação educacional e desenvolvimento socioambiental, reconhecida pela excelência técnica, pelo impacto positivo gerado nas comunidades e pela sólida parceria com o meio acadêmico.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {numbers.map((n) => (
              <motion.div key={n.label} variants={fadeInUp} className="flex flex-col items-center gap-2">
                <n.icon className="h-7 w-7 opacity-80 mb-1" />
                <div className="font-display text-4xl font-bold">{n.value}</div>
                <div className="font-body text-sm opacity-80">{n.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16"
          >
            Nossos Valores
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {values.map((v) => (
                <motion.div key={v.title} variants={fadeInUp} className="card-hover">
                  <Card className="h-full text-center border-none shadow-md">
                    <CardContent className="pt-8 pb-6 px-6">
                      <motion.div
                        className="inline-flex p-3 rounded-xl bg-primary/10 mb-4"
                        whileHover={{ scale: 1.12, rotate: 6 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <v.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                    <p className="font-body text-muted-foreground text-sm">{v.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Honraria Unesp */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10"
          >
            <motion.div variants={fadeInUp} className="shrink-0">
              <img
                src={unespSelo}
                alt="Selo DNA Unesp - Empresa Filha da Universidade Estadual Paulista"
                className="w-40 h-40 md:w-48 md:h-48 object-contain"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-bold text-foreground">Empresa Filha da Unesp</h3>
              </div>
                <p className="font-body text-muted-foreground leading-relaxed mb-5">
                  A EcosBio possui a honraria de ser reconhecida como <strong className="text-foreground">&ldquo;Empresa Filha da Unesp&rdquo;</strong>, o que significa que tem o conhecimento acadêmico e científico como base metodológica de trabalho. A empresa possui autorização para utilizar o selo DNA Unesp em todas as suas publicações e certificações, garantindo credibilidade e rigor científico em cada projeto executado.
                </p>
                <Button asChild variant="outline" className="font-body border-primary text-primary hover:bg-primary hover:text-primary-foreground w-fit">
                  <a href="https://drive.google.com/file/d/1KmWdFButt-v2S8ZdKQ3nOpYAo20sUFgS/view" target="_blank" rel="noopener noreferrer">
                    Ver portfólio EcosBio <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16"
          >
            Nossa Trajetória
          </motion.h2>
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-12"
            >
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={fadeInUp}
                  className={`relative pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}
                >
                  <div className={`absolute left-2 md:left-auto ${i % 2 === 0 ? "md:right-[-8px]" : "md:left-[-8px]"} top-1 w-4 h-4 rounded-full bg-primary border-2 border-background`} />
                  <div className={`flex items-center gap-2 mb-1 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    <Clock className={`h-4 w-4 text-primary ${i % 2 === 0 ? "md:order-2" : ""}`} />
                    <span className="font-body text-sm font-semibold text-primary">{item.year}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="font-body text-muted-foreground text-sm mt-1">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
