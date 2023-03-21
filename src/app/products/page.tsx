import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '../page.module.css';
import axios from 'axios';
import { useState } from 'react';
import dotenv from 'dotenv';

dotenv.config();

export default async function ProductsList() {
	const getData = async () => {
		const p = await axios
			.get('http://localhost:3000/api/products')
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
