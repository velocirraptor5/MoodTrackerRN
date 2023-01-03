import React from 'react';
import { light, Theme } from './theme';
import { MoodOptionTimestamp, MoodOptionType } from './types';

import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
	moodList: MoodOptionTimestamp[];
	appTheme: Theme;
};

const dataKey = 'appData';

const setAppData = async (data: AppData) => {
	try {
		await AsyncStorage.setItem(dataKey, JSON.stringify(data));
	} catch (e) {
		console.log(e);
	}
};

const getAppData = async (): Promise<AppData | null> => {
	try {
		const value = await AsyncStorage.getItem(dataKey);
		if (value !== null) {
			return JSON.parse(value);
		} else {
			return { moodList: [], appTheme: light };
		}
	} catch (e) {
		console.log(e);
		return { moodList: [], appTheme: light };
	}
};

const deleteAppData = async () => {
	try {
		await AsyncStorage.removeItem(dataKey);
	} catch (e) {
		console.log(e);
	}
};

type AppContextType = {
	moodList: MoodOptionTimestamp[];
	handleMoodSelection: (mood: MoodOptionType) => void;
	appTheme: Theme;
	setAppTheme: (theme: Theme) => void;
	deleteData: () => void;
	handleDeleteMood: (mood: MoodOptionTimestamp) => void;
};

const defaultValue = {
	moodList: [],
	handleMoodSelection: () => {},
	appTheme: light,
	setAppTheme: () => {},
	deleteData: () => {},
	handleDeleteMood: () => {},
};

type Props = {
	children: React.ReactNode;
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<Props> = ({ children }) => {
	// mood list state
	const [moodList, setMoodList] = React.useState<MoodOptionTimestamp[]>([]);

	// handle mood selection
	const handleMoodSelection = React.useCallback(
		(selectedMood: MoodOptionType) => {
			setMoodList(prev => {
				const newMoodList = [
					...prev,
					{ mood: selectedMood, timestamp: Date.now() },
				];
				setAppData({ moodList: newMoodList, appTheme: appTheme });
				return newMoodList;
			});
		},
		[],
	);

	const handleDeleteMood = React.useCallback((mood: MoodOptionTimestamp) => {
		setMoodList(prev => {
			const newMoodList = prev.filter(
				item => item.timestamp !== mood.timestamp,
			);
			setAppData({ moodList: newMoodList, appTheme: appTheme });
			return newMoodList;
		});
	}, []);

	// app theme state
	const [appTheme, setAppThemeFC] = React.useState<Theme>(light);

	// set app theme
	const setAppTheme = React.useCallback((theme: Theme) => {
		setAppThemeFC(theme);
		setAppData({ moodList: moodList, appTheme: theme });
	}, []);

	// delete app data
	const deleteData = React.useCallback(() => {
		setMoodList([]);
		setAppThemeFC(light);
		deleteAppData();
	}, []);

	//when the app starts, fetch the data from async storage
	React.useEffect(() => {
		const fetchData = async () => {
			const data = await getAppData();
			if (data) {
				data.moodList ? setMoodList(data.moodList) : setMoodList([]);
				data.appTheme ? setAppThemeFC(data.appTheme) : setAppThemeFC(light);
			}
		};
		fetchData();
	}, []);

	return (
		<AppContext.Provider
			value={{
				moodList,
				handleMoodSelection,
				appTheme,
				setAppTheme,
				deleteData,
				handleDeleteMood,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => React.useContext(AppContext);
