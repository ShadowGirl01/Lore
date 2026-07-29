
export type PlanName = "free" | "pro" | "enterprise";

export const PLAN_LIMITS: Record<PlanName, { maxBooks: number }> = {
    free: { maxBooks: 3 },
    pro: { maxBooks: 20 },
    enterprise: { maxBooks: 100 },
};

export const getCurrentBillingPeriodStart = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
};