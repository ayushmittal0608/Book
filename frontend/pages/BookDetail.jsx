import { useParams, useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { useBooks } from "../src/BookContext"

export default function BookDetail() {
    const { books } = useBooks()
  const { id } = useParams()
  const navigate = useNavigate()
  const book = books.find(b => b.id === Number(id))
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  if (!book) return null

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment])
      setComment("")
    }
  }

  const handleClose = () => {
    navigate(-1)
  }

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>
            <span className="block mb-2">{book.author}</span>
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-60 object-contain rounded mb-4"
            />
            <span className="block mb-2">{book.description}</span>
            <span className="inline-block text-xs px-2 py-1 rounded bg-gray-200">
              {book.type === "borrow" ? "To Borrow" : "To Have"}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
  <h3 className="text-lg font-semibold mb-2">Comments</h3>
  <input
    className="border p-2 w-full mb-2"
    value={comment}
    onChange={e => setComment(e.target.value)}
    placeholder="Add a comment..."
  />
  <Button onClick={handleAddComment} className="mb-4 text-black">Submit Comment</Button>
  <ul>
    {comments.map((c, i) => (
      <li key={i} className="border-b py-2">{c}</li>
    ))}
  </ul>
</div>
      </DialogContent>
    </Dialog>
  )
}