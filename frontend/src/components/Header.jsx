import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");
  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login"); 
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          TODO
        </Link>
        <nav>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 hover:bg-gray-700 rounded">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 hover:bg-gray-700 rounded"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
