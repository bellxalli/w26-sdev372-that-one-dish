import "@testing-library/jest-dom";

// Mock browser globals
global.fetch = jest.fn();
global.alert = jest.fn();