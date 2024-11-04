export function splitIntoTwoColumns(arr: { value: string; label: string }[]) {
  const midIndex = Math.ceil(arr.length / 2);
  const firstColumn = arr.slice(0, midIndex);
  const secondColumn = arr.slice(midIndex);

  return [firstColumn, secondColumn];
}
