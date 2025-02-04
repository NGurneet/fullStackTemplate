import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './page/homepage';
import Signup from './page/signuppage';
import LoginPage from './page/loginpage';
import AdminDashboardPage from './page/adminpage';
import UploadSongPage from './page/uploadSongPage';
import SongsPage from './page/songlistpage';
import PublicElements from './layouts/public';
import Basic from './layouts/Basic';
import AdminPrivateRoute from './components/AdminPrivateRoutes';
import UserPrivateRoute from './components/UserPrivateRoutes'; // Import UserPrivateRoute component
import UserDashboardPage from './page/user-dashboard-page';
import PlaylistComponent from './components/Playlist';
import CreatePlaylistPage from './components/CreatePlaylist';
import ForgotPassword from './page/forgotPassword';
import ResetPassword from './page/resetPasswordPage';
import UserProfile from './components/UserProfile';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorComponent from './components/ErrorComponent';


const App = () => {
  return (
    <ErrorBoundary>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicElements />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/error" element={<ErrorComponent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminPrivateRoute />}>
          <Route element={<Basic />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/upload" element={<UploadSongPage />} />
            <Route path='/playlists' element= {<PlaylistComponent />} />
            <Route path='/create-playlist'element={<CreatePlaylistPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* User Routes */}
        <Route element={<UserPrivateRoute />}>
          <Route element={<Basic />}>
            {/* You can define other user-related routes here */}
            <Route path="/user-dashboard" element={<UserDashboardPage />} /> {/* Add your user dashboard */}
          </Route>
        </Route>
      </Routes>
    </Router>
    </ErrorBoundary>
  );
};

export default App;
