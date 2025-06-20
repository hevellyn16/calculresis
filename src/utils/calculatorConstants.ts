export type BandType = 'D1' | 'D2' | 'D3' | 'Multiplier' | 'Tolerance' | 'PPM' | null;

export const bandValues: { [key: string]: number } = {
  'Preto 0': 0, 'Marrom 1': 1, ' Vermelho 2': 2, 'Laranja 3': 3, ' Amarelo 4': 4, 'Verde 5': 5, 'Azul 6': 6, 'Roxo 7': 7, 'Cinza 8': 8, 'Branco 9': 9
};

export const multiplierValues: { [key: string]: number } = {
  'Preto 1': 1, 'Marrom 10': 10, 'Vermelho 100': 100, 'Laranja 1K': 1000, 'Amarelo 10K': 10000, 'Verde 100K': 100000, 'Azul 1M': 1000000, 'Ouro 0.1': 0.1, 'Prata 0.01': 0.01,
};

export const toleranceValues: { [key: string]: string } = {
  'Vermelho ±1%': '±1%', 'Laranja ±2%': '±2%', 'Verde ±0.5%': '±0.5%', 'Azul ±0.25%': '±0.25%', 'Roxo ±0.1%': '±0.1%', 'Ouro ±5%': '±5%', 'Prata ±10%': '±10%',
};

export const ppmValues: { [key: string]: string } = {
  'Marrom 100': '100 PPM/C', 'Vermelho 50': '50 PPM/C', 'Laranja 15': '15 PPM/C', 'Amarelo 25': '25 PPM/C', 'Azul 10': '10 PPM/C', 'Roxo 5': '5 PPM/C',
};