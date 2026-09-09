import  { useState } from 'react'
import { toast } from 'react-toastify'

function CreatePost() {
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!description.trim() && !image) {
            return;
        }
        console.log("description:", description)
        console.log("image:", image)
    toast.success("Uploaded Successfully")
    
    setDescription("")
    setImage(null)
    }
    return (
        <div className='w-full max-w-2xl mx-auto bg-white rounded-xl min-h-full shadow-md  mt-20 p-5 '>
            <div className='flex items-center gap-3 mb-4 h-auto'>

                <img src="/profile.jpeg"
                    alt="profile"
                    className='rounded-full h-11 w-11 object-cover '
                />

                <div >
                    <h3 className='font-semibold text-gray-800'>
                        Rakshya
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Create new post
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's on your mind?"
                    className='w-full min-h-20 resize-none border border-gray-200 rounded-lg p-4 outline-none focus:ring-1 focus:ring-green-600 '></textarea>

                {image &&
                    (<div className='relative mt-4'>
                        <img src={URL.createObjectURL(image)}
                            alt="Preview"
                            className='w-full max-h-80 object-cover rounded-lg'
                        />
                    </div>
                    )}

                <div className='flex items-center justify-between mt-4'>
                    <label className="cursor-pointer flex items-center gap-2  hover:text-green-900">
                        <span>🖼️</span>

                        <span>Add Photo</span>

                        <input type="file"
                            accept='image/*'
                            className='hidden'
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    <button type="submit"
                        className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
                    >
                        Post</button>
                </div>
            </form>
        </div>

    )
}

export default CreatePost
