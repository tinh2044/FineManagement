import { getJudgements, createJudgement, updateJudgement } from "./judgement";
import { getPrisoners, createPrisoner, updatePrisoner } from "./prisoner";

import {
    getLegalCasesByPrisoner,
    createPayment,
    updatePaymentInLegalCase,
    deletePaymentFromLegalCase,
    addJudgementToPrisoner,
    updateJudgementInPrisoner,
    addPenaltyToLegalCase,
    updatePenaltyInCase,
    deletePenaltyInCase
} from "./legalCase";
import { getRemainingFines } from "./remainingFine";
import {
    getPenaltyTypes,
    createPenaltyType,
    updatePenaltyType,
} from "./penaltyTypes";

export {
    getJudgements,
    createJudgement,
    updateJudgement,
    getPrisoners,
    createPrisoner,
    updatePrisoner,
    getLegalCasesByPrisoner,
    createPayment,
    getRemainingFines,
    getPenaltyTypes,
    createPenaltyType,
    updatePenaltyType,
    updatePaymentInLegalCase,
    deletePaymentFromLegalCase,
    addJudgementToPrisoner,
    updateJudgementInPrisoner,
    addPenaltyToLegalCase,
    updatePenaltyInCase,
    deletePenaltyInCase
};
