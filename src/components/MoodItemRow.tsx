import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	LayoutAnimation,
} from 'react-native';
import format from 'date-fns/format';
import { MoodOptionTimestamp } from '../types';
// import { dark, light } from '../theme';
import { useAppContext } from '../App.provider';
import { Theme } from '../theme';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Reanimated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

const maxSwipeDistance = 50;

type MoodItemRowProps = {
	item: MoodOptionTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
	const appContext = useAppContext();
	const translationX = useSharedValue(0);

	const handleDelete = React.useCallback(() => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		appContext.handleDeleteMood(item);
	}, [appContext, item]);

	const deleteWithDrag = React.useCallback(() => {
		setTimeout(() => {
			handleDelete();
		}, 100);
	}, [handleDelete]);

	const onGestureEvent = useAnimatedGestureHandler(
		{
			onActive: event => {
				translationX.value = event.translationX;
				// console.warn(event.translationX);
			},
			onEnd: event => {
				if (Math.abs(event.translationX) > maxSwipeDistance) {
					// handleDelete();
					translationX.value = withTiming(
						event.translationX * maxSwipeDistance,
					);
					runOnJS(handleDelete)();
					console.warn('delete');
				} else {
					translationX.value = withTiming(0);
				}
			},
		},
		[],
	);

	const cardStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translationX.value }],
		};
	}, []);

	const styles = stylesFC(appContext.appTheme);
	return (
		<PanGestureHandler onGestureEvent={onGestureEvent}>
			<Reanimated.View style={[styles.moodItem, cardStyle]}>
				<View style={styles.iconAndDescription}>
					<Text style={styles.moodValue}>{item.mood.emoji}</Text>
					<Text style={styles.moodDescription}>{item.mood.description}</Text>
				</View>
				<Text style={styles.moodDate}>
					{format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
				</Text>
				<Pressable onPress={handleDelete}>
					<Text style={styles.deleteText}>Delete</Text>
				</Pressable>
			</Reanimated.View>
		</PanGestureHandler>
	);
};

// const theme = useAppContext().appTheme === 'light' ? light : dark;

const stylesFC = (theme: Theme) =>
	StyleSheet.create({
		moodValue: {
			textAlign: 'center',
			fontSize: 40,
			marginRight: 10,
		},
		moodDate: {
			textAlign: 'center',
			color: theme.colors.tertiary,
			fontFamily: theme.fonts.regular,
		},
		moodItem: {
			backgroundColor: theme.colors.primary,
			marginBottom: 10,
			padding: 10,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		moodDescription: {
			fontSize: 18,
			color: theme.colors.secondary,
			fontFamily: theme.fonts.bold,
		},
		iconAndDescription: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		deleteText: {
			color: theme.colors.tertiary,
			fontFamily: theme.fonts.regular,
		},
	});
