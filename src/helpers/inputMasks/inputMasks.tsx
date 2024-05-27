export const textMask = (value: string) => /^[A-Za-z ]*$/.test(value);

export const decimalMask = (value: string) =>
  /^(0(\.[0-9]{0,2})?|[1-9][0-9]*\.?[0-9]{0,2}|)$/.test(value);

export const numberMask = (value: string) => /^\d*$/.test(value);
