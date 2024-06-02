export const combineClasses = (...classes: (string | undefined | false | null)[]): string => classes.filter(Boolean).join(' ');
