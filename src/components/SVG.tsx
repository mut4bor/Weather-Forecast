type SVGProps = {
	href: string;
	svgClassName?: string;
	useClassName?: string;
};

export default function SVG(props: SVGProps) {
	return (
		<svg className={props.svgClassName}>
			<use className={props.useClassName} href={props.href} />
		</svg>
	);
}
