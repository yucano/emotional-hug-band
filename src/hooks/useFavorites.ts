import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useFavorites = (interpretationId: string | null) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (interpretationId) {
      checkIfFavorite();
    }
  }, [interpretationId]);

  const checkIfFavorite = async () => {
    if (!interpretationId) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("favoritos_interpretaciones")
        .select("id")
        .eq("user_id", user.id)
        .eq("interpretacion_id", interpretationId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      setIsFavorite(!!data);
    } catch (error: any) {
      console.error("Error checking favorite:", error);
    }
  };

  const toggleFavorite = async (organId: string) => {
    if (!interpretationId) return;
    
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Debes iniciar sesión para guardar favoritos");
        return;
      }

      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from("favoritos_interpretaciones")
          .delete()
          .eq("user_id", user.id)
          .eq("interpretacion_id", interpretationId);

        if (error) throw error;
        setIsFavorite(false);
        toast.success("Eliminado de favoritos");
      } else {
        // Add to favorites
        const { error } = await supabase
          .from("favoritos_interpretaciones")
          .insert({
            user_id: user.id,
            organo_id: organId,
            interpretacion_id: interpretationId,
          });

        if (error) throw error;
        setIsFavorite(true);
        toast.success("Agregado a favoritos");
      }
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      toast.error("Error al guardar favorito: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { isFavorite, toggleFavorite, loading };
};
