export type CandidateType = {
  id: string;
  president: string;
  vicePresident: string;
  party: string;
  votes: number;
};
export type InvoiceDataType = {
  fieldCN: string;
  fieldEn: string;
  id: string;
  candidate1: CandidateType;
  candidate2: CandidateType;
  candidate3: CandidateType;
  validVotes: number;
  invalidVotes: number;
  votes: number;
  unUseVotes: number;
  publishedVotes: number;
  leftVotes: number;
  allVotes: number;
  voteRate: number;
  detail?: { [key: string]: InvoiceDataType };
};
export type InvoiceType = { [key: string]: InvoiceDataType };
