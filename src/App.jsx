import './App.css'
import heroVideo from './assets/1303-145340146.mp4'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import Shop from './Shop'
import About from './About'
import Contact from './Contact'
import Admin from './Admin'

function AppContent() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
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
    fetchCategories();
    fetchProducts();
  }, []);



  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };



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
      <section className="hero-section">
        <video 
          className="hero-video"
          autoPlay 
          loop 
          muted 
          playsInline
          src={heroVideo}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Browse Categories */}
      <section className="categories" style={{marginTop: '50px'}}>
        <div className="container">
          <h2>Browse The Range</h2>
          <div className="category-grid">
{(Array.isArray(categories) ? [...categories, ...categories] : []).map((category, index) => {
              const categoryProduct = products.find(p => p.category === category.name);
              if (!categoryProduct?.images?.[0]) return null;
              return (
                <div key={`${category.name}-${index}`} className="category-item">
                  <img src={categoryProduct.images[0]} alt={category.name} />
                  <h3>{category.name} ({category.count})</h3>
                </div>
              );
            }).filter(Boolean)}
          </div>
        </div>
      </section>



      {/* Inspiration Section */}
      <section className="inspiration">
        <div className="container">
          <div className="inspiration-content">
            <div className="inspiration-text">
              <h2>50+ Beautiful rooms inspiration</h2>
              <p>Our designer already made a lot of beautiful prototype of rooms that inspire you</p>
              <button className="btn-primary">Explore More</button>
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
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Furniro.</h3>
              <p>400 University Drive Suite 200 Coral Gables,<br />FL 33134 USA</p>
            </div>
            <div className="footer-section">
              <h4>Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Help</h4>
              <ul>
                <li><a href="#">Payment Options</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Privacy Policies</a></li>
              </ul>
            </div>

          </div>
          <div className="footer-bottom">
            <p>2023 furniro. All rights reserved</p>
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
          <div className="container" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: window.innerWidth <= 480 ? '0.4rem 0.8rem' : '0.5rem 2rem', height: window.innerWidth <= 480 ? '50px' : '60px'}}>
            <div className="logo" style={{fontSize: window.innerWidth <= 480 ? '1.2rem' : '1.5rem', fontWeight: 'bold', color: '#B88E2F'}}>
              <span>🪑 Furniro</span>
            </div>
            <nav className="nav" style={{display: window.innerWidth <= 768 ? 'none' : 'flex', gap: '2rem'}}>
              <button onClick={() => handleSectionNavigation('home')} style={{background: 'none', border: 'none', textDecoration: 'none', color: '#333', fontWeight: '500', transition: 'color 0.3s', cursor: 'pointer'}}>Home</button>
              <Link to="/shop" style={{textDecoration: 'none', color: '#333', fontWeight: '500', transition: 'color 0.3s'}}>Shop</Link>
              <Link to="/about" style={{textDecoration: 'none', color: '#333', fontWeight: '500', transition: 'color 0.3s'}}>About</Link>
              <Link to="/contact" style={{textDecoration: 'none', color: '#333', fontWeight: '500', transition: 'color 0.3s'}}>Contact</Link>
            </nav>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              {isMobile && (
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#B88E2F', padding: '0.3rem'}}
                >
                  {showMobileMenu ? '✕' : '☰'}
                </button>
              )}
              
              <div className="header-icons" style={{display: 'flex', gap: window.innerWidth <= 480 ? '0.5rem' : '1rem', fontSize: window.innerWidth <= 480 ? '1rem' : '1.2rem'}}>
                <span style={{cursor: 'pointer', padding: window.innerWidth <= 480 ? '0.3rem' : '0.5rem', borderRadius: '50%', transition: 'background 0.3s'}} onMouseOver={(e) => e.target.style.background = '#f5f5f5'} onMouseOut={(e) => e.target.style.background = 'transparent'}>👤</span>
                <span onClick={() => setShowSearchModal(true)} style={{cursor: 'pointer', padding: window.innerWidth <= 480 ? '0.3rem' : '0.5rem', borderRadius: '50%', transition: 'background 0.3s'}} onMouseOver={(e) => e.target.style.background = '#f5f5f5'} onMouseOut={(e) => e.target.style.background = 'transparent'}>🔍</span>
                <span style={{cursor: 'pointer', padding: window.innerWidth <= 480 ? '0.3rem' : '0.5rem', borderRadius: '50%', transition: 'background 0.3s'}} onMouseOver={(e) => e.target.style.background = '#f5f5f5'} onMouseOut={(e) => e.target.style.background = 'transparent'}>🛒</span>
              </div>
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
          onClick={() => window.open('https://wa.me/?text=hi', '_blank')}
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
      <AppContent />
    </Router>
  )
}

export default App
