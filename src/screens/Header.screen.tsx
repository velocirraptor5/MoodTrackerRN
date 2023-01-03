import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles';
import { useAppContext } from '../App.provider';
import { Theme, dark, light } from '../theme';

type HeaderProps = {
	route: RouteProp<Record<string, object | undefined>, string>;
	navigation: BottomTabNavigationProp<Record<string, object | undefined>>;
};

export const Header: React.FC<HeaderProps> = ({ route, navigation }) => {
	const appContext = useAppContext();
	const styles = stylesFC(appContext.appTheme);

	return (
		<View style={styles.container}>
			<View style={styles.statusbar}></View>
			<View style={styles.header}>
				<Text style={styles.title}>{route.name}</Text>
				<Pressable
					style={styles.button}
					onPress={() => {
						appContext.setAppTheme(
							appContext.appTheme === light ? dark : light,
						);
					}}>
					<Text>Analytics</Text>
				</Pressable>
			</View>
		</View>
	);
};

// const theme = useAppContext().appTheme === 'light' ? light : dark;

// styles for the header
const stylesFC = (theme: Theme) => {
	const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

	return StyleSheet.create({
		container: {
			height: 50 + StatusBarHeight,
			flexDirection: 'column',
		},
		statusbar: {
			height: StatusBarHeight,
			backgroundColor: theme.colors.secondary,
		},
		header: {
			// flex: 1,
			flexDirection: 'row',
			backgroundColor: theme.colors.secondary,
			justifyContent: 'space-between',
		},
		title: {
			fontSize: 20,
			color: theme.colors.primary,
			padding: 10,
			fontFamily: theme.fonts.bold,
		},
		button: {
			...globalStyles(theme).button,
			backgroundColor: theme.colors.quaternary,
			marginRight: 15,
		},
	});
};
