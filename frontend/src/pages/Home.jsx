import React from "react";
import freshIcon from "../assets/favicon.png";
import { Link } from "react-router-dom";
import ticketImg from "../assets/ticket without notes.png";
import addingNoteImg from "../assets/adding note.png";
import twoNotesImg from "../assets/two notes.png";
import dashboardImg from "../assets/dashboard.png";
import wholeTcktImg from "../assets/whole ticket page.png";

const Home = () => {
  return (
    <div>
      <nav className="flex justify-between px-40 h-20 w-screen bg-slate-50">
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
      </nav>
      <section className="flex flex-col h-80 justify-center text-white bg-gradient-to-br from-cyan-950 via-cyan-700 to-cyan-500 ">
        <h2 className="text-4xl mt-10">
          Welcome to{" "}
          <span className="bg-gradient-to-tr from-green-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Fresh Clone
          </span>
        </h2>
        <h2 className="text-5xl mt-1"> Your All-in-One Support Solution</h2>
      </section>
      <section className="px-20 py-20 flex justify-center ">
        <div className="mr-20">
          <h3 className="text-5xl bold mb-5">Seamless Ticket Creation</h3>
          <p className="text-2xl">
            Our user-friendly interface allows you to create tickets in seconds.
            Just input the essential details, and our system takes care of the
            rest.
          </p>
        </div>

        <img
          src={ticketImg}
          alt="ticket image"
          className="rounded-lg shadow h-80"
        />
      </section>

      <section className="px-20 py-10 flex justify-center text-white bg-gradient-to-tr from-gray-700 via-slate-900 to-gray-700">
        <div className="mr-20 w-2/6">
          <h3 className="text-5xl bold mb-5">Collaborative Notes</h3>
          <p className="text-2xl">
            Add notes to tickets with ease. Keep track of important details,
            customer preferences, and follow-up actions. Multiple team members
            can contribute to notes, ensuring everyone stays on the same page
            when assisting customers.
          </p>
        </div>
        <div>
          <img
            src={addingNoteImg}
            alt="ticket image"
            className="rounded-lg shadow h-60 mb-5"
          />
          <img
            src={twoNotesImg}
            alt="ticket image"
            className="rounded-lg shadow h-60"
          />
        </div>
      </section>

      <section className="px-20 py-10 flex justify-center">
        <div className="mr-20">
          <h3 className="text-5xl bold mb-5">
            Efficient Dashboard at Your Fingertips
          </h3>
          <p className="text-2xl">
            Experience streamlined support management with our intuitive CRM
            dashboard. Monitor tickets, jot down notes, create todos, and
            receive real-time notifications—all from one central hub. Stay
            organized, informed, and in control, ensuring your customers receive
            the exceptional service they deserve. Join us today and elevate your
            support game with our powerful CRM dashboard.
          </p>
        </div>

        <div className="p-2 h-auto bg-black rounded-lg">
          <img
            src={dashboardImg}
            alt="ticket image"
            className="rounded-lg block"
          />
        </div>
      </section>

      <section className="flex flex-col justify-center  p-20 text-white bg-gradient-to-b from-transparent via-slate-900 to-gray-700 from-25% via-25% to-60%">
        <div className="p-2 h-auto bg-black rounded-lg w-1/2 mb-16">
          <img
            src={wholeTcktImg}
            alt="Whole ticket page"
            className="rounded-lg"
          />
        </div>

        <h2 className="text-5xl bold bg-gradient-to-tr from-sky-100 via-sky-200 to-sky-100 bg-clip-text text-transparent">
          Your Event, Your Tickets, Your Way
        </h2>
      </section>
    </div>
  );
};

export default Home;
