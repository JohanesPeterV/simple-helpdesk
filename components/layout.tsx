import {FunctionComponent, HTMLAttributes} from 'react';
import Header from "./header";
import Example from "./example";

const Layout: FunctionComponent<HTMLAttributes<HTMLDivElement>> =
    ({
         children,
     }) => {

        return (
            <>
                <Header/>
                {children}
            </>
        );
    };

export default Layout;
