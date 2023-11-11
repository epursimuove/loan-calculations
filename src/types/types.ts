export interface LoanDetailsDto {
  useReferenceInterestRate: boolean;
  useTaxReduction: boolean;
  useYear: boolean;
  displayChart: boolean;
  amount: number;
  referenceInterestRate: number;
  interestRate: number;
  loanInPercent: number;
}

export enum Page {
  Calculator,
  Documentation,
}
