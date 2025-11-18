'use server';
import { redirect } from 'next/navigation';
import { saveMeal } from '@/lib/meals.js';

function isInvalidString(value) {
	return !value || typeof value !== 'string' || value.trim().length === 0;
}

export async function shareMeal(prevState, formData) {
	const meal = {
		title: formData.get('title'),
		summary: formData.get('summary'),
		instructions: formData.get('instructions'),
		image: formData.get('image'),
		creator: formData.get('name'),
		creator_email: formData.get('email'),
	};

	if (
		isInvalidString(meal.title) ||
		isInvalidString(meal.summary) ||
		isInvalidString(meal.instructions) ||
		isInvalidString(meal.creator) ||
		isInvalidString(meal.creator_email) ||
		!meal.creator_email.includes('@') ||
		!meal.image ||
		meal.image.size === 0
	) {
		throw new Error('Invalid input! Please check your data.');
	}

	await saveMeal(meal);
	redirect('/meals');
}
