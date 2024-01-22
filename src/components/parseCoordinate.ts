export function parseCoordinate(string: string): number {
	const result = parseFloat(string.trim());
	return Number.isNaN(result) ? 0 : result;
}

export function roundCoordinate(
	incomeValue: number,
	roundAmount: number
): number {
	const result = Math.round(incomeValue * roundAmount) / roundAmount;
	return result;
}
