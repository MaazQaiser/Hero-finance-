import { HeaderV2 } from "@/components/home/v2/HeaderV2";
import { FooterV2 } from "@/components/home/v2/FooterV2";
import { CalculatorExperience } from "@/components/calculator/CalculatorExperience";

export const metadata = {
  title: "Car Finance Calculator | Hero Car Finance",
  description:
    "Estimate monthly payments or see what you can afford with Hero's car finance calculator. Soft search only.",
};

export default function CalculatorPage() {
  return (
    <>
      <div className="bg-paper">
        <div className="w-full px-5">
          <HeaderV2 />
        </div>
      </div>
      <main id="main-content" className="overflow-x-clip pb-24 md:pb-0">
        <CalculatorExperience />
      </main>
      <FooterV2 />
    </>
  );
}
