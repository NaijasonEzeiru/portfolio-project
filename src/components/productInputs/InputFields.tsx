import { useEffect, useRef, useState } from 'react';

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
				className={`w-full p-[10px] border-solid border-[1px] dark:bg-primary border-opacity-20 bg-white rounded-md outline-0   text-base transition-transform invalid:border-red-600 peer ${
					fields && 'isValid'
				} ${fields && errors && 'category text-red-400'}`}>
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
			<span className='absolute left-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4 dark:peer-[.isValid]:bg-secondary dark:peer-focus-visible:bg-secondary dark:peer-[.isValid]:text-white dark:peer-focus-visible:text-white'>
				{placeholder}
			</span>
			<span className='text-red-400 dark:text-red-300 text-xs'>
				{errors}
			</span>
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
				className={`w-full p-[10px] border-solid border-[1px] dark:bg-primary border-opacity-20 bg-white rounded-md outline-0 text-black  text-base transition-transform invalid:border-red-600 peer ${
					fields && 'isValid'
				} ${fields && errors && 'modified text-red-400'}`}
				type={type}
				{...register}
				aria-invalid={!!errors}
			/>
			<span className='absolute left-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4 dark:peer-[.isValid]:bg-secondary dark:peer-focus-visible:bg-secondary dark:peer-[.isValid]:text-white dark:peer-focus-visible:text-white'>
				{' '}
				{placeholder}
			</span>
			<span className='text-red-400 dark:text-red-300 text-xs'>
				{errors}
			</span>
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
				className={`w-full p-[10px] border-solid border-[1px] h-[45px] dark:bg-primary border-opacity-20 bg-white rounded-md outline-0 text-black  text-base transition-transform invalid:border-red-600 peer ${
					fields && 'isValid'
				} ${fields && errors && 'modified text-red-400'}`}
				onClick={(e) => {
					setShowModal(true);
				}}></div>

			<span className='absolute left-0 top-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4 dark:peer-[.isValid]:bg-secondary dark:peer-focus-visible:bg-secondary dark:peer-[.isValid]:text-white dark:peer-focus-visible:text-white'>
				{placeholder}
			</span>
			<p className='absolute left-0 top-0 p-[10px] pointer-events-none text-base'>
				{fields && checked.join(', ')}
			</p>
			<span className='text-red-400 dark:text-red-300 text-xs'>
				{errors}
			</span>
			<div
				className={`flex flex-col fixed items-start bottom-0 left-0 w-full bg-white dark:bg-secondary p-6 modal pointer-events-auto ${
					!showModal && 'hidden'
				}`}>
				{items.map((item, index) => (
					<span className={``} key={index}>
						<input
							id={item}
							type='checkbox'
							value={item}
							{...register}
						/>
						<label key={index} htmlFor={item}>
							{item}
						</label>
					</span>
				))}
				<button
					onClick={() => setShowModal(false)}
					className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary dark:bg-goldColor text-white dark:text-black w-max m-auto'>
					Apply
				</button>
			</div>
		</div>
	);
};
