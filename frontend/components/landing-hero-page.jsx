
import { Button } from "./ui/button";
import { Star } from "lucide-react";

const Hero7 = ({ 
      heading = "Dive Into Stories, Share Your Reviews, Discover New Reads 📖",
  description = "Share, discover, and review books with a vibrant community of readers. Sign up now to get started!",
  button = {
    text: "Review Books",
    url: "/signup",
  },
  reviews = {
    count: 200,
    rating: 5.0,
  }
 }) => {
  return (
    <section className="py-32 relative">
    

      <div className="container text-center relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">{heading}</h1>
          <p className="text-muted-foreground text-balance lg:text-lg">
            {description}
          </p>
        </div>

        <Button
  asChild
  size="lg"
  className="mt-10 bg-black text-white hover:bg-white hover:text-black transition duration-300"
>
  <a href={button.url}>{button.text}</a>
</Button>

        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className="size-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="mr-1 font-semibold">
                {reviews.rating?.toFixed(1)}
              </span>
            </div>
            <p className="text-muted-foreground text-left font-medium">
              and {reviews.count}+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
