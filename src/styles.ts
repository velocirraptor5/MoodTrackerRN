import { StyleSheet } from 'react-native';
import { useAppContext } from './App.provider';
import { Theme } from './theme';

export const globalStyles = (theme: Theme) =>
	StyleSheet.create({
		button: {
			backgroundColor: theme.colors.secondary,
			borderRadius: 20,
			alignSelf: 'center',
			padding: 10,
		},
		buttonText: {
			color: theme.colors.primary,
			textAlign: 'center',
		},
	});
