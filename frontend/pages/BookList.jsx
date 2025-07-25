import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "../components/ui/input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useBooks } from "../src/BookContext"

export default function BookList() {
  const { books } = useBooks()
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedBook, setSelectedBook] = useState(null)
  const navigate = useNavigate()

  const filteredBooks = books
    ? books.filter(
        (book) =>
          (filterType === "all" || book.type === filterType) &&
          (book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase()))
      )
    : []

  return (
    <div className="p-1">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-10">
        <img src="logo.jpg" className="h-25 w-auto" alt="Logo" />
        <Button variant="secondary" size="lg" onClick={() => navigate("/add-book")}>
          Add Book
        </Button>
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
      <div className="flex gap-2 mb-10 justify-center">
        <Button
          variant={filterType === "all" ? "default" : "outline"}
          onClick={() => setFilterType("all")}
          className={filterType === "all" ? "text-black" : "text-blue-600"}
        >
          All
        </Button>
        <Button
          variant={filterType === "borrow" ? "default" : "outline"}
          onClick={() => setFilterType("borrow")}
          className={filterType === "borrow" ? "text-black" : "text-blue-600"}
        >
          Books to Borrow
        </Button>
        <Button
          variant={filterType === "have" ? "default" : "outline"}
          onClick={() => setFilterType("have")}
          className={filterType === "have" ? "text-black" : "text-blue-600"}
        >
          Books to Have
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20">
        {filteredBooks.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground text-lg py-20">
            No results found.
          </div>
        ) : (
          filteredBooks.map((book) => (
            
                <Link to={`/books/${book.id}`} className="block">
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
                      <p className="text-sm text-muted-foreground">{book.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              
              
                    
           
          ))
        )}
      </div>
    </div>
  )
}