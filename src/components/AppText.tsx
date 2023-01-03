import React from 'react';
import { Text, TextProps } from 'react-native';
import { Theme } from '../theme';

type AppTextProps = TextProps & {
	theme: Theme;
	fontFamily: 'regular' | 'bold' | 'light';
	size: number;
};

export const AppText: React.FC<AppTextProps> = ({
	children,
	theme,
	fontFamily,
	size,
	style,
	...props
}) => {
	const fontStyle = React.useMemo(() => {
		if (fontFamily === 'regular') {
			return { fontFamily: theme.fonts.regular };
		}
		if (fontFamily === 'bold') {
			return { fontFamily: theme.fonts.bold };
		}
		if (fontFamily === 'light') {
			return { fontFamily: theme.fonts.light };
		}
	}, [fontFamily]);

	return (
		<Text {...props} style={[style, fontStyle]}>
			{children}
		</Text>
	);
};
