import { NavLink } from "react-router-dom";

function Nav() {

  return (
    <div className="flex m-0 list-none items-center bg-teal-500 p-6 w-full">
      <div className="mr-6">
        <NavLink
          to="/"
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Home
        </NavLink>
      </div>
    </div>
  );
}
export default Nav;
