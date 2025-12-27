import { useState, useEffect } from 'react'
import CloudinaryImage from './CloudinaryImage'

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ email: '', phone: '' });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

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

  const openInquiryModal = (product) => {
    setSelectedProduct(product);
    setShowInquiryModal(true);
  };

  const closeInquiryModal = () => {
    setShowInquiryModal(false);
    setSelectedProduct(null);
    setInquiryForm({ email: '', phone: '' });
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  const openImageModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImageIndex(0);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct._id,
          customerEmail: inquiryForm.email,
          customerPhone: inquiryForm.phone
        })
      });
      
      if (response.ok) {
        alert('Inquiry submitted successfully! We will contact you soon.');
        closeInquiryModal();
      } else {
        alert('Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      alert('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div style={{paddingTop: '70px', minHeight: '100vh', background: '#f9f9f9'}}>
      {/* Header */}
      <div style={{background: '#B88E2F', color: 'white', padding: window.innerWidth <= 480 ? '1.5rem 0' : '2rem 0', textAlign: 'center'}}>
        <h1 style={{margin: 0, fontSize: window.innerWidth <= 480 ? '1.8rem' : window.innerWidth <= 768 ? '2rem' : '2.5rem'}}>Our Products</h1>
        <p style={{margin: '0.5rem 0 0 0', fontSize: window.innerWidth <= 480 ? '0.95rem' : '1.1rem'}}>Discover our beautiful furniture collection</p>
      </div>

      <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: window.innerWidth <= 480 ? '1rem' : window.innerWidth <= 768 ? '1.5rem' : '2rem'}}>
        {/* Category Buttons */}
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: window.innerWidth <= 480 ? '1rem' : '1.5rem', gap: window.innerWidth <= 480 ? '0.3rem' : '0.5rem', flexWrap: 'wrap'}}>
          <button 
            onClick={() => setSelectedCategory('All')}
            style={{
              padding: window.innerWidth <= 480 ? '0.4rem 0.8rem' : '0.5rem 1rem', 
              border: 'none', borderRadius: '20px', cursor: 'pointer',
              backgroundColor: selectedCategory === 'All' ? '#B88E2F' : '#f5f5f5',
              color: selectedCategory === 'All' ? 'white' : '#333',
              transition: 'all 0.3s', fontSize: window.innerWidth <= 480 ? '0.8rem' : '0.9rem'
            }}
          >
            All
          </button>
          {(Array.isArray(categories) ? categories : []).map(category => (
            <button 
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              style={{
                padding: window.innerWidth <= 480 ? '0.4rem 0.8rem' : '0.5rem 1rem', 
                border: 'none', borderRadius: '20px', cursor: 'pointer',
                backgroundColor: selectedCategory === category.name ? '#B88E2F' : '#f5f5f5',
                color: selectedCategory === category.name ? 'white' : '#333',
                transition: 'all 0.3s', fontSize: window.innerWidth <= 480 ? '0.8rem' : '0.9rem'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Search Bar and Filter */}
        <div style={{marginBottom: window.innerWidth <= 480 ? '1.5rem' : '2rem', display: 'flex', justifyContent: 'center', alignItems: window.innerWidth <= 768 ? 'stretch' : 'center', gap: window.innerWidth <= 768 ? '0.5rem' : '1rem', flexDirection: window.innerWidth <= 768 ? 'column' : 'row'}}>
          <div style={{position: 'relative', width: '100%', maxWidth: '600px'}}>
            <input
              type="text"
              placeholder="Search products by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchTerm === '/admin') {
                  window.open('https://furniture-b-pied.vercel.app/admin', '_blank');
                  setSearchTerm('');
                }
              }}
              style={{
                width: '100%', 
                padding: window.innerWidth <= 480 ? '0.8rem 2.5rem 0.8rem 0.8rem' : '1rem 3rem 1rem 1rem', 
                border: '2px solid #B88E2F',
                borderRadius: window.innerWidth <= 480 ? '25px' : '50px', 
                fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem', 
                outline: 'none',
                boxShadow: '0 4px 15px rgba(184, 142, 47, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 6px 20px rgba(184, 142, 47, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '0 4px 15px rgba(184, 142, 47, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
            <div style={{
              position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
              color: '#B88E2F', fontSize: '1.2rem', pointerEvents: 'none'
            }}>
              🔍
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute', right: '3rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#999', cursor: 'pointer',
                  fontSize: '1.2rem', padding: '0.2rem'
                }}
              >
                ×
              </button>
            )}
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start'}}>
            <label style={{fontWeight: 'bold', color: '#333', whiteSpace: 'nowrap'}}>Filter by:</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: window.innerWidth <= 480 ? '0.6rem 0.8rem' : '0.75rem 1rem', 
                border: '2px solid #B88E2F', borderRadius: '25px',
                backgroundColor: 'white', color: '#333', cursor: 'pointer', 
                fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem',
                minWidth: window.innerWidth <= 480 ? '150px' : '180px', 
                outline: 'none'
              }}
            >
              <option value="All">All Categories</option>
              {(Array.isArray(categories) ? categories : []).map(category => (
                <option key={category.name} value={category.name}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {loading ? (
          <div style={{textAlign: 'center', padding: window.innerWidth <= 480 ? '2rem' : '4rem'}}>Loading products...</div>
        ) : (
          <div className="product-grid" style={{display: 'grid', gridTemplateColumns: window.innerWidth <= 480 ? '1fr' : window.innerWidth <= 768 ? 'repeat(auto-fill, minmax(200px, 1fr))' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: window.innerWidth <= 480 ? '1rem' : window.innerWidth <= 768 ? '1.5rem' : '2rem'}}>
            {products.length > 0 ? products
              .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
              .filter(product => 
                searchTerm === '' || 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => {
              const calculatedDiscount = product.originalPrice && product.originalPrice > product.price 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              
              return (
              <div key={product._id} className="product-card">
                <div className="product-image" onClick={() => openProductModal(product)} style={{cursor: 'pointer'}}>
                  <CloudinaryImage 
                    src={product.images && product.images.length > 0 
                      ? product.images[0]
                      : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop'
                    } 
                    alt={product.name}
                    width={300}
                    height={300}
                  />
                  {calculatedDiscount > 0 && <span className="discount">-{calculatedDiscount}%</span>}
                  {product.isNew && <span className="badge new">New</span>}
                  <div className="product-overlay">
                    <button className="inquire-btn" onClick={(e) => {e.stopPropagation(); openInquiryModal(product)}}>Inquire about product</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p style={{fontSize: '0.8rem', color: '#999', margin: '0.25rem 0'}}>ID: {product.productId}</p>
                  <p>{product.description}</p>
                  <div className="price">
                    <span className="current">₹{product.price}</span>
                    {product.originalPrice && <span className="original">₹{product.originalPrice}</span>}
                  </div>
                </div>
              </div>
              );
            }) : (
              <div style={{textAlign: 'center', padding: window.innerWidth <= 480 ? '2rem 1rem' : '4rem', gridColumn: '1 / -1'}}>
                {selectedCategory === 'All' 
                  ? 'No products available. Add products through the admin panel.'
                  : `No products found in ${selectedCategory} category.`
                }
              </div>
            )}
          </div>
        )}
      </div>

      {/* All modals from original App.jsx */}
      {showProductModal && selectedProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '2rem', borderRadius: '10px',
            maxWidth: '1000px', width: '95%', maxHeight: '95vh', overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#B88E2F' }}>{selectedProduct.name}</h2>
              <button onClick={closeProductModal} style={{
                background: 'none', border: 'none', fontSize: '1.5rem',
                cursor: 'pointer', color: '#666'
              }}>×</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  {selectedProduct.images.map((image, index) => (
                    <CloudinaryImage 
                      key={index}
                      src={image}
                      alt={`${selectedProduct.name} ${index + 1}`}
                      width={200}
                      height={200}
                      onClick={() => openImageModal(index)}
                      style={{
                        width: '100%', height: '200px', objectFit: 'cover',
                        borderRadius: '8px', cursor: 'pointer',
                        border: index === (selectedProduct.mainImageIndex || 0) ? '3px solid #B88E2F' : '2px solid #ddd',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>Product ID: {selectedProduct.productId}</p>
                <p style={{ margin: '0 0 1rem 0', color: '#666', lineHeight: '1.6' }}>{selectedProduct.description}</p>
                <div style={{ margin: '1rem 0' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#B88E2F' }}>₹{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span style={{ marginLeft: '10px', textDecoration: 'line-through', color: '#999' }}>₹{selectedProduct.originalPrice}</span>
                  )}
                </div>
                <p style={{ margin: '0.5rem 0', color: '#666' }}>Category: {selectedProduct.category}</p>
                {selectedProduct.isNew && <p style={{ color: 'green', fontWeight: 'bold' }}>NEW PRODUCT</p>}
                
                <button
                  onClick={() => {closeProductModal(); openInquiryModal(selectedProduct)}}
                  style={{
                    width: '100%', padding: '1rem', backgroundColor: '#B88E2F',
                    color: 'white', border: 'none', borderRadius: '5px',
                    fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem'
                  }}
                >
                  Inquire About This Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImageModal && selectedProduct && (
        <div onClick={closeImageModal} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1100
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            position: 'relative', maxWidth: '90vw', maxHeight: '90vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <button onClick={closeImageModal} style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'rgba(255,255,255,0.8)', border: 'none',
              borderRadius: '50%', width: '40px', height: '40px',
              fontSize: '1.5rem', cursor: 'pointer', zIndex: 1102
            }}>×</button>
            
            {selectedProduct.images.length > 1 && (
              <>
                <button onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : selectedProduct.images.length - 1)} style={{
                  position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.8)', border: 'none',
                  borderRadius: '50%', width: '50px', height: '50px',
                  fontSize: '1.5rem', cursor: 'pointer', zIndex: 1102
                }}>‹</button>
                
                <button onClick={() => setSelectedImageIndex(selectedImageIndex < selectedProduct.images.length - 1 ? selectedImageIndex + 1 : 0)} style={{
                  position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.8)', border: 'none',
                  borderRadius: '50%', width: '50px', height: '50px',
                  fontSize: '1.5rem', cursor: 'pointer', zIndex: 1102
                }}>›</button>
              </>
            )}
            
            <CloudinaryImage 
              src={selectedProduct.images[selectedImageIndex]}
              alt={`${selectedProduct.name} ${selectedImageIndex + 1}`}
              width={800}
              height={600}
              style={{
                maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
                borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
            />
            
            <div style={{
              position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px 20px',
              borderRadius: '20px', fontSize: '0.9rem'
            }}>
              {selectedImageIndex + 1} / {selectedProduct.images.length}
            </div>
          </div>
        </div>
      )}

      {showSearchModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, paddingTop: '10vh'
        }}>
          <div style={{
            backgroundColor: 'white', padding: '2rem', borderRadius: '10px',
            maxWidth: '500px', width: '90%'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#B88E2F' }}>Search Products</h2>
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
                width: '100%', padding: '1rem', border: '2px solid #B88E2F',
                borderRadius: '5px', fontSize: '1rem', marginBottom: '1rem'
              }}
              autoFocus
            />
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowSearchModal(false)}
                style={{
                  flex: 1, padding: '0.75rem', backgroundColor: '#B88E2F',
                  color: 'white', border: 'none', borderRadius: '5px',
                  fontSize: '1rem', cursor: 'pointer'
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
                  flex: 1, padding: '0.75rem', backgroundColor: '#6c757d',
                  color: 'white', border: 'none', borderRadius: '5px',
                  fontSize: '1rem', cursor: 'pointer'
                }}
              >
                Clear & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showInquiryModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '2rem', borderRadius: '10px',
            maxWidth: '500px', width: '90%', maxHeight: '80vh', overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#B88E2F' }}>Product Inquiry</h2>
              <button onClick={closeInquiryModal} style={{
                background: 'none', border: 'none', fontSize: '1.5rem',
                cursor: 'pointer', color: '#666'
              }}>×</button>
            </div>
            
            {selectedProduct && (
              <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{selectedProduct.name}</h3>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>Product ID: {selectedProduct.productId}</p>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{selectedProduct.description}</p>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#B88E2F' }}>Price: ₹{selectedProduct.price}</p>
              </div>
            )}
            
            <form onSubmit={handleInquirySubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email Address:</label>
                <input
                  type="email"
                  required
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                  style={{
                    width: '100%', padding: '0.75rem', border: '1px solid #ddd',
                    borderRadius: '5px', fontSize: '1rem'
                  }}
                  placeholder="Enter your email address"
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone Number:</label>
                <input
                  type="tel"
                  required
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                  style={{
                    width: '100%', padding: '0.75rem', border: '1px solid #ddd',
                    borderRadius: '5px', fontSize: '1rem'
                  }}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1, padding: '0.75rem', backgroundColor: '#B88E2F',
                    color: 'white', border: 'none', borderRadius: '5px',
                    fontSize: '1rem', cursor: 'pointer'
                  }}
                >
                  Submit Inquiry
                </button>
                <button
                  type="button"
                  onClick={closeInquiryModal}
                  style={{
                    flex: 1, padding: '0.75rem', backgroundColor: '#6c757d',
                    color: 'white', border: 'none', borderRadius: '5px',
                    fontSize: '1rem', cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Shop