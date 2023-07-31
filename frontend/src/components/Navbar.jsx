import { Link } from "react-router-dom";

import school from "../assets/school.png";
import books from "../assets/books.png";
import bell from "../assets/bell.png";
import period from "../assets/period.png";

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
        <Link className="Navbar-link" to="/room">
          <img src={bell} alt="bell" className="Navbar-img" />
        </Link>
        <Link className="Navbar-link" to="/period">
          <img src={period} alt="bell" className="Navbar-img" />
        </Link>
      </div>
    </section>
  );
};
