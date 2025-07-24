import { GalleryVerticalEnd } from "lucide-react"

import { SignupForm } from "../components/signup-form"

export default function Signup() {
  return (
    <div className="grid lg:grid-cols-2">
      
      <div className="bg-white relative hidden lg:block">
        <img
          src="/book.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}