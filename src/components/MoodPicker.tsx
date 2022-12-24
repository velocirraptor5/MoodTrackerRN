import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MoodOptionType } from '../types';
import { theme } from '../theme';

const moodOptions: MoodOptionType[] = [
	{ emoji: '🧑‍💻', description: 'studious', id: 1 },
	{ emoji: '🤔', description: 'pensive', id: 2 },
	{ emoji: '😊', description: 'happy', id: 3 },
	{ emoji: '🥳', description: 'celebratory', id: 4 },
	{ emoji: '😤', description: 'frustrated', id: 5 },
];

export const MoodPicker: React.FC = () => {
	const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>How are you right now?</Text>
			<View style={styles.moodList}>
				{moodOptions.map(option => (
					<View>
						<Pressable
							onPress={() => setSelectedMood(option)}
							key={option.emoji}
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
			<Pressable style={styles.button}>
				<Text style={styles.buttonText}>Choose</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
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
		fontWeight: 'bold',
		fontSize: 10,
		textAlign: 'center',
	},
	container: {
		borderWidth: 2,
		borderColor: theme.colors.secondary,
		margin: 10,
		borderRadius: 10,
		padding: 20,
	},
	heading: {
		fontSize: 20,
		fontWeight: 'bold',
		letterSpacing: 1,
		textAlign: 'center',
		marginBottom: 20,
	},
	button: {
		backgroundColor: theme.colors.secondary,
		width: 150,
		borderRadius: 20,
		marginTop: 20,
		alignSelf: 'center',
		padding: 10,
	},
	buttonText: {
		color: theme.colors.primary,
		textAlign: 'center',
		fontWeight: 'bold',
	},
});
