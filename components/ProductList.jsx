'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Products = () => {
    const [products, setProducts] = useState([]);

    const route = useRouter();

    const handleClick = (product) => {
        route.push(`/product/${product.id}`);
    }
    useEffect(() => {
        // Fetch product data from API
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);


    return (
        <div className='px-6 h-[100vh]'>
            <h1 className='font-bold text-2xl ml-4 my-7'>List of Products :</h1>
            {products.length == 0 && <div className='text-center m-auto'>Loading...</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 p-2">
                {products.map(product => (
                    <div onClick={() => handleClick(product)}>
                        <motion.div
                            key={product.id}
                            className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                            whileHover={{ scale: 1.05, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative w-full h-52 mt-6">
                                <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
                            </div>
                            <div className="p-4 text-center">
                                <h2 className="text-lg  font-semibold">{product.title}</h2>
                                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
