import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const posts = [
  {
    id: "1",
    title: "Jornada Administrativa de Maringá impacta 5.000 servidores da Educação",
    excerpt: "A EcosBio realizou a Jornada Administrativa da Secretaria de Educação de Maringá/PR, formando mais de 5.000 funcionários com palestras, oficinas práticas e vivências focadas em bem-estar, qualidade de vida e gestão pública eficiente.",
    date: "Mar 2024",
    category: "Educacional",
    external: null,
  },
  {
    id: "2",
    title: "Semana do Meio Ambiente de Maringá: 500 profissionais mobilizados",
    excerpt: "Evento científico-cultural realizado pela EcosBio em Maringá/PR reuniu professores e gestores em atividades de educação ambiental, celebrando a diversidade cultural e estimulando práticas sustentáveis nas escolas municipais.",
    date: "Jun 2023",
    category: "Ambiental",
    external: null,
  },
  {
    id: "3",
    title: "Plano Municipal de Saneamento Básico: Bariri e Santa Mercedes",
    excerpt: "A EcosBio coordenou o processo participativo para elaboração dos Planos Municipais de Saneamento Básico de Bariri e Santa Mercedes/SP, com audiências públicas, mobilização comunitária e sensibilização ambiental envolvendo centenas de cidadãos.",
    date: "Jan 2013",
    category: "Ambiental",
    external: null,
  },
  {
    id: "4",
    title: "Economia Solidária em Rio Claro: artesãos, músicos e catadores capacitados",
    excerpt: "Projeto desenvolvido em Rio Claro/SP com apoio do Ministério do Trabalho capacitou empreendedores da economia solidária — artesãos, músicos, agricultores familiares e catadores de recicláveis — em gestão, cooperativismo e sustentabilidade.",
    date: "Ago 2015",
    category: "Social",
    external: null,
  },
  {
    id: "5",
    title: "Campinas: mais de 3.000 pessoas impactadas em formação e inclusão produtiva",
    excerpt: "Série de contratos com a Secretaria Municipal de Campinas/SP, via Ministério do Trabalho e Emprego, capacitou microempreendedores, formalizou catadores de material reciclável e promoveu inclusão socioeconômica de populações vulneráveis.",
    date: "Out 2017",
    category: "Social",
    external: null,
  },
  {
    id: "6",
    title: "Formação continuada de professores durante a pandemia em Bebedouro e Adamantina",
    excerpt: "Com a chegada da pandemia, a EcosBio adaptou seus programas para o formato on-line e realizou formações para centenas de professores e gestores das redes municipais de Bebedouro e Adamantina/SP, garantindo continuidade pedagógica em período crítico.",
    date: "Mai 2020",
    category: "Educacional",
    external: null,
  },
  {
    id: "7",
    title: "Monte Castelo: capacitação de professores e desenvolvimento local",
    excerpt: "A EcosBio atuou em Monte Castelo/SP com programas de formação continuada para educadores, integrando práticas socioambientais ao cotidiano escolar e fortalecendo o vínculo entre escola e comunidade.",
    date: "Mar 2014",
    category: "Educacional",
    external: null,
  },
  {
    id: "8",
    title: "SENAC e EcosBio: parceria para formação profissional socioambiental",
    excerpt: "Parceria firmada com o SENAC para oferta de cursos e programas de formação profissional com foco em sustentabilidade, educação ambiental e desenvolvimento de competências socioemocionais para jovens e adultos.",
    date: "Nov 2024",
    category: "Educacional",
    external: null,
  },
  {
    id: "9",
    title: "Nova Guataporanga e Santo Antônio do Aracanguá: chegada ao interior paulista",
    excerpt: "Expansão da atuação da EcosBio para municípios do interior profundo de São Paulo, com projetos de educação ambiental e desenvolvimento comunitário adaptados à realidade local e às demandas específicas de cada território.",
    date: "Fev 2023",
    category: "Social",
    external: null,
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-28 pb-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">
            Blog & Notícias
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-lg opacity-90 max-w-2xl mx-auto">
            Artigos, notícias e reflexões sobre sustentabilidade, meio ambiente e impacto social.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow group">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-body text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {post.date}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{post.excerpt}</p>

                      <Link to={`/blog/${post.id}`} className="font-body text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Ler mais <ArrowRight className="h-3 w-3" />
                        </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
