'use client'


import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa'; 

const ProductDetail = ({params}) => {
    const id = params.id;
    console.log(id);
    const [product, setProduct] = useState(null);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        if (id) {
            // Fetch product data for the specific ID
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };

            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        // add product to cart
        console.log('Product added to cart:', product.title);
    };

    const handleFavorite = () => {
        // Implement logic to add product to favorites
        setFavorited(!favorited);
        console.log('Product favorited:', product.title);
    };

    return (
        <div className='w-full min-h-100vh '>
            <h1 className='font-bold text-2xl ml-[6rem]   mt-9 mb-5'>Products  Details:</h1>

            <div className="relative max-w-3xl mx-auto p-4">
                {product == null ? <div>Loading...</div> : (
                    <motion.div
                        className="bg-white rounded-lg overflow-hidden shadow-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative m-auto p-4 w-[20rem] h-[20rem]">
                            <motion.div
                                className="relative h-full"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Image src={product.image} alt={product.title} layout="fill" objectFit="contains" />

                            </motion.div>

                        </div>
                        <motion.div
                            className='absolute top-10 right-10 rounded-full   px-2 cursor-pointer py-2 border-gray border-2'
                            onClick={handleFavorite}
                            whileHover={{ scale: 1.5 }}
                        >
                            <FaHeart className={favorited ? "text-red-600 " : "text-gray-400 "} />
                        </motion.div>
                        <motion.div className="p-4">
                            <h1 className="text-xl font-semibold">{product.title}</h1>
                            <p className="text-gray-600">${product.price.toFixed(2)}</p>
                            <p className="mt-4">{product.description}</p>
                            <div className="flex justify-between mt-4 m-auto" >
                                <motion.div
                                    onClick={handleAddToCart}
                                    whileHover={{ scale: 1.1 }}
                                    className=" m-auto cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    Add to Cart
                                </motion.div>

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>

    );
};

export default ProductDetail;

