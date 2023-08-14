import { Link } from "react-router-dom";

import school from "../assets/school.png";
import subject from "../assets/books.png";
import period from "../assets/period.png";
import room from "../assets/room.png";
import slot from "../assets/slot.png";
import educationtype from "../assets/educationtype.png";

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
          <img src={school} alt="books" className="Navbar-img" />
        </Link>
        <Link className="Navbar-link" to="/room">
          <img src={room} alt="bell" className="Navbar-img" />
        </Link>
        <Link className="Navbar-link" to="/period">
          <img src={period} alt="bell" className="Navbar-img" />
        </Link>
        <Link className="Navbar-link" to="/subject">
          <img src={subject} alt="books" className="Navbar-img" />
        </Link>
        <Link className="Navbar-link" to="/slot">
          <img src={slot} alt="slot" className="Navbar-img" />
        </Link>
        <Link className="Navbar-link" to="/educationtype">
          <img src={educationtype} alt="educationtype" className="Navbar-img" />
        </Link>
      </div>
    </section>
  );
};
