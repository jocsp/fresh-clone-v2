import React from "react";
import freshIcon from "../assets/favicon.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex justify-between px-40 h-20 w-screen bg-slate-50">
        <div className="flex gap-x-5">
          <img src={freshIcon} className="h-10 w-10" alt="freshclone logo" />
          <span className="text-xl logo-home">FreshClone</span>
        </div>

        <ul className="flex gap-x-5 text-xl items-home">
          <li className=" hover:underline underline-offset-2 hover:cursor-pointer">
            Features
          </li>
          <li className=" hover:underline underline-offset-2 hover:cursor-pointer">
            Pricing
          </li>
          <li>
            <Link
              to="/login"
              className="text-white px-6 py-3 hover:cursor-pointer bg-cyan-950 hover:bg-cyan-900 rounded-md"
            >
              Log in
            </Link>
          </li>
        </ul>
      </div>
      <div className="px-20 pt-10">Content</div>
    </div>
  );
};

export default Home;
