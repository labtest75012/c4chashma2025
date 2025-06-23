"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Fashion Designer",
    content:
      "I've been buying glasses from C4 Chashma for years. Their collection is always up-to-date with the latest trends, and the quality is exceptional. The staff is knowledgeable and helped me find the perfect pair for my face shape.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Software Engineer",
    content:
      "As someone who spends long hours in front of a computer, finding the right glasses was crucial. C4 Chashma recommended their blue light blocking lenses, and it's made a huge difference in reducing eye strain. Great service and products!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "College Student",
    content:
      "Affordable prices without compromising on style or quality! I got so many compliments on my new glasses from C4 Chashma. The eye test was thorough and the optician took time to explain everything clearly.",
    rating: 4,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Business Professional",
    content:
      "I needed prescription sunglasses for driving, and C4 Chashma delivered beyond my expectations. The polarized lenses they recommended are perfect, and the frames are both professional and stylish. Excellent customer service!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">What Our Customers Say</h2>
        <p className="text-gray-500 text-center mb-12">Over 5,000 happy customers with 5-star Google reviews</p>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <Image
                      src={testimonials[current].image || "/placeholder.svg"}
                      alt={testimonials[current].name}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonials[current].rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 mb-6 italic">"{testimonials[current].content}"</p>
                  <div>
                    <p className="font-semibold text-lg">{testimonials[current].name}</p>
                    <p className="text-gray-500">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 mx-1 rounded-full transition-all duration-300 ${
                  current === index ? "bg-red-500 w-8" : "bg-gray-300"
                }`}
                onClick={() => {
                  setDirection(index > current ? 1 : -1)
                  setCurrent(index)
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
