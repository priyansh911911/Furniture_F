import { useState, useEffect } from 'react';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', originalPrice: '', category: '', discount: '', isNew: false, mainImageIndex: 0
  });
  const [categoryFormData, setCategoryFormData] = useState({ name: '' });
  const [images, setImages] = useState([null, null, null, null]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: 'admin@furniture.com', password: 'admin123' });
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      loadProducts();
      loadCategories();
      loadInquiries();
      loadContacts();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      
      const data = await response.json();
      if (response.ok) {
        const authToken = data.token || 'admin-token';
        setToken(authToken);
        localStorage.setItem('adminToken', authToken);
        setIsAuthenticated(true);
        loadProducts();
        loadCategories();
        loadInquiries();
        loadContacts();
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const authHeaders = () => ({
    'Authorization': `Bearer ${token}`
  });

  const loadProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const loadContacts = async () => {
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        headers: authHeaders()
      });
      const data = await response.json();
      setContacts(data || []);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    }
  };

  const loadInquiries = async () => {
    try {
      const response = await fetch(`${API_BASE}/inquiries`, {
        headers: authHeaders()
      });
      const data = await response.json();
      setInquiries(data || []);
    } catch (error) {
      console.error('Failed to load inquiries:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/categories`);
      const data = await response.json();
      setCategories(data || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'mainImageIndex') {
        formDataObj.append(key, formData[key]);
      }
    });
    formDataObj.append('mainImageIndex', formData.mainImageIndex);
    
    // Send images with their slot indices
    images.forEach((image, index) => {
      if (image) {
        formDataObj.append('images', image);
        formDataObj.append('imageSlots', index); // Track which slot each image belongs to
      }
    });

    try {
      const url = editingProduct ? `${API_BASE}/products/${editingProduct._id}` : `${API_BASE}/products`;
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: authHeaders(),
        body: formDataObj
      });

      if (response.ok) {
        alert(editingProduct ? 'Product updated!' : 'Product added!');
        resetForm();
        loadProducts();
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      alert('Error saving product');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', originalPrice: '', category: '', discount: '', isNew: false, mainImageIndex: 0 });
    setImages([null, null, null, null]);
    setEditingProduct(null);
  };

  const editProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      discount: product.discount || '',
      isNew: product.isNew,
      mainImageIndex: 0
    });
    setImages([null, null, null, null]); // Reset file inputs but keep existing images in product
    setEditingProduct(product);
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/products/${id}`, { 
        method: 'DELETE',
        headers: authHeaders()
      });
      if (response.ok) {
        loadProducts();
        alert('Product deleted!');
      }
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = editingCategory ? `${API_BASE}/categories/${editingCategory._id}` : `${API_BASE}/categories`;
      const method = editingCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryFormData)
      });

      if (response.ok) {
        alert(editingCategory ? 'Category updated!' : 'Category added!');
        resetCategoryForm();
        loadCategories();
      } else {
        alert('Failed to save category');
      }
    } catch (error) {
      alert('Error saving category');
    }
    setLoading(false);
  };

  const resetCategoryForm = () => {
    setCategoryFormData({ name: '' });
    setEditingCategory(null);
  };

  const editCategory = (category) => {
    setCategoryFormData({ name: category.name });
    setEditingCategory(category);
  };

  const deleteCategory = async (id) => {
    if (!confirm('Delete this category?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/categories/${id}`, { 
        method: 'DELETE',
        headers: authHeaders()
      });
      if (response.ok) {
        loadCategories();
        alert('Category deleted!');
      }
    } catch (error) {
      alert('Failed to delete category');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '2rem auto' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#B88E2F', marginBottom: '2rem', textAlign: 'center' }}>🪑 Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email:</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                required
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password:</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                required
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
              />
            </div>
            <button 
              type="submit"
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                backgroundColor: '#B88E2F', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: window.innerWidth <= 768 ? '1rem' : '2rem', maxWidth: '1200px', margin: '0 auto', marginTop: window.innerWidth <= 768 ? '70px' : '80px', paddingBottom: '200px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#B88E2F', fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', margin: 0 }}>🪑 Admin Panel</h1>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('products')}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: activeTab === 'products' ? '#B88E2F' : '#f5f5f5',
            color: activeTab === 'products' ? 'white' : '#333',
            border: 'none', borderRadius: '5px', cursor: 'pointer'
          }}
        >
          Products
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: activeTab === 'categories' ? '#B88E2F' : '#f5f5f5',
            color: activeTab === 'categories' ? 'white' : '#333',
            border: 'none', borderRadius: '5px', cursor: 'pointer'
          }}
        >
          Categories
        </button>
        <button 
          onClick={() => setActiveTab('inquiries')}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: activeTab === 'inquiries' ? '#B88E2F' : '#f5f5f5',
            color: activeTab === 'inquiries' ? 'white' : '#333',
            border: 'none', borderRadius: '5px', cursor: 'pointer'
          }}
        >
          Inquiries
        </button>
        <button 
          onClick={() => setActiveTab('contacts')}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: activeTab === 'contacts' ? '#B88E2F' : '#f5f5f5',
            color: activeTab === 'contacts' ? 'white' : '#333',
            border: 'none', borderRadius: '5px', cursor: 'pointer'
          }}
        >
          Contact Us
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <div style={{ backgroundColor: 'white', padding: window.innerWidth <= 768 ? '1rem' : '2rem', borderRadius: '10px', marginBottom: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem', marginBottom: '1rem' }}>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '1rem', minHeight: '80px', boxSizing: 'border-box' }}
              />
              
              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="number"
                  placeholder="Original Price (optional)"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                  style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
                />
                <input
                  type="number"
                  placeholder="Discount % (optional)"
                  value={formData.discount}
                  onChange={(e) => setFormData({...formData, discount: e.target.value})}
                  style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                  style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Product Images (up to 4)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '1rem' }}>
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{ position: 'relative', border: formData.mainImageIndex === i ? '2px solid #B88E2F' : '1px solid #ddd', borderRadius: '5px', padding: '0.5rem' }}>
                      {editingProduct?.images?.[i] && (
                        <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                          <img 
                            src={editingProduct.images[i]} 
                            alt={`Product ${i+1}`}
                            style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
                          />
                          <span style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 4px', borderRadius: '3px', fontSize: '10px' }}>Current</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const newImages = [...images];
                          newImages[i] = e.target.files[0];
                          setImages(newImages);
                        }}
                        style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box', fontSize: window.innerWidth <= 768 ? '0.8rem' : '1rem' }}
                      />
                      <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="radio"
                          name="mainImage"
                          checked={formData.mainImageIndex === i}
                          onChange={() => setFormData({...formData, mainImageIndex: i})}
                          id={`main-${i}`}
                          style={{ cursor: 'pointer' }}
                        />
                        <label htmlFor={`main-${i}`} style={{ fontSize: '0.8rem', color: '#666', cursor: 'pointer' }}>Main</label>
                      </div>
                      <small style={{ color: '#666', fontSize: '0.8rem', display: 'block' }}>{editingProduct?.images?.[i] ? 'Replace image' : 'Add image'}</small>
                      {formData.mainImageIndex === i && <small style={{ color: '#B88E2F', fontSize: '0.8rem', fontWeight: 'bold' }}>★ Main Image</small>}
                    </div>
                  ))}
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                />
                Mark as New
              </label>

              <div style={{ display: 'flex', gap: '1rem', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    backgroundColor: '#B88E2F', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    width: window.innerWidth <= 768 ? '100%' : 'auto'
                  }}
                >
                  {loading ? 'Saving...' : (editingProduct ? 'Update' : 'Add')} Product
                </button>
                {editingProduct && (
                  <button 
                    type="button" 
                    onClick={resetForm}
                    style={{ 
                      padding: '0.75rem 1.5rem', 
                      backgroundColor: '#dc3545', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px', 
                      cursor: 'pointer',
                      width: window.innerWidth <= 768 ? '100%' : 'auto'
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div style={{ backgroundColor: 'white', padding: window.innerWidth <= 768 ? '1rem' : '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem', marginBottom: '1rem' }}>Products ({products.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 480 ? '1fr' : window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginBottom: '100px' }}>
              {products.map(product => (
                <div key={product._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
                  {product.images?.[0] && (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px', marginBottom: '0.5rem' }}
                    />
                  )}
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem' }}>{product.name}</h3>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: window.innerWidth <= 768 ? '0.8rem' : '0.9rem' }}>{product.description}</p>
                  <p style={{ margin: '0 0 1rem 0', fontWeight: 'bold', color: '#B88E2F' }}>₹{product.price}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexDirection: window.innerWidth <= 480 ? 'column' : 'row' }}>
                    <button 
                      onClick={() => editProduct(product)}
                      style={{ 
                        flex: 1, 
                        padding: '0.5rem', 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '3px', 
                        cursor: 'pointer',
                        fontSize: window.innerWidth <= 768 ? '0.8rem' : '1rem'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteProduct(product._id)}
                      style={{ 
                        flex: 1, 
                        padding: '0.5rem', 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '3px', 
                        cursor: 'pointer',
                        fontSize: window.innerWidth <= 768 ? '0.8rem' : '1rem'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inquiries' && (
        <div>
          <div style={{ backgroundColor: 'white', padding: window.innerWidth <= 768 ? '1rem' : '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem', marginBottom: '1rem' }}>Product Inquiries ({inquiries.length})</h2>
            {inquiries.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No product inquiries yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '200px' }}>
                {inquiries.map(inquiry => (
                  <div key={inquiry._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', backgroundColor: '#f9f9f9' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#B88E2F' }}>Customer Details</h4>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}><strong>Email:</strong> {inquiry.customerEmail}</p>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}><strong>Phone:</strong> {inquiry.customerPhone}</p>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#666' }}><strong>Date:</strong> {new Date(inquiry.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#B88E2F' }}>Product Details</h4>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}><strong>Product:</strong> {inquiry.productDbId?.name || inquiry.productName || 'Product not found'}</p>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}><strong>Price:</strong> ₹{inquiry.productDbId?.price || 'N/A'}</p>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#666' }}><strong>ID:</strong> {inquiry.productDbId?.productId || inquiry.productId || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div>
          <div style={{ backgroundColor: 'white', padding: window.innerWidth <= 768 ? '1rem' : '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem', marginBottom: '1rem' }}>Contact Form Submissions ({contacts.length})</h2>
            {contacts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No contact form submissions yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '200px' }}>
                {contacts.map(contact => (
                  <div key={contact._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', backgroundColor: '#fff3cd' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#B88E2F' }}>Contact Details</h4>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}><strong>Name:</strong> {contact.name}</p>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}><strong>Email:</strong> {contact.email}</p>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}><strong>Phone:</strong> {contact.phone}</p>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#666' }}><strong>Date:</strong> {new Date(contact.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#B88E2F' }}>Message</h4>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', lineHeight: '1.4' }}>{contact.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div>
          <div style={{ backgroundColor: 'white', padding: window.innerWidth <= 768 ? '1rem' : '2rem', borderRadius: '10px', marginBottom: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem', marginBottom: '1rem' }}>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleCategorySubmit}>
              <div style={{ display: 'flex', gap: '1rem', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData({...categoryFormData, name: e.target.value})}
                  required
                  style={{ flex: 1, padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
                />
                <button 
                  type="submit"
                  disabled={loading}
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    backgroundColor: '#B88E2F', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    width: window.innerWidth <= 768 ? '100%' : 'auto'
                  }}
                >
                  {loading ? 'Saving...' : (editingCategory ? 'Update' : 'Add')} Category
                </button>
                {editingCategory && (
                  <button 
                    type="button" 
                    onClick={resetCategoryForm}
                    style={{ 
                      padding: '0.75rem 1.5rem', 
                      backgroundColor: '#dc3545', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px', 
                      cursor: 'pointer',
                      width: window.innerWidth <= 768 ? '100%' : 'auto'
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div style={{ backgroundColor: 'white', padding: window.innerWidth <= 768 ? '1rem' : '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem', marginBottom: '1rem' }}>Categories ({categories.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 480 ? '1fr' : window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginBottom: '200px' }}>
              {categories.map(category => (
                <div key={category.name} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem' }}>{category.name}</h3>
                  <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: window.innerWidth <= 768 ? '0.8rem' : '1rem' }}>Products: {category.count}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexDirection: window.innerWidth <= 480 ? 'column' : 'row' }}>
                    <button 
                      onClick={() => editCategory(category)}
                      style={{ 
                        flex: 1, 
                        padding: '0.5rem', 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '3px', 
                        cursor: 'pointer',
                        fontSize: window.innerWidth <= 768 ? '0.8rem' : '1rem'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteCategory(category._id || category.name)}
                      style={{ 
                        flex: 1, 
                        padding: '0.5rem', 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '3px', 
                        cursor: 'pointer',
                        fontSize: window.innerWidth <= 768 ? '0.8rem' : '1rem'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;