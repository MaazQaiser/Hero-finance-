import { HeaderV2 } from "@/components/home/v2/HeaderV2";
import { HeroV2 } from "@/components/home/v2/HeroV2";

export function HeroWithVideoV2() {
  return (
    <div className="bg-white">
      <div className="w-full px-5">
        <HeaderV2 />
      </div>
      <HeroV2 />
    </div>
  );
}
