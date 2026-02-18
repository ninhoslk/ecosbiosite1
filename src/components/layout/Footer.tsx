import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-forest-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6" />
              <span className="font-display text-xl font-bold">EcosBio</span>
            </div>
            <p className="text-sm opacity-80 font-body leading-relaxed">
              Transformando comunidades e protegendo o meio ambiente através de projetos sociais, ambientais e educacionais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Navegação</h4>
            <ul className="space-y-2 font-body text-sm opacity-80">
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Início</Link></li>
              <li><Link to="/sobre" className="hover:opacity-100 transition-opacity">Sobre Nós</Link></li>
              <li><Link to="/servicos" className="hover:opacity-100 transition-opacity">Serviços</Link></li>
              <li><Link to="/projetos" className="hover:opacity-100 transition-opacity">Projetos</Link></li>
              <li><Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link></li>
              <li><Link to="/contato" className="hover:opacity-100 transition-opacity">Contato</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Serviços</h4>
            <ul className="space-y-2 font-body text-sm opacity-80">
              <li>Projetos Sociais</li>
              <li>Gestão Ambiental</li>
              <li>Educação Ambiental</li>
              <li>Consultoria</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-3 font-body text-sm opacity-80">
              <li className="text-xs opacity-60 mb-1">ECOSBIO - AMBIENTE SOCIO-EDUCACIONAL LTDA</li>
              <li className="text-xs opacity-60 mb-2">CNPJ: 10.844.993.0001-31</li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                ecosbioambiental@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                (19) 99210-1212
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                Dracena, SP - Brasil
              </li>
            </ul>
              <div className="flex gap-3 mt-4">
                <a href="https://www.instagram.com/ecosbio_." target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-sm opacity-60 font-body">
          © {new Date().getFullYear()} EcosBio. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
