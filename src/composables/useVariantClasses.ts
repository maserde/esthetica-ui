export function useVariantClasses() {
  const buildVariant = (
    base: string,
    variant: string,
    declareBase: boolean = true,
  ): Record<string, boolean> => {
    const classes: Record<string, boolean> = {
      [`${base}--${variant}`]: true,
    }
    if (declareBase) {
      classes[base] = true
    }
    return classes
  }

  return { buildVariant }
}
