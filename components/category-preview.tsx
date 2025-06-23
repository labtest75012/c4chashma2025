import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

type CategoryPreviewProps = {
  title: string
  description: string
  imageUrl: string
  link: string
}

export default function CategoryPreview({ title, description, imageUrl, link }: CategoryPreviewProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-md h-[300px] sm:h-[350px] md:h-[400px] transition-all">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 z-10" />
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 z-20">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-gray-200 mb-3 sm:mb-4 line-clamp-2">{description}</p>
        <Link href={link} className="block w-full sm:w-auto">
          <Button className="bg-white text-black hover:bg-gray-100 rounded-full w-full sm:w-auto text-sm sm:text-base py-2 h-auto">
            Shop Now <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
