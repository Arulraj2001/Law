export function validateSchema(
  schema: Record<string, unknown>,
  name: string
): void {
  if (process.env.NODE_ENV !== "development") return;

  // Basic validation
  if (!schema["@context"]) {
    console.warn(`[SEO] Schema "${name}" missing @context`);
  }
  if (!schema["@type"]) {
    console.warn(`[SEO] Schema "${name}" missing @type`);
  }

  // Log in dev
  console.log(`[SEO] Schema loaded: ${name}`, schema["@type"]);
}
