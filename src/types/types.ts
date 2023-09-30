export interface LoanDetailsDto {
  useReferenceInterestRate: boolean;
  useTaxReduction: boolean;
  amount: number;
  referenceInterestRate: number;
  interestRate: number;
  loanInPercent: number;
}

export enum Page {
  Calculator,
  Documentation,
}