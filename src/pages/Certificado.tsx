import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { buscarCertificadoPorCodigo } from "@/lib/certificados";

/**
 * Página pública de verificação: /#/certificados/<codigo>.
 * Não exige login; busca só o certificado cujo código bate exatamente
 * (função buscar_certificado no Supabase).
 */
const Certificado = () => {
  const { codigo = "" } = useParams<{ codigo: string }>();

  const { data: certificado, isLoading, isError } = useQuery({
    queryKey: ["certificado", codigo],
    queryFn: () => buscarCertificadoPorCodigo(codigo),
    retry: 1,
  });

  useEffect(() => {
    document.title = certificado
      ? "Verificação de Certificado | EcosBio"
      : isLoading
        ? "EcosBio"
        : "Certificado não encontrado | EcosBio";
    return () => {
      document.title = "EcosBio";
    };
  }, [certificado, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="pt-28 pb-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-3xl">
            <Skeleton className="h-10 w-2/3 bg-primary-foreground/20" />
            <Skeleton className="mt-4 h-5 w-1/2 bg-primary-foreground/20" />
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <Skeleton className="aspect-[1.414] w-full rounded-2xl" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (isError || !certificado) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-28 pb-20 text-center container mx-auto px-4 max-w-xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            {isError ? "Não foi possível verificar agora" : "Certificado não encontrado"}
          </h1>
          <p className="font-body text-muted-foreground mb-8 leading-relaxed">
            {isError
              ? "Houve um erro ao consultar o certificado. Tente novamente em instantes."
              : "Nenhum certificado corresponde a este código. Confira se o link foi copiado corretamente."}
          </p>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao início
            </Link>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 font-body text-xs font-medium mb-4">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Certificado verificado — EcosBio
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold">{certificado.titulo || "Certificado"}</h1>
            <p className="mt-3 font-body text-sm opacity-80 break-all">
              Código de verificação: <span className="font-mono">{certificado.codigo}</span>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-4 max-w-3xl flex flex-col items-center gap-8"
        >
          <div className="flex w-full flex-col gap-8">
            <a href={certificado.imagem_frente_url} target="_blank" rel="noopener noreferrer">
              <img
                src={certificado.imagem_frente_url}
                alt={`Certificado ${certificado.codigo} — frente`}
                loading="eager"
                decoding="async"
                className="w-full rounded-2xl border border-border shadow-sm"
              />
            </a>
            <a href={certificado.imagem_verso_url} target="_blank" rel="noopener noreferrer">
              <img
                src={certificado.imagem_verso_url}
                alt={`Certificado ${certificado.codigo} — verso`}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl border border-border shadow-sm"
              />
            </a>
          </div>

          <p className="-mt-4 font-body text-xs text-muted-foreground">
            Clique em uma imagem para abri-la em tamanho original.
          </p>

          <Button asChild size="lg" className="rounded-full px-8">
            <a href={certificado.drive_url} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Baixar certificado
            </a>
          </Button>

          <p className="max-w-md text-center font-body text-xs leading-relaxed text-muted-foreground">
            O download é feito através do Google Drive. Se o link não abrir, confira se o endereço foi copiado
            corretamente ou entre em contato com a EcosBio.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Certificado;
