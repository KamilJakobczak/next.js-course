import { DUMMY_NEWS } from '@/dummy-news';
import NewsList from '@/components/news-list';
export default function NewsPage() {
	return (
		<>
			<h2>News Page</h2>
			<NewsList news={DUMMY_NEWS} />
		</>
	);
}
