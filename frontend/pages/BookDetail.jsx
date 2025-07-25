import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../src/BookContext";
import { useEffect, useState } from "react";
import { Heart, HeartCrack, Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import NotFound from "../pages/NotFound";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "../src/components/ui/alert-dialog";
import axios from "axios";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books } = useBooks();
  const [rating, setRating] = useState(0);
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isHeartLoading, setIsHeartLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const isLoggedIn = true; // Replace with real auth
  const role = "user";     // or "admin"
  

  useEffect(() => {
  console.log("URL id:", id);
  console.log("Books from context:", books);
  const found = books.find((b) => b._id === String(id));
  console.log("Found book:", found);

  if (found) {
    setBook(found);
    axios
      .get(`/api/books/${id}/comments`)
      .then((res) => {
        setComments(res.data.comments || []);
      })
      .catch((err) => {
        console.error("Comments fetch error:", err);
        toast.error("Could not fetch comments");
      });
  } else {
    toast.error("Book not found");
  }

  setIsLoading(false);
}, [id, books]);


  const handleAddComment = async () => {
    if (comment.trim()) {
      const newComment = {
        user: localStorage.getItem("email"),
        content: comment.trim(),
        timestamp: new Date().toLocaleString(),
        rating: Number(rating)
      };

      setComments([newComment, ...comments]);
      setComment("");

      try {
        const res = await axios.post(
          `/api/books/${id}/comments`,
          newComment,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setComments(res.data.comments);
      } catch (error) {
        toast.error("Failed to add comment");
      }
    }
  };

  const toggleFavorite = () => {
    setIsHeartLoading(true);
    setTimeout(() => {
      setIsLiked((prev) => !prev);
      setIsHeartLoading(false);
    }, 500);
  };

  const handleDelete = () => {
    setIsDeleteLoading(true);
    axios
      .delete(`/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/books");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Delete failed");
      })
      .finally(() => setIsDeleteLoading(false));
  };

  if (isLoading) {
    return (
      <div className="w-full py-20">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!book) return <NotFound />;

  return (
    <div className="max-w-5xl px-4 py-6 mx-auto space-y-6 dark:text-white">
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={book.cover}
          alt={book.title}
          className="rounded-lg max-w-[300px] object-cover"
        />

        <div className="space-y-4 w-full">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <h2 className="text-xl italic">by {book.author}</h2>

          {book.description && (
            <div>
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="italic text-gray-700 dark:text-gray-300">{book.description}</p>
            </div>
          )}

          <div className="flex gap-3 items-center pt-2">
            <Button
              variant="outline"
              onClick={toggleFavorite}
              className={`border-2 ${isLiked ? "bg-red-100 dark:bg-red-800/40 border-red-300" : ""}`}
            >
              {isHeartLoading ? (
                <Loader2 className="animate-spin h-5 w-5 text-red-500" />
              ) : isLiked ? (
                <HeartCrack className="text-red-500 w-5 h-5" />
              ) : (
                <Heart className="text-red-500 w-5 h-5" />
              )}
              <span className="ml-2">{isLiked ? "Added to Favourites" : "Add to Favourites"}</span>
            </Button>

            {role === "admin" && (
              <>
                <Button variant="outline" onClick={() => navigate("edit")}>
                  <Pencil className="w-4 h-4 mr-2" /> Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this book?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action is irreversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button variant="destructive" onClick={handleDelete}>
                        {isDeleteLoading ? (
                          <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        ) : null}
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
         <h3 className="text-2xl font-semibold">Add your comments</h3>
        <div className="flex items-center gap-1">
          <h5>Star Rating:</h5>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className={`cursor-pointer text-3xl ${
            star <= rating ? 'text-yellow-400' : 'text-gray-400'
          }`}
        >
          ★
        </span>
      ))}
    </div>

       
        <div className="flex gap-2">
          <input
            placeholder="Write your comment here..."
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          
          <button
            onClick={handleAddComment}
            className="px-4 py-2 text-black bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </div>

      {comments.map((c, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-700 p-3 shadow-sm rounded-md mt-2"
        >
          <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">
            <span className="font-medium">{c.user}</span> • {c.timestamp}
          </div>
          <div className="flex gap-1 text-yellow-400 mb-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < Number(c.rating) ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
          <div>{c.content}</div>
        </div>
      ))}
    </div>
  );
}
