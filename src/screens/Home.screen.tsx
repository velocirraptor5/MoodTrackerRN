import React from 'react';
import {
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { useAppContext } from '../App.provider';
import { Theme } from '../theme';

const imageUrl =
	'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const Home: React.FC = () => {
	const appContext = useAppContext();

	return (
		<ImageBackground
			source={{ uri: imageUrl }}
			style={stylesFC(appContext.appTheme).container}>
			<MoodPicker handleMoodSelection={appContext.handleMoodSelection} />
		</ImageBackground>
	);
};

// const theme = useAppContext().appTheme;

const stylesFC = (theme: Theme) =>
	StyleSheet.create({
		squeare: {
			width: 100,
			height: 100,
			backgroundColor: 'red',
		},
		container: {
			flex: 1,
			backgroundColor: theme.colors.primary,
			justifyContent: 'center',
		},
	});
