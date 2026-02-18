import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Calendar, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

type Category = "todos" | "social" | "ambiental" | "educacional";

const categories: { key: Category; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "ambiental", label: "Ambiental" },
  { key: "social", label: "Social" },
  { key: "educacional", label: "Educacional" },
];

const categoryLabel: Record<string, string> = {
  educacional: "Educacional",
  social: "Social",
  ambiental: "Ambiental",
};

const projects = [
  {
    title: "Jornada Administrativa e Educativa – Maringá/PR",
    category: "educacional" as const,
    local: "Maringá, PR",
    year: "2024",
    description:
      "Organização e execução da Jornada Administrativa da Secretaria Municipal de Educação de Maringá, reunindo profissionais da rede municipal para formação continuada e planejamento anual.",
    result: "5.000 pessoas impactadas",
    link: "https://drive.google.com/drive/folders/10J8Om2436EISNwU_LBscq0fMTw6yRHns?usp=drive_link",
  },
  {
    title: "Evento Científico e Cultural – Maringá/PR (2024)",
      category: "educacional" as const,
      local: "Maringá, PR",
      year: "2024",
      description:
        "Evento de formação científica e cultural para profissionais da educação da rede municipal de Maringá, com material didático especializado e atividades práticas.",
      result: "500 profissionais capacitados",
      link: "https://drive.google.com/drive/u/1/folders/1JBMkQSOg8fLWn_BSio_gc6lV8PR-H_lu",
  },
  {
    title: "Formação de Educadores – Adamantina/SP (2024)",
    category: "educacional" as const,
    local: "Adamantina, SP",
    year: "2024",
    description:
      "Evento formativo no planejamento do ano letivo para toda a rede municipal de ensino de Adamantina, com atividades presenciais para gestores, professores e demais educadores.",
    result: "260 educadores capacitados",
    link: "https://www.adamantina.sp.leg.br/institucional/noticias/secretaria-de-educacao-de-adamantina-define-acoes-para-retomada-das-aulas-presenciais-no-municipio",
  },
  {
      title: "Formação de Educadores – Taquaral/SP",
      category: "educacional" as const,
      local: "Taquaral, SP",
      year: "2024",
      description:
        "Capacitação presencial voltada a professores, educadores e funcionários de escola, com foco em desenvolvimento profissional e melhoria das práticas pedagógicas.",
      result: "33 profissionais capacitados",
      link: "https://drive.google.com/drive/folders/1MlIOQ6kfdkXSjFi9VSHA3ZDxa0Cmo4_t?usp=sharing",
    },
  {
      title: "SENAC Votuporanga/SP",
      category: "educacional" as const,
      local: "Votuporanga, SP",
      year: "2024",
      description:
        "Atividade formativa presencial desenvolvida com professores e funcionários do SENAC Votuporanga, promovendo qualificação profissional interna.",
      result: "33 funcionários capacitados",
      link: "https://drive.google.com/drive/folders/1ZN-appZ9-SMQU53plXfLPGeFnMptNLI4?usp=sharing",
    },
  {
    title: "Capacitação – Santo Antônio do Aracanguá/SP",
    category: "educacional" as const,
    local: "Santo Antônio do Aracanguá, SP",
    year: "2023–2024",
    description:
      "Encontro de acolhimento aos profissionais da educação no início do ano letivo e capacitação on-line para a Equipe do Atendimento Educacional Especializado (AEE).",
      result: "250 profissionais capacitados",
      link: "https://drive.google.com/drive/folders/1ifS_ddKVPg7PgJ8M_CYITaAf-DZaoY4j?usp=sharing",
  },
  {
    title: "Evento Científico e Cultural – Maringá/PR (2023)",
    category: "educacional" as const,
    local: "Maringá, PR",
    year: "2023",
    description:
      "Evento de formação científica e cultural para profissionais da educação municipal, com conteúdo desenvolvido por especialistas e material didático de apoio.",
      result: "500 profissionais capacitados",
      link: "https://drive.google.com/drive/u/1/folders/1fk-LNc2pfIDNfXnU4N824PgZWo5DA8BE",
  },
  {
      title: "Capacitação – Nova Guataporanga/SP",
      category: "educacional" as const,
      local: "Nova Guataporanga, SP",
      year: "2022",
      description:
        "Capacitação presencial para professores da rede municipal com foco em planejamento inicial do ano letivo e práticas pedagógicas inovadoras.",
      result: "40 professores capacitados",
      link: "https://drive.google.com/drive/folders/1rWiHNIgFHnNdDIcY69a_5N6qpil-EDzn?usp=sharing",
    },
  {
      title: "Formação Continuada – Adamantina/SP (2021)",
      category: "educacional" as const,
      local: "Adamantina, SP",
      year: "2021",
      description:
        "Atividade formativa on-line para toda a rede municipal de ensino, adaptando os processos de capacitação ao contexto da pandemia com excelente adesão.",
      result: "260 educadores capacitados",
      link: "https://drive.google.com/drive/folders/1J_wzlwbLMsMfClQnC1CocyZLoFKjK5pU?usp=sharing",
    },
  {
    title: "Assessoria à Equipe Gestora – Adamantina/SP",
    category: "educacional" as const,
    local: "Adamantina, SP",
    year: "2021",
    description:
      "Assessoria técnica on-line à equipe gestora da rede municipal, com elaboração de e-book de apoio às práticas de gestão escolar.",
    result: "20 gestores assessorados",
    link: "https://drive.google.com/file/d/1lNqyf_I4rYozJPYVvoi1_gYp36XkOvhr/view?usp=sharing",
  },
  {
      title: "Capacitação em Educação Física – Bebedouro/SP",
      category: "educacional" as const,
      local: "Bebedouro, SP",
      year: "2021",
      description:
        "Formação on-line voltada a professores de Educação Física da Rede Municipal, abordando metodologias ativas e práticas pedagógicas contemporâneas.",
      result: "30 professores capacitados",
      link: "https://drive.google.com/file/d/17jEm13JfyZwCfRgAco7szZS9EFqSDJXY/view",
    },
  {
      title: "Formação em Educação Infantil – Bebedouro/SP",
      category: "educacional" as const,
      local: "Bebedouro, SP",
      year: "2020",
      description:
        "Capacitação on-line para professores e educadores da rede de Educação Infantil, com avaliação anônima digital que demonstrou alta satisfação dos participantes.",
      result: "300 educadores capacitados",
      link: "https://drive.google.com/drive/folders/11rS-ZquEBkF8UEuQtHIw2fKNs9eViNhO?usp=sharing",
    },
  {
      title: "Formação de Professores – Tupi Paulista/SP",
      category: "educacional" as const,
      local: "Tupi Paulista, SP",
      year: "2021",
      description:
        "Atividade formativa presencial e on-line para gestores, professores e educadores da Secretaria Municipal de Educação, Esporte, Cultura e Lazer.",
      result: "99 profissionais capacitados",
      link: "https://drive.google.com/drive/folders/1pyhTExImUi_wZJn6GFTLZUdRnNwPTIun?usp=sharing",
    },
  {
    title: "Economia Solidária – Campinas/SP (Edital 003)",
    category: "social" as const,
    local: "Campinas, SP",
    year: "2016–2018",
    description:
      "Capacitação de empreendedores de diversas cadeias produtivas — alimentação, artesanato, serviços e vestuário — em parceria com a Secretaria Municipal de Trabalho e o Ministério do Trabalho (Edital 003).",
    result: "1.916 pessoas impactadas",
    link: "https://campinas.sp.gov.br/noticias/81503/oficina-de-economia-solidaria-reune110-novos-empreendedores",
  },
  {
    title: "Catadores e Reciclagem – Campinas/SP (Edital 004)",
    category: "ambiental" as const,
    local: "Campinas, SP",
    year: "2016–2018",
    description:
      "Capacitação e formalização de empreendedores da cadeia de resíduos sólidos — catadores de material reciclável —, com fomento à economia solidária (Edital 004).",
    result: "1.103 catadores capacitados",
    link: "https://campinas.sp.gov.br/noticias/79436/trabalho-e-renda-aplica-r25-milhoes-em-economia-solidaria-e-cooperativa",
  },
  {
    title: "Capacitação de Gestores – Rio Claro/SP",
    category: "social" as const,
    local: "Rio Claro, SP",
    year: "2015",
    description:
      "Formação para gestores públicos e entidades de fomento, reunindo treze cidades da região, além de capacitação de empreendedores de alimentação, artesanato, música e vestuário.",
    result: "~1.200 pessoas impactadas",
    link: "https://rioclaro.sp.gov.br/desenvolvimento-social/formacao-para-gestores-publicos-e-entidades-de-fomento-reune-treze-cidades-da-regiao/",
  },
  {
    title: "Catadores de Recicláveis – Rio Claro/SP (Edital 004)",
    category: "ambiental" as const,
    local: "Rio Claro, SP",
    year: "2015",
    description:
      "Mapeamento, capacitação e formalização de catadores de material reciclável, promovendo organização coletiva e inserção na economia solidária.",
    result: "400 catadores beneficiados",
    link: "https://ordemdesaoonofre.blogspot.com/2015/04/senaes-projeto-de-economia-solidaria-em.html",
  },
  {
      title: "Formação de Professores – Monte Castelo/SP",
      category: "educacional" as const,
      local: "Monte Castelo, SP",
      year: "2014",
      description:
        "Capacitação presencial de professores da rede municipal com certificação, fortalecendo as práticas pedagógicas locais.",
      result: "50 professores capacitados",
      link: "https://drive.google.com/drive/folders/1Yec9LPWq-PQO55eqQdT0d3K6VC7VA6OT?usp=sharing",
    },
  {
      title: "Plano Municipal de Saneamento – Bariri/SP",
      category: "ambiental" as const,
      local: "Bariri, SP",
      year: "2015",
      description:
        "Mobilização da sociedade civil por meio de reuniões setoriais e audiência pública para elaboração do Plano Municipal de Saneamento Básico.",
      result: "~500 cidadãos mobilizados",
      link: "https://smastr20.blob.core.windows.net/conesan/Bariri_AE_DU_RS_2015.pdf",
  },
  {
    title: "Saneamento Básico – Santa Mercedes/SP",
    category: "ambiental" as const,
    local: "Santa Mercedes, SP",
    year: "2013",
    description:
      "Mobilização e sensibilização popular junto a entidades administrativas, sociais, educacionais e sociedade civil para o Plano Municipal de Saneamento Básico.",
    result: "~100 pessoas mobilizadas",
      link: "https://smastr20.blob.core.windows.net/conesan/Santa%20Mercedes_AE_DU_RS_2013.pdf",
  },
];

const Projetos = () => {
  const [filter, setFilter] = useState<Category>("todos");

  const filtered = filter === "todos" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-28 pb-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">
            Nossos Projetos
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-lg opacity-90 max-w-2xl mx-auto">
            Mais de 16 anos transformando comunidades por meio de educação, desenvolvimento social e responsabilidade ambiental.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {categories.map((cat) => (
              <motion.div key={cat.key} variants={fadeInUp} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant={filter === cat.key ? "default" : "outline"}
                  onClick={() => setFilter(cat.key)}
                  className="font-body"
                >
                  {cat.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="card-hover"
              >
                <Card className="h-full border-none shadow-md flex flex-col">
                  <CardContent className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {categoryLabel[p.category]}
                      </span>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="Ver divulgação"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-3 leading-snug">{p.title}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{p.description}</p>
                    <div className="space-y-1.5 mt-auto pt-4 border-t border-border">
                      <div className="flex items-center gap-2 font-body text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {p.local}
                      </div>
                      <div className="flex items-center gap-2 font-body text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        {p.year}
                      </div>
                      <div className="flex items-center gap-2 font-body text-xs font-medium text-primary">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        {p.result}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projetos;
