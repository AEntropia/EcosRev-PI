import "@testing-library/jest-dom";

global.matchMedia = global.matchMedia || function(query: string) {
    return {
      matches: false, // Pode ser ajustado conforme necessário
      media: query, // A propriedade 'media' deve ser o valor da consulta
      onchange: null,
      addListener: () => {}, // Mock da função addListener
      removeListener: () => {}, // Mock da função removeListener
      addEventListener: () => {}, // Mock da função addEventListener
      removeEventListener: () => {}, // Mock da função removeEventListener
      dispatchEvent: () => false, // Mock da função dispatchEvent
    };
  };