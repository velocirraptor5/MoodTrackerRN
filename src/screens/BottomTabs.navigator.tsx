import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { History } from './History.screen';
import { Home } from './Home.screen';
import { Analytics } from './Analytics.screen';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator2: React.FC = () => {
	return (
		<BottomTabs.Navigator>
			<BottomTabs.Screen name="Home" component={Home} />
			<BottomTabs.Screen name="History" component={History} />
			<BottomTabs.Screen name="Analytics" component={Analytics} />
		</BottomTabs.Navigator>
	);
};
export const BottomTabsNavigator: React.FC = () => {
	return (
		<BottomTabs.Navigator>
			<BottomTabs.Screen name="Home" component={Home} />
			<BottomTabs.Screen name="History" component={History} />
			<BottomTabs.Screen name="Analytics" component={Analytics} />
			<BottomTabs.Screen name="Analytics2" component={BottomTabsNavigator2} />
		</BottomTabs.Navigator>
	);
};
