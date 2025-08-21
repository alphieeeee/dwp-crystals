// import { shopifyFetch } from '@/lib/shopify'
// import { GET_PRODUCTS_QUERY } from '@/lib/queries'

// type ProductNode = {
//   id: string
//   title: string
//   images: { edges: { node: { url: string } }[] }
//   variants: { edges: { node: { id: string; price: { amount: string } } }[] }
// }

// export default async function HomePage() {
//   const data = await shopifyFetch(GET_PRODUCTS_QUERY)
//   const products = data.products.edges as { node: ProductNode }[]

//   return (
//     <main className="pt-[10%]">

//       {/* {products.map(({ node }) => {
//         const {
//           id,
//           title,
//           images: { edges: imageEdges },
//           variants: { edges: variantEdges },
//         } = node

//         const image = imageEdges[0]?.node.url || '/placeholder.jpg'
//         const variant = variantEdges[0]?.node
//         const price = variant?.price.amount || '0.00'
//         const variantId = variant?.id.split('/').pop()

//         return (
//           <div key={id} className="cards bg-white border p-4 rounded shadow-sm">
//             <img
//               src={image}
//               alt={title}
//               className="w-full aspect-square object-cover"
//               loading="lazy"
//             />
//             <h2 className="title mt-2 font-bold">{title}</h2>
//             <p className="price">${price}</p>
//             <form
//               action={`https://${process.env.SHOPIFY_STORE_DOMAIN}/cart/add`}
//               method="POST"
//               className="mt-2"
//             >
//               <input type="hidden" name="id" value={variantId} />
//               <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
//                 Buy Now
//               </button>
//             </form>
//           </div>
//         )
//       })} */}
//     </main>
//   )
// }
