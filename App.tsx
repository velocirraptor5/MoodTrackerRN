import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';
import { AppProvider } from './src/App.provider';
import {
	Kalam_300Light,
	Kalam_400Regular,
	Kalam_700Bold,
	useFonts,
} from '@expo-google-fonts/kalam';
import { AppLoading } from './src/App.loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
	// React.useEffect(() => {
	// 	SplashScreen.hide();
	// }, []);

	let [fontsLoaded] = useFonts({
		Kalam_700Bold,
		Kalam_400Regular,
		Kalam_300Light,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<GestureHandlerRootView style={styles.container}>
			<AppProvider>
				<NavigationContainer>
					<BottomTabsNavigator />
				</NavigationContainer>
			</AppProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
