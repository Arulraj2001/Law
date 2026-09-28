import { getSiteSettingsFull } from "@/lib/sanity/queries";
import { WHY_US } from "@/lib/constants";
import { WhyUsSectionClient } from "./WhyUsSectionClient";

export async function WhyUsSection() {
  let features = WHY_US;

  try {
    const settings = await getSiteSettingsFull();
    if (settings?.whyUsFeatures?.length > 0) {
      features = settings.whyUsFeatures;
    }
  } catch {
    // Fall back to WHY_US
  }

  return <WhyUsSectionClient features={features} />;
}

export default WhyUsSection;
