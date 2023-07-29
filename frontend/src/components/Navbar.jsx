import { Link } from "react-router-dom";

import school from "../assets/school.png";
import books from "../assets/books.png";

export const Navbar = () => {
  return (
    <section className="Navbar">
      <div className="Navbar-logo">
        <Link className="Navbar-link" to="/">
          <img src={school} alt="school" className="Navbar-img" />
        </Link>
      </div>
      <div className="Navbar-links">
        <Link className="Navbar-link" to="/course">
          <img src={books} alt="books" className="Navbar-img" />
        </Link>
      </div>
    </section>
  );
};
