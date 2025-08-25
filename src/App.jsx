import { useState, useEffect } from 'react';
import './global.css'; 


const products = [
  {
    id: 1,
    title: 'Gato Que Ri',
    price: 79.99,
    rating: 4.8,
    tag: 'Novo',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRofBH0p4nBU-iwS8s8pK9sv2Tct_yJeKivQ&s"
  },
  {
    id: 2,
    title: 'Flash',
    price: 59.50,
    rating: 4.5,
    tag: 'Promo',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiK2gWd6kgpiWoTMopzxPeI-xE7YqeQ6qp_g&s",
  },
  {
    id: 3,
    title: 'Friends',
    price: 89.90,
    rating: 4.7,
    tag: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1yZ6-YOVUwGz4x7VkEA9EqiY9TVKZ3FQAvg&s',
  },
  {
    id: 4,
    title: 'Hello Kitty',
    price: 90.00,
    rating: 4.6,
    tag: 'Novo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ07ByEuw92XwpTXperRVkO2hFsjUpxYyD_nw&s',
  },
  {
    id: 5,
    title: 'Rosquinha',
    price: 99.90,
    rating: 4.3,
    tag: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1qKbMFvPwfVwmKdHWBCiHOzbwrKpSgznQg&s',
  },
  {
    id: 6,
    title: 'Friends Forever',
    price: 75.00,
    rating: 4.9,
    tag: 'Promo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZlHtIWXQcWyc6reyYk0plaxjlFeLl9R85Rg&s',
  },
];


const Button = ({ children, variant = 'solid', disabled, ...props }) => {
  return (
    <button
      className={`button button--${variant} ${disabled ? 'button--disabled' : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};


const Navbar = ({ isDarkMode, onToggleTheme, cartCount }) => {
  return (
    <nav className="navbar">
      <div className="container navbar__content">
        <div className="navbar__logo">Mini Loja com CSS Global</div>
        <div className="navbar__actions">
          <button
            onClick={onToggleTheme}
            className="navbar__theme-toggle"
            aria-label="Alternar tema claro/escuro"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="icon--light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="icon--dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <span className="navbar__cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon--cart" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.157 1.622.724 1.622h10.456c.881 0 1.411-.992.724-1.622L15 13m-6 4a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <span className="navbar__cart-badge">{cartCount}</span>
          </span>
        </div>
      </div>
    </nav>
  );
};


const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card__image"></div>
    <div className="skeleton-card__title"></div>
    <div className="skeleton-card__price"></div>
    <div className="skeleton-card__rating"></div>
    <div className="skeleton-card__button"></div>
  </div>
);


const ProductCard = ({ product, onAddToCart }) => {
  const { title, price, rating, tag, image } = product;


  const fullStars = '★'.repeat(Math.max(0, Math.floor(rating)));
  const emptyStars = '☆'.repeat(Math.max(0, 5 - Math.floor(rating)));

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-card__image" loading="lazy" />
      <div className="product-card__content">
        {tag && (
          <span className={`product-card__tag product-card__tag--${tag.toLowerCase()}`}>
            {tag}
          </span>
        )}
        <h3 className="product-card__title" title={title}>{title}</h3>
        <p className="product-card__price">R$ {price.toFixed(2)}</p>
        <div className="product-card__rating">
          <span>
            {fullStars}
            {emptyStars}
          </span>
          <span className="product-card__rating-value">{rating.toFixed(1)}</span>
        </div>
        <Button variant="solid" onClick={onAddToCart}>Comprar</Button>
      </div>
    </div>
  );
};


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }


    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);


  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} cartCount={cartCount} />
      <main className="container main-content">
        {isLoading ? (
          <div className="product-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}