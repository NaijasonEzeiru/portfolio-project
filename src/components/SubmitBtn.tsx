'use client';

import { experimental_useFormStatus } from 'react-dom';

export default function SubmitBtn({ text }: { text: string }) {
  const { pending } = experimental_useFormStatus();
  return (
    <button disabled={pending} className='btn' type='submit'>
      <span
        className={`animate-spin text-ctaColor px-4 ${
          pending ? 'block' : 'hidden'
        }`}>
        {/* <ImSpinner /> */}
      </span>
      <p className={`${pending && 'opacity-40'}`}>{text}</p>
    </button>
  );
}
