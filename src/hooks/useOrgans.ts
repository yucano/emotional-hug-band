import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useOrgans = () => {
  return useQuery({
    queryKey: ["organos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("organos")
        .select("*")
        .order("zona_principal", { ascending: true });

      if (error) throw error;
      return data;
    },
  });
};

export const useInterpretaciones = (organoId?: string) => {
  return useQuery({
    queryKey: ["interpretaciones", organoId],
    queryFn: async () => {
      if (!organoId) return [];
      
      const { data, error } = await supabase
        .from("interpretaciones")
        .select("*")
        .eq("organo_id", organoId);

      if (error) throw error;
      return data;
    },
    enabled: !!organoId,
  });
};
