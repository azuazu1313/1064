import LogoShader from "/src/LogoShader";
import React, { useRef, useState } from 'react';
import { Instagram, Facebook, Mail, ChevronDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function App() {
  const [email, setEmail] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  
  const butikRef = useRef<HTMLDivElement>(null);
  const omOssRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    "https://i.imgur.com/UNrNrlx.jpeg",
    "https://i.imgur.com/MjZLRzf.jpeg",
    "https://i.imgur.com/g9tQnUQ.jpeg",
    "https://i.imgur.com/Qqyucu5.jpeg",
    "https://i.imgur.com/mv0kAOy.jpeg",
    "https://i.imgur.com/7V1nm03.jpeg",
    "https://i.imgur.com/DX071gk.jpeg",
    "https://i.imgur.com/lEB0fxL.jpeg"
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const webhookUrl = 'https://hook.eu2.make.com/v4xvygm73d4cmh0c6hoy9a7xsjq6f7da';
      
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Något gick fel. Vänligen försök igen senare.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF2CC] text-black flex flex-col">
      <div 
        ref={topRef}
        className={`z-50 transition-colors duration-300 ${isHovering ? 'bg-white' : 'bg-transparent'}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="container mx-auto py-4 flex flex-col items-center">
          <img 
            src="https://i.imgur.com/8fXsCd4.png" 
            alt="1064 Jewelry" 
            className="h-20 mb-4"
          />
          
          <div className="flex space-x-12">
            <button 
              onClick={() => scrollToSection(topRef)}
              className="text-lg font-medium relative group font-optima"
            >
              HEM
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B48406] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection(butikRef)}
              className="text-lg font-medium relative group font-optima"
            >
              BUTIK
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B48406] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection(omOssRef)}
              className="text-lg font-medium relative group font-optima"
            >
              OM OSS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B48406] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full md:h-[56.25vw] h-screen">
        {/* Desktop Image */}
        <img 
          src="https://i.imgur.com/zo1XeHz.jpeg" 
          alt="Luxury Jewelry Banner" 
          className="hidden md:block w-full h-full object-cover"
        />
        {/* Mobile Image */}
        <img 
          src="https://i.imgur.com/XPaWPKv.jpeg" 
          alt="Luxury Jewelry Banner Mobile" 
          className="md:hidden w-full h-full object-cover"
        />
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown 
            size={32} 
            className="text-white scroll-indicator cursor-pointer"
            onClick={() => scrollToSection(butikRef)}
          />
        </div>
      </div>

      {/* Brand Introduction Section */}
      <div className="py-24 px-4 bg-[#FCF2CC]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-birthstone mb-6">Vårt Löfte</h2>
          <div className="w-16 h-0.5 bg-[#B48406] mx-auto mb-12"></div>
          <p className="text-lg md:text-2xl font-nunitosans leading-relaxed mb-1">
            Vi på 1064 Jewelry förenar skickligt hantverk med modern, tidlös design. Varje smycke är ett unikt konstverk som noggrant formas efter din personliga vision. Vare sig du söker en perfekt vigselring eller önskar ge nytt liv åt en älskad familjeklenod – hos oss utförs varje beställning med precision och kärlek för att skapa något alldeles unikt.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-16 px-4 bg-[#FCF2CC]">
        <div className="max-w-[1800px] mx-auto">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={40}
            slidesPerView={1}
            navigation
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 40
              }
            }}
            className="gallery-slider"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="w-full">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-[1000px] object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div ref={butikRef} className="py-20 px-4 bg-[#FCF2CC]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-8 font-optima-italic">HITTA TILL OSS</h2>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4069.6163947734212!2d18.073433!3d59.336156!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5ca20dc671%3A0x21871c2a1a74675d!2s1064!5e0!3m2!1sen!2sse!4v1740895469055!5m2!1sen!2sse" 
            width="100%" 
            height="450" 
            style={{ border: '4px solid #B48406' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Store Location"
            className="mb-8"
          ></iframe>
          <p className="text-1xl font-medium font-optima-italic">MÅN-FRE 10-19, LÖR 10-17, SÖN 12-17</p>
        </div>
      </div>

      <div className="py-16 bg-[#FCF2CC]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6 font-optima-italic">KONTAKTA OSS</h2>
                <p className="text-xl mb-2 font-optima-italic">Telefon: 08-611 10 64</p>
                <p className="text-xl font-optima-italic">E-post: 1064@1064.se</p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 h-full">
              <img 
                src="https://i.imgur.com/3TaU76Q.jpeg" 
                alt="Jewelry Display" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-[#FCF2CC]">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 font-optima-italic">Bli först med det senaste.</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Din e-postadress" 
              className="w-full px-4 py-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B48406] font-optima"
              required
            />
            <button 
              type="submit" 
              className="w-full py-3 rounded-md bg-[#B48406] text-white font-medium hover:bg-[#8e6805] transition-colors duration-300 font-optima"
            >
              Få tillgång
            </button>
          </form>
        </div>
      </div>

      <div ref={omOssRef} className="py-16 px-4 bg-white flex justify-center">
        <div className="container mx-auto text-center">
          <div className="flex flex-col items-center">
            <img
              src="https://i.imgur.com/FWnwX6j.png"
              alt="1064 Jewelry Logo"
              className="h-96 mb-8 w-auto"
            />
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/1064jewelry/" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-[#B48406] transition-colors duration-300">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com/1064jewelry/" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-[#B48406] transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="mailto:1064@1064.se" rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-[#B48406] transition-colors duration-300">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-8 font-optima-italic font-bold">
            2025 - 1064 Jewelry Stockholm AB | Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;