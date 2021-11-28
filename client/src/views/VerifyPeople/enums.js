const ProposalState = [
  "Pending",
  "Active",
  "Canceled",
  "Defeated",
  "Succeeded",
  "Queued",
  "Expired",
  "Executed",
];

const SupportTypeKeys = ["againstVotes", "forVotes", "abstainVotes"];

const SupportType = {
  FOR: 1,
  AGAINST: 0,
  ABSTAIN: 2,
};

export { ProposalState, SupportType, SupportTypeKeys };
