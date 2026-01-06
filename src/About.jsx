import { useState, useEffect } from 'react';

function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* About Section */}
      <section className="about" style={{padding: window.innerWidth <= 480 ? '2.5rem 0' : window.innerWidth <= 768 ? '3rem 0' : '4rem 0', backgroundColor: '#f9f9f9'}}>
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: window.innerWidth <= 480 ? '2rem' : '3rem', alignItems: 'center'}}>
            <div>
              <h2 style={{fontSize: window.innerWidth <= 480 ? '1.8rem' : window.innerWidth <= 768 ? '2rem' : '2.5rem', marginBottom: '1rem', color: '#B88E2F'}}>About IFB</h2>
              <p style={{fontSize: window.innerWidth <= 480 ? '0.95rem' : '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '1.5rem'}}>
                We are passionate about creating beautiful, functional furniture that transforms your living spaces. 
                With over a decade of experience in furniture design and manufacturing, we bring you quality pieces 
                that combine style, comfort, and durability.
              </p>
              <p style={{fontSize: window.innerWidth <= 480 ? '0.95rem' : '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '2rem'}}>
                Our commitment to excellence and customer satisfaction has made us a trusted name in home furnishing. 
                Every piece is carefully crafted to meet the highest standards of quality and design.
              </p>
              <div style={{display: 'flex', gap: window.innerWidth <= 480 ? '1rem' : '2rem', flexDirection: window.innerWidth <= 480 ? 'column' : 'row'}}>
                <div>
                  <h3 style={{fontSize: window.innerWidth <= 480 ? '1.5rem' : '2rem', color: '#B88E2F', margin: '0'}}>500+</h3>
                  <p style={{color: '#666', margin: '0.5rem 0 0 0'}}>Happy Customers</p>
                </div>
                <div>
                  <h3 style={{fontSize: window.innerWidth <= 480 ? '1.5rem' : '2rem', color: '#B88E2F', margin: '0'}}>10+</h3>
                  <p style={{color: '#666', margin: '0.5rem 0 0 0'}}>Years Experience</p>
                </div>
                <div>
                  <h3 style={{fontSize: window.innerWidth <= 480 ? '1.5rem' : '2rem', color: '#B88E2F', margin: '0'}}>50+</h3>
                  <p style={{color: '#666', margin: '0.5rem 0 0 0'}}>Product Categories</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop" 
                alt="About Furniro" 
                style={{width: '100%', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginTop: window.innerWidth <= 768 ? '2rem' : '0'}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional About Content */}
      <section style={{padding: window.innerWidth <= 480 ? '2.5rem 0' : '4rem 0', backgroundColor: 'white'}}>
        <div className="container">
          <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
            <h2 style={{fontSize: window.innerWidth <= 480 ? '1.8rem' : '2.5rem', marginBottom: '2rem', color: '#B88E2F'}}>Our Mission</h2>
            <p style={{fontSize: window.innerWidth <= 480 ? '1rem' : '1.2rem', lineHeight: '1.8', color: '#666', marginBottom: '2rem'}}>
              To create exceptional furniture that enhances the way people live, work, and relax. We believe that 
              great design should be accessible to everyone, and we're committed to delivering quality products 
              that stand the test of time.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🎨</div>
                <h3 style={{color: '#B88E2F', marginBottom: '1rem'}}>Design Excellence</h3>
                <p style={{color: '#666'}}>Every piece is thoughtfully designed to blend form and function seamlessly.</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🌱</div>
                <h3 style={{color: '#B88E2F', marginBottom: '1rem'}}>Sustainable Materials</h3>
                <p style={{color: '#666'}}>We source eco-friendly materials to create furniture that's good for you and the planet.</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🤝</div>
                <h3 style={{color: '#B88E2F', marginBottom: '1rem'}}>Customer First</h3>
                <p style={{color: '#666'}}>Your satisfaction is our priority, from design to delivery and beyond.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
            <p style={{color: '#666', textAlign: 'center', margin: 0, fontSize: '0.85rem'}}>2025 IFB Sitting Collection. All rights reserved</p>
            <p style={{color: '#666', textAlign: 'center', margin: 0, fontSize: '0.85rem'}}>Developed by - Shine Infosolutions</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;