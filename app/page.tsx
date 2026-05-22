'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  PlaneTakeoff, 
  HeadphonesIcon, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Menu, 
  X, 
  Plane, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  Star,
  Quote,
  Percent
} from 'lucide-react';

// 1. Tipados para TypeScript
interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

interface Destino {
  id: number;
  name: string;
  image: string;
  price: string;
  discount: string | null;
}

interface Feature {
  icon: React.ComponentType<{ size?: number | string; strokeWidth?: number | string }>;
  title: string;
  desc: string;
  iconBg: string;
  iconColor: string;
}

interface Promocion {
  id: number;
  title: string;
  location: string;
  oldPrice: string;
  newPrice: string;
  discount: string;
  image: string;
  tag: string;
}

interface Testimonio {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [destinoIndex, setDestinoIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 2. Datos del carrusel principal
  const slides: Slide[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=80",
      title: "Descubre Cancún",
      subtitle: "Playas de arena blanca y aguas cristalinas te esperan en el Caribe Mexicano.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1920&q=80",
      title: "La Magia de París",
      subtitle: "Arte, historia y romance en cada esquina. Planea tu escapada perfecta.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80",
      title: "Aventura en Kioto",
      subtitle: "Sumérgete en la cultura milenaria y templos impresionantes.",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1920&q=80",
      title: "Atardeceres en Santorini",
      subtitle: "Vistas espectaculares, gastronomía única y momentos inolvidables.",
    }
  ];

  // 3. Datos de destinos populares
  const destinos: Destino[] = [
    {
      id: 1,
      name: "Playa del Carmen",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
      price: "$1,200",
      discount: "-20% Hoy",
    },
    {
      id: 2,
      name: "Madrid, España",
      image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80",
      price: "$9,500",
      discount: null,
    },
    {
      id: 3,
      name: "Dubái, EAU",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      price: "$18,300",
      discount: "Populares",
    },
    {
      id: 4,
      name: "Sídney, Australia",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80",
      price: "$22,100",
      discount: null,
    },
    {
      id: 5,
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
      price: "$14,500",
      discount: "-15% Hoy",
    },
    {
      id: 6,
      name: "Roma, Italia",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
      price: "$11,200",
      discount: null,
    }
  ];

  // 4. Datos de promociones
  const promociones: Promocion[] = [
    {
      id: 1,
      title: "Escapada Riviera Maya",
      location: "Quintana Roo, México",
      oldPrice: "$5,200",
      newPrice: "$3,899",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "Paquete Todo Incluido"
    },
    {
      id: 2,
      title: "Ruta del Vino y Queso",
      location: "Querétaro, México",
      oldPrice: "$2,100",
      newPrice: "$1,680",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "Turismo Gastronómico"
    },
    {
      id: 3,
      title: "Aventura en la Huasteca",
      location: "San Luis Potosí, México",
      oldPrice: "$3,500",
      newPrice: "$2,450",
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80",
      tag: "Ecoturismo"
    }
  ];

