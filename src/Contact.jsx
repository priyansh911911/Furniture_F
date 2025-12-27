import { useState, useEffect } from 'react';

function Contact() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Contact Section */}
      <section className="contact" style={{padding: window.innerWidth <= 480 ? '2.5rem 0' : window.innerWidth <= 768 ? '3rem 0' : '4rem 0', backgroundColor: 'white'}}>
        <div className="container">
          <h2 style={{textAlign: 'center', fontSize: window.innerWidth <= 480 ? '1.8rem' : window.innerWidth <= 768 ? '2rem' : '2.5rem', marginBottom: window.innerWidth <= 480 ? '2rem' : '3rem', color: '#B88E2F'}}>Contact Us</h2>
          <div style={{display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: window.innerWidth <= 480 ? '2rem' : '3rem', maxWidth: '1000px', margin: '0 auto'}}>
            <div>
              <h3 style={{color: '#B88E2F', marginBottom: '1.5rem'}}>Get in Touch</h3>
              <div style={{marginBottom: '1.5rem'}}>
                <h4 style={{color: '#333', marginBottom: '0.5rem'}}>📍 Address</h4>
                <p style={{color: '#666', margin: '0'}}>400 University Drive Suite 200<br/>Coral Gables, FL 33134 USA</p>
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <h4 style={{color: '#333', marginBottom: '0.5rem'}}>📞 Phone</h4>
                <p style={{color: '#666', margin: '0'}}>+1 (555) 123-4567</p>
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <h4 style={{color: '#333', marginBottom: '0.5rem'}}>✉️ Email</h4>
                <p style={{color: '#666', margin: '0'}}>info@furniro.com</p>
              </div>
              <div>
                <h4 style={{color: '#333', marginBottom: '0.5rem'}}>🕒 Working Hours</h4>
                <p style={{color: '#666', margin: '0'}}>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
            <div>
              <form onSubmit={handleContactSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                  style={{padding: window.innerWidth <= 480 ? '0.8rem' : '1rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem'}}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                  style={{padding: window.innerWidth <= 480 ? '0.8rem' : '1rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem'}}
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  style={{padding: window.innerWidth <= 480 ? '0.8rem' : '1rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem'}}
                />
                <textarea
                  placeholder="Your Message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                  rows={window.innerWidth <= 480 ? "4" : "5"}
                  style={{padding: window.innerWidth <= 480 ? '0.8rem' : '1rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem', resize: 'vertical'}}
                />
                <button
                  type="submit"
                  style={{
                    padding: window.innerWidth <= 480 ? '0.8rem' : '1rem', 
                    backgroundColor: '#B88E2F', color: 'white',
                    border: 'none', borderRadius: '5px', 
                    fontSize: window.innerWidth <= 480 ? '1rem' : '1.1rem',
                    cursor: 'pointer', transition: 'background 0.3s'
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Information */}
      <section style={{padding: window.innerWidth <= 480 ? '2.5rem 0' : '4rem 0', backgroundColor: '#f9f9f9'}}>
        <div className="container">
          <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
            <h2 style={{fontSize: window.innerWidth <= 480 ? '1.8rem' : '2.5rem', marginBottom: '2rem', color: '#B88E2F'}}>Visit Our Showroom</h2>
            <p style={{fontSize: window.innerWidth <= 480 ? '1rem' : '1.2rem', lineHeight: '1.8', color: '#666', marginBottom: '2rem'}}>
              Experience our furniture collection in person at our beautiful showroom. Our design experts are 
              available to help you find the perfect pieces for your space.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)', gap: '2rem', marginTop: '3rem'}}>
              <div style={{textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🏢</div>
                <h3 style={{color: '#B88E2F', marginBottom: '1rem'}}>Main Showroom</h3>
                <p style={{color: '#666'}}>400 University Drive Suite 200<br/>Coral Gables, FL 33134</p>
              </div>
              <div style={{textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🚚</div>
                <h3 style={{color: '#B88E2F', marginBottom: '1rem'}}>Free Delivery</h3>
                <p style={{color: '#666'}}>Free delivery within 50 miles<br/>for orders over $500</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;