import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo / About */}
          <div>
            <img src="/logo.png" alt="logo" className="w-14 h-14 rounded-full object-cover"></img>


            <p className="text-gray-400 mt-3 leading-6">
              Learn, share and explore useful
              content with our platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-gray-400 hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/register"
                className="text-gray-400 hover:text-white"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="text-gray-400 hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Account
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                to="/add-post"
                className="text-gray-400 hover:text-white"
              >
                Write
              </Link>

              <Link
                to="/forgot-password"
                className="text-gray-400 hover:text-white"
              >
                Forgot Password
              </Link>

              <Link
                to="/register"
                className="text-gray-400 hover:text-white"
              >
                Sign In
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Logo. All rights reserved.
          </p>
        </div>

      </div>

    </footer>
  )
}

export default Footer