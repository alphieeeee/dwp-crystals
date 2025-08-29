'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductHero from '@/app/components/collections/ProductHero';
import ProductSection from '@/app/components/collections/ProductSection';

const ProductPage: React.FC = () => {
const { post } = useParams(); // Get slug from the URL

  useEffect(() => {
    // console.log('Slug:', post);
  }, [post]);
  return (
    <main className={`w-full overflow-x-hidden`}>
      {post}
      <ProductHero />
      <ProductSection />
    </main>
  )
}

export default ProductPage