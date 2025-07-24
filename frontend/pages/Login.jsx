import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "../components/login-form"

export default function Login() {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-white relative hidden lg:block">
        <img
          src="/books.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}