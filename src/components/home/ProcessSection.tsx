import { getSiteSettingsFull } from "@/lib/sanity/queries";
import { PROCESS_STEPS } from "@/lib/constants";
import { ProcessSectionClient } from "./ProcessSectionClient";

export async function ProcessSection() {
  let steps = PROCESS_STEPS;

  try {
    const settings = await getSiteSettingsFull();
    if (settings?.processSteps?.length > 0) {
      steps = settings.processSteps;
    }
  } catch {
    // Fall back to PROCESS_STEPS
  }

  return <ProcessSectionClient steps={steps} />;
}

export default ProcessSection;
