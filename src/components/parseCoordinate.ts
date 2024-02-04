export function parseCoordinate(value: string | number): number {
	const result = typeof value === 'string' ? parseFloat(value.trim()) : value;
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
