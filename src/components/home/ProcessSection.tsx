import { getSiteSettingsFull } from "@/lib/sanity/queries";
import { PROCESS_STEPS } from "@/lib/constants";
import { ProcessSectionClient } from "./ProcessSectionClient";

export async function ProcessSection() {
  let steps = PROCESS_STEPS;
  let phone: string | undefined;

  try {
    const settings = await getSiteSettingsFull();
    if (settings?.processSteps?.length > 0) {
      steps = settings.processSteps;
    }
    if (settings?.phone) {
      phone = settings.phone;
    }
  } catch {
    // Fall back to constants
  }

  return <ProcessSectionClient steps={steps} phone={phone} />;
}

export default ProcessSection;

