import React from 'react'
import { useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { request } from '../../utils/fetchApi'

const Create = () => {

    const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [img, setImg] = useState("")
  const [category, setCategory] = useState("")
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const categories = [
    'nature',
    'music',
    'travel',
    'design',
    'programming',
    'fun',
    'fashion'
  ]

  const onChangeFile = (e) => {
    setImg(e.target.files[0])
  }

  const handleCloseImg = () => {
    setImg(null)
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      let filename = null
      if (img) {
        filename = crypto.randomUUID() + img.name
        formData.append("filename", filename)
        formData.append("image", img)

        await fetch(`http://localhost:8000/upload`, {
          method: "POST",
          body: formData
        })
      } else {
        return
      }

      const options = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      const body = {
        title,
        desc,
        category,
        photo: filename
      }


      const data = await request('/blog', "POST", options, body)
      navigate(`/blogDetails/${data._id}`)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>Create
         <form onSubmit={handleCreateBlog} encType="multipart/form-data">
            <div >
              <label>Title: </label>
              <input
                type="text"
                placeholder='Title...'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div >
              <label>Description: </label>
              <input
                type="text"
                placeholder='Description...'
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div >
              <label>Category: </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((category) => (
                  <option key={crypto.randomUUID()} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div >
              <label htmlFor='image' >
                Image: <span>Upload here</span>
              </label>
              <input
                id="image"
                type="file"
                onChange={onChangeFile}
                style={{ display: 'none' }}
              />
              {img && <p >{img.name} </p>}
            </div>
            <div >
              <button type="submit">
                Submit form
              </button>
            </div>
          </form>
    </div>
  )
}

export default Create