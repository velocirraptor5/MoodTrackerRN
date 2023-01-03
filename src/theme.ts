export type Theme = {
	name: string;
	colors: {
		primary: string;
		secondary: string;
		tertiary: string;
		quaternary: string;
		text: string;
		textInverted: string;
		background: string;
	};
	fonts: {
		bold: string;
		regular: string;
		light: string;
	};
};

const defaultTheme: Theme = {
	name: 'default',
	colors: {
		primary: '#e8eef1',
		secondary: '#43b0f1',
		tertiary: '#057dcd',
		quaternary: '#1e3d58',
		text: '#000000',
		textInverted: '#ffffff',
		background: 'rgba(0, 0, 0, 0.5)',
	},
	fonts: {
		bold: 'Kalam_700Bold',
		regular: 'Kalam_400Regular',
		light: 'Kalam_300Light',
	},
};

const light: Theme = {
	...defaultTheme,
	name: 'light',
};

const dark: Theme = {
	...defaultTheme,
	name: 'dark',
	colors: {
		primary: '#1e3d58',
		secondary: '#057dcd',
		tertiary: '#43b0f1',
		quaternary: '#e8eef1',
		text: '#ffffff',
		textInverted: '#000000',
		background: 'rgba(274, 274, 274, 0.3)',
	},
};

export { dark, light };
