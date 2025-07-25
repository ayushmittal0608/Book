"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function SignupForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (res.ok) {
        setMessage("Account created successfully.")
        // Optionally redirect or clear form
        // router.push("/login")
      } else {
        setMessage(result.error || "Signup failed.")
      }
    } catch (error) {
      setMessage("Something went wrong.")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Let's get started. Fill in the details below to create your account.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Your Email ID" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Your Password" value={formData.password} onChange={handleChange} required />
          <p className="text-xs text-left text-muted-foreground">Minimum 8 characters</p>
        </div>
        <Button type="submit" variant="secondary" className="w-full" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </Button>
        {message && <p className="text-sm text-center text-red-500">{message}</p>}
      </div>
      <div className="text-center text-sm">
        Have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  )
}
