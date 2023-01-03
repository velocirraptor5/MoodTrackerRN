import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MoodOptionType } from '../types';
import { globalStyles } from '../styles';
import { useAppContext } from '../App.provider';
import { Theme } from '../theme';
import { AppText } from './AppText';
import Reanimated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const moodOptions: MoodOptionType[] = [
	{ emoji: '🧑‍💻', description: 'studious', id: 1 },
	{ emoji: '🤔', description: 'pensive', id: 2 },
	{ emoji: '😊', description: 'happy', id: 3 },
	{ emoji: '🥳', description: 'celebratory', id: 4 },
	{ emoji: '😤', description: 'frustrated', id: 5 },
];
type MoodPickerProps = {
	handleMoodSelection: (moodOption: MoodOptionType) => void;
};

const imageSrc = require('../../assets/favicon.png');

export const MoodPicker: React.FC<MoodPickerProps> = ({
	handleMoodSelection,
}) => {
	const appContext = useAppContext();
	const styles = stylesFC(appContext.appTheme);

	const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
	const [HasSelected, setHasSelected] = React.useState(false);

	const buttonStyle = useAnimatedStyle(
		() => ({
			opacity: selectedMood ? withTiming(1) : withTiming(0.5),
			transform: selectedMood ? [{ scale: withTiming(1.1) }] : [],
		}),
		[selectedMood],
	);

	const handleSelection = React.useCallback(() => {
		if (selectedMood) {
			handleMoodSelection(selectedMood);
			setSelectedMood(undefined);
			setHasSelected(true);
		}
	}, [selectedMood, handleMoodSelection]);

	if (HasSelected) {
		return (
			<View style={styles.container}>
				<Image source={imageSrc} style={styles.image} />
				<Pressable style={styles.button} onPress={() => setHasSelected(false)}>
					<AppText theme={appContext.appTheme} fontFamily="bold" size={18}>
						You selected {selectedMood?.emoji} {selectedMood?.description}
					</AppText>
					<Text style={styles.buttonText}>Select new Mood</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>How are you right now?</Text>
			<View style={styles.moodList}>
				{moodOptions.map(option => (
					<View key={option.emoji}>
						<Pressable
							onPress={() => setSelectedMood(option)}
							style={[
								styles.moodItem,
								option.emoji === selectedMood?.emoji
									? styles.selectedMoodItem
									: undefined,
							]}>
							<Text style={styles.moodText}>{option.emoji}</Text>
						</Pressable>
						<Text style={styles.descriptionText}>
							{selectedMood?.emoji === option.emoji ? option.description : ' '}
						</Text>
					</View>
				))}
			</View>
			<ReanimatedPressable
				style={[styles.button, buttonStyle]}
				onPress={handleSelection}>
				<Text style={styles.buttonText}>Choose</Text>
			</ReanimatedPressable>
		</View>
	);
};

// const theme = useAppContext().appTheme === 'light' ? light : dark;

const stylesFC = (theme: Theme) =>
	StyleSheet.create({
		moodText: {
			fontSize: 24,
		},
		moodList: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		moodItem: {
			width: 60,
			height: 60,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 30,
			marginBottom: 5,
		},
		selectedMoodItem: {
			borderWidth: 2,
			backgroundColor: theme.colors.primary,
			borderColor: theme.colors.secondary,
		},
		descriptionText: {
			color: theme.colors.secondary,
			fontSize: 15,
			textAlign: 'center',
			fontFamily: theme.fonts.bold,
		},
		container: {
			borderWidth: 2,
			backgroundColor: theme.colors.background,
			borderColor: theme.colors.secondary,
			margin: 10,
			borderRadius: 10,
			padding: 20,
		},
		heading: {
			fontSize: 20,
			letterSpacing: 1,
			textAlign: 'center',
			marginBottom: 20,
			color: theme.colors.textInverted,
			fontFamily: theme.fonts.bold,
		},
		button: {
			...globalStyles(theme).button,
			width: 150,
			marginTop: 20,
		},
		buttonText: {
			...globalStyles(theme).buttonText,
			fontFamily: theme.fonts.bold,
		},
		image: {
			width: 100,
			height: 100,
			alignSelf: 'center',
			marginBottom: 20,
			fontFamily: theme.fonts.bold,
		},
	});
