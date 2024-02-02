export function parseCoordinate(string: string): number {
	const result = parseFloat(string.trim());
	return Number.isNaN(result) ? 0 : result;
}

export function roundCoordinate(
	incomeValue: number,
	roundAmount: number
): number {
	return roundAmount !== 0
		? Math.round(incomeValue * roundAmount) / roundAmount
		: incomeValue;
}
