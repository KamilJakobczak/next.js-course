import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getAllMeals() {
	return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
	return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
	// const slug = slugify(meal.title, { lower: true, strict: true });
	// const instructions = xss(meal.instructions);

	// meal.slug= slug;
	// meal.instructions = instructions;

	meal.slug = slugify(meal.title, { lower: true, strict: true });
	meal.instructions = xss(meal.instructions);

	const extension = meal.image.name.split('.').pop();
	const imageFileName = `${meal.slug}.${extension}`;

	const stream = fs.writeFileSync(`public/images/${fileName}`);
	const bufferedImage = await meal.image.arrayBuffer();

	stream.write(Buffer.from(bufferedImage), error => {
		if (error) {
			console.error('Error writing image file:', error);
		}
	});
	meal.image = `/images/${imageFileName}`;
	db.prepare(
		'INSERT INTO meals (title, summary, instructions, image, slug, creator, creator_email) VALUES (@title, @summary, @instructions, @image, @slug, @creator, @creator_email)'
	).run(meal);
}
