import { NavLink } from "react-router-dom"

function Navbar(){
    return(
        <div>
            <nav className="flex flex-row gap-x-40 inset-x-0 place-content-center top-0 fixed border bg-blue-500 h-9 w-full">
                <NavLink to="about">
                    <button>About</button>
                </NavLink>
            </nav>

        </div>
    )
}
export default Navbar