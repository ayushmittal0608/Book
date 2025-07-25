import { useState } from "react"
import { useNavigate } from "react-router-dom" // or next/router if using Next.js
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function LoginForm({ className, ...props }) {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
      } else {
        localStorage.setItem("email", data.email)
        alert("Login successful")
        navigate("/books") // Change to your route
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Your Email ID" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Your password" value={formData.password} onChange={handleChange} required />
        </div>
        <Button type="submit" variant="primary" className="w-full">
          Login
        </Button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
