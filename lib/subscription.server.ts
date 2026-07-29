import { auth } from "@clerk/nextjs/server";
import type { PlanName } from "./subscription-constants";

export const getUserPlan = async (): Promise<PlanName> => {
    const { userId } = await auth();

    if (!userId) {
        return "free";
    }

    return "free";
};
