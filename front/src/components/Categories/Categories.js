import React from 'react'
import "./categories.css"
import { useEffect } from 'react'
import { useState } from 'react'
import { request } from '../../utils/fetchApi'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

const Categories = () => {
    const [blogs, setBlogs] = useState([])
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const [activeCategory, setActiveCategory] = useState('all')
    const categories = [
      'all',
      'nature',
      'music',
      'travel',
      'design',
      'programming',
      'fun',
      'fashion'
    ]

    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const data = await request('/blog/getAll', 'GET')
            setBlogs(data)
            setFilteredBlogs(data)
          } catch (error) {
            console.error(error)
          }
        }
        fetchBlogs()
      }, [])


  useEffect(() => {
    if(activeCategory === 'all'){
      setFilteredBlogs(blogs)
    } else {
      setFilteredBlogs((prev) => {
        const filteredBlogs = blogs.filter((blog) => blog.category.toLowerCase() === activeCategory.toLowerCase())

        return filteredBlogs
      })
    }
  }, [activeCategory])

  return (
    <div>
        <h3>Categories</h3>
        <section className='tags'>
        <div className='container'>
        {categories.map((category) => (

             <ul className='grid-list'>
                <li>

                <span
                className='tag-btn'
                key={crypto.randomUUID()}
                onClick={() => setActiveCategory(prev => category)}
              >
                {category}
              </span>
                </li>
             </ul>
            ))}
            </div>
        </section>
        {filteredBlogs?.length > 0 ?
            <div >
              {filteredBlogs?.map((blog) => (
                <div key={blog._id} >
                  <Link to={`/blogDetails/${blog?._id}`}>
                    <img src={`http://localhost:8000/images/${blog?.photo}`} />
                  </Link>
                  <div>
                    <div >
                      <span >{blog?.category} </span>
                      <div >
                         {blog.views} views
                      </div>
                      <div >
                         {blog?.likes?.length} likes
                      </div>
                    </div>
                    <h4>{blog?.title}</h4>
                    <p >
                      {blog?.desc}
                    </p>
                    <div >
                      <span><span>Author:</span> {blog?.userId?.username}</span>
                      <span><span>Created:</span> {format(blog?.createdAt)}</span>
                    </div>
                    <Link to={`/blogDetails/${blog._id}`} >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            : <h3 >No blogs</h3>}

    </div>
  )
}

export default Categories