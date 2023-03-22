import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default async function Products({ params }: any) {
	const prodId = Number(params.productId);
	// Get product info from contentful'
	const getData = async () => {
		const p = await axios
			.get(`${process.env.APIBASE_URL}/products/` + params.productId)
			.then(res => res.data);
		return p;
	};
	const product = await getData();

	return (
		<>
			<h2>{product.fields.productName}</h2>
			<div>
				<h3>Description: </h3>
				<p>{product.fields.productDescription.content[0].content[0].value}</p>
			</div>
			<div>
				<h4>Quantity : {product.fields.quantity}</h4>
				<button>Buy</button>
			</div>
		</>
	);
}
