
function modifyStringNumbersFromObject<TUniqueFilters extends object = object>(
  obj: TUniqueFilters
): TUniqueFilters {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (Array.isArray(value) || typeof value === 'boolean') return acc;

    if (!isNaN(+(value as number))) {
      // @ts-ignore
      acc[key] = +(value as string);
    }

    return acc;
  }, obj as TUniqueFilters);
}
