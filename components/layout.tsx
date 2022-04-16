import {FunctionComponent, HTMLAttributes} from 'react';
import Header from "./header";

const Layout: FunctionComponent<HTMLAttributes<HTMLDivElement>> =
    ({
         children,
     }) => (
        <>
            <Header/>
            {children}
        </>
    );

export default Layout;
