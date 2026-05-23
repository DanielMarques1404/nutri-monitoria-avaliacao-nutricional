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
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      Categories: {
        Row: {
          active: boolean
          created_at: string
          id: number
          name: string
        }
        Insert: {
          active: boolean
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      QuestionnaireQuestions: {
        Row: {
          created_at: string
          id: number
          questionId: number
          questionnaireId: number
        }
        Insert: {
          created_at?: string
          id?: number
          questionId: number
          questionnaireId: number
        }
        Update: {
          created_at?: string
          id?: number
          questionId?: number
          questionnaireId?: number
        }
        Relationships: [
          {
            foreignKeyName: "QuestionnaireQuestions_questionId_fkey"
            columns: ["questionId"]
            isOneToOne: false
            referencedRelation: "Questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "QuestionnaireQuestions_questionnaireId_fkey"
            columns: ["questionnaireId"]
            isOneToOne: false
            referencedRelation: "Questionnaires"
            referencedColumns: ["id"]
          },
        ]
      }
      Questionnaires: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      QuestionOptions: {
        Row: {
          created_at: string
          description: string
          id: number
          option: string
          questionId: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          option: string
          questionId: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          option?: string
          questionId?: number
        }
        Relationships: [
          {
            foreignKeyName: "QuestionOptions_questionId_fkey"
            columns: ["questionId"]
            isOneToOne: false
            referencedRelation: "Questions"
            referencedColumns: ["id"]
          },
        ]
      }
      Questions: {
        Row: {
          categoryId: number | null
          correctOption: string | null
          created_at: string
          difficulty: string | null
          explanation: string | null
          id: number
          question: string
          statement: string
          summaryImage: string | null
          title: string
        }
        Insert: {
          categoryId?: number | null
          correctOption?: string | null
          created_at?: string
          difficulty?: string | null
          explanation?: string | null
          id?: number
          question: string
          statement: string
          summaryImage?: string | null
          title: string
        }
        Update: {
          categoryId?: number | null
          correctOption?: string | null
          created_at?: string
          difficulty?: string | null
          explanation?: string | null
          id?: number
          question?: string
          statement?: string
          summaryImage?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Questions_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "Categories"
            referencedColumns: ["id"]
          },
        ]
      }
      QuestionTags: {
        Row: {
          created_at: string
          id: number
          questionId: number
          tagId: number
        }
        Insert: {
          created_at?: string
          id?: number
          questionId: number
          tagId: number
        }
        Update: {
          created_at?: string
          id?: number
          questionId?: number
          tagId?: number
        }
        Relationships: [
          {
            foreignKeyName: "QuestionsTags_questionId_fkey"
            columns: ["questionId"]
            isOneToOne: false
            referencedRelation: "Questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "QuestionsTags_tagId_fkey"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "Tags"
            referencedColumns: ["id"]
          },
        ]
      }
      Tags: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
