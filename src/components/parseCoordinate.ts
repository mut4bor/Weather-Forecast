export function parseCoordinate(string: string): number {
  const result = parseFloat(string.trim());
  return Number.isNaN(result) ? 0 : result;
}