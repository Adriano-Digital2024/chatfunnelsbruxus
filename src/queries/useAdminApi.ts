import { supabase } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";

/**
 * Admin API base URL - should be configured in .env
 * Note: This points to the deployed admin-api edge function
 */
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL || "/admin-api";

// Generic admin API query hook
function useAdminApi<T>(
  key: string,
  action?: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
) {
  return useQuery({
    queryKey: key ? ["admin-api", key, ...(action ? [action] : [])] : ["admin-api"],
    queryFn: async (): Promise<T> => {
      const url = new URL(`${ADMIN_API_URL}${action ? `/${action}` : ""}`, window.location.origin);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || `Failed to fetch ${action}`);
      }

      return response.json();
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 1000 * 60 * 5, // 5 minutes
    cacheTime: options?.cacheTime ?? 1000 * 60 * 10, // 10 minutes
  });
}

// Admin queries exports
export const useAdminUsers = () => useAdminApi<any>("users", "users");
export const useAdminOrganizations = () => useAdminApi<any>("organizations", "organizations");
export const useAdminSubscriptions = () => useAdminApi<any>("subscriptions", "subscriptions");
export const useAdminMetrics = () => useAdminApi<any>("metrics", "metrics");

export const useAdminUserActions = () => {
  const queryClient = useQueryClient();

  // Update user role
  const updateUserRole = (userId: string, role: string) => {
    return supabase.functions.invoke("admin-api/users/${userId}/role", {
      method: "PUT",
      body: { role },
    });
  };

  // Update organization status
  const updateOrganizationStatus = (orgId: string, status: string) => {
    return supabase.functions.invoke("admin-api/organizations/${orgId}/status", {
      method: "PUT",
      body: { status },
    });
  };

  // Update subscription plan
  const updateSubscriptionPlan = (orgAddressId: string, planId: string) => {
    return supabase.functions.invoke("admin-api/subscriptions/${orgAddressId}/plan", {
      method: "PUT",
      body: { plan_id: planId },
    });
  };

  // Delete user
  const deleteUser = (userId: string) => {
    return supabase.functions.invoke("admin-api/users/${userId}", {
      method: "DELETE",
    });
  };

  return {
    updateUserRole,
    updateOrganizationStatus,
    updateSubscriptionPlan,
    deleteUser,
  };
};