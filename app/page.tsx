import Header from "./components/Header";
import WeddingPackages from "./components/WeddingPackages";
import Link from "next/link";
import ThumbsupIcon from "@/public/images/thumbsup.svg";
import CalendarIcon from "@/public/images/calendar.svg";
import HometownIcon from "@/public/images/hometown.svg";
import Cities from "@/app/components/Cities";
import { Testimonials } from "@/app/components/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col gap-y-16">
      <Header />
      <WeddingPackages show="popular" type="slider" />

      <section className="container mx-auto flex flex-col">
        <h2 className="text-3xl font-bold max-w-md mx-auto text-center mb-8">
          Alasan Mereka Memilih Wedding Package Samawa
        </h2>
        <div className="grid grid-cols-3 gap-10 px-5">
          <div className="flex flex-col border rounded-3xl p-8 gap-y-5 items-start">
            <span className="text-color2">
              <ThumbsupIcon width={96} height={96} />
            </span>
            <span className="flex flex-col gap-y-2">
              <h6 className="font-bold text-xl">Dipercaya Sejak 1970</h6>
              <p className="">
                Lorem ipsum dolor si amet nikah berkah dunia akhirat nantinya
              </p>
            </span>
            <Link href="#" className="text-color2 hover:underline">Learn More</Link>
          </div>
          <div className="flex flex-col border rounded-3xl p-8 gap-y-5 items-start">
            <span className="text-color2">
              <CalendarIcon width={96} height={96} />
            </span>
            <span className="flex flex-col gap-y-2">
              <h6 className="font-bold text-xl">Dipercaya Sejak 1970</h6>
              <p className="">
                Lorem ipsum dolor si amet nikah berkah dunia akhirat nantinya
              </p>
            </span>
            <Link href="#" className="text-color2 hover:underline">Learn More</Link>
          </div>

          <div className="flex flex-col border rounded-3xl p-8 gap-y-5 items-start">
            <span className="text-color2">
              <HometownIcon width={96} height={96} />
            </span>
            <span className="flex flex-col gap-y-2">
              <h6 className="font-bold text-xl">Dipercaya Sejak 1970</h6>
              <p className="">
                Lorem ipsum dolor si amet nikah berkah dunia akhirat nantinya
              </p>
            </span>
            <Link href="#" className="text-color2 hover:underline">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto flex flex-col px-5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold max-w-sm">
            Our Latest & Best Wedding Packages
          </h2>
          <Link
            href="#"
            className="border border-dark1 px-5 py-3 text-center rounded-full font-semibold">
            Explore All
          </Link>
        </div>
        <WeddingPackages show="newest" type="grid" />
      </section>

      <section className="bg-light2 py-16">
        <div className="container px-32 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold max-w-sm">
              Browse Packages City Recomendation
            </h2>
            <Link
              href="#"
              className="border border-dark1 px-5 py-3 text-center rounded-full font-semibold"
            >
              Explore All
            </Link>
          </div>
          <Cities />
        </div>
      </section>

      <section className="flex flex-col px-5">
        <div className="container mx-auto flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold max-w-xs">
            Happy Stories of Our Wedding
          </h2>
          <Link href="#"
            className="border border-dark1 px-5 py-3 text-center rounded-full font-semibold">Explore All</Link>
        </div>
        <Testimonials />
      </section>

      
    </main>
  );
}