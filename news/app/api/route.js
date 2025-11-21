export function GET(request) {
	console.log(request);
	return new Response('Hello, this is the API route response!');
}
