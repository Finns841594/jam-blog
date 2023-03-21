import axios from 'axios';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(request: NextApiRequest) {
	// Get product info from contentful'
	const getData = async () => {
		const p = await axios
			.get(process.env.APIACCESS!)
			.then(res => res.data.items);
		return p;
	};
	const products = await getData();
	// why NextResponse specifically
	return new NextResponse(JSON.stringify(products));
}
