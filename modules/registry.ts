
import { type ModuleId, type ModuleComponent } from '../types';

const modules = new Map<ModuleId, ModuleComponent>();

export function registerModule(id: ModuleId, component: ModuleComponent): void {
  if (modules.has(id)) {
    console.warn(`Module with id "${id}" is already registered. Overwriting.`);
  }
  modules.set(id, component);
}

export function getModule(id: ModuleId): ModuleComponent | null {
  return modules.get(id) || null;
}
