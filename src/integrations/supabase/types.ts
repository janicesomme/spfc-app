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
      news_articles: {
        Row: {
          category: string | null
          content_type: string | null
          created_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          published_at: string | null
          scraped_at: string | null
          source: string | null
          summary: string | null
          title: string
          url: string
        }
        Insert: {
          category?: string | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          published_at?: string | null
          scraped_at?: string | null
          source?: string | null
          summary?: string | null
          title: string
          url: string
        }
        Update: {
          category?: string | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          published_at?: string | null
          scraped_at?: string | null
          source?: string | null
          summary?: string | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      news_items: {
        Row: {
          breaking_news: boolean | null
          category: string | null
          content_preview: string | null
          content_type: string | null
          engagement_score: number | null
          fan_interest_score: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          priority: string | null
          processed_at: string | null
          published_at: string | null
          quote: string | null
          raw_content: string | null
          reliability: number | null
          scraped_at: string | null
          sentiment: string | null
          source: string | null
          source_type: string | null
          source_url: string | null
          specialization: string | null
          summary: string | null
          tier_rating: string | null
          tier_tag: string | null
          timestamp: string | null
          title: string | null
          url: string | null
          workflow_run_id: string | null
        }
        Insert: {
          breaking_news?: boolean | null
          category?: string | null
          content_preview?: string | null
          content_type?: string | null
          engagement_score?: number | null
          fan_interest_score?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          priority?: string | null
          processed_at?: string | null
          published_at?: string | null
          quote?: string | null
          raw_content?: string | null
          reliability?: number | null
          scraped_at?: string | null
          sentiment?: string | null
          source?: string | null
          source_type?: string | null
          source_url?: string | null
          specialization?: string | null
          summary?: string | null
          tier_rating?: string | null
          tier_tag?: string | null
          timestamp?: string | null
          title?: string | null
          url?: string | null
          workflow_run_id?: string | null
        }
        Update: {
          breaking_news?: boolean | null
          category?: string | null
          content_preview?: string | null
          content_type?: string | null
          engagement_score?: number | null
          fan_interest_score?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          priority?: string | null
          processed_at?: string | null
          published_at?: string | null
          quote?: string | null
          raw_content?: string | null
          reliability?: number | null
          scraped_at?: string | null
          sentiment?: string | null
          source?: string | null
          source_type?: string | null
          source_url?: string | null
          specialization?: string | null
          summary?: string | null
          tier_rating?: string | null
          tier_tag?: string | null
          timestamp?: string | null
          title?: string | null
          url?: string | null
          workflow_run_id?: string | null
        }
        Relationships: []
      }
      scouting_reports: {
        Row: {
          analysis: string | null
          full_report: string | null
          id: string
          player_name: string
          position: string | null
          quick_takes: string | null
          report_created_at: string | null
          snapshot: string | null
          source_insights: string | null
        }
        Insert: {
          analysis?: string | null
          full_report?: string | null
          id?: string
          player_name: string
          position?: string | null
          quick_takes?: string | null
          report_created_at?: string | null
          snapshot?: string | null
          source_insights?: string | null
        }
        Update: {
          analysis?: string | null
          full_report?: string | null
          id?: string
          player_name?: string
          position?: string | null
          quick_takes?: string | null
          report_created_at?: string | null
          snapshot?: string | null
          source_insights?: string | null
        }
        Relationships: []
      }
      transfer_reports: {
        Row: {
          age: number | null
          breaking_news_alert: boolean | null
          club: string | null
          club_willingness: string | null
          confidence: number | null
          contract_expires: string | null
          executive_summary: string | null
          id: number
          image_url: string | null
          injury_status: string | null
          key_insights: string | null
          market_competition: string | null
          news_reliability: string | null
          news_source: string | null
          player_name: string | null
          position: string | null
          real_time_intelligence: string | null
          risk_factors: string | null
          tactical_fit: string | null
          timestamp: string
          transfermarkt_stats: Json | null
          transfermarkt_value: string | null
        }
        Insert: {
          age?: number | null
          breaking_news_alert?: boolean | null
          club?: string | null
          club_willingness?: string | null
          confidence?: number | null
          contract_expires?: string | null
          executive_summary?: string | null
          id?: number
          image_url?: string | null
          injury_status?: string | null
          key_insights?: string | null
          market_competition?: string | null
          news_reliability?: string | null
          news_source?: string | null
          player_name?: string | null
          position?: string | null
          real_time_intelligence?: string | null
          risk_factors?: string | null
          tactical_fit?: string | null
          timestamp: string
          transfermarkt_stats?: Json | null
          transfermarkt_value?: string | null
        }
        Update: {
          age?: number | null
          breaking_news_alert?: boolean | null
          club?: string | null
          club_willingness?: string | null
          confidence?: number | null
          contract_expires?: string | null
          executive_summary?: string | null
          id?: number
          image_url?: string | null
          injury_status?: string | null
          key_insights?: string | null
          market_competition?: string | null
          news_reliability?: string | null
          news_source?: string | null
          player_name?: string | null
          position?: string | null
          real_time_intelligence?: string | null
          risk_factors?: string | null
          tactical_fit?: string | null
          timestamp?: string
          transfermarkt_stats?: Json | null
          transfermarkt_value?: string | null
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
      tus_breaking_news: {
        Row: {
          breaking_news: boolean | null
          category: string | null
          content_type: string | null
          engagement_score: number | null
          fan_interest_score: number | null
          id: string | null
          image_url: string | null
          is_active: boolean | null
          priority: string | null
          processed_at: string | null
          published_at: string | null
          raw_content: string | null
          reliability: number | null
          scraped_at: string | null
          sentiment: string | null
          source: string | null
          source_type: string | null
          source_url: string | null
          specialization: string | null
          summary: string | null
          tier_rating: string | null
          tier_tag: string | null
          timestamp: string | null
          title: string | null
          url: string | null
          workflow_run_id: string | null
        }
        Insert: {
          breaking_news?: boolean | null
          category?: string | null
          content_type?: string | null
          engagement_score?: number | null
          fan_interest_score?: number | null
          id?: string | null
          image_url?: string | null
          is_active?: boolean | null
          priority?: string | null
          processed_at?: string | null
          published_at?: string | null
          raw_content?: string | null
          reliability?: number | null
          scraped_at?: string | null
          sentiment?: string | null
          source?: string | null
          source_type?: string | null
          source_url?: string | null
          specialization?: string | null
          summary?: string | null
          tier_rating?: string | null
          tier_tag?: string | null
          timestamp?: string | null
          title?: string | null
          url?: string | null
          workflow_run_id?: string | null
        }
        Update: {
          breaking_news?: boolean | null
          category?: string | null
          content_type?: string | null
          engagement_score?: number | null
          fan_interest_score?: number | null
          id?: string | null
          image_url?: string | null
          is_active?: boolean | null
          priority?: string | null
          processed_at?: string | null
          published_at?: string | null
          raw_content?: string | null
          reliability?: number | null
          scraped_at?: string | null
          sentiment?: string | null
          source?: string | null
          source_type?: string | null
          source_url?: string | null
          specialization?: string | null
          summary?: string | null
          tier_rating?: string | null
          tier_tag?: string | null
          timestamp?: string | null
          title?: string | null
          url?: string | null
          workflow_run_id?: string | null
        }
        Relationships: []
      }
      tus_gold_tier: {
        Row: {
          breaking_news: boolean | null
          category: string | null
          content_type: string | null
          engagement_score: number | null
          fan_interest_score: number | null
          id: string | null
          image_url: string | null
          is_active: boolean | null
          priority: string | null
          processed_at: string | null
          published_at: string | null
          raw_content: string | null
          reliability: number | null
          scraped_at: string | null
          sentiment: string | null
          source: string | null
          source_type: string | null
          source_url: string | null
          specialization: string | null
          summary: string | null
          tier_rating: string | null
          tier_tag: string | null
          timestamp: string | null
          title: string | null
          url: string | null
          workflow_run_id: string | null
        }
        Insert: {
          breaking_news?: boolean | null
          category?: string | null
          content_type?: string | null
          engagement_score?: number | null
          fan_interest_score?: number | null
          id?: string | null
          image_url?: string | null
          is_active?: boolean | null
          priority?: string | null
          processed_at?: string | null
          published_at?: string | null
          raw_content?: string | null
          reliability?: number | null
          scraped_at?: string | null
          sentiment?: string | null
          source?: string | null
          source_type?: string | null
          source_url?: string | null
          specialization?: string | null
          summary?: string | null
          tier_rating?: string | null
          tier_tag?: string | null
          timestamp?: string | null
          title?: string | null
          url?: string | null
          workflow_run_id?: string | null
        }
        Update: {
          breaking_news?: boolean | null
          category?: string | null
          content_type?: string | null
          engagement_score?: number | null
          fan_interest_score?: number | null
          id?: string | null
          image_url?: string | null
          is_active?: boolean | null
          priority?: string | null
          processed_at?: string | null
          published_at?: string | null
          raw_content?: string | null
          reliability?: number | null
          scraped_at?: string | null
          sentiment?: string | null
          source?: string | null
          source_type?: string | null
          source_url?: string | null
          specialization?: string | null
          summary?: string | null
          tier_rating?: string | null
          tier_tag?: string | null
          timestamp?: string | null
          title?: string | null
          url?: string | null
          workflow_run_id?: string | null
        }
        Relationships: []
      }
      tus_high_interest: {
        Row: {
          breaking_news: boolean | null
          category: string | null
          content_type: string | null
          engagement_score: number | null
          fan_interest_score: number | null
          id: string | null
          image_url: string | null
          is_active: boolean | null
          priority: string | null
          processed_at: string | null
          published_at: string | null
          raw_content: string | null
          reliability: number | null
          scraped_at: string | null
          sentiment: string | null
          source: string | null
          source_type: string | null
          source_url: string | null
          specialization: string | null
          summary: string | null
          tier_rating: string | null
          tier_tag: string | null
          timestamp: string | null
          title: string | null
          url: string | null
          workflow_run_id: string | null
        }
        Insert: {
          breaking_news?: boolean | null
          category?: string | null
          content_type?: string | null
          engagement_score?: number | null
          fan_interest_score?: number | null
          id?: string | null
          image_url?: string | null
          is_active?: boolean | null
          priority?: string | null
          processed_at?: string | null
          published_at?: string | null
          raw_content?: string | null
          reliability?: number | null
          scraped_at?: string | null
          sentiment?: string | null
          source?: string | null
          source_type?: string | null
          source_url?: string | null
          specialization?: string | null
          summary?: string | null
          tier_rating?: string | null
          tier_tag?: string | null
          timestamp?: string | null
          title?: string | null
          url?: string | null
          workflow_run_id?: string | null
        }
        Update: {
          breaking_news?: boolean | null
          category?: string | null
          content_type?: string | null
          engagement_score?: number | null
          fan_interest_score?: number | null
          id?: string | null
          image_url?: string | null
          is_active?: boolean | null
          priority?: string | null
          processed_at?: string | null
          published_at?: string | null
          raw_content?: string | null
          reliability?: number | null
          scraped_at?: string | null
          sentiment?: string | null
          source?: string | null
          source_type?: string | null
          source_url?: string | null
          specialization?: string | null
          summary?: string | null
          tier_rating?: string | null
          tier_tag?: string | null
          timestamp?: string | null
          title?: string | null
          url?: string | null
          workflow_run_id?: string | null
        }
        Relationships: []
      }
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
