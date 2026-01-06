import './App.css'
import heroVideo from './assets/1303-145340146.mp4'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import Shop from './Shop'
import About from './About'
import Contact from './Contact'
import Admin from './Admin'
import { DataProvider, useData } from './DataContext'

function AppContent() {
  const { products, categories } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionNavigation = (sectionId) => {
    if (location.pathname === '/') {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (sectionId === 'home') {
        navigate('/');
      } else {
        navigate(`/#${sectionId}`);
      }
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);



  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      
      if (response.ok) {
        alert('Message sent successfully! We will get back to you soon.');
        setContactForm({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };
  const AdminRedirect = () => {
    useEffect(() => {
      window.location.href = 'https://furniture-b-pied.vercel.app/admin';
    }, []);
    return <div>Redirecting to admin panel...</div>;
  };

  const HomePage = () => {
    useEffect(() => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }, []);

    return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{position: 'relative', height: isMobile ? '60vh' : '100vh', overflow: 'hidden'}}>
        <video 
          className="hero-video"
          autoPlay 
          loop 
          muted 
          playsInline
          src={heroVideo}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)'}}></div>
        
        {/* Movie-style Text Container - Left and Right Bottom */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 3,
          pointerEvents: 'none'
        }}>
          {/* Left Bottom Text */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? '15%' : '8%',
            left: '5%',
            color: 'white',
            textAlign: 'left',
            fontFamily: 'serif',
            maxWidth: isMobile ? '40%' : 'auto'
          }}>
            <div style={{
              opacity: 0,
              animation: 'textLoop 8s infinite'
            }}>
              <div style={{fontSize: isMobile ? '1rem' : '1.8rem', fontWeight: '300', marginBottom: '0.3rem', textShadow: '2px 2px 4px rgba(0,0,0,0.9)', lineHeight: '1.2'}}>"Premium Quality Furniture"</div>
              <div style={{fontSize: isMobile ? '0.8rem' : '1.2rem', fontWeight: '200', textShadow: '1px 1px 2px rgba(0,0,0,0.9)'}}>Handcrafted Excellence</div>
            </div>
          </div>
          
          {/* Right Bottom Text */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? '15%' : '8%',
            right: '5%',
            color: 'white',
            textAlign: 'right',
            fontFamily: 'serif',
            maxWidth: isMobile ? '40%' : 'auto'
          }}>
            <div style={{
              opacity: 0,
              animation: 'textLoop 8s infinite 4s'
            }}>
              <div style={{fontSize: isMobile ? '1rem' : '1.8rem', fontWeight: '300', marginBottom: '0.3rem', textShadow: '2px 2px 4px rgba(0,0,0,0.9)', lineHeight: '1.2'}}>"Modern Home Essentials"</div>
              <div style={{fontSize: isMobile ? '0.8rem' : '1.2rem', fontWeight: '200', textShadow: '1px 1px 2px rgba(0,0,0,0.9)'}}>Contemporary Design</div>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes textLoop {
            0%, 10% { opacity: 0; transform: translateY(20px) scale(0.9); }
            15%, 85% { opacity: 1; transform: translateY(0) scale(1); }
            90%, 100% { opacity: 0; transform: translateY(-20px) scale(0.9); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          
          .hero-video {
            animation: pulse 8s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Browse Categories */}
      <section className="categories" style={{marginTop: '50px', overflow: 'hidden'}}>
        <div className="container">
          <h2>Browse The Range</h2>
          <div className="category-scroll-container" style={{overflow: 'hidden', position: 'relative'}}>
            <div className="category-scroll" style={{
              display: 'flex',
              animation: 'scroll 10s linear infinite',
              width: 'fit-content'
            }}>
              {[...products, ...products, ...products].map((product, index) => {
                if (!product?.images?.[0]) return null;
                return (
                  <div key={`${product._id}-${index}`} className="category-item" style={{
                    minWidth: '300px',
                    margin: '0 1rem',
                    flexShrink: 0,
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.closest('.category-scroll').style.animationPlayState = 'paused'}
                  onMouseLeave={(e) => e.target.closest('.category-scroll').style.animationPlayState = 'running'}
                  onClick={() => navigate(`/shop?category=${product.category}`)}
                  >
                    <img src={product.images[0]} alt={product.name} />
                    <h3>{product.name}</h3>
                  </div>
                );
              }).filter(Boolean)}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}</style>
      </section>



      {/* Inspiration Section */}
      <section className="inspiration">
        <div className="container">
          <div className="inspiration-content">
            <div className="inspiration-text">
              <h2>50+ Beautiful rooms inspiration</h2>
              <p>Our designer already made a lot of beautiful prototype of rooms that inspire you</p>
              <button className="btn-primary" onClick={() => navigate('/shop')}>Explore More</button>
            </div>
            <div className="inspiration-images">
              <div className="inspiration-slide">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop" alt="Inner Peace" />
                <div className="slide-info">
                  <span>01 — Bed Room</span>
                  <h3>Inner Peace</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="social">
        <div className="container">
          <p>Share your setup with</p>
          <h2>#FurniroFurniture</h2>
          <div className="social-grid">
            {[
              'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop'
            ].map((img, index) => (
              <img key={index} src={img} alt={`Setup ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{padding: window.innerWidth <= 768 ? '2rem 1rem' : '4rem 2rem', backgroundColor: 'white', maxWidth: '100%', overflow: 'hidden'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.604333840858!2d83.39418237424108!3d26.725084476759477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399143689a6626d1%3A0xc10b99ec97028148!2sNauka%20Vihar%2C%20Ramghar%20Tal%2C%20Gorakhpur%2C%20Uttar%20Pradesh%20273017!5e0!3m2!1sen!2sin!4v1766992629046!5m2!1sen!2sin" 
            width="100%" 
            height={window.innerWidth <= 768 ? "250" : "500"}
            style={{border: 0, borderRadius: '10px', display: 'block', maxWidth: '100%'}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Search Modal */}
      {showSearchModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, paddingTop: '10vh'
        }}>
          <div style={{
            backgroundColor: 'white', 
            padding: window.innerWidth <= 480 ? '1.5rem' : '2rem', 
            borderRadius: '10px',
            maxWidth: '500px', 
            width: window.innerWidth <= 480 ? '95%' : '90%'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: window.innerWidth <= 480 ? '1rem' : '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#B88E2F', fontSize: window.innerWidth <= 480 ? '1.3rem' : '1.5rem' }}>Search Products</h2>
              <button onClick={() => setShowSearchModal(false)} style={{
                background: 'none', border: 'none', fontSize: '1.5rem',
                cursor: 'pointer', color: '#666'
              }}>×</button>
            </div>
            
            <input
              type="text"
              placeholder="Search by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%', 
                padding: window.innerWidth <= 480 ? '0.8rem' : '1rem', 
                border: '2px solid #B88E2F',
                borderRadius: '5px', 
                fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem', 
                marginBottom: '1rem'
              }}
              autoFocus
            />
            
            <div style={{ display: 'flex', gap: window.innerWidth <= 480 ? '0.5rem' : '1rem', flexDirection: window.innerWidth <= 480 ? 'column' : 'row' }}>
              <button
                onClick={() => {
                  setShowSearchModal(false);
                  window.location.href = '/shop';
                }}
                style={{
                  flex: 1, 
                  padding: window.innerWidth <= 480 ? '0.6rem' : '0.75rem', 
                  backgroundColor: '#B88E2F',
                  color: 'white', border: 'none', borderRadius: '5px',
                  fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem', 
                  cursor: 'pointer'
                }}
              >
                Search Products
              </button>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowSearchModal(false);
                }}
                style={{
                  flex: 1, 
                  padding: window.innerWidth <= 480 ? '0.6rem' : '0.75rem', 
                  backgroundColor: '#6c757d',
                  color: 'white', border: 'none', borderRadius: '5px',
                  fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem', 
                  cursor: 'pointer'
                }}
              >
                Clear & Close
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Footer */}
      <footer className="footer" style={{backgroundColor: '#FCF8F3', padding: '2rem 0 1rem 0'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div className="footer-content" style={{display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '2fr 1fr 1fr', gap: '2rem', marginBottom: '1.5rem'}}>
            <div className="footer-section">
              <h3 style={{color: '#B88E2F', marginBottom: '0.8rem', fontSize: '1.3rem', fontWeight: 'bold'}}>IFB.</h3>
              <p style={{color: '#666', lineHeight: '1.5', fontSize: '0.9rem', margin: 0}}>400 University Drive Suite 200<br />Coral Gables, FL 33134 USA</p>
            </div>
            <div className="footer-section">
              <h4 style={{color: '#333', marginBottom: '0.8rem', fontSize: '1rem', fontWeight: '600'}}>Links</h4>
              <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                <li style={{marginBottom: '0.5rem'}}><a href="/" style={{color: '#666', textDecoration: 'none', fontSize: '0.9rem'}}>Home</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="/shop" style={{color: '#666', textDecoration: 'none', fontSize: '0.9rem'}}>Shop</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="/about" style={{color: '#666', textDecoration: 'none', fontSize: '0.9rem'}}>About</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="/contact" style={{color: '#666', textDecoration: 'none', fontSize: '0.9rem'}}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 style={{color: '#333', marginBottom: '0.8rem', fontSize: '1rem', fontWeight: '600'}}>Help</h4>
              <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#666', textDecoration: 'none', fontSize: '0.9rem'}}>Payment Options</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#666', textDecoration: 'none', fontSize: '0.9rem'}}>Returns</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#666', textDecoration: 'none', fontSize: '0.9rem'}}>Privacy Policies</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom" style={{borderTop: '1px solid #ddd', paddingTop: '1rem'}}>
            <p style={{color: '#666', textAlign: 'center', margin: 0, fontSize: '0.85rem'}}>2025 IFB Sitting Collection. All rights reserved<br/>Developed by - Shine Infosolutions</p>
          </div>
        </div>
      </footer>
    </>
    );
  };

  return (
      <div className="App">
        {/* Header */}
        <header className="header" style={{background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'fixed', top: 0, width: '100%', zIndex: 1000}}>
          <div className="container" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: window.innerWidth <= 480 ? '0.4rem 0.8rem' : '0.5rem 1rem', height: window.innerWidth <= 480 ? '50px' : '60px', maxWidth: '100%'}}>
            <Link to="/" className="logo" style={{fontSize: window.innerWidth <= 480 ? '1.2rem' : '1.5rem', fontWeight: 'bold', color: '#B88E2F', cursor: 'pointer', textDecoration: 'none'}}>
              <span>🪑 IFB</span>
            </Link>
            
            <nav className="nav" style={{display: window.innerWidth <= 768 ? 'none' : 'flex', gap: '2rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
              <button onClick={() => handleSectionNavigation('home')} style={{background: 'none', border: 'none', textDecoration: 'none', color: '#333', fontWeight: '500', transition: 'color 0.3s', cursor: 'pointer'}}>Home</button>
              <Link to="/shop" style={{textDecoration: 'none', color: '#333', fontWeight: '500', transition: 'color 0.3s'}}>Shop</Link>
              <Link to="/about" style={{textDecoration: 'none', color: '#333', fontWeight: '500', transition: 'color 0.3s'}}>About</Link>
              <Link to="/contact" style={{textDecoration: 'none', color: '#333', fontWeight: '500', transition: 'color 0.3s'}}>Contact</Link>
            </nav>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '300px', justifyContent: 'flex-end'}}>
              {!isMobile && (
                <>
                  <span style={{color: '#B88E2F', fontWeight: '500', fontSize: '0.85rem'}}>📧 info@ifb.com</span>
                  <span style={{color: '#B88E2F', fontWeight: '500', fontSize: '0.85rem'}}>📞 +1 (555) 123-4567</span>
                </>
              )}
              
              {isMobile && (
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#B88E2F', padding: '0.3rem'}}
                >
                  {showMobileMenu ? '✕' : '☰'}
                </button>
              )}
            </div>
          </div>
          
          {showMobileMenu && isMobile && (
            <div style={{background: 'white', borderTop: '1px solid #eee', padding: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
              <nav style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <button onClick={() => {handleSectionNavigation('home'); setShowMobileMenu(false);}} style={{background: 'none', border: 'none', textAlign: 'left', color: '#333', fontWeight: '500', padding: '0.5rem 0', cursor: 'pointer', fontSize: '1rem'}}>Home</button>
                <Link to="/shop" onClick={() => setShowMobileMenu(false)} style={{textDecoration: 'none', color: '#333', fontWeight: '500', padding: '0.5rem 0', fontSize: '1rem'}}>Shop</Link>
                <Link to="/about" onClick={() => setShowMobileMenu(false)} style={{textDecoration: 'none', color: '#333', fontWeight: '500', padding: '0.5rem 0', fontSize: '1rem'}}>About</Link>
                <Link to="/contact" onClick={() => setShowMobileMenu(false)} style={{textDecoration: 'none', color: '#333', fontWeight: '500', padding: '0.5rem 0', fontSize: '1rem'}}>Contact</Link>
              </nav>
            </div>
          )}
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<div style={{paddingBottom: '100px'}}><Admin /></div>} />
        </Routes>

        {/* WhatsApp Float Button - Shows on all pages */}
        <div 
          onClick={() => window.open('https://wa.me/917704866437?text=hi', '_blank')}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            backgroundColor: '#25D366',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
            zIndex: 1000,
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
          </svg>
        </div>
      </div>
  )
}

function App() {
  return (
    <Router>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </Router>
  )
}

export default App
