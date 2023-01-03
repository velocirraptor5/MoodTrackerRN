import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { History } from './History.screen';
import { Home } from './Home.screen';
import { Analytics } from './Analytics.screen';
import { Header } from './Header.screen';
import { AnalyticsIcon, HistoryIcon, HomeIcon } from '../components/Icons';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
	return (
		<BottomTabs.Navigator
			screenOptions={({ route, navigation }) => ({
				header: () => {
					return <Header route={route} navigation={navigation} />;
				},
				tabBarIcon: ({ color, size }) => {
					if (route.name === 'Home') {
						return <HomeIcon color={color} size={size} />;
					}
					if (route.name === 'History') {
						return <HistoryIcon color={color} size={size} />;
					}
					if (route.name === 'Analytics') {
						return <AnalyticsIcon color={color} size={size} />;
					}
					return null;
				},
			})}>
			<BottomTabs.Screen
				name="Home"
				component={Home}
				options={{ title: "Today's Mood" }}
			/>
			<BottomTabs.Screen
				name="History"
				component={History}
				options={{ title: 'Past Moods' }}
			/>
			<BottomTabs.Screen
				name="Analytics"
				component={Analytics}
				options={{ title: 'fancy graphs' }}
			/>
		</BottomTabs.Navigator>
	);
};
