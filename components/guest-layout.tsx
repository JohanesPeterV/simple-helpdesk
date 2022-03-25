import {FunctionComponent, HTMLAttributes} from 'react';
import Header from "./header";

const GuestLayout: FunctionComponent<HTMLAttributes<HTMLDivElement>> =
    ({
         children,
     }) => {

        return (
            <>
                {children}
            </>
        );
    };

export default GuestLayout;
