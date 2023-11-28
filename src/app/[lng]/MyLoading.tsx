import Image from "next/image";
import loadingImage from "@/public/images/loading.png";
import { useTranslation } from "@/app/i18n";

export default async function MyLoading({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng, "loading");
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1E293B] py-11">
      <div className="text-center">
        <Image
          src={loadingImage}
          priority
          alt=" loading img"
          className="mx-auto max-h-64 max-w-[400px]"
        />
        <p className="my-10 text-3xl font-bold leading-none text-white md:text-6xl md:leading-none">
          {t("總統開票懶人包")}
        </p>
        <p className="my-10 text-xl font-bold leading-none text-white md:text-3xl md:leading-none">
          Loading...
        </p>
      </div>
    </div>
  );
}
