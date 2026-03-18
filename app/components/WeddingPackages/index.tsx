import Slider from "@/app/components/Slider";
import { getData } from "@/app/components/WeddingPackages/actions";
import { PropsWeddingPackagesWrapper, TPackage, TShow } from "@/app/components/WeddingPackages/types";
import Image from "next/image";
import Link from "next/link";
import PinpointIcon from "@/public/images/pinpoint.svg";
import PopularIcon from "@/public/images/popular.svg";
import HometownIcon from "@/public/images/hometown.svg";

const title: {
    [key in TShow]: {
        value: TShow;
        label: string
    }
} = {
    popular: {
        value: 'popular',
        label: 'popular'
    },
    newest: {
        value: 'newest',
        label: 'newest'
    }
}

function WeddingPackageSlider({ data }: { data: TPackage[] }) {
    return (
        <Slider swiperClassName="w-full h-[380px]" swiperSliderClassName="px-12">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="card-slide h-full rounded-3xl overflow-hidden relative"
                >
                    <figure className="w-full h-full absolute">
                        <Image
                            className="w-full h-full object-cover object-center"
                            src={item.thumbnail}
                            alt={item.name}
                            fill
                            unoptimized={process.env.NODE_ENV === "development"} />
                    </figure>
                    <div className="card-slide-content flex flex-col items-start gap-y-5">
                        <span className="bg-color1 rounded-full text-light1 inline-flex gap-x-2 items-center text-sm py-1 px-3 uppercase">
                            <PopularIcon width={16} height={16} />
                            {item.name}
                        </span>
                        <span className="flex flex-col gap-y-1">
                            <h6 className="text-[28px] font-bold">
                                {item.name}
                            </h6>
                            <span className="text-xl text-color2 font-semibold"
                            >{`Rp. ${item.price.toLocaleString('id-ID')}`}</span
                            >
                        </span>
                        <span className="flex gap-x-4">
                            <span className="flex gap-x-2 items-center">
                                <PinpointIcon width={32} height={32} />
                                {item.city.name}
                            </span>
                            <span className="flex gap-x-2 items-center">
                                <HometownIcon width={32} height={32} />
                                {item.about}
                            </span>
                        </span>
                        <Link
                            href={`/wedding-details/${item.id}`}
                            className="flex justify-center bg-color2 py-2 w-full text-light1 rounded-full"
                        >View Package</Link>
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default async function WeddingPackages({ show, type }: PropsWeddingPackagesWrapper) {
    const { data }: { data: TPackage[] } = await getData(show);
    if (type === "grid") {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.price}</p>
                    </div>
                ))}
            </div>
        )
    }
    if (type === "slider") {
        return (
            <WeddingPackageSlider data={data} />
        )
    }
    return (
        null
    );
}