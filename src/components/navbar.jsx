import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className=" mx-3 md:mx-7 flex justify-between bg-transparent items-center py-2 font-semibold text-xl ">
      <div className="logo pt-1">
        <Link to="/">
          <img src="https://i.imgur.com/qcjuAVR.png" alt="img"></img>
        </Link>
      </div>
      <div className="flex">
        <ul className="md:flex hidden items-center">
          <li className="px-2">
            <Link to="/" className="relative nav">
              Home
            </Link>
          </li>
          <li className="px-2">
            <Link to="/type/movie" className="relative nav">
              Movies
            </Link>
          </li>
          <li className="px-2">
            <Link to="/type/tv" className="relative nav">
              Series
            </Link>
          </li>
        </ul>
        <div
          className="flex items-center gap-1 cursor-pointer relative nav"
          onClick={() => {
            navigate(`/search`);
          }}
        >
          <AiOutlineSearch />
          Search
        </div>
      </div>
    </div>
  );
};

export default Navbar;
