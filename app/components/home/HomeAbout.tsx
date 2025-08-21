import React from 'react'
import Image from 'next/image'
import styles from "@/styles/home/HomeAbout.module.scss";

const HomeAbout = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.sticky}`}>
				<div className={`${styles.pinku}`}>
					<Image
						src="/home/pinku.png"
						alt="Description"
						width={200}
						height={150} />
				</div>
      </div>
    </div>
  )
}

export default HomeAbout