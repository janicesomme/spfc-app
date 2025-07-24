export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bets: {
        Row: {
          actual_away_goals: number | null
          actual_home_goals: number | null
          actual_winnings: number | null
          fixture_id: string
          id: string
          is_correct: boolean | null
          odds: number
          placed_at: string | null
          potential_winnings: number
          prediction: Json
          question_id: number
          stake: number
          user_id: string
        }
        Insert: {
          actual_away_goals?: number | null
          actual_home_goals?: number | null
          actual_winnings?: number | null
          fixture_id: string
          id?: string
          is_correct?: boolean | null
          odds: number
          placed_at?: string | null
          potential_winnings: number
          prediction: Json
          question_id: number
          stake: number
          user_id: string
        }
        Update: {
          actual_away_goals?: number | null
          actual_home_goals?: number | null
          actual_winnings?: number | null
          fixture_id?: string
          id?: string
          is_correct?: boolean | null
          odds?: number
          placed_at?: string | null
          potential_winnings?: number
          prediction?: Json
          question_id?: number
          stake?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bets_fixture_id_fkey"
            columns: ["fixture_id"]
            isOneToOne: false
            referencedRelation: "fixtures"
            referencedColumns: ["external_id"]
          },
          {
            foreignKeyName: "bets_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      fixtures: {
        Row: {
          away_goals: number | null
          competition: string | null
          external_id: string
          first_united_scorer: string | null
          home_goals: number | null
          kickoff: string | null
          opponent: string | null
          possession: number | null
          shots_on_target: number | null
          status: string | null
          venue: string | null
        }
        Insert: {
          away_goals?: number | null
          competition?: string | null
          external_id: string
          first_united_scorer?: string | null
          home_goals?: number | null
          kickoff?: string | null
          opponent?: string | null
          possession?: number | null
          shots_on_target?: number | null
          status?: string | null
          venue?: string | null
        }
        Update: {
          away_goals?: number | null
          competition?: string | null
          external_id?: string
          first_united_scorer?: string | null
          home_goals?: number | null
          kickoff?: string | null
          opponent?: string | null
          possession?: number | null
          shots_on_target?: number | null
          status?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      latest_videos: {
        Row: {
          channel_id: string | null
          channel_title: string | null
          created_at: string | null
          description: string | null
          embed_url: string | null
          fetched_at: string | null
          id: number
          published_at: string | null
          published_at_formatted: string | null
          thumbnail_height: number | null
          thumbnail_url: string | null
          thumbnail_width: number | null
          title: string
          updated_at: string | null
          video_id: string
          youtube_url: string | null
        }
        Insert: {
          channel_id?: string | null
          channel_title?: string | null
          created_at?: string | null
          description?: string | null
          embed_url?: string | null
          fetched_at?: string | null
          id?: number
          published_at?: string | null
          published_at_formatted?: string | null
          thumbnail_height?: number | null
          thumbnail_url?: string | null
          thumbnail_width?: number | null
          title: string
          updated_at?: string | null
          video_id: string
          youtube_url?: string | null
        }
        Update: {
          channel_id?: string | null
          channel_title?: string | null
          created_at?: string | null
          description?: string | null
          embed_url?: string | null
          fetched_at?: string | null
          id?: number
          published_at?: string | null
          published_at_formatted?: string | null
          thumbnail_height?: number | null
          thumbnail_url?: string | null
          thumbnail_width?: number | null
          title?: string
          updated_at?: string | null
          video_id?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      leaderboard: {
        Row: {
          created_at: string | null
          id: string
          total_winnings: number | null
          user_id: string | null
          username: string
          winnings: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          total_winnings?: number | null
          user_id?: string | null
          username: string
          winnings?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          total_winnings?: number | null
          user_id?: string | null
          username?: string
          winnings?: number | null
        }
        Relationships: []
      }
      man_utd_news: {
        Row: {
          category: string | null
          content_hash: string | null
          content_type: string | null
          created_at: string | null
          description: string | null
          has_image: boolean | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_breaking: boolean | null
          is_match_report: boolean | null
          is_transfer: boolean | null
          link: string | null
          published_at: string | null
          rank: number | null
          relevance_score: number | null
          scraped_at: string | null
          snippet: string | null
          source: string
          source_logo: string | null
          timestamp: string | null
          title: string
          url: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          content_hash?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          has_image?: boolean | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_breaking?: boolean | null
          is_match_report?: boolean | null
          is_transfer?: boolean | null
          link?: string | null
          published_at?: string | null
          rank?: number | null
          relevance_score?: number | null
          scraped_at?: string | null
          snippet?: string | null
          source: string
          source_logo?: string | null
          timestamp?: string | null
          title: string
          url: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          content_hash?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          has_image?: boolean | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_breaking?: boolean | null
          is_match_report?: boolean | null
          is_transfer?: boolean | null
          link?: string | null
          published_at?: string | null
          rank?: number | null
          relevance_score?: number | null
          scraped_at?: string | null
          snippet?: string | null
          source?: string
          source_logo?: string | null
          timestamp?: string | null
          title?: string
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      motm_votes: {
        Row: {
          fixture_id: string
          id: string
          player_id: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          fixture_id: string
          id?: string
          player_id: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          fixture_id?: string
          id?: string
          player_id?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          category: string | null
          content_type: string | null
          created_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          link: string | null
          published_at: string | null
          scraped_at: string | null
          snippet: string | null
          source: string | null
          summary: string | null
          timestamp: string | null
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
          link?: string | null
          published_at?: string | null
          scraped_at?: string | null
          snippet?: string | null
          source?: string | null
          summary?: string | null
          timestamp?: string | null
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
          link?: string | null
          published_at?: string | null
          scraped_at?: string | null
          snippet?: string | null
          source?: string | null
          summary?: string | null
          timestamp?: string | null
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
      official_xi: {
        Row: {
          fixture_id: string
          id: string
          image_url: string | null
          match_id: string | null
          player_ids: string[] | null
          player_name: string | null
          position: string | null
          role: string | null
        }
        Insert: {
          fixture_id: string
          id?: string
          image_url?: string | null
          match_id?: string | null
          player_ids?: string[] | null
          player_name?: string | null
          position?: string | null
          role?: string | null
        }
        Update: {
          fixture_id?: string
          id?: string
          image_url?: string | null
          match_id?: string | null
          player_ids?: string[] | null
          player_name?: string | null
          position?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "official_xi_fixture_id_fkey"
            columns: ["fixture_id"]
            isOneToOne: false
            referencedRelation: "fixtures"
            referencedColumns: ["external_id"]
          },
        ]
      }
      perfect_match_totals: {
        Row: {
          total_perfect_matches: number | null
          user_id: string
        }
        Insert: {
          total_perfect_matches?: number | null
          user_id: string
        }
        Update: {
          total_perfect_matches?: number | null
          user_id?: string
        }
        Relationships: []
      }
      player_images: {
        Row: {
          id: string
          image_url: string
          player_name: string
          position: string | null
        }
        Insert: {
          id?: string
          image_url: string
          player_name: string
          position?: string | null
        }
        Update: {
          id?: string
          image_url?: string
          player_name?: string
          position?: string | null
        }
        Relationships: []
      }
      player_ratings: {
        Row: {
          id: number
          match_id: string
          player_id: string
          rating: number
          timestamp: string
          user_id: string | null
        }
        Insert: {
          id?: number
          match_id: string
          player_id: string
          rating: number
          timestamp: string
          user_id?: string | null
        }
        Update: {
          id?: number
          match_id?: string
          player_id?: string
          rating?: number
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      players: {
        Row: {
          id: string
          image_url: string | null
          name: string
          role: string
        }
        Insert: {
          id?: string
          image_url?: string | null
          name: string
          role: string
        }
        Update: {
          id?: string
          image_url?: string | null
          name?: string
          role?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          id: number
          label: string
        }
        Insert: {
          id: number
          label: string
        }
        Update: {
          id?: number
          label?: string
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
      thumbnail_history: {
        Row: {
          created_at: string | null
          generated_at: string
          headline: string
          id: number
          image_count: number | null
          is_regeneration: boolean | null
          mood: string
          players: Json
          processing_stats: Json | null
          prompt_used: string
          thumbnail_id: string
          variation_applied: string | null
        }
        Insert: {
          created_at?: string | null
          generated_at: string
          headline: string
          id?: number
          image_count?: number | null
          is_regeneration?: boolean | null
          mood: string
          players: Json
          processing_stats?: Json | null
          prompt_used: string
          thumbnail_id: string
          variation_applied?: string | null
        }
        Update: {
          created_at?: string | null
          generated_at?: string
          headline?: string
          id?: number
          image_count?: number | null
          is_regeneration?: boolean | null
          mood?: string
          players?: Json
          processing_stats?: Json | null
          prompt_used?: string
          thumbnail_id?: string
          variation_applied?: string | null
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
      user_xi_submissions: {
        Row: {
          fixture_id: string
          id: string
          is_perfect_match: boolean | null
          submitted_xi: string[]
          timestamp: string | null
          user_id: string
        }
        Insert: {
          fixture_id: string
          id?: string
          is_perfect_match?: boolean | null
          submitted_xi: string[]
          timestamp?: string | null
          user_id: string
        }
        Update: {
          fixture_id?: string
          id?: string
          is_perfect_match?: boolean | null
          submitted_xi?: string[]
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          discord_id: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string | null
          discord_id?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Update: {
          created_at?: string | null
          discord_id?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
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
      active_man_utd_news: {
        Row: {
          created_at: string | null
          description: string | null
          has_image: boolean | null
          id: string | null
          image_url: string | null
          is_breaking: boolean | null
          is_match_report: boolean | null
          is_transfer: boolean | null
          published_at: string | null
          rank: number | null
          relevance_score: number | null
          source: string | null
          source_logo: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          has_image?: boolean | null
          id?: string | null
          image_url?: string | null
          is_breaking?: boolean | null
          is_match_report?: boolean | null
          is_transfer?: boolean | null
          published_at?: string | null
          rank?: number | null
          relevance_score?: number | null
          source?: string | null
          source_logo?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          has_image?: boolean | null
          id?: string | null
          image_url?: string | null
          is_breaking?: boolean | null
          is_match_report?: boolean | null
          is_transfer?: boolean | null
          published_at?: string | null
          rank?: number | null
          relevance_score?: number | null
          source?: string | null
          source_logo?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: []
      }
      motm_vote_results: {
        Row: {
          fixture_id: string | null
          player_id: string | null
          rank: number | null
          vote_percentage: number | null
        }
        Relationships: []
      }
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
