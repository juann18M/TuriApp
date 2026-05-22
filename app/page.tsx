'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [destinoIndex, setDestinoIndex] = useState(0);
const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Datos del carrusel principal
  const slides = [
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
      subtitle: "Sumérgete en la cultura milenaria, templos impresionantes.",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1920&q=80",
      title: "Atardeceres en Santorini",
      subtitle: "Vistas espectaculares, gastronomía única y momentos inolvidables.",
    }
  ];

  // Datos de destinos populares
  const destinos = [
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

  // Auto-play del carrusel principal
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Funciones para el carrusel de destinos
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

  // Actualizar índice al hacer scroll manual
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.clientWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setDestinoIndex(Math.min(newIndex, destinos.length - 1));
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] relative">
      
      {/* HEADER NAV */}
      <header className="absolute top-0 left-0 w-full z-50 px-4 py-4 md:px-10 md:py-5 flex items-center justify-between bg-transparent">
        
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer select-none group">
          <div className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full">
            <img 
              src="/logo.png" 
              alt="Icono TuriApp" 
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          <div className="text-2xl md:text-4xl font-extrabold tracking-tighter flex items-center font-sans">
            <span className="text-[#005bb5] drop-shadow-lg">T</span>
            <span className="text-[#e3001b] -ml-[1px] md:-ml-[2px] drop-shadow-lg">u</span>
            <span className="text-[#FFB300] -ml-[1px] drop-shadow-lg">r</span>
            <span className="text-[#8cc63f] drop-shadow-lg">i</span>
            <span className="text-white ml-[1px] md:ml-[2px] font-light text-[1.4rem] md:text-[2.2rem] drop-shadow-lg">App</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white hover:text-[#8cc63f] transition-colors duration-300 font-bold text-sm tracking-wide uppercase drop-shadow-md">Inicio</a>
          <a href="#" className="text-white hover:text-[#8cc63f] transition-colors duration-300 font-bold text-sm tracking-wide uppercase drop-shadow-md">Destinos</a>
          <a href="#" className="text-white hover:text-[#8cc63f] transition-colors duration-300 font-bold text-sm tracking-wide uppercase drop-shadow-md">Planes</a>
          <a href="#" className="text-white hover:text-[#8cc63f] transition-colors duration-300 font-bold text-sm tracking-wide uppercase drop-shadow-md">Contacto</a>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <button className="text-white hover:text-[#8cc63f] transition-colors duration-300 font-bold text-sm uppercase tracking-wide drop-shadow-md">
            Iniciar Sesión
          </button>
          <button className="bg-gradient-to-r from-[#8cc63f] to-[#7ab132] hover:from-[#7ab132] hover:to-[#6a9e2a] text-white px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Registrarse
          </button>
        </div>

        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50 space-y-1.5 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'bg-gray-900 rotate-45 translate-y-2' : 'bg-white shadow-sm'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'bg-white shadow-sm opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'bg-gray-900 -rotate-45 -translate-y-2' : 'bg-white shadow-sm'}`}></span>
        </button>
      </header>

      {/* Menú Mobile Mejorado */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white z-40 transform transition-transform duration-300 ease-in-out flex flex-col pt-24 px-6 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end mb-8">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 text-2xl">✕</button>
        </div>
        <nav className="flex flex-col gap-6 text-2xl text-center">
          <a href="#" className="text-gray-800 font-bold hover:text-[#005bb5] transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Inicio</a>
          <a href="#" className="text-gray-800 font-bold hover:text-[#005bb5] transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Destinos</a>
          <a href="#" className="text-gray-800 font-bold hover:text-[#005bb5] transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Planes</a>
          <a href="#" className="text-gray-800 font-bold hover:text-[#005bb5] transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Contacto</a>
        </nav>
        <div className="flex flex-col gap-4 mt-10">
          <button className="w-full py-4 text-[#005bb5] font-bold border-2 border-[#005bb5] rounded-full hover:bg-blue-50 transition-colors duration-300">
            Iniciar Sesión
          </button>
          <button className="w-full py-4 bg-[#8cc63f] text-white font-bold rounded-full shadow-md hover:bg-[#7ab132] transition-colors duration-300">
            Registrarse
          </button>
        </div>
      </div>

      {/* CARRUSEL PRINCIPAL */}
      <section className="relative w-full h-screen min-h-[600px] bg-gray-900 overflow-hidden">
        
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[20000ms] ease-out ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
            />
            
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 animate-fadeIn">
              <div className="max-w-4xl transform transition-all duration-700 delay-300">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-4 md:mb-6 drop-shadow-lg leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 font-medium mb-8 md:mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed px-2">
                  {slide.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4 sm:px-0">
                  <button className="w-full sm:w-auto bg-gradient-to-r from-[#005bb5] to-[#004a94] hover:from-[#004a94] hover:to-[#003a74] text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    Comenzar a explorar
                  </button>
                  <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:-translate-y-1">
                    Ver Ofertas
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Flechas de navegación */}
        <button 
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-110"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button 
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-110"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#8cc63f] w-8 md:w-10' : 'bg-white/50 hover:bg-white w-2 md:w-2.5'
              }`}
            />
          ))}
        </div>

      </section>

      {/* BUSCADOR FLOTANTE */}
      <section className="relative z-30 max-w-6xl mx-auto px-6 -mt-16 md:-mt-24 mb-16 md:mb-20">
        <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-2xl p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-4">
          
          <div className="w-full md:w-1/3 flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4">Destino</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📍</span>
              <input 
                type="text" 
                placeholder="¿A dónde quieres ir?" 
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent transition-all font-medium"
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4">Fechas</label>
            <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-[#8cc63f]">
              <span className="absolute left-4 text-xl z-10">📅</span>
              <input type="text" placeholder="Ida" className="w-1/2 bg-transparent text-gray-800 py-3 pl-12 pr-2 focus:outline-none font-medium text-sm" />
              <input type="text" placeholder="Vuelta" className="w-1/2 bg-transparent text-gray-800 py-3 px-4 focus:outline-none font-medium text-sm" />
            </div>
          </div>

          <div className="w-full md:w-1/4 flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4">Pasajeros</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👥</span>
              <select className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent transition-all font-medium appearance-none cursor-pointer">
                <option>1 Pasajero</option>
                <option>2 Pasajeros</option>
                <option>3 Pasajeros</option>
                <option>4+ Pasajeros</option>
              </select>
            </div>
          </div>

          <div className="w-full md:w-auto mt-4 md:mt-6">
            <button className="w-full md:w-auto bg-gradient-to-r from-[#8cc63f] to-[#7ab132] hover:from-[#7ab132] hover:to-[#6a9e2a] text-white px-6 py-3 md:px-8 rounded-full font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <span>Buscar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>

        </div>
      </section>

      {/* SECCIÓN DESTINOS POPULARES */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 mb-16 md:mb-20">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-[#e3001b] font-extrabold tracking-widest uppercase text-sm">Lo más top</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#231f20] tracking-tight mt-2">Destinos Populares</h2>
            <p className="text-gray-500 mt-2">Los lugares más buscados por nuestros viajeros</p>
          </div>
          <button className="text-[#005bb5] font-bold hover:text-[#8cc63f] transition-colors flex items-center gap-2 group">
            Ver todos los destinos 
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="relative">
          
          <button 
            onClick={prevDestino}
            className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-[#8cc63f] hover:text-white transition-all duration-300 hidden md:flex"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinos.map((destino) => (
              <div
                key={destino.id}
                className="group relative h-96 min-w-[270px] md:min-w-[300px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 snap-start"
              >
                <img 
                  src={destino.image} 
                  alt={destino.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
                  {destino.discount && (
                    <div className={`text-white text-xs font-black px-3 py-1 rounded-full inline-block mb-2 shadow-lg ${destino.discount === 'Populares' ? 'bg-[#e3001b]' : 'bg-[#8cc63f]'}`}>
                      {destino.discount}
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{destino.name}</h3>
                  <p className="text-gray-300 text-sm flex justify-between items-center">
                    Vuelos desde <span className="text-[#FFB300] font-bold text-xl md:text-2xl">{destino.price}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={nextDestino}
            className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-[#8cc63f] hover:text-white transition-all duration-300 hidden md:flex"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>

        </div>

        {/* Indicadores móvil */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
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

      {/* SECCIÓN DE BENEFICIOS */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-[#e3001b] font-extrabold tracking-widest uppercase text-sm">Ventajas</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#231f20] mt-2">¿Por qué elegir TuriApp?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: "🛡️", title: "Reserva Segura", desc: "Tus datos están protegidos con la más alta tecnología de encriptación." },
              { icon: "💸", title: "Mejores Precios", desc: "Comparamos miles de vuelos para darte siempre la opción más económica." },
              { icon: "📞", title: "Soporte 24/7", desc: "Nuestro equipo está listo para ayudarte en cualquier momento del viaje." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl md:text-6xl mb-6">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#231f20] to-[#2d2a2b] rounded-2xl md:rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6">¿Listo para volar?</h2>
            <p className="text-gray-300 text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
              Descarga la App de TuriApp y accede a ofertas exclusivas que no encontrarás en ningún otro lugar.
            </p>
            <button className="bg-gradient-to-r from-[#8cc63f] to-[#7ab132] hover:from-[#7ab132] hover:to-[#6a9e2a] text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-xl">
              Descargar App Ahora
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#005bb5] rounded-full filter blur-[80px] md:blur-[128px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-[#8cc63f] rounded-full filter blur-[80px] md:blur-[128px] opacity-10"></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f8f9fc] border-t border-gray-200 py-12 md:py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          <div className="space-y-4 text-center md:text-left">
            <div className="text-2xl md:text-3xl font-extrabold tracking-tighter flex justify-center md:justify-start">
              <span className="text-[#005bb5]">T</span>
              <span className="text-[#e3001b]">u</span>
              <span className="text-[#FFB300]">r</span>
              <span className="text-[#8cc63f]">i</span>
              <span className="text-gray-700 font-light">App</span>
            </div>
            <p className="text-gray-500 text-sm">© 2026 TuriApp.<br />Todos los derechos reservados.</p>
          </div>

          {[
            { title: 'Compañía', links: ['Sobre nosotros', 'Trabaja con nosotros', 'Blog'] },
            { title: 'Destinos', links: ['México', 'Europa', 'Asia', 'Oceanía'] },
            { title: 'Soporte', links: ['Ayuda', 'Preguntas frecuentes', 'Términos y condiciones', 'Política de privacidad'] }
          ].map((col, i) => (
            <div key={i} className="text-center md:text-left">
              <h4 className="font-bold text-gray-900 mb-4 text-lg">{col.title}</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                {col.links.map((link, j) => (
                  <li key={j}><a href="#" className="hover:text-[#005bb5] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
          <p>🌍 Tu aventura comienza aquí. TuriApp - Todo tu viaje en una sola app.</p>
        </div>
      </footer>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </main>
  );
}