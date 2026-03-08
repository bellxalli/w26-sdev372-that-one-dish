import "@testing-library/jest-dom";

// Mock browser globals
global.fetch = jest.fn();
global.alert = jest.fn();

// Polyfill TextEncoder/TextDecoder for Node
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;