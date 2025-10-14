export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alertas_config: {
        Row: {
          alertas_habilitadas: boolean | null
          created_at: string | null
          id: string
          umbral_heart_rate_max: number | null
          umbral_heart_rate_min: number | null
          umbral_hrv_min: number | null
          umbral_stress_level: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          alertas_habilitadas?: boolean | null
          created_at?: string | null
          id?: string
          umbral_heart_rate_max?: number | null
          umbral_heart_rate_min?: number | null
          umbral_hrv_min?: number | null
          umbral_stress_level?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          alertas_habilitadas?: boolean | null
          created_at?: string | null
          id?: string
          umbral_heart_rate_max?: number | null
          umbral_heart_rate_min?: number | null
          umbral_hrv_min?: number | null
          umbral_stress_level?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      favoritos_interpretaciones: {
        Row: {
          created_at: string | null
          id: string
          interpretacion_id: string
          notas_usuario: string | null
          organo_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          interpretacion_id: string
          notas_usuario?: string | null
          organo_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          interpretacion_id?: string
          notas_usuario?: string | null
          organo_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_interpretaciones_interpretacion_id_fkey"
            columns: ["interpretacion_id"]
            isOneToOne: false
            referencedRelation: "interpretaciones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoritos_interpretaciones_organo_id_fkey"
            columns: ["organo_id"]
            isOneToOne: false
            referencedRelation: "organos"
            referencedColumns: ["id"]
          },
        ]
      }
      interpretaciones: {
        Row: {
          afirmacion_positiva: string
          causa_probable: string
          conflicto_adicional: string | null
          created_at: string | null
          etapa_embrionaria: string | null
          fuente_manual: string | null
          id: string
          organo_id: string | null
          patron_emocional: string | null
          sentido_biologico: string | null
          sintoma: string
        }
        Insert: {
          afirmacion_positiva: string
          causa_probable: string
          conflicto_adicional?: string | null
          created_at?: string | null
          etapa_embrionaria?: string | null
          fuente_manual?: string | null
          id?: string
          organo_id?: string | null
          patron_emocional?: string | null
          sentido_biologico?: string | null
          sintoma: string
        }
        Update: {
          afirmacion_positiva?: string
          causa_probable?: string
          conflicto_adicional?: string | null
          created_at?: string | null
          etapa_embrionaria?: string | null
          fuente_manual?: string | null
          id?: string
          organo_id?: string | null
          patron_emocional?: string | null
          sentido_biologico?: string | null
          sintoma?: string
        }
        Relationships: [
          {
            foreignKeyName: "interpretaciones_organo_id_fkey"
            columns: ["organo_id"]
            isOneToOne: false
            referencedRelation: "organos"
            referencedColumns: ["id"]
          },
        ]
      }
      lecturas_biometricas: {
        Row: {
          created_at: string | null
          gsr: number
          heart_rate: number
          hrv: number
          id: string
          organo_sugerido_confianza: number | null
          organo_sugerido_id: string | null
          organo_sugerido_nombre: string | null
          organo_sugerido_razon: string | null
          stress_level: number
          temperature: number
          timestamp: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          gsr: number
          heart_rate: number
          hrv: number
          id?: string
          organo_sugerido_confianza?: number | null
          organo_sugerido_id?: string | null
          organo_sugerido_nombre?: string | null
          organo_sugerido_razon?: string | null
          stress_level: number
          temperature: number
          timestamp?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          gsr?: number
          heart_rate?: number
          hrv?: number
          id?: string
          organo_sugerido_confianza?: number | null
          organo_sugerido_id?: string | null
          organo_sugerido_nombre?: string | null
          organo_sugerido_razon?: string | null
          stress_level?: number
          temperature?: number
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lecturas_biometricas_organo_sugerido_id_fkey"
            columns: ["organo_sugerido_id"]
            isOneToOne: false
            referencedRelation: "organos"
            referencedColumns: ["id"]
          },
        ]
      }
      lecturas_sensor: {
        Row: {
          created_at: string | null
          duracion: number | null
          id: string
          notas_usuario: string | null
          organo_detectado_id: string | null
          presion: number | null
          timestamp: string | null
          tipo_toque: string | null
          user_id: string | null
          zona_ble: string
        }
        Insert: {
          created_at?: string | null
          duracion?: number | null
          id?: string
          notas_usuario?: string | null
          organo_detectado_id?: string | null
          presion?: number | null
          timestamp?: string | null
          tipo_toque?: string | null
          user_id?: string | null
          zona_ble: string
        }
        Update: {
          created_at?: string | null
          duracion?: number | null
          id?: string
          notas_usuario?: string | null
          organo_detectado_id?: string | null
          presion?: number | null
          timestamp?: string | null
          tipo_toque?: string | null
          user_id?: string | null
          zona_ble?: string
        }
        Relationships: [
          {
            foreignKeyName: "lecturas_sensor_organo_detectado_id_fkey"
            columns: ["organo_detectado_id"]
            isOneToOne: false
            referencedRelation: "organos"
            referencedColumns: ["id"]
          },
        ]
      }
      organos: {
        Row: {
          coordenada_x: number | null
          coordenada_y: number | null
          created_at: string | null
          descripcion: string | null
          id: string
          nombre: string
          radio_deteccion: number | null
          sistema_corporal: string | null
          zona_principal: string
        }
        Insert: {
          coordenada_x?: number | null
          coordenada_y?: number | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre: string
          radio_deteccion?: number | null
          sistema_corporal?: string | null
          zona_principal: string
        }
        Update: {
          coordenada_x?: number | null
          coordenada_y?: number | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre?: string
          radio_deteccion?: number | null
          sistema_corporal?: string | null
          zona_principal?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          nombre: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          nombre?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nombre?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
