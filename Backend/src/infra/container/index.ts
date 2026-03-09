import "reflect-metadata";
import { container } from "tsyringe";

export * from './providers'
export * from './services'
export * from './repositories'
export * from './usecases'

console.log("✅ DI Container Initialized");

export { container };