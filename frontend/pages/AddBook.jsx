import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useBooks } from "../src/BookContext"

export default function AddBook() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [cover, setCover] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("borrow")
  const navigate = useNavigate()
  const { addBook } = useBooks() // Use context

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCover(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !author || !cover || !description) return
    addBook({
      id: Date.now(),
      title,
      author,
      cover,
      description,
      type,
    })
    navigate("/books")
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {cover && (
          <img src={cover} alt="Preview" className="w-full h-40 object-contain mb-2" />
        )}
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <select
          className="border p-2 w-full"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="borrow">To Borrow</option>
          <option value="have">To Have</option>
        </select>
        <Button type="submit" className="w-full text-black">Add Book</Button>
      </form>
    </div>
  )
}