export function useVariantClasses() {
  const buildVariant = (base: string, variant: string): Record<string, boolean> => {
    return {
      [base]: true,
      [`${base}--${variant}`]: true,
    }
  }

  return { buildVariant }
}
