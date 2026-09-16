import { Link } from "react-router-dom"

const Card = ({ item }) => {
     return (
          <Link to={`/post/${item.postId}`} className="p-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 max-w-full">
               <img className="rounded-md max-h-40 w-full object-cover" src={item.imageUrl} alt={item.title} />
               <p className="text-gray-900 text-xl font-semibold ml-2 mt-4 line-clamp-2">
                    {item.title}
               </p>
               <p className="text-zinc-400 text-sm/6 mt-2 ml-2 mb-2 line-clamp-4">
                    {item.description}
               </p>
          </Link>
     )
}

export default Card