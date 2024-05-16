/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import FeaturedCategories from "../components/FeaturedCategories"
import mainImage from '../assets/images/work-steps.png'
import { Link } from "react-router-dom"

export default function Home () {
    return (
        <main>
            <section className="grid items-center gap-3 px-4 py-10 m-auto text-center md:grid-cols-2 lg:px-10 md:text-left" style={{background:"linear-gradient(110deg, rgba(255,255,255,1) 50%, rgba(240,240,240,1) 50%)"}}>
                <div>
                    <h1 className="text-2xl font-bold capitalize md:text-3xl lg:text-4xl">welcome in your comfort zone</h1>
                    <p className="text-xl font-bold text-gray-400 capitalize md:text-2xl lg:text-3xl">all you need in one place</p>
                    <Link to={'/store'} className="inline-block px-3 py-2 my-4 text-xl font-bold text-white capitalize bg-black">shop now</Link>
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