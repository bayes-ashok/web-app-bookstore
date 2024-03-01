import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Allitems from "./admin/allbook.tsx";
import NonFiction from "./pages/nonfiction.tsx";
import Fiction from "./pages/fiction.tsx";
import Academics from "./pages/academics.tsx";
import Poem from "./pages/poem.tsx";
import Comic from "./pages/comic.tsx";
import Novel from "./pages/novel.tsx";
import Drama from "./pages/drama.tsx";
import Addbook from "./admin/addbook.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Account from "./pages/account.tsx";
import Ordercart from "./pages/order.tsx";
import Allorder from "./admin/allorder.tsx";
import Navbar from "./components/navbar.tsx";
import AdminNav from "./admin/adminNav.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/nonfiction", element: <NonFiction /> },
  { path: "/fiction", element: <Fiction /> },
  { path: "/academics", element: <Academics /> },
  { path: "/comic", element: <Comic /> },
  { path: "/navbar", element: <Navbar /> },
  { path: "/adminnav", element: <AdminNav /> },
  { path: "/novel", element: <Novel /> },
  { path: "/drama", element: <Drama /> },
  { path: "/poem", element: <Poem /> },
  { path: "/myaccount", element: <Account /> },
  { path: '/order', element: <Ordercart /> },
  { path: "/addbook", element: <Addbook /> },
  { path: "/admin-dashboard", element: <Allitems /> },
  { path: "/all-order", element: <Allorder /> },
]);

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}
export default App;
