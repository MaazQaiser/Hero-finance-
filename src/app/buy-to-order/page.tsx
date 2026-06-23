import { BuyToOrderBenefits } from "@/components/buy-to-order/BuyToOrderBenefits";
import { BuyToOrderFinalCta } from "@/components/buy-to-order/BuyToOrderFinalCta";
import { BuyToOrderForm } from "@/components/buy-to-order/BuyToOrderForm";
import { BuyToOrderHeader, BuyToOrderHero } from "@/components/buy-to-order/BuyToOrderHero";
import { BuyToOrderHowItWorks } from "@/components/buy-to-order/BuyToOrderHowItWorks";
import { BuyToOrderRecent } from "@/components/buy-to-order/BuyToOrderRecent";
import { BuyToOrderTrust } from "@/components/buy-to-order/BuyToOrderTrust";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Buy to Order | Hero Car Finance",
  description:
    "Can't find your perfect car? Tell us what you need and our sourcing experts will find it — AA inspected, with finance arranged.",
};

export default function BuyToOrderPage() {
  return (
    <>
      <BuyToOrderHeader />
      <main>
        <BuyToOrderHero />
        <BuyToOrderHowItWorks />
        <BuyToOrderBenefits />
        <BuyToOrderForm />
        <BuyToOrderTrust />
        <BuyToOrderRecent />
        <BuyToOrderFinalCta />
      </main>
      <Footer />
    </>
  );
}
