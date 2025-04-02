import React, { useRef, useState, useEffect } from 'react';
import { Instagram, Facebook, Mail, ChevronDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import { GooeyText } from "./components/ui/gooey-text-morphing";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function App() {
  const [email, setEmail] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const butikRef = useRef<HTMLDivElement>(null);
  const omOssRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const mainSwiperRef = useRef(null);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);
  const thumbsScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const galleryImages = [
    {
      webp: "/assets/UNrNrlx.webp",
      fallback: "https://i.imgur.com/UNrNrlx.jpeg"
    },
    {
      webp: "/assets/MjZLRzf.webp",
      fallback: "https://i.imgur.com/MjZLRzf.jpeg"
    },
    {
      webp: "/assets/g9tQnUQ.webp",
      fallback: "https://i.imgur.com/g9tQnUQ.jpeg"
    },
    {
      webp: "/assets/Qqyucu5.webp",
      fallback: "https://i.imgur.com/Qqyucu5.jpeg"
    },
    {
      webp: "/assets/mv0kAOy.webp",
      fallback: "https://i.imgur.com/mv0kAOy.jpeg"
    },
    {
      webp: "/assets/7V1nm03.webp",
      fallback: "https://i.imgur.com/7V1nm03.jpeg"
    },
    {
      webp: "/assets/DX071gk.webp",
      fallback: "https://i.imgur.com/DX071gk.jpeg"
    },
    {
      webp: "/assets/lEB0fxL.webp",
      fallback: "https://i.imgur.com/lEB0fxL.jpeg"
    }
  ];

  // Create a looped array for the preview
  const loopedGalleryImages = [...galleryImages, ...galleryImages, ...galleryImages];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (thumbsContainerRef.current) {
      const container = thumbsContainerRef.current;
      const middleSet = galleryImages.length;
      const initialScrollPosition = (container.scrollWidth / 3) - (container.offsetWidth / 2);
      container.scrollLeft = initialScrollPosition;
    }
  }, [galleryImages.length]);

  const centerActiveThumb = () => {
    if (!thumbsContainerRef.current) return;

    const container = thumbsContainerRef.current;
    const middleSet = galleryImages.length;
    const activeThumbIndex = activeIndex + middleSet;
    const activeThumb = container.children[activeThumbIndex] as HTMLElement;
    
    if (!activeThumb) return;

    if (thumbsScrollTimeout.current) {
      clearTimeout(thumbsScrollTimeout.current);
    }

    thumbsScrollTimeout.current = setTimeout(() => {
      const containerWidth = container.offsetWidth;
      const thumbWidth = activeThumb.offsetWidth;
      const scrollLeft = activeThumb.offsetLeft - (containerWidth / 2) + (thumbWidth / 2);

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }, 50);
  };

  useEffect(() => {
    centerActiveThumb();
  }, [activeIndex]);

  const handleScroll = () => {
    if (!thumbsContainerRef.current) return;

    const container = thumbsContainerRef.current;
    const totalWidth = container.scrollWidth;
    const oneSetWidth = totalWidth / 3;
    const currentScrollPosition = container.scrollLeft;

    if (currentScrollPosition < oneSetWidth * 0.1 || 
        currentScrollPosition > oneSetWidth * 1.9) {
      const normalizedPosition = currentScrollPosition % oneSetWidth;
      const targetScrollPosition = oneSetWidth + normalizedPosition;
      container.scrollLeft = targetScrollPosition;
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleThumbClick = (index: number) => {
    if (!mainSwiperRef.current?.swiper) return;
    
    const normalizedIndex = index % galleryImages.length;
    mainSwiperRef.current.swiper.slideToLoop(normalizedIndex);
    setActiveIndex(normalizedIndex);
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
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
          <picture>
            <source srcSet="/assets/8fXsCd4.webp" type="image/webp" />
            <img 
              src="https://i.imgur.com/8fXsCd4.png" 
              alt="1064 Jewelry" 
              className="h-20 mb-4"
            />
          </picture>
          
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
              onClick={() => scrollToSection(brandRef)}
              className="text-lg font-medium relative group font-optima"
            >
              OM OSS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B48406] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full md:h-[56.25vw] h-screen">
        <picture className="hidden md:block">
          <source srcSet="/assets/zo1XeHz.webp" type="image/webp" />
          <img 
            src="https://i.imgur.com/zo1XeHz.jpeg" 
            alt="Luxury Jewelry Banner" 
            className="w-full h-full object-cover"
          />
        </picture>
        <picture className="md:hidden">
          <source srcSet="/assets/XPaWPKv.webp" type="image/webp" />
          <img 
            src="https://i.imgur.com/XPaWPKv.jpeg" 
            alt="Luxury Jewelry Banner Mobile" 
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown 
            size={32} 
            className="text-white scroll-indicator cursor-pointer"
            onClick={() => scrollToSection(brandRef)}
          />
        </div>
      </div>

      <div ref={brandRef} className="py-16 px-4 bg-[#FCF2CC]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[40px] md:text-5xl font-birthstone mb-6">Vårt Löfte</h2>
          <div className="w-16 h-0.5 bg-[#B48406] mx-auto mb-12"></div>
          <p className="text-[14px] md:text-[19px] font-nunitosans leading-relaxed mb-1">
            Vi på 1064 Jewelry förenar skickligt hantverk med modern, tidlös design. Varje smycke är ett unikt konstverk som noggrant formas efter din personliga vision. Vare sig du söker en perfekt vigselring eller önskar ge nytt liv åt en älskad familjeklenod – hos oss utförs varje beställning med precision och kärlek för att skapa något alldeles unikt.
          </p>
        </div>
      </div>

      <div className="py-8 bg-[#FCF2CC]">
        <div className="max-w-[1400px] mx-auto px-4">
          <Swiper
            ref={mainSwiperRef}
            modules={[Navigation, Pagination]}
            spaceBetween={40}
            slidesPerView={1}
            navigation
            loop={true}
            onSlideChange={handleSlideChange}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 40
              }
            }}
            className="gallery-slider mb-4"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="w-full">
                  <picture>
                    <source srcSet={image.webp} type="image/webp" />
                    <img
                      src={image.fallback}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full aspect-[3/4] object-cover"
                      loading={index < 4 ? "eager" : "lazy"}
                    />
                  </picture>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="gallery-thumbs-container">
            <div 
              ref={thumbsContainerRef}
              className="flex gap-2 overflow-x-auto py-2 px-1 scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              onScroll={handleScroll}
            >
              {loopedGalleryImages.map((image, index) => {
                const normalizedIndex = index % galleryImages.length;
                const isActive = normalizedIndex === activeIndex;
                
                return (
                  <div
                    key={`thumb-${index}`}
                    className={`preview-thumb cursor-pointer transition-all duration-300 ${
                      isActive ? 'active-thumb' : ''
                    }`}
                    onClick={() => handleThumbClick(index)}
                  >
                    <picture>
                      <source srcSet={image.webp} type="image/webp" />
                      <img
                        src={image.fallback}
                        alt={`Preview ${normalizedIndex + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FCF2CC]">
        <div className="max-w-3xl mx-auto">
          <div className="h-[100px] md:h-[130px] w-full flex items-center justify-center">
            <GooeyText
              texts={[
                { text: "Höj din smyckessamling", mobileSize: "42px", desktopSize: "90px" },
                { text: "med skräddarsydd design", mobileSize: "41px", desktopSize: "90px" },
                { text: "lika unik som du.", mobileSize: "51px", desktopSize: "98px" },
                { text: "Låt oss skapa", mobileSize: "57px", desktopSize: "102px" },
                { text: "något oförglömligt", mobileSize: "48px", desktopSize: "96px" },
                { text: "din historia", mobileSize: "66px", desktopSize: "102px" },
                { text: "förtjänar att glänsa.", mobileSize: "50px", desktopSize: "93px" }
              ]}
              morphTime={1}
              cooldownTime={3}
              className="font-birthstone"
              textClassName="font-bold"
            />
          </div>
          <div className="w-16 h-0.5 bg-[#B48406] mx-auto mt-8"></div>
        </div>
      </div>

      <div ref={butikRef} className="py-16 px-4 bg-[#FCF2CC]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl mb-8 font-optima">HITTA TILL OSS</h2>
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
          <p className="text-1xl font-medium font-nunitosans">MÅN-FRE 10-19, LÖR 10-17, SÖN 12-17</p>
        </div>
      </div>

      <div className="py-8 bg-[#FCF2CC]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-[26px] md:text-3xl font-optima mb-2">KONTAKT & NYHETSBREV</h2>
              <p className="text-[14px] md:text-lg font-nunitosans text-gray-700">
                Håll kontakt för inspiration och exklusiva erbjudanden
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                <div className="text-left">
                  <div className="space-y-4">
                    <div>
                      <p className="text-lg font-nunitosans font-bold mb-1">Telefon</p>
                      <p className="text-xl font-nunitosans">08-611 10 64</p>
                    </div>
                    <div>
                      <p className="text-lg font-nunitosans font-bold mb-1">E-post</p>
                      <a 
                        href="mailto:1064@1064.se"
                        className="text-xl font-nunitosans hover:text-[#B48406] transition-colors duration-300"
                      >
                        1064@1064.se
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="text-left">
                  <p className="text-lg font-nunitosans mb-4">
                    Prenumerera och var först med det senaste från ateljén:
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Din e-postadress" 
                        className="w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:border-[#B48406] focus:outline-none transition-colors duration-300 font-optima"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-3 bg-[#B48406] text-white font-nunitosans hover:bg-[#8e6805] transition-colors duration-300"
                    >
                      Få tillgång
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={omOssRef} className="py-16 px-4 bg-white flex justify-center">
        <div className="container mx-auto text-center">
          <div className="flex flex-col items-center">
            <picture>
              <source srcSet="/assets/FWnwX6j.webp" type="image/webp" />
              <img
                src="https://i.imgur.com/FWnwX6j.png"
                alt="1064 Jewelry Logo"
                className="h-[188px] mb-2 w-auto"
                onClick={() => scrollToSection(topRef)}
              />
            </picture>
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

          <p className="text-center text-[12px] md:text-sm text-gray-600 mt-8 font-unna font-bold">
            2025 - 1064 Jewelry Stockholm AB | Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;