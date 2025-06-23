import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "FAQ | C4 Chashma",
  description:
    "Find answers to frequently asked questions about C4 Chashma's products, services, shipping, returns, and more.",
}

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

        <div className="mb-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I know which glasses will suit my face?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  Choosing the right glasses for your face shape is important for both comfort and style. Here are some
                  general guidelines:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Round Face:</strong> Angular or rectangular frames can add definition.
                  </li>
                  <li>
                    <strong>Square Face:</strong> Round or oval frames can soften angular features.
                  </li>
                  <li>
                    <strong>Oval Face:</strong> Most frame shapes work well with oval faces.
                  </li>
                  <li>
                    <strong>Heart-shaped Face:</strong> Frames that are wider at the top and narrower at the bottom.
                  </li>
                  <li>
                    <strong>Diamond Face:</strong> Cat-eye or oval frames work well.
                  </li>
                </ul>
                <p className="mt-4">
                  Visit our store for a personalized consultation, where our experts can help you find the perfect pair
                  based on your face shape, personal style, and preferences.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Do you offer eye tests?</AccordionTrigger>
              <AccordionContent>
                <p>Yes, we offer comprehensive eye tests conducted by qualified optometrists. Our eye tests include:</p>
                <ul className="list-disc pl-5 space-y-2 my-4">
                  <li>Visual acuity assessment</li>
                  <li>Refraction test to determine your prescription</li>
                  <li>Eye health examination</li>
                  <li>Intraocular pressure check</li>
                </ul>
                <p>
                  You can book an appointment by calling us at +91 98765 43210 or visiting our store. We recommend
                  getting your eyes tested at least once every two years, or more frequently if advised by your
                  optometrist.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How long does it take to get my glasses?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Once you place an order, it typically takes 3-5 business days for your glasses to be ready. For
                  complex prescriptions or specialized lenses, it might take 7-10 business days. We'll keep you updated
                  on the status of your order and notify you when your glasses are ready for pickup or shipping.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What types of lenses do you offer?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">We offer a variety of lens types to suit different needs:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Single Vision Lenses:</strong> For correcting nearsightedness, farsightedness, or
                    astigmatism.
                  </li>
                  <li>
                    <strong>Bifocal Lenses:</strong> With two distinct optical powers for near and far vision.
                  </li>
                  <li>
                    <strong>Progressive Lenses:</strong> Multifocal lenses with a gradual transition between different
                    prescriptions.
                  </li>
                  <li>
                    <strong>Blue Light Blocking Lenses:</strong> Designed to filter out harmful blue light from digital
                    screens.
                  </li>
                  <li>
                    <strong>Photochromic Lenses:</strong> These darken automatically when exposed to sunlight.
                  </li>
                  <li>
                    <strong>Polarized Lenses:</strong> For sunglasses to reduce glare and improve visual clarity.
                  </li>
                </ul>
                <p className="mt-4">
                  Our opticians can help you choose the best lens type based on your prescription, lifestyle, and
                  budget.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Do you accept insurance?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, we accept most major insurance plans. Please contact us with your insurance details, and we'll be
                  happy to verify your coverage. We can also help you understand what your insurance covers and assist
                  with filing claims. For specific questions about your coverage, it's best to contact your insurance
                  provider directly.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  We offer a 7-day return policy for all our products. If you're not satisfied with your purchase, you
                  can return it for a full refund or exchange, provided:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The product is in its original condition</li>
                  <li>You have the original receipt or proof of purchase</li>
                  <li>The return is made within 7 days of purchase</li>
                </ul>
                <p className="mt-4">
                  For prescription glasses, we offer a 30-day adaptation guarantee. If you're having trouble adapting to
                  your new prescription, we'll work with you to make necessary adjustments at no additional cost.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>How do I care for my glasses?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">Proper care can extend the life of your glasses. Here are some tips:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Clean your lenses daily with a microfiber cloth and lens cleaner</li>
                  <li>
                    Avoid using tissues, paper towels, or clothing to clean your lenses as they can scratch the surface
                  </li>
                  <li>Always store your glasses in a case when not in use</li>
                  <li>Hold your frames with both hands when putting them on or taking them off</li>
                  <li>
                    Avoid leaving your glasses in hot places (like your car dashboard) as heat can damage the frames and
                    lenses
                  </li>
                  <li>
                    Rinse your glasses with lukewarm water before cleaning to remove dust particles that could scratch
                    the lenses
                  </li>
                </ul>
                <p className="mt-4">
                  We offer free adjustments and minor repairs for glasses purchased from our store. Visit us anytime if
                  your glasses need tightening or realignment.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>Do you offer sunglasses with prescription lenses?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, we offer a wide range of sunglasses that can be fitted with prescription lenses. You can choose
                  from various frame styles and lens options, including polarized and gradient tints. Our prescription
                  sunglasses provide both vision correction and UV protection, making them perfect for outdoor
                  activities. Visit our store to explore our collection of prescription sunglasses.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>How often should I get my eyes checked?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">We recommend getting your eyes checked:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Every 1-2 years</strong> for adults wearing glasses or contact lenses
                  </li>
                  <li>
                    <strong>Every 2 years</strong> for healthy adults not requiring vision correction
                  </li>
                  <li>
                    <strong>Annually</strong> for children and adults over 65
                  </li>
                  <li>
                    <strong>More frequently</strong> if you have certain medical conditions like diabetes or a family
                    history of eye diseases
                  </li>
                </ul>
                <p className="mt-4">
                  Regular eye exams are important not only for updating your prescription but also for detecting eye
                  health issues early. Our optometrists can provide personalized recommendations based on your age,
                  health, and vision needs.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>Do you offer any warranty on your products?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, all our frames come with a 1-year warranty against manufacturing defects. This covers issues like
                  loose hinges, discoloration, or peeling of the frame coating under normal use conditions. Lenses have
                  a 6-month warranty against coating defects. The warranty does not cover damage due to accidents,
                  improper use, or normal wear and tear. We also offer extended warranty options for additional
                  protection. Please keep your receipt as proof of purchase for warranty claims.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-700 mb-6">
            If you couldn't find the answer to your question, please don't hesitate to contact us. Our customer service
            team is always ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-red-500 hover:bg-red-600 text-white">Contact Us</Button>
            </Link>
            <Button variant="outline">Call +91 98765 43210</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
