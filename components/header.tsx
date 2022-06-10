import { FunctionComponent, HTMLAttributes } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ribbonPicture from '../public/images/ribbon.png';
import binusPicture from '../public/images/binus.png';

const Header: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <header className="w-full flex space-x-10 top-0 pl-8">
      <div className="flex justify-between items-center px-4 sm:px-6 md:justify-start md:space-x-10z-10">
        <div className="flex w-40">
          <div className="w-1/5">
            <Image src={ribbonPicture} />
          </div>
          <div className="w-11/12">
            <Image src={binusPicture} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
