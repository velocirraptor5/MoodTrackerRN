import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';
import { Theme } from '../theme';
import { globalStyles } from '../styles';
import { groupBy } from 'lodash';
import { VictoryPie } from 'victory-native';

export const Analytics: React.FC = () => {
	const appContext = useAppContext();
	const styles = stylesFC(appContext.appTheme);

	const data = Object.entries(groupBy(appContext.moodList, 'mood.emoji')).map(
		([key, value]) => ({
			x: key,
			y: value.length,
		}),
	);

	return (
		<View style={styles.container}>
			<VictoryPie data={data} />
			<Pressable style={styles.button} onPress={() => appContext.deleteData()}>
				<Text>Delete app data</Text>
			</Pressable>
		</View>
	);
};

const stylesFC = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.primary,
		},
		button: {
			...globalStyles(theme).button,
		},
	});
