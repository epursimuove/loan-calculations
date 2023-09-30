// @ts-ignore
export const appVersion = __APP_VERSION__;

export const displayPercentage = (value: number): string => {
  return percentageFormatter.format(value / 100);
};

export const displayPercentage2 =
  (numberOfDecimals: number) =>
  (value: number): string => {
    return percentageFormatter2(numberOfDecimals).format(value / 100);
  };

export const amountFormatter: Intl.NumberFormat = new Intl.NumberFormat(
  "sv-SE",
  {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
    //roundingIncrement: 5,
    //signDisplay: "exceptZero",
    //notation: "compact",
    //compactDisplay: "short",
  },
);

export const amountDifferenceFormatter: Intl.NumberFormat =
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
    //roundingIncrement: 5,
    signDisplay: "exceptZero",
    //notation: "compact",
    //compactDisplay: "short",
  });

export const decimalOneFractionDigitFormatter: Intl.NumberFormat =
  new Intl.NumberFormat("sv-SE", {
    style: "decimal",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const percentageFormatter: Intl.NumberFormat = new Intl.NumberFormat("sv-SE", {
  style: "percent",
  //currency: "SEK",
  maximumFractionDigits: 1,
  //roundingIncrement: 5,
  //signDisplay: "exceptZero",
  //notation: "compact",
  //compactDisplay: "short",
});

const percentageFormatter2 = (numberOfDecimals: number): Intl.NumberFormat =>
  new Intl.NumberFormat("sv-SE", {
    style: "percent",
    //currency: "SEK",
    minimumFractionDigits: numberOfDecimals,
    maximumFractionDigits: numberOfDecimals,
    //roundingIncrement: 5,
    //signDisplay: "exceptZero",
    //notation: "compact",
    //compactDisplay: "short",
  });
