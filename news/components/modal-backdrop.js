'use client';
import { useRouter } from 'next/router';
export default function ModalBackdrop() {
	return (
		<div
			className='modal-backdrop'
			onClick={router.back}
		/>
	);
}
