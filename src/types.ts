export type MoodOptionType = {
	emoji: string;
	description: string;
	id: number;
};

export type MoodOptionTimestamp = {
	mood: MoodOptionType;
	timestamp: number;
};
