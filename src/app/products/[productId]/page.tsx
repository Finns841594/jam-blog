export default async function Products({ params }: any) {
	return (
		<>
			<h2>{params.productId}</h2>
			<div>Description: </div>
		</>
	);
}
