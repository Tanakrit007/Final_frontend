import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <nav className="navbar bg-base-200 px-10 shadow">
        <div className="flex-1">
          <NavLink to="/" className="text-xl font-bold">
            📚 Bookshop System
          </NavLink>
        </div>
        <div className="flex gap-3">
          <NavLink to="/" className="btn btn-ghost">Home</NavLink>
          <NavLink to="/books" className="btn btn-ghost">Books</NavLink>
          <NavLink to="/journals" className="btn btn-ghost">Journals</NavLink>
          <NavLink to="/comics" className="btn btn-ghost">Comics</NavLink>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
