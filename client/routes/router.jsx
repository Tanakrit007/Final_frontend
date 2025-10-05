import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'

import BooksList from '../pages/books/BooksList'
import BookForm from '../pages/books/BookForm'
import JournalsList from '../pages/journals/JournalsList'
import JournalForm from '../pages/journals/JournalForm'
import ComicsList from '../pages/comics/ComicsList'
import ComicForm from '../pages/comics/ComicForm'

export default createBrowserRouter([
  {
    path: '/', element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: 'books', element: <BooksList /> },
      { path: 'books/new', element: <BookForm /> },
      { path: 'books/:id/edit', element: <BookForm /> },

      { path: 'journals', element: <JournalsList /> },
      { path: 'journals/new', element: <JournalForm /> },
      { path: 'journals/:id/edit', element: <JournalForm /> },

      { path: 'comics', element: <ComicsList /> },
      { path: 'comics/new', element: <ComicForm /> },
      { path: 'comics/:id/edit', element: <ComicForm /> },

      { path: '*', element: <div className="p-6"><h2>Not Found</h2></div> }
    ]
  }
])
