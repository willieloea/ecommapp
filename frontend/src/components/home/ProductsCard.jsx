import ProductSingleCard from './ProductSingleCard';

const ProductsCard = ({ products, onAddToCart }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {products.map((item) => (
        <ProductSingleCard key={item._id} product={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductsCard;
