import Slider from "@/app/components/Slider";
import { getData } from "./actions";
import { TTestimonial } from "./types";
import StarIcon from "@/public/images/star.svg";

function Content({ data }: { data: TTestimonial[] }) {
    return (
        data.map((item) => (
            <div key={item.id} className="flex flex-col border p-7 rounded-3xl gap-y-4 h-full overflow-hidden">
                <span className="flex gap-x-1 text-color3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon key={index} width={22} height={20} />
                    ))}
                </span>
                <p className="line-clamp-5">
                    {item.message}
                </p>
                <span className="flex gap-x-4 items-center mt-auto">
                    <span className="relative w-[80px] aspect-square rounded-full overflow-hidden">
                        <img src={item.photo} alt={item.name} className="w-full h-full object-cover absolute" />
                    </span>
                    <span className="flex flex-col">
                        <span className="text-xl font-bold">{item.name}</span>
                        <span className="">{item.occupation}</span>
                    </span>
                </span>
            </div>
        ))
    );
};

export async function Testimonials() {
    const { data }: { data: TTestimonial[] } = await getData();
    return (
        <div className="relative pb-16">
            <Slider swiperClassName="w-full" swiperSliderClassName="!w-[340px] !h-[400px] -mx-2 px-6">
                <Content data={data} />
            </Slider>
        </div>
    )
}