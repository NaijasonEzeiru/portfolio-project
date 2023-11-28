import Link from 'next/link';
import { useState } from 'react';

const Dropdown = ({ value, content, children, tab }: any) => {
  const [dropdown, setDropdown] = useState(false);
  enum TabIndex {
    false = -1,
    true
  }

  return (
    <span className='relative'>
      <button
        className='flex text-sm gap-1 px-3 items-center'
        aria-expanded={dropdown}
        aria-label='categories dropdown '
        onClick={() => setDropdown(!dropdown)}>
        {children}
        <p>{value}</p>
        <span
          className={
            dropdown
              ? 'rotate-180 transition-transform'
              : 'rotate-0 transition-transform'
          }>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            />
          </svg>
        </span>
      </button>
      <div
        className={`z-50 rounded-b-md flex flex-col gap-1 relative top-1 max-h-0 transition-all ml-1 overflow-hidden md:top-8 md:-left-2 px-8 md:absolute border-black border-solid border-t-0 md:border-[1px] opacity-0 duration-500 md:text-gray-600 ${
          dropdown && '!max-h-52 !opacity-100 pb-4'
        }`}>
        {content.map((item: string, i: number) => (
          <div key={i}>
            <Link href={item} tabIndex={TabIndex[dropdown.toString()]}>
              {item}
            </Link>
          </div>
        ))}
      </div>
    </span>
  );
};

export default Dropdown;
