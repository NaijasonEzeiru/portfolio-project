import { Component, useEffect, useRef, useState } from 'react';

// TODO: make one Component

export const SelectInput = ({
  register,
  fields,
  errors,
  items,
  placeholder,
  top
}: {
  items?: string[] | number[];
  register: any;
  fields: boolean;
  errors: string | undefined;
  placeholder: string;
  top?: { name: string; subs?: string[]; cities?: string[] }[];
}) => {
  return (
    <div className='relative w-full'>
      <select
        {...register}
        className={`w-full p-[10px] border-solid border-[1px] border-opacity-20 bg-white rounded-md outline-0   text-base transition-transform invalid:border-red-600 focus:outline-primary focus:outline focus:outline-2 peer ${
          fields && 'isValid'
        } ${fields && errors && 'category'}`}>
        <option value='' disabled>
          {/* TODO: Fix Below */}
          {/* --{placeholder}-- */}
        </option>
        {top
          ? top.map((value, i) => (
              <option key={i} value={i}>
                {value.name}
              </option>
            ))
          : items!.map((value, i) => (
              <option key={i} value={value}>
                {value}
              </option>
            ))}
      </select>
      <span className='absolute left-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4 '>
        {placeholder}
      </span>
      <span className='text-red-400  text-xs'>{errors}</span>
    </div>
  );
};

export const TextOrNumberInput = ({
  register,
  fields,
  errors,
  placeholder,
  type
}: {
  type: 'text' | 'number';
  register: any;
  fields: boolean;
  errors: string | undefined;
  placeholder: string;
}) => {
  return (
    <div className='relative w-full'>
      <input
        className={`w-full p-[10px] border-solid border-[1px] border-opacity-20 bg-white rounded-md outline-0   text-base transition-transform invalid:border-red-600 focus:outline-primary focus:outline focus:outline-2 peer ${
          fields && 'isValid'
        } ${fields && errors && 'modified'}`}
        type={type}
        {...register}
        aria-invalid={!!errors}
        aria-errormessage={placeholder}
      />
      <span className='absolute left-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4 '>
        {' '}
        {placeholder}
      </span>
      <span className='text-red-400  text-xs'>{errors}</span>
    </div>
  );
};

export const DescriptionInput = ({
  register,
  fields,
  errors,
  placeholder,
  type
}: {
  type: 'text' | 'number';
  register: any;
  fields: boolean;
  errors: string | undefined;
  placeholder: string;
}) => {
  return (
    <div className='relative w-full'>
      <textarea
        className={`w-full p-[10px] h-36 border-solid border-[1px] border-opacity-20 bg-white rounded-md outline-0  text-base transition-transform invalid:border-red-600 focus:outline-primary focus:outline focus:outline-2 peer ${
          fields && 'isValid'
        } ${fields && errors && 'modified'}`}
        type={type}
        {...register}
        aria-invalid={!!errors}
        aria-errormessage={placeholder}
      />
      <span className='absolute left-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4 '>
        {' '}
        {placeholder}
      </span>
      <span className='text-red-400  text-xs'>{errors}</span>
    </div>
  );
};

export const CheckboxInput = ({
  register,
  fields,
  errors,
  items,
  placeholder,
  checked
}: {
  items: string[];
  checked: string[];
  register: any;
  fields: boolean;
  errors: string | undefined;
  placeholder: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutsideModal(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutsideModal);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, [modalRef]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflowY = 'hidden';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.overflowY = 'auto';
      document.body.style.pointerEvents = 'auto';
    }
  }, [showModal]);

  return (
    <div className='relative w-full' ref={modalRef}>
      <div
        tabIndex={0}
        className={`w-full p-[10px] border-solid border-[1px] h-[45px] border-opacity-20 bg-white rounded-md outline-0 text-black text-base transition-transform invalid:border-red-600 focus:outline-primary focus:outline focus:outline-2 peer ${
          fields && 'isValid'
        } ${fields && errors && 'modified'}`}
        onClick={(e) => {
          setShowModal(true);
        }}
        onKeyDown={(e) => {
          e.key === 'Enter' || (e.key === ' ' && setShowModal(true));
        }}></div>

      <span className='absolute left-0 top-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4'>
        {placeholder}
      </span>
      <p className='absolute left-0 top-0 p-[10px] pointer-events-none text-base truncate w-full text-left'>
        {fields && checked.join(', ')}
      </p>
      <span className='text-red-400  text-xs'>{errors}</span>
      <div
        className={`flex flex-col fixed items-start bottom-0 left-0 w-full bg-white  p-6 modal pointer-events-auto ${
          !showModal && 'hidden'
        }`}>
        {items.map((item, index) => (
          <span className={``} key={index}>
            <input id={item} type='checkbox' value={item} {...register} />
            <label key={index} htmlFor={item}>
              {item}
            </label>
          </span>
        ))}
        <button
          type='button'
          onClick={() => setShowModal(false)}
          className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary text-white  w-max m-auto'>
          Apply
        </button>
      </div>
    </div>
  );
};
