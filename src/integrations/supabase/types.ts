export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      news_items: {
        Row: {
          id: string
          image_url: string | null
          published_at: string | null
          source: string | null
          summary: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          id?: string
          image_url?: string | null
          published_at?: string | null
          source?: string | null
          summary?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          image_url?: string | null
          published_at?: string | null
          source?: string | null
          summary?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: []
      }
      transfer_reports: {
        Row: {
          ai_reasoning: string | null
          club: string | null
          club_willingness: string | null
          confidence: number | null
          executive_summary: string | null
          final_summary: string | null
          id: number
          image_url: string | null
          key_insights: string | null
          mark_take: string | null
          market_competition: string | null
          next_steps: string | null
          player_info: string | null
          player_name: string | null
          real_time_intelligence: string | null
          risk_factors: string | null
          tactical_fit: string | null
          timestamp: string
          transfer_likelihood: string | null
          united_strategy: string | null
          urgency_level: string | null
          verdict: string | null
        }
        Insert: {
          ai_reasoning?: string | null
          club?: string | null
          club_willingness?: string | null
          confidence?: number | null
          executive_summary?: string | null
          final_summary?: string | null
          id?: number
          image_url?: string | null
          key_insights?: string | null
          mark_take?: string | null
          market_competition?: string | null
          next_steps?: string | null
          player_info?: string | null
          player_name?: string | null
          real_time_intelligence?: string | null
          risk_factors?: string | null
          tactical_fit?: string | null
          timestamp: string
          transfer_likelihood?: string | null
          united_strategy?: string | null
          urgency_level?: string | null
          verdict?: string | null
        }
        Update: {
          ai_reasoning?: string | null
          club?: string | null
          club_willingness?: string | null
          confidence?: number | null
          executive_summary?: string | null
          final_summary?: string | null
          id?: number
          image_url?: string | null
          key_insights?: string | null
          mark_take?: string | null
          market_competition?: string | null
          next_steps?: string | null
          player_info?: string | null
          player_name?: string | null
          real_time_intelligence?: string | null
          risk_factors?: string | null
          tactical_fit?: string | null
          timestamp?: string
          transfer_likelihood?: string | null
          united_strategy?: string | null
          urgency_level?: string | null
          verdict?: string | null
        }
        Relationships: []
      }
      youtube_videos: {
        Row: {
          category: string | null
          clickbait_blurb: string | null
          id: string
          publish_date: string | null
          thumbnail_url: string | null
          title: string | null
          video_url: string | null
        }
        Insert: {
          category?: string | null
          clickbait_blurb?: string | null
          id?: string
          publish_date?: string | null
          thumbnail_url?: string | null
          title?: string | null
          video_url?: string | null
        }
        Update: {
          category?: string | null
          clickbait_blurb?: string | null
          id?: string
          publish_date?: string | null
          thumbnail_url?: string | null
          title?: string | null
          video_url?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
