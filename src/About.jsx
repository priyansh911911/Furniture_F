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
              <h2 style={{fontSize: window.innerWidth <= 480 ? '1.8rem' : window.innerWidth <= 768 ? '2rem' : '2.5rem', marginBottom: '1rem', color: '#B88E2F'}}>About Furniro</h2>
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
    </div>
  );
}

export default About;