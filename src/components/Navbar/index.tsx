import {useEffect, useRef} from "react";
import {Link} from 'react-router-dom'
const NavItem = ({name, href}: {name: string, href: string}) => {
    return (
        <li  key={name}  >
            <Link to={href} className="text-white" >
                {name}
            </Link>
        </li>
    )
}
export const NAV_ITEMS = [
    {name: "Home", href: "/"},
    {name: "Mutations", href: "/mutations/"},

]

const Index = () => {


    return (
        <header >

                    {/*{NAV_ITEMS.map(nav => <NavItem nav/>)}*/}


        </header>



    )
}
export {Index as Navbar}
