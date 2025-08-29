import React from 'react'
import Image from 'next/image'
import styles from '@/styles/collections/ProductHero.module.scss'

const ProductHero: React.FC = () => {
  return (
    <div className={`${styles.container} relative mx-auto w-[min(90vw,1920px)] overflow-hidden`}>
      <div className={`relative p-[10vw]`}>
        <div className={`${styles['product-hero']} relative w-full`}>
          <Image
            src="/images/collection/product1.jpg"
            alt={`test`}
            fill
            sizes="100%"
            priority
            className="object-cover"
          />
        </div>
        <div className={`relative flex flex-col items-start justify-center`}>
          <h2 className={`${styles['product-hero-name']} dwp-shadow mt-4`}>Product Name</h2>
          <p className={`${styles['product-hero-desc']} dwp-shadow`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
      </div>
    </div>
  )
}

export default ProductHero