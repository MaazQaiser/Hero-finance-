import { Header } from "@/components/Header";
import { FooterV2 } from "@/components/home/v2/FooterV2";
import { CalculatorExperience } from "@/components/calculator/CalculatorExperience";

export const metadata = {
  title: "Car Finance Calculator | Hero Car Finance",
  description:
    "Estimate monthly payments, see what you can afford, or calculate your deposit with Hero's car finance calculator. Soft search only.",
};

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="overflow-x-clip pb-24 md:pb-0">
        <CalculatorExperience />
      </main>
      <FooterV2 />
    </>
  );
}
