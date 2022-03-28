import { Outlet } from "react-router-dom";

export function Layout(){
    return(
        <>
            <nav>
                <h1>Mitt ZoOo</h1>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    )
}