const typeCache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}


export function dateToField(thisDate): string {
  return thisDate ? new Date(thisDate).toISOString().substring(0, 10) : '';
};

export function todayToField(): string {
  return new Date().toISOString().substring(0, 10);
};
