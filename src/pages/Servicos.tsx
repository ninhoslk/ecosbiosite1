import { motion } from "framer-motion";
import { Heart, TreePine, GraduationCap, Leaf, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// Imagens reais alinhadas ao portfólio da EcosBio
const serviceEnvironmentUrl =
  "https://meloliani.com.br/wp-content/uploads/2026/02/ambiental.png"; // mata / natureza
const serviceSocialUrl =
  "https://meloliani.com.br/wp-content/uploads/2026/02/social.jpg"; // comunidade / pessoas
const serviceEducationUrl =
  "https://meloliani.com.br/wp-content/uploads/2026/02/IMG_3054-scaled.jpg"; // crianças / educação ambiental

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const services = [
  {
    icon: TreePine,
    title: "Meio Ambiente",
    description:
      "Oferecemos soluções em gestão ambiental, licenciamento e estratégias de sustentabilidade para empresas e comunidades. Preservar o meio ambiente é garantir o futuro das próximas gerações.",
    items: [
      "Gestão ambiental integrada",
      "Licenciamento ambiental",
      "Reflorestamento e recuperação",
      "Monitoramento de biodiversidade",
    ],
      image: serviceEnvironmentUrl,
    color: "text-forest-light",
    bg: "bg-forest-light/10",
    gradient: "from-forest-dark/80 to-forest/60",
  },
  {
    icon: Heart,
    title: "Projetos Sociais",
    description:
      "Desenvolvemos programas comunitários que promovem inclusão social, geração de renda e fortalecimento de comunidades vulneráveis. Nosso compromisso é transformar realidades e criar oportunidades para um futuro melhor.",
    items: [
      "Programas de inclusão social",
      "Desenvolvimento comunitário local",
      "Geração de renda solidária",
      "Fortalecimento de lideranças",
    ],
      image: serviceSocialUrl,
    color: "text-primary",
    bg: "bg-primary/10",
    gradient: "from-primary/80 to-forest-dark/60",
  },
  {
    icon: GraduationCap,
    title: "Formação Educacional",
    description:
      "Oferecemos palestras, formações e programas de capacitação voltados para professores, diretores e equipes gestoras, com foco em metodologias educacionais, desenvolvimento profissional e fortalecimento do ambiente escolar.",
    items: [
      "Palestras para professores e equipes pedagógicas",
      "Formação continuada para educadores",
      "Capacitação para diretores e coordenadores",
      "Desenvolvimento institucional e pedagógico",
    ],
      image: serviceEducationUrl,
    color: "text-sky",
    bg: "bg-sky/10",
    gradient: "from-sky/80 to-forest-dark/60",
  },
];

const Servicos = () => {
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
            Nossos Serviços
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg opacity-90 max-w-2xl mx-auto"
          >
            Soluções integradas nas áreas social, ambiental e educacional para
            gerar impacto real e duradouro.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 space-y-28">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className={`flex flex-col ${i % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
            >
              {/* Image */}
                <motion.div variants={fadeInUp} className="flex-1 w-full card-hover">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-[350px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${s.gradient} opacity-30 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-background/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                      <s.icon className={`h-5 w-5 ${s.color}`} />
                      <span className="font-display font-semibold text-foreground text-sm">{s.title}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div variants={fadeInUp} className="flex-1">
                  <div className={`inline-flex p-3 rounded-xl ${s.bg} mb-4`}>
                    <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: "spring", stiffness: 300 }}>
                      <s.icon className={`h-7 w-7 ${s.color}`} />
                    </motion.div>
                  </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {s.title}
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-8 text-lg">
                  {s.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-body text-foreground"
                    >
                      <CheckCircle className={`h-5 w-5 ${s.color} shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="font-body">
                  <Link to="/contato">
                    Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl md:text-4xl font-bold mb-4"
            >
              Precisa de uma solução personalizada?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-body text-lg opacity-90 max-w-xl mx-auto mb-8"
            >
              Entre em contato e descubra como podemos ajudar sua comunidade ou
              organização.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-body bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/contato">
                  Fale Conosco <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Servicos;
