import styles from '../page.module.css';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default async function ProductsList() {
	const getData = async () => {
		const p = await axios
			.get(`${process.env.APIBASE_URL}/products/`)
			.then(res => res.data);
		return p;
	};

	const products = await getData();

	return (
		<main className={styles.main}>
			<h2>Products List</h2>
			<div>
				<ul>
					{products.map((item: any) => (
						<li key={item.fields.productId}>
							<a href={'./products/' + item.fields.productId}>
								{item.fields.productName}
							</a>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