  // 5. Datos de testimonios
  const testimonios: Testimonio[] = [
    {
      id: 1,
      name: "Mariana Valdez",
      role: "Viajera Frecuente",
      text: "Gracias a TuriApp encontré promociones que no vi en ninguna otra agencia. El tour por la Huasteca Potosina fue organizado a la perfección.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Alejandro Gómez",
      role: "Estudiante Universitario",
      text: "La interfaz es súper intuitiva. Pude armar el viaje de fin de semana con mis amigos ajustándonos a nuestro presupuesto de estudiantes.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  // 6. Datos de la sección de ventajas
  const features: Feature[] = [
    { 
      icon: ShieldCheck, 
      title: "Reserva Segura", 
      desc: "Tus datos están protegidos con la más alta tecnología de encriptación bancaria.",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500"
    },
    { 
      icon: PlaneTakeoff, 
      title: "Mejores Precios", 
      desc: "Comparamos miles de vuelos y hoteles para darte siempre la opción más inteligente.",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500"
    },
    { 
      icon: HeadphonesIcon, 
      title: "Soporte 24/7", 
      desc: "Nuestro equipo experto está listo para ayudarte antes, durante y después de tu viaje.",
      iconBg: "bg-red-50",
      iconColor: "text-[#e3001b]"
    }
  ];

  // Auto-play del carrusel principal
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextDestino = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const prevDestino = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.clientWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setDestinoIndex(Math.min(newIndex, destinos.length - 1));
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] relative font-sans antialiased">
      
      {/* ─── HEADER & NAV ─────────────────────────────────────── */}
      <header className="absolute top-0 left-0 w-full z-50 px-6 py-5 md:px-12 flex items-center justify-between bg-transparent">
        <div className="flex items-center gap-3 cursor-pointer select-none group">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-sm overflow-hidden">
            <img 
              src="/logo.png" 
              alt="TuriApp" 
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          <div className="text-xl md:text-2xl font-black tracking-tight flex items-center">
            <span className="text-[#005bb5] drop-shadow-md">T</span>
            <span className="text-[#e3001b] drop-shadow-md">u</span>
            <span className="text-[#FFB300] drop-shadow-md">r</span>
            <span className="text-[#8cc63f] drop-shadow-md">i</span>
            <span className="text-white font-light tracking-wide ml-0.5 drop-shadow-md">App</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-inner">
          <a href="#" className="text-white hover:text-[#8cc63f] transition-colors duration-300 text-xs font-bold tracking-widest uppercase">Inicio</a>
          <a href="#" className="text-white hover:text-[#8cc63f] transition-colors duration-300 text-xs font-bold tracking-widest uppercase">Destinos</a>
          <a href="#" className="text-white hover:text-[#8cc63f] transition-colors duration-300 text-xs font-bold tracking-widest uppercase">Planes</a>
          <a href="#" className="text-white hover:text-[#8cc63f] transition-colors duration-300 text-xs font-bold tracking-widest uppercase">Contacto</a>
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <button className="text-white hover:text-[#8cc63f] transition-colors duration-300 text-xs font-bold uppercase tracking-widest drop-shadow-sm">
            Iniciar Sesión
          </button>
          <button className="bg-gradient-to-r from-[#8cc63f] to-[#7ab132] hover:shadow-[#8cc63f]/20 text-white px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-widest transition-all duration-300 shadow-lg hover:-translate-y-0.5">
            Registrarse
          </button>
        </div>

        {/* Botón menú móvil estilizado */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white z-50 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} className="text-gray-900" /> : <Menu size={20} />}
        </button>
      </header>

