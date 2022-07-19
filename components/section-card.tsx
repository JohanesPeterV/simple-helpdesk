import { FunctionComponent, HTMLAttributes } from 'react';
import Card from './card';

type SectionCardProp = {
  title: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const SectionCard: FunctionComponent<SectionCardProp> = ({
  title,
  className,
  children,
}) => (
  <Card className={`px-0 pt-2 pb-2 divide-y-2 w-full rounded-sm ${className}`}>
    <div className="px-8 py-4 flex items-center text-left font-semibold md:text-lg ">
      {title}
    </div>
    <div className="px-6 py-4">{children}</div>
  </Card>
);

export default SectionCard;
