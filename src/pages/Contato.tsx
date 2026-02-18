import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const contactInfo = [
  { icon: Mail, label: "Razão Social", value: "ECOSBIO - AMBIENTE SOCIO-EDUCACIONAL LTDA" },
  { icon: Mail, label: "CNPJ", value: "10.844.993.0001-31" },
  { icon: Mail, label: "Email", value: "ecosbioambiental@gmail.com" },
  { icon: Phone, label: "Telefone", value: "(19) 99210-1212" },
  { icon: MapPin, label: "Endereço", value: "Dracena, SP - Brasil" },
];

const Contato = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.message,
          to_email: "ecosbioambiental@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve. Obrigado!",
      });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar a mensagem. Tente novamente ou entre em contato por e-mail.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-28 pb-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">
            Fale Conosco
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-lg opacity-90 max-w-2xl mx-auto">
            Estamos prontos para ouvir você. Entre em contato e vamos juntos construir um futuro melhor.
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto"
          >
            {/* Form */}
            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Envie sua mensagem</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-1 block">Nome</label>
                      <Input
                        placeholder="Seu nome completo"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-1 block">Email</label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-1 block">Telefone</label>
                      <Input
                        placeholder="(00) 00000-0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-1 block">Mensagem</label>
                      <Textarea
                        placeholder="Como podemos ajudar?"
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full font-body" disabled={sending}>
                      <Send className="mr-2 h-4 w-4" />
                      {sending ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info + Map */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Informações de Contato</h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-body text-sm font-semibold text-foreground">{info.label}</h3>
                        <p className="font-body text-muted-foreground text-sm whitespace-pre-line">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps - Dracena/SP */}
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-72 w-full">
                  <iframe
                    title="Localização - Dracena, SP"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59577.87!2d-51.5333!3d-21.4833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94982e18f83c6c15%3A0x638e0e8e7dc9bc73!2sDracena%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
