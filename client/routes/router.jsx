// client/routes/router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// หน้าหลัก
import Home from "../pages/Home";

// หน้ารวมต่อประเภท (CRUD ครบในหน้าเดียว)
import Book from "../pages/books/Book";
import Journal from "../pages/journals/Journal";
import Comics from "../pages/comics/Comics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },

      // รวม CRUD หน้าเดียว
      { path: "books", element: <Book /> },
      { path: "journals", element: <Journal /> },
      { path: "comics", element: <Comics /> },
    ],
  },
]);

export default router;
