import React from 'react'
import "./blogDetails.css"
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { request } from '../../utils/fetchApi'
import { useState } from 'react'
import { format } from 'timeago.js'


const BlogDetails = () => {
    const [blogDetails, setBlogDetails] = useState("")
    const [isLiked, setIsLiked] = useState(false)
    const { id } = useParams()
    const { user, token } = useSelector((state) => state.auth)

    useEffect(() => {
      const fetchBlogDetails = async () => {
        try {
          const options = { 'Authorization': `Bearer ${token}` }
          const data = await request(`/blog/find/${id}`, 'GET', options)
          setBlogDetails(data)
          setIsLiked(data.likes.includes(user._id))
        } catch (error) {
          console.error(error)
        }
      }
      fetchBlogDetails()
    }, [id])

    // like
    const handleLikePost = async () => {
      try {
        const options = { "Authorization": `Bearer ${token}` }
        await request(`/blog/likeBlog/${id}`, "PUT", options)
        setIsLiked(prev => !prev)
      } catch (error) {
        console.error(error)
      }
    }

    // delete
    const handleDeleteBlog = async() => {
      try {
        const options = {"Authorization": `Bearer ${token}`}
        await request(`/blog/deleteBlog/${id}`, "DELETE", options)
      } catch (error) {
        console.error(error)
      }
    }
  return (
    <>
    <div>BlogDetails
<img src={`http://localhost:8000/images/${blogDetails?.photo}`} alt="detail-pic" />
<h3 >{blogDetails?.title}</h3>
            {blogDetails?.userId?._id === user._id ?
              <div >
                <Link to={`/updateBlog/${blogDetails?._id}`} >
                  <p>Edit</p>
                </Link>
                <Link to="/">Home</Link>
                <div >
                  <p onClick={handleDeleteBlog}>delete</p>
                </div>
              </div>
              :
              <>
                {isLiked
                  ? <div className='like'>
                    <p onClick={handleLikePost} >Like</p>
                  </div>
                  :
                  <div >
                    <p onClick={handleLikePost} >handlelikepost</p>
                  </div>
                }
              </>
            }

    </div>
    <div >
            <p >
              <span>Description: </span>
              {blogDetails?.desc}
            </p>
            <div >
              <span>{blogDetails?.views} views</span>
              <span>{blogDetails?.likes?.length} likes</span>
            </div>
          </div>
          <div >
            <span><span>Author:</span> {blogDetails?.userId?.username}</span>
            <span><span>Created At:</span> {format(blogDetails?.createdAt)}</span>
          </div>

    </>
  )
}

export default BlogDetails