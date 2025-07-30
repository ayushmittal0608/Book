import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "../components/ui/input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useBooks } from "../src/BookContext"
import { useAuth } from "../src/AuthContext"

export default function BookList() {
  const { books } = useBooks()
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedBook, setSelectedBook] = useState(null)
  const navigate = useNavigate()
  const [minRating, setMinRating] = useState(0)

  const { setUser } = useAuth()
  

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }
  const filteredBooks = books
  ? books.filter((book) => {
      const matchesType =
        filterType === "all" || book.type === filterType

      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())

      const averageRating =
        book.comments && book.comments.length > 0
          ? book.comments.reduce((acc, c) => acc + Number(c.rating || 0), 0) / book.comments.length
          : 0

      const matchesRating = minRating === 0 || (averageRating >= minRating && averageRating < minRating + 1)

      return matchesType && matchesSearch && matchesRating
    })
  : []


  return (
    <div className="p-1">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-10">
        <img src="logo.jpg" className="h-25 w-auto" alt="Logo" />
        <div className="gap-4 justify-between items-center flex">
        <Button variant="secondary" size="lg" onClick={() => navigate("/add-book")}>
          Add Book
        </Button>
        <button onClick={handleLogout} style={{ float: 'right', margin: '10px' }}>
          Logout
        </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <Input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-full"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-10">
        <Button
          variant={filterType === "all" ? "default" : "outline"}
          onClick={() => setFilterType("all")}
          className={filterType === "all" ? "text-black" : "text-black-600"}
        >
          All
        </Button>
        <Button
          variant={filterType === "borrow" ? "default" : "outline"}
          onClick={() => setFilterType("borrow")}
          className={filterType === "borrow" ? "text-black" : "text-black-600"}
        >
          Books to Borrow
        </Button>
        <Button
          variant={filterType === "have" ? "default" : "outline"}
          onClick={() => setFilterType("have")}
          className={filterType === "have" ? "text-black" : "text-black-600"}
        >
          Books to Have
        </Button>
        <div className="flex gap-2 mb-10 justify-left">
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating ? "default" : "outline"}
              onClick={() => setMinRating(rating)}
              className={minRating === rating ? "text-black" : "text-black-400"}
            >
              {rating === 0 ? "0★" : `${rating}★`}
            </Button>
          ))}
        </div>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20">
        {filteredBooks.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground text-lg py-20">
            No results found.
          </div>
        ) : (
          filteredBooks.map((book) => {
  const averageRating =
    book.comments && book.comments.length > 0
      ? book.comments.reduce((acc, c) => acc + Number(c.rating || 0), 0) / book.comments.length
      : 0;

  return (
    <Link to={`/books/${book._id}`} className="block" key={book._id}>
      <Card
        className="flex flex-col cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => setSelectedBook(book)}
      >
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-100 object-contain rounded-t-md"
        />
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>
            {book.author}
            <span className="ml-2 text-xs px-2 py-1 rounded bg-gray-200">
              {book.type === "borrow" ? "To Borrow" : "To Have"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">{book.description}</p>

          {book.comments && book.comments.length > 0 && (
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-xl ${
                    star <= averageRating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-sm text-gray-600 ml-1">
                ({averageRating.toFixed(1)})
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
})

        )}
      </div>
    </div>
  )
}