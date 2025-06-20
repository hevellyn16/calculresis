export type BandType = 'D1' | 'D2' | 'D3' | 'Multiplier' | 'Tolerance' | 'PPM' | null;

export const bandValues: { [key: string]: number } = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
};

export const multiplierValues: { [key: string]: number } = {
  '1Ω': 1, '10Ω': 10, '100Ω': 100, '1KΩ': 1000, '10KΩ': 10000, '100KΩ': 100000, '1MΩ': 1000000, '10MΩ': 10000000, '100MΩ': 100000000, '0.1Ω': 0.1, '0.01Ω': 0.01,
};

export const toleranceValues: { [key: string]: string } = {
  '±1%': '±1%', '±2%': '±2%', '±0.5%': '±0.5%', '±0.25%': '±0.25%', '±0.1%': '±0.1%', '±5%': '±5%', '±10%': '±10%',
};

export const ppmValues: { [key: string]: string } = {
  '100': '100 PPM/C', '50': '50 PPM/C', '15': '15 PPM/C', '25': '25 PPM/C', '10': '10 PPM/C', '5': '5 PPM/C',
};