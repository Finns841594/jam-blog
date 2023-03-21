import axios from 'axios';
import { Collection, Db, MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const connectToDb = async (): Promise<MongoClient> => {
	const client: MongoClient = new MongoClient(process.env.DB_URI!);
	await client.connect();
	return client;
};

export async function GET(request: NextApiRequest) {
	const prodId = Number(request.query);
	console.log('😍😍😍😍😍', request.url);

	// Get product info from contentful'
	const getData = async () => {
		const p = await axios
			.get(process.env.APIACCESS!)
			.then(res => res.data.items);
		return p;
	};
	const products = await getData();

	const product = products.filter(
		(item: any) => item.fields.productId === prodId
	)[0];

	// Get Quantity from database
	const client = await connectToDb();
	const db: Db = client.db('nextjs');
	const col: Collection = db.collection('products');
	const data = await col.find({ productId: prodId }).toArray();
	const productQuantity = data[0].quantity;
	await client.close();

	// Writte quantity into product
	product.fields.quantity = productQuantity;

	return new NextResponse(JSON.stringify(product));
}
