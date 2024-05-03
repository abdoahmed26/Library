import FeaturedCategories from "../components/FeaturedCategories"
// import { useGetProductsQuery } from "../redux/productsSlice"
import mainImage from '../assets/images/work-steps.png'
import { Link } from "react-router-dom"

export default function Home () {
    // const {data, error, isLoading} = useGetProductsQuery()
    // console.log(data, error, isLoading)
    return (
        <main>
            <section className="grid md:grid-cols-2 px-4 lg:px-10 py-10 items-center gap-3 text-center md:text-left container m-auto" style={{background:"linear-gradient(110deg, rgba(255,255,255,1) 50%, rgba(240,240,240,1) 50%)"}}>
                <div>
                    <h1 className="font-bold capitalize text-2xl md:text-3xl lg:text-4xl">welcome in your comfort zone</h1>
                    <p className="font-bold capitalize text-xl md:text-2xl lg:text-3xl text-gray-400">all you need in one place</p>
                    <Link className="bg-black font-bold py-2 px-3 text-xl text-white capitalize inline-block my-4">shop now</Link>
                </div>
                <div className="flex justify-center">
                    <img src={mainImage} alt="main image" className="w-100"/>
                </div>
            </section>
            <section className="py-5 pb-10">
                <FeaturedCategories/> 
            </section>
        </main>
    )
}