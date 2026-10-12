
import { useCallback, useState } from 'react';
import {
  Search,
  BookOpen,
  Heart,
  Menu,
  X,
  ArrowRight,
  Star,
  Moon,
  Sun,
} from 'lucide-react';

import './App.css';
import { books } from './data/books';
import Favorites from './components/Favorites/Favorites';
import BookDetailsModal from './components/BookDetailsModal/BookDetailsModal';
import { useFavorites } from './hooks/useFavorites';
import AuthPage from './components/Auth/AuthPage';
import ReadingList from './components/ReadingList/ReadingList';
import { useReadingList } from './hooks/useReadingList';
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [search, setSearch] = useState('');
  const { favorites, toggleFavorite } = useFavorites();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showReadingList, setShowReadingList] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const {readingList,
          setBookStatus,
        } = useReadingList();

  const categories = [
    'All',
    ...new Set(books.map((book) => book.category)),
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = `${book.title} ${book.author} ${book.category}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const favoriteBooks = books.filter((book) =>
    favorites.includes(book.id)
  );

  const closeBookModal = useCallback(() => {
    setSelectedBook(null);
  }, []);
  
  function handleAuthSuccess(user) {
    setCurrentUser(user);
    setAuthMode(null);
    setShowFavorites(false);
    setShowReadingList(false);
    setShowDashboard(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  function showExplore() {
    setShowDashboard(false);
    setShowFavorites(false);
    setShowReadingList(false);
    setMenuOpen(false);
  }

  function openFavorites() {
    setShowFavorites(true);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleReadingStatusChange(bookId, status) {
    setBookStatus(bookId, status || null);
  }
  
function handleSignOut() {
  setCurrentUser(null);
  setShowDashboard(false);
  setShowFavorites(false);
  setShowReadingList(false);
  setAuthMode(null);
  setMenuOpen(false);
}

  
  function openDashboard() {
    if (!currentUser) {
      setAuthMode("signin");
      setShowDashboard(false);
      setShowFavorites(false);
      setShowReadingList(false);
      setMenuOpen(false);
      return;
    }

    setShowDashboard(true);
    setShowFavorites(false);
    setShowReadingList(false);
    setAuthMode(null);
    setMenuOpen(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="navbar">
        <a
          href="#home"
          className="brand"
          onClick={showExplore}
        >
          <span className="brand-icon">
            <BookOpen size={23} />
          </span>
          <span>
            AR <strong>Library</strong>
          </span>
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a
            href="#home"
            onClick={showExplore}
          >
            Home
          </a>

          {currentUser && (
            <a
              href="#dashboard"
              onClick={(event) => {
                event.preventDefault();
                openDashboard();
              }}
            >
              Dashboard
            </a>
          )}


          <a
            href="#books"
            onClick={showExplore}
          >
            Explore Books
          </a>

          <a
            href="#last-one"
            onClick={showExplore}
          >
            About
          </a>

          <a
            href="#favorites"
            onClick={(event) => {
              event.preventDefault();
              openFavorites();
            }}
          >
            Favorites ({favorites.length})
          </a>
          <a
            href="#reading-list"
            onClick={(event) => {
              event.preventDefault();
              setShowFavorites(false);
              setShowReadingList(true);
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            My Reading List
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-button"
            onClick={() => setDarkMode((dark) => !dark)}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {currentUser ? (
            <button
              className="login-button"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="login-button"
              onClick={() => setAuthMode('signin')}
            >
              Sign In <ArrowRight size={16} />
            </button>
          )}
        </div>
      </header>

      <main>
        
      {authMode ? (
          <AuthPage
            mode={authMode}
            onModeChange={setAuthMode}
            onBack={() => setAuthMode(null)}
            onSuccess={handleAuthSuccess}
          />
        ) : showFavorites ? (
          <Favorites
            books={favoriteBooks}
            onBack={() => {
              setShowFavorites(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewDetails={setSelectedBook}
            onToggleFavorite={toggleFavorite}
          />
        ): showReadingList ? (
          <ReadingList
            books={books}
            readingList={readingList}
            onBack={() => setShowReadingList(false)}
            onStatusChange={handleReadingStatusChange}
            onViewDetails={setSelectedBook}
          />
        ) : showDashboard && currentUser ? (
          <Dashboard
            books={books}
            favorites={favorites}
            readingList={readingList}
            onExplore={showExplore}
            onViewDetails={setSelectedBook}
          />
        ): (
          <>
            <section className="hero" id="home">
              <div className="hero-content">
                <span className="eyebrow">
                  <Star size={15} fill="currentColor" />
                  YOUR NEXT CHAPTER STARTS HERE
                </span>

                <h1>
                  A World of Books
                  <span>Awaits You.</span>
                </h1>

                <p className="hero-description">
                  Discover stories, explore new ideas, and find your next
                  favorite read. Your personal library is just a page away.
                </p>

                <form
                  className="hero-search"
                  onSubmit={(event) => {
                    event.preventDefault();
                    document.getElementById('books')?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  <Search size={21} />

                  <input
                    type="search"
                    placeholder="Search books, authors, categories..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />

                  <button type="submit">Search</button>
                </form>

                <div className="hero-trust">
                  <div className="avatar-stack">
                    <span>A</span>
                    <span>R</span>
                    <span>L</span>
                    <span>+</span>
                  </div>

                  <p>
                    <strong>Explore your curiosity</strong>
                    <br />
                    One book at a time
                  </p>
                </div>
              </div>

              <div className="hero-art">
                <div className="art-glow" />

                <div className="floating-note note-top">
                  ✦ Find your next favorite
                </div>

                <div className="hero-book hero-book-one">
                  <span>THE ART OF</span>
                  <strong>Reading</strong>
                  <small>Discover something new</small>
                </div>

                <div className="hero-book hero-book-two">
                  <span>YOUR NEXT</span>
                  <strong>Chapter</strong>
                  <small>Starts right here</small>
                </div>

                <div className="hero-book hero-book-three">
                  <span>IMAGINE</span>
                  <strong>More</strong>
                  <small>Dream · Learn · Grow</small>
                </div>

                <div className="floating-note note-bottom">
                  ♡ Made for book lovers
                </div>

                <div className="art-sparkle sparkle-one">✦</div>
                <div className="art-sparkle sparkle-two">✧</div>
              </div>
            </section>

            <section className="stats" id="about">
              <div className="stat-item">
                <span className="stat-icon purple">
                  <BookOpen />
                </span>
                <div>
                  <strong>Explore</strong>
                  <p>Books for every mood</p>
                </div>
              </div>

              <div className="stat-item">
                <span className="stat-icon blue">
                  <Heart />
                </span>
                <div>
                  <strong>Your Favorites</strong>
                  <p>Save books you love</p>
                </div>
              </div>

              <div className="stat-item">
                <span className="stat-icon pink">
                  <Star />
                </span>
                <div>
                  <strong>Find Inspiration</strong>
                  <p>Stories that stay with you</p>
                </div>
              </div>
            </section>

            <section className="books-section" id="books">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">
                    HANDPICKED FOR YOU
                  </span>

                  <h2>
                    Popular <span>Books</span>
                  </h2>

                  <p>
                    Explore stories readers can't stop talking about.
                  </p>
                </div>

                <span className="book-count">
                  {filteredBooks.length} books
                </span>
              </div>

              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-chip ${
                      selectedCategory === category ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}

                    {category === 'All' && (
                      <span className="category-total">
                        {books.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
             
      <div className="books-grid">
        {filteredBooks.map((book) => (
          <article className="book-card" key={book.id}>
            <div className={`book-cover ${book.color}`}>
              <img
                src={book.cover}
                alt={`Cover of ${book.title}`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <button
                className={`favorite-button ${
                  favorites.includes(book.id) ? "is-favorite" : ""
                }`}
                onClick={() => toggleFavorite(book.id)}
                aria-label={`Toggle favorite for ${book.title}`}
              >
                <Heart
                  size={18}
                  fill={
                    favorites.includes(book.id) ? "currentColor" : "none"
                  }
                />
              </button>

              <span className="cover-category">{book.category}</span>
            </div>

            <div className="book-info">
              <div className="book-rating">
                <Star size={14} fill="currentColor" />
                {book.rating.toFixed(1)}
              </div>

              <h3>{book.title}</h3>

              <p className="book-author">By {book.author}</p>

              <p className="book-description">{book.description}</p>

              {/* Reading List dropdown */}
              <select
                className="reading-status-select"
                value={readingList[book.id] || ""}
                onChange={(event) =>
                  handleReadingStatusChange(book.id, event.target.value)
                }
                aria-label={`Reading status for ${book.title}`}
              >
                <option value="">+ Add to Reading List</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                className="details-button"
                onClick={() => setSelectedBook(book)}
              >
                View Details <ArrowRight size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>


              {filteredBooks.length === 0 && (
                <div className="empty-state">
                  <Search size={32} />
                  <h3>No books found</h3>
                  <p>Try another title, author, or category.</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <BookDetailsModal
        book={selectedBook}
        onClose={closeBookModal}
      />

      <footer className="footer" id='last-one'>
        <a
          href="#home"
          className="brand"
          onClick={showExplore}
        >
          <span className="brand-icon">
            <BookOpen size={21} />
          </span>
          <span>
            AR <strong>Library</strong>
          </span>
        </a>

        <p>Discover • Read • Grow</p>

        <span>© {new Date().getFullYear()} AR Library</span>
      </footer>
    </div>
  );
}

export default App;
