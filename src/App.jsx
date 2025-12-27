import './App.css'
import heroVideo from './assets/1303-145340146.mp4'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import Shop from './Shop'
import About from './About'
import Contact from './Contact'

function AppContent() {
  const [categories, setCategories] = useState([]);
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
              const fallbackImages = {
                'Dining': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop',
                'Living': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=400&fit=crop',
                'Bedroom': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=400&fit=crop',
                'Office': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=400&fit=crop',
                'Outdoor': 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=400&fit=crop'
              };
              const imageUrl = category.image 
                ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${category.image}`
                : fallbackImages[category.name] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop';
              return (
                <div key={`${category.name}-${index}`} className="category-item">
                  <img src={imageUrl} alt={category.name} />
                  <h3>{category.name} ({category.count})</h3>
                </div>
              );
            })}
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
            <div className="footer-section">
              <h4>Newsletter</h4>
              <div className="newsletter">
                <input type="email" placeholder="Enter Your Email Address" />
                <button>SUBSCRIBE</button>
              </div>
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
          <Route path="/admin" element={<AdminRedirect />} />
        </Routes>
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