      {/* Menú Móvil Fullscreen Moderno */}
      <div className={`md:hidden fixed inset-0 w-full h-screen bg-white/98 backdrop-blur-lg z-40 transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col justify-center px-8 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <nav className="flex flex-col gap-6 text-3xl text-left font-black tracking-tight">
          <a href="#" className="text-gray-900 hover:text-[#005bb5] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Inicio</a>
          <a href="#" className="text-gray-900 hover:text-[#005bb5] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Destinos</a>
          <a href="#" className="text-gray-900 hover:text-[#005bb5] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Planes</a>
          <a href="#" className="text-gray-900 hover:text-[#005bb5] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contacto</a>
        </nav>
        <div className="flex flex-col gap-4 mt-12">
          <button className="w-full py-4 text-gray-900 font-bold border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
            Iniciar Sesión
          </button>
          <button className="w-full py-4 bg-[#8cc63f] text-white font-bold rounded-2xl shadow-lg shadow-[#8cc63f]/20">
            Registrarse
          </button>
        </div>
      </div>

      {/* ─── HERO CAROUSEL ───────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[650px] bg-gray-950 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover brightness-[0.75]"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fc] via-transparent to-black/40 z-10" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
              <div className="max-w-4xl animate-[fadeIn_0.8s_ease-out]">
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none drop-shadow-sm">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 font-medium mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                  {slide.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto bg-gradient-to-r from-[#005bb5] to-[#004a94] text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-[#005bb5]/20 hover:scale-105 transition-all duration-300">
                    Comenzar a explorar
                  </button>
                  <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold transition-all duration-300">
                    Ver Ofertas
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Flechas de navegación optimizadas */}
        <button 
          onClick={prevSlide}
          className="hidden sm:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-105"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          onClick={nextSlide}
          className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-105"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicadores lineales */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-[#8cc63f] w-12' : 'bg-white/40 w-3'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ─── BUSCADOR FLOTANTE PREMIUM ─────────────────────────── */}
      <section className="relative z-30 max-w-6xl mx-auto px-6 -mt-20 mb-24">
        <div className="bg-white rounded-[2rem] shadow-2xl p-4 md:p-6 border border-gray-100/80 backdrop-blur-md flex flex-col lg:flex-row items-center gap-4">
          
          <div className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
            {/* Input Destino */}
            <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-gray-300 transition-colors">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Destino</label>
              <div className="relative flex items-center">
                <MapPin size={18} className="text-gray-400 absolute left-1" />
                <input 
                  type="text" 
                  placeholder="¿A dónde quieres ir?" 
                  className="w-full bg-transparent text-gray-800 font-semibold text-sm pl-7 focus:outline-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* Input Fechas */}
            <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-gray-300 transition-colors">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Fechas (Ida - Vuelta)</label>
              <div className="relative flex items-center">
                <Calendar size={18} className="text-gray-400 absolute left-1" />
                <div className="flex w-full pl-7 gap-1">
                  <input type="text" placeholder="Ida" className="w-1/2 bg-transparent text-gray-800 font-semibold text-sm focus:outline-none placeholder-gray-400" />
                  <span className="text-gray-300">|</span>
                  <input type="text" placeholder="Vuelta" className="w-1/2 bg-transparent text-gray-800 font-semibold text-sm focus:outline-none placeholder-gray-400" />
                </div>
              </div>
            </div>

            {/* Input Pasajeros */}
            <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-gray-300 transition-colors">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Pasajeros</label>
              <div className="relative flex items-center">
                <Users size={18} className="text-gray-400 absolute left-1" />
                <select className="w-full bg-transparent text-gray-800 font-semibold text-sm pl-7 focus:outline-none appearance-none cursor-pointer">
                  <option>1 Pasajero</option>
                  <option>2 Pasajeros</option>
                  <option>3 Pasajeros</option>
                  <option>4+ Pasajeros</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botón de acción */}
          <div className="w-full lg:w-auto">
            <button className="w-full lg:w-auto h-full min-h-[58px] bg-gradient-to-r from-[#8cc63f] to-[#7ab132] hover:shadow-lg hover:shadow-[#8cc63f]/20 text-white px-8 rounded-2xl font-bold transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <Search size={20} strokeWidth={2.5} />
              <span className="lg:hidden font-extrabold tracking-wider uppercase text-sm">Buscar Viaje</span>
            </button>
          </div>

        </div>
      </section>

      {/* ─── SECCIÓN DESTINOS POPULARES ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-4 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-[#e3001b] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-red-50 rounded-full border border-red-100">Lo más top</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mt-4">Destinos Populares</h2>
            <p className="text-gray-500 mt-2 text-base">Inspiración para tu próxima escapada de fin de semana o vacaciones prolongadas.</p>
          </div>
          <button className="text-[#005bb5] font-bold text-sm hover:text-[#8cc63f] transition-colors flex items-center gap-2 group border-b-2 border-transparent hover:border-[#8cc63f] pb-1">
            Ver todos los destinos 
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative group/arrows">
          {/* Botones de navegación del scroll */}
          <button 
            onClick={prevDestino}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-800 border border-gray-100 hover:bg-[#8cc63f] hover:text-white transition-all duration-300 opacity-0 group-hover/arrows:opacity-100 hidden md:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinos.map((destino) => (
              <div
                key={destino.id}
                className="group/card relative h-[420px] min-w-[280px] md:min-w-[320px] rounded-[2rem] overflow-hidden cursor-pointer border border-gray-100 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 snap-start"
              >
                <img 
                  src={destino.image} 
                  alt={destino.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/20 to-transparent z-10" />
                
                {/* Contenido de la Tarjeta */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  {destino.discount && (
                    <div className={`text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-3 shadow-md ${destino.discount === 'Populares' ? 'bg-[#e3001b]' : 'bg-[#8cc63f]'}`}>
                      {destino.discount}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{destino.name}</h3>
                  <div className="pt-2 border-t border-white/20 flex justify-between items-center text-xs text-gray-300">
                    <span>Vuelos desde</span>
                    <span className="text-[#FFB300] font-black text-xl">{destino.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={nextDestino}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-800 border border-gray-100 hover:bg-[#8cc63f] hover:text-white transition-all duration-300 opacity-0 group-hover/arrows:opacity-100 hidden md:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicadores móviles */}
        <div className="flex justify-center gap-1.5 mt-6 md:hidden">
          {destinos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const scrollAmount = scrollContainerRef.current.clientWidth * index;
                  scrollContainerRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                destinoIndex === index ? 'bg-[#8cc63f] w-6' : 'bg-gray-300 w-1.5'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ─── SECCIÓN PROMOCIONES DESTACADAS ──────────────────────── */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold tracking-wide text-xs uppercase border border-blue-100 mb-4">
                <Percent size={14} /> Ofertas de Temporada
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                Destinos a precios <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">increíbles</span>
              </h2>
              <p className="mt-4 text-gray-500 text-lg">
                Reserva hoy y asegura tu lugar en las experiencias más buscadas por nuestra comunidad de viajeros.
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              Ver todos los destinos <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promociones.map((promo) => (
              <div key={promo.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                    {promo.tag}
                  </div>
                  <div className="absolute top-4 right-4 z-10 bg-[#e3001b] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {promo.discount}
                  </div>
                  <img 
                    src={promo.image} 
                    alt={promo.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
                      <MapPin size={16} className="text-blue-500" />
                      {promo.location}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 line-through">{promo.oldPrice}</p>
                      <p className="text-lg font-black text-[#8cc63f]">{promo.newPrice} <span className="text-xs font-normal text-gray-500">MXN</span></p>
                    </div>
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECCIÓN CLIENTES / TESTIMONIOS ──────────────────────── */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              La comunidad <span className="text-[#e3001b]">TuriApp</span>
            </h2>
            <p className="mt-4 text-gray-500">
              No lo decimos nosotros, lo dicen los más de 10,000 viajeros que ya descubrieron México con nuestra plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonios.map((testimonio) => (
              <div key={testimonio.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative">
                <Quote size={40} className="absolute top-6 right-8 text-blue-50 opacity-50" />
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonio.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={testimonio.avatar} alt={testimonio.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-100" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{testimonio.name}</h4>
                    <p className="text-xs text-gray-500">{testimonio.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* ─── BANNER CTA MINIMALISTA ──────────────────────────────────────── */}

<section className="px-6 py-20">
  <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
    
    {/* Avioncito que cruza de izquierda a derecha */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3" style={{ animation: 'cruzar 15s linear infinite' }}>
        <Plane className="w-8 h-8 md:w-10 md:h-10 text-gray-300 fill-gray-200" />
      </div>
    </div>

    {/* Contenido */}
    <div className="relative z-10 max-w-xl">
      <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-600 font-semibold text-xs tracking-widest uppercase mb-4 border border-green-100">
         Disponible Proximamente en iOS y Android
      </span>
      <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
        Lleva tu próximo viaje <br />en el bolsillo
      </h2>
      <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
        Descarga la App y recibe ofertas exclusivas, gestiona tus reservas y accede a guías offline.
      </p>
      <div className="flex flex-wrap gap-4">
        <button className="bg-[#005bb5] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#004a94] transition-all shadow-md flex items-center gap-2">
          Descargar Gratis
          <ArrowRight size={16} />
        </button>
        <button className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-full font-bold text-sm hover:border-gray-400 hover:bg-gray-50 transition-all">
          Saber más
        </button>
      </div>
    </div>

    {/* Mockup */}
    <div className="relative z-10 w-full max-w-sm hidden md:block">
      <div className="bg-gray-100 rounded-3xl p-3 shadow-md">
        <img 
          src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
          alt="App Mockup" 
          className="rounded-2xl w-full h-[380px] object-cover"
        />
      </div>
    </div>

  </div>

  <style>{`
    @keyframes cruzar {
      0% {
        transform: translate(-100px, 0) rotate(-15deg);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        transform: translate(calc(100vw - 200px), 0) rotate(15deg);
        opacity: 0;
      }
    }
  `}</style>
</section>

      {/* ─── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4 text-center md:text-left">
            <div className="text-xl font-black tracking-tight flex justify-center md:justify-start">
              <span className="text-[#005bb5]">T</span>
              <span className="text-[#e3001b]">u</span>
              <span className="text-[#FFB300]">r</span>
              <span className="text-[#8cc63f]">i</span>
              <span className="text-gray-900 font-light ml-0.5">App</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">© 2026 TuriApp.<br />Todos los derechos reservados.</p>
          </div>

          {[
            { title: 'Compañía', links: ['Sobre nosotros', 'Trabaja con nosotros', 'Blog'] },
            { title: 'Destinos', links: ['México', 'Europa', 'Asia', 'Oceanía'] },
            { title: 'Soporte', links: ['Ayuda', 'Preguntas frecuentes', 'Términos', 'Privacidad'] }
          ].map((col, i) => (
            <div key={i} className="text-center md:text-left">
              <h4 className="font-bold text-gray-900 mb-4 text-sm tracking-wide uppercase text-xs text-gray-400">{col.title}</h4>
              <ul className="space-y-2.5 text-gray-600 text-sm font-medium">
                {col.links.map((link, j) => (
                  <li key={j}><a href="#" className="hover:text-[#005bb5] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs font-medium tracking-wide">
          <p>🌍 Tu aventura comienza aquí. TuriApp - Todo tu viaje en una sola app.</p>
        </div>
      </footer>

      {/* Estilos globales inyectados nativamente en Tailwind */}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}