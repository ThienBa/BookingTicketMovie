import { Router, Switch } from "react-router";
import { createBrowserHistory } from 'history';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import ShowTimes from "./pages/Showtimes/ShowTimes";
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Showtimes from "./pages/Admin/Movies/Showtimes/Showtimes";
import Movies from "./pages/Admin/Movies/Movies";
import Users from "./pages/Admin/Users/Users";
import AddNewMovie from "./pages/Admin/Movies/AddNewMovie/AddNewMovie";
import EditMovie from "./pages/Admin/Movies/EditMovie/EditMovie";
import AddNewUser from "./pages/Admin/Users/AddNewUser/AddNewUser";
import EditUser from "./pages/Admin/Users/EditUser/EditUser";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <AdminTemplate exact path="/admin" Component={Users} />
        <AdminTemplate exact path="/admin/users" Component={Users} />
        <AdminTemplate exact path="/admin/users/addnewuser" Component={AddNewUser} />
        <AdminTemplate exact path="/admin/users/edit/:username" Component={EditUser} />

        <AdminTemplate exact path="/admin/movies" Component={Movies} />
        <AdminTemplate exact path="/admin/movies/addnewmovie" Component={AddNewMovie} />
        <AdminTemplate exact path="/admin/movies/edit/:id-:nameMovie" Component={EditMovie} />
        <AdminTemplate exact path="/admin/movies/showtimes/:id-:nameMovie" Component={Showtimes} />

        <CheckoutTemplate exact path="/checkout/:id" Component={Checkout} />
        <UserTemplate exact path="/register" Component={Register} />
        <UserTemplate exact path="/login" Component={Login} />
        <HomeTemplate exact path="/detail/:id-:slug" Component={Detail} />
        <HomeTemplate exact path="/showtimes" Component={ShowTimes} />
        <HomeTemplate exact path="/news" Component={News} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <HomeTemplate exact path="/" Component={Home} />
        <HomeTemplate exact path="*" Component={PageNotFound} />
      </Switch>
    </Router >
  );
}

export default App;
