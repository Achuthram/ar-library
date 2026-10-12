
import { Heart, BookOpen, BookMarked, CheckCircle } from "lucide-react";
import "./Dashboard.css";

export default function Dashboard({
  books,
  favorites,
  readingList,
  onExplore,
  onViewDetails,
}) {
  const favoriteBooks = books.filter((book) =>
    favorites.includes(book.id)
  );

  const savedBooks = books.filter(
    (book) => readingList[book.id]
  );

  const currentlyReading = savedBooks.filter(
    (book) => readingList[book.id] === "Currently Reading"
  );

  const completedBooks = savedBooks.filter(
    (book) => readingList[book.id] === "Completed"
  );

  const stats = [
    {
      label: "Favorite Books",
      value: favoriteBooks.length,
      icon: Heart,
      color: "purple",
    },
    {
      label: "Books in Reading List",
      value: savedBooks.length,
      icon: BookOpen,
      color: "blue",
    },
    {
      label: "Currently Reading",
      value: currentlyReading.length,
      icon: BookMarked,
      color: "pink",
    },
    {
      label: "Completed Books",
      value: completedBooks.length,
      icon: CheckCircle,
      color: "green",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-heading">
        <p className="dashboard-eyebrow">YOUR LIBRARY</p>
        <h1>My Dashboard</h1>
        <p>Track your favorites and reading progress in one place.</p>
      </div>

      <div className="dashboard-stats">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <article className="dashboard-stat-card" key={label}>
            <div className={`dashboard-stat-icon ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <h2>{value}</h2>
              <p>{label}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-heading">
          <h2>Recently Added to Your Reading List</h2>
          <span>{savedBooks.length} books</span>
        </div>

        {savedBooks.length === 0 ? (
          <div className="dashboard-empty">
            <BookOpen size={32} />
            <h3>Your reading journey starts here</h3>
            <p>Add books from Explore Books to see them here.</p>
            <button onClick={onExplore}>Explore Books</button>
          </div>
        ) : (
          <div className="dashboard-books-grid">
            {savedBooks.map((book) => (
              <article className="dashboard-book-card" key={book.id}>
                <img src={book.cover} alt={book.title} />

                <div className="dashboard-book-info">
                  <h3>{book.title}</h3>
                  <p>By {book.author}</p>
                  <span>
                    {readingList[book.id]}
                  </span>

                  <button onClick={() => onViewDetails(book)}>
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-heading">
          <h2>Your Favorite Books</h2>
          <span>{favoriteBooks.length} books</span>
        </div>

        {favoriteBooks.length === 0 ? (
          <div className="dashboard-empty">
            <Heart size={32} />
            <p>You haven't added any favorite books yet.</p>
            <button onClick={onExplore}>Explore Books</button>
          </div>
        ) : (
          <div className="dashboard-favorites">
            {favoriteBooks.map((book) => (
              <button
                className="dashboard-favorite-item"
                key={book.id}
                onClick={() => onViewDetails(book)}
              >
                <img src={book.cover} alt="" />
                <span>{book.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
