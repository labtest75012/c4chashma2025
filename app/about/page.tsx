import Image from "next/image"
import { Check } from "lucide-react"

export const metadata = {
  title: "About Us | C4 Chashma",
  description:
    "Learn about C4 Chashma, our story, mission, and commitment to providing quality eyewear at affordable prices.",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">About C4 Chashma</h1>

        <div className="mb-12 relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
          <Image
            src="/placeholder.svg?height=400&width=1000"
            alt="C4 Chashma store"
            width={1000}
            height={400}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-white/90 text-lg max-w-xl">
              Founded in 2015, C4 Chashma has been dedicated to providing high-quality eyewear at affordable prices. Our
              journey began with a simple mission: to make stylish and functional eyewear accessible to everyone.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At C4 Chashma, our mission is to enhance vision and style through innovative eyewear solutions. We believe
              that glasses are not just a visual aid but also a fashion statement that reflects your personality.
            </p>
            <p className="text-gray-700">
              We strive to offer a diverse range of eyewear options that cater to different preferences, needs, and
              budgets. Our commitment to quality, affordability, and customer satisfaction drives everything we do.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-red-500 mt-1" />
                <span className="text-gray-700">
                  <strong>Quality:</strong> We source only the finest materials and work with skilled craftsmen to
                  ensure our products meet the highest standards.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-red-500 mt-1" />
                <span className="text-gray-700">
                  <strong>Affordability:</strong> We believe that quality eyewear should be accessible to everyone,
                  which is why we offer competitive prices without compromising on quality.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-red-500 mt-1" />
                <span className="text-gray-700">
                  <strong>Innovation:</strong> We continuously explore new designs, materials, and technologies to
                  enhance the functionality and aesthetics of our products.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-red-500 mt-1" />
                <span className="text-gray-700">
                  <strong>Customer-Centric:</strong> We prioritize customer satisfaction and strive to provide
                  exceptional service at every touchpoint.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Choose C4 Chashma?</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="border rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-700">
                We offer high-quality eyewear made from durable materials that ensure longevity and comfort.
              </p>
            </div>
            <div className="border rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
              <p className="text-gray-700">
                We believe in making quality eyewear accessible to everyone through competitive pricing.
              </p>
            </div>
            <div className="border rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Consultation</h3>
              <p className="text-gray-700">
                Our trained opticians provide personalized advice to help you find the perfect eyewear for your needs.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-lg">Team Member {i}</h3>
                <p className="text-gray-500">Position</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Visit Our Store</h2>
          <p className="text-gray-700 mb-6">
            We invite you to visit our store and experience our wide range of eyewear collections. Our friendly staff is
            always ready to assist you in finding the perfect pair of glasses.
          </p>
          <div className="aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.1909761!3d28.5356211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzA4LjIiTiA3N8KwMTEnMjcuNSJF!5e0!3m2!1sen!2sin!4v1620287563267!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  )
}
