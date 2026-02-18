import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const postsData: Record<string, { title: string; date: string; category: string; content: string[] }> = {
  "1": {
    title: "Como o reflorestamento urbano está mudando nossas cidades",
    date: "10 Jan 2025",
    category: "Ambiental",
    content: [
      "O reflorestamento urbano é uma das estratégias mais eficazes para combater os efeitos das mudanças climáticas nas grandes cidades. Com o aumento da urbanização, as áreas verdes foram drasticamente reduzidas, criando ilhas de calor e comprometendo a qualidade do ar.",
      "Na EcosBio, desenvolvemos um programa pioneiro de plantio de árvores nativas em áreas urbanas degradadas. Em 2024, plantamos mais de 10.000 árvores em diferentes bairros de São Paulo, transformando terrenos baldios em pequenos bosques urbanos.",
      "Os resultados são impressionantes: redução de até 3°C na temperatura local, melhoria na qualidade do ar e criação de espaços de convivência para a comunidade. Além disso, o programa gera empregos locais e promove a educação ambiental.",
      "O próximo passo é expandir o projeto para outras capitais brasileiras, levando os benefícios do reflorestamento urbano para mais comunidades.",
    ],
  },
  "2": {
    title: "O impacto da educação ambiental nas novas gerações",
    date: "25 Dez 2024",
    category: "Educacional",
    content: [
      "A educação ambiental é uma ferramenta poderosa para formar cidadãos conscientes e comprometidos com a preservação do meio ambiente. Quando introduzida desde cedo, ela transforma a forma como as crianças enxergam o mundo ao seu redor.",
      "O programa 'Educação Verde nas Escolas' da EcosBio atendeu mais de 50 escolas públicas em 2024, levando atividades práticas de sustentabilidade para milhares de estudantes.",
      "Os resultados mostram que alunos participantes apresentam maior consciência sobre o uso de recursos naturais, reciclagem e preservação da biodiversidade. Muitos se tornam multiplicadores em suas comunidades.",
    ],
  },
  "3": {
    title: "Projetos sociais que transformam comunidades",
    date: "15 Dez 2024",
    category: "Social",
    content: [
      "Os projetos sociais da EcosBio são desenhados para gerar impacto real e duradouro nas comunidades onde atuamos. Através de programas de capacitação, geração de renda e fortalecimento de lideranças locais, buscamos empoderar as pessoas.",
      "Em 2024, nosso programa de capacitação comunitária formou mais de 200 jovens em comunidades vulneráveis, oferecendo cursos de formação profissional, mentoria e acesso a oportunidades de emprego.",
      "As histórias de transformação são inspiradoras: jovens que antes não tinham perspectiva agora lideram iniciativas em suas comunidades, criando um ciclo virtuoso de desenvolvimento local.",
    ],
  },
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = postsData[id || ""];

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-28 pb-20 text-center container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Artigo não encontrado</h1>
          <Button asChild variant="outline">
            <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-28 pb-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button asChild variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 mb-6">
            <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar</Link>
          </Button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-1 font-body text-sm opacity-80"><Tag className="h-3 w-3" /> {post.category}</span>
              <span className="flex items-center gap-1 font-body text-sm opacity-80"><Calendar className="h-3 w-3" /> {post.date}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">{post.title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="font-body text-foreground leading-relaxed text-lg">{paragraph}</p>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
