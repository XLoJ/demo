const localStroage = window.localStorage;

export function setItem(key: string, value: string) {
  localStroage.setItem(key, value);
}

export function getItem(key: string): string | null {
  return localStroage.getItem(key);
}

export function removeItem(key: string) {
  localStroage.removeItem(key);
}
