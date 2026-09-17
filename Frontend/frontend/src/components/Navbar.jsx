import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEditNote, MdSearch, MdMenu, MdClose, MdAccountCircle, MdKeyboardArrowDown, } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/userSlice";
function Navbar() {
  const { token, name, id } = useSelector((state) => state.user)
  console.log("Navbar user:", { token, name, id })
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState("");
  function handleLogout() {
    dispatch(logout())
    navigate("/login")
  }
  async function handleDeleteUser() {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/login");
      dispatch(logout());
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to delete user:" + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (window.location.pathname !== "/search") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, setSearchQuery]);
  return (
    <nav className="relative w-full h-17.5 bg-white border-b shadow-sm px-5 md:px-8 flex items-center justify-between">

      {/* Logo + Search */}
      <div className="flex items-center gap-5">

        {/* Logo */}
        <Link to="/" >
          <img src="/logo.png" alt="logo" className="w-14 h-14 rounded-full object-cover"></img>
        </Link>

        {/* Search */}
        <div className="relative hidden sm:block">
          <MdSearch
            className=" absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400   " />

          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value.trimStart())}
            value={searchQuery}
            onKeyDown={(e) => {
              if (e.code == "Enter") {
                navigate(`/search?q=${searchQuery}`)
              }
            }}
            className="  w-50 md:w-70 bg-gray-100 rounded-full py-2.5 pl-11 pr-4 outline-none  focus:ring-2 focus:ring-blue-400  " />
        </div>
      </div>

      {/* Desktop Account */}
      <div className="hidden md:block relative">

        {/* Account Button */}
        <button
          onClick={() =>
            setIsAccountOpen(!isAccountOpen)
          }
          className="  flex  items-center  gap-1  px-3  py-2  rounded-lg  hover:bg-gray-100   transition ">
          <img
            src={`https://api.dicebear.com/10.x/initials/svg?seed=${name || "User"}`}
            alt="Author"
            className="h-10 w-10 rounded-full object-cover"
          />

          {/* <span className="text-lg capitalize">
            {name || "user"}
          </span> */}

          <MdKeyboardArrowDown
            className={`text - 2xl transition - transform ${isAccountOpen ? "rotate-180" : ""} `} />
        </button>

        {/* Dropdown */}
        {isAccountOpen && (
          <div
            className="  absolute right-0 top-12 w-52 bg-white border  rounded-xl shadow-lg py-2  z-50  " >

            {/* Write */}
            <Link
              to="/add-post"
              onClick={() =>
                setIsAccountOpen(false)
              }
              className="  flex   items-center  gap-3  px-4  py-2.5  hover:bg-gray-100 " >
              <MdEditNote className="text-2xl" />
              <span>Add Post</span>
            </Link>
            {token ? (

              <>
                {/* Test */}
                <Link
                  to="/account"
                  onClick={() =>
                    setIsAccountOpen(false)
                  }
                  className="   block px-4  py-2.5 hover:bg-gray-100"> {name}
                </Link>



                <div className="border-t my-1" />
                {/* Delete Account */}
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    handleDeleteUser()
                    console.log(
                      "Delete Account"
                    );
                  }}
                  className=" w-full text-left px-4 py-2.5 text-red-500  hover:bg-red-50" > Delete Account
                </button>

                {/* Logout */}
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    handleLogout()
                  }}
                  className="  w-full text-left px-4  py-2.5  text-red-500  hover:bg-red-50 " > Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t my-1" />

                <Link
                  to="/login"
                  onClick={() =>
                    setIsAccountOpen(false)
                  }
                  className="  block px-4  py-2.5   hover:bg-gray-100 " > Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-3xl"
      >
        {isMenuOpen ? <MdClose /> : <MdMenu />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="  absolute   top-17.5  left-0   w-full  bg-white  border-b  shadow-lg  p-5  flex flex-col   gap-2  md:hidden  z-50" >

          {/* Mobile Search */}
          <div className="relative mb-3">
            <MdSearch
              className="   absolute  left-4   top-1/2  -translate-y-1/2  text-xl   text-gray-400 "
            />

            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value.trimStart())}
              value={searchQuery}
              onKeyDown={(e) => {
                if (e.code == "Enter") {
                  navigate(`/search?q=${searchQuery}`)
                }
              }}
              className="  w-full  bg-gray-100  rounded-full  py-3  pl-11  pr-4  outline-none " />
          </div>

          {/* Write */}
          <Link
            to="/add-post"
            onClick={() =>
              setIsMenuOpen(false)
            }
            className=" flex  items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100   ">
            <MdEditNote className="text-2xl" />
            Add Post
          </Link>
          {token ? (
            <>
              <Link
                to="/account"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className=" px-3 py-3 rounded-lg hover:bg-gray-100  "> {name}
              </Link>

              <div className="border-t my-2" />


              {/* Delete Account */}
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  handleDeleteUser()
                }
                }
                className=" text-left px-3 py-3 rounded-lg text-red-500 hover:bg-red-50  ">
                Delete Account
              </button>

              {/* Logout */}
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  handleLogout()
                }
                }
                className=" text-left px-3 py-3 rounded-lg text-red-500 hover:bg-red-50 ">
                Logout
              </button>
            </>) : (
            <>
              <div className="border-t my-2" />

              <Link
                to="/Login"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className=" px-3 py-3 rounded-lg hover:bg-gray-100  "
              >
                Login
              </Link>
            </>
          )}
        </div>
      )
      }
    </nav >
  );
}

export default Navbar;