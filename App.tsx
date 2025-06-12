import React from 'react';
import { StatusBar } from 'expo-status-bar';
import TelaInicial from './src/screens/TelaInicial';
import './global.css';

export default function App() {
  return (
    <>
      <TelaInicial />
      <StatusBar style="auto" />
    </>
  );
}
