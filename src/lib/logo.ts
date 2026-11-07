// Merr pjesët e logos (shkronjat) direkt nga skedari origjinal public/logo.svg,
// që header-i të përdorë gjithmonë logon e saktë. Përdoret vetëm në server.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type LogoParts = { ledioni: string; group: string };

let cache: LogoParts | null = null;

export function getLogoParts(): LogoParts {
  if (cache) return cache;
  const svg = readFileSync(join(process.cwd(), 'public/logo.svg'), 'utf8');
  const paths = [...svg.matchAll(/<path d="([^"]+)" fill="([^"]+)"/g)];
  const byFill = (fill: string) => paths.find((m) => m[2].toUpperCase() === fill)?.[1] ?? '';
  cache = { ledioni: byFill('#1A1A1A'), group: byFill('#8A6A1F') };
  return cache;
}
