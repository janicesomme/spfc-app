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
            foreignKeyName: "bets_fixture_id_fkey"
            columns: ["fixture_id"]
            isOneToOne: false
            referencedRelation: "possession_mvp"
            referencedColumns: ["fixture_id"]
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
      bundesliga_news: {
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
      email_subscribers: {
        Row: {
          consent: boolean
          created_at: string
          email: string
          id: number
          source: string | null
        }
        Insert: {
          consent?: boolean
          created_at?: string
          email: string
          id?: number
          source?: string | null
        }
        Update: {
          consent?: boolean
          created_at?: string
          email?: string
          id?: number
          source?: string | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          body: string
          created_at: string | null
          slug: string
          subject: string
        }
        Insert: {
          body: string
          created_at?: string | null
          slug: string
          subject: string
        }
        Update: {
          body?: string
          created_at?: string | null
          slug?: string
          subject?: string
        }
        Relationships: []
      }
      final_player_ratings: {
        Row: {
          average_rating: number | null
          image_url: string | null
          is_motm: boolean | null
          match_id: string
          player_id: string | null
          player_name: string
          position: string | null
          starter: boolean | null
          votes: number | null
        }
        Insert: {
          average_rating?: number | null
          image_url?: string | null
          is_motm?: boolean | null
          match_id: string
          player_id?: string | null
          player_name: string
          position?: string | null
          starter?: boolean | null
          votes?: number | null
        }
        Update: {
          average_rating?: number | null
          image_url?: string | null
          is_motm?: boolean | null
          match_id?: string
          player_id?: string | null
          player_name?: string
          position?: string | null
          starter?: boolean | null
          votes?: number | null
        }
        Relationships: []
      }
      first_scorer_odds: {
        Row: {
          fraction: string
          player_name: string
          player_slug: string
        }
        Insert: {
          fraction: string
          player_name: string
          player_slug: string
        }
        Update: {
          fraction?: string
          player_name?: string
          player_slug?: string
        }
        Relationships: []
      }
      fixture_difficulty: {
        Row: {
          difficulty: number
          fixture_id: string
        }
        Insert: {
          difficulty: number
          fixture_id: string
        }
        Update: {
          difficulty?: number
          fixture_id?: string
        }
        Relationships: []
      }
      fixtures: {
        Row: {
          away_goals: number | null
          competition: string | null
          external_id: string
          first_united_scorer: string | null
          freeze_results_at: string | null
          home_goals: number | null
          home_team: string | null
          is_active: boolean | null
          kickoff: string | null
          opponent: string | null
          possession: number | null
          shots_on_target: number | null
          status: string | null
          venue: string | null
          voting_closes_at: string | null
          voting_opens_at: string | null
        }
        Insert: {
          away_goals?: number | null
          competition?: string | null
          external_id: string
          first_united_scorer?: string | null
          freeze_results_at?: string | null
          home_goals?: number | null
          home_team?: string | null
          is_active?: boolean | null
          kickoff?: string | null
          opponent?: string | null
          possession?: number | null
          shots_on_target?: number | null
          status?: string | null
          venue?: string | null
          voting_closes_at?: string | null
          voting_opens_at?: string | null
        }
        Update: {
          away_goals?: number | null
          competition?: string | null
          external_id?: string
          first_united_scorer?: string | null
          freeze_results_at?: string | null
          home_goals?: number | null
          home_team?: string | null
          is_active?: boolean | null
          kickoff?: string | null
          opponent?: string | null
          possession?: number | null
          shots_on_target?: number | null
          status?: string | null
          venue?: string | null
          voting_closes_at?: string | null
          voting_opens_at?: string | null
        }
        Relationships: []
      }
      futv_bingo_card_events: {
        Row: {
          card_id: number | null
          created_at: string | null
          event_name: string | null
          id: number
          position: number | null
          updated_at: string | null
        }
        Insert: {
          card_id?: number | null
          created_at?: string | null
          event_name?: string | null
          id?: number
          position?: number | null
          updated_at?: string | null
        }
        Update: {
          card_id?: number | null
          created_at?: string | null
          event_name?: string | null
          id?: number
          position?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      futv_bingo_cards: {
        Row: {
          card_name: string | null
          created_at: string | null
          fixture_id: number | null
          id: number
          updated_at: string | null
          username: string | null
        }
        Insert: {
          card_name?: string | null
          created_at?: string | null
          fixture_id?: number | null
          id?: number
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          card_name?: string | null
          created_at?: string | null
          fixture_id?: number | null
          id?: number
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      futv_event_pool: {
        Row: {
          category: string | null
          created_at: string | null
          event_name: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          event_name?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          event_name?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      futv_leaderboard: {
        Row: {
          id: number
          last_updated: string | null
          total_winnings: number | null
          username: string | null
        }
        Insert: {
          id?: number
          last_updated?: string | null
          total_winnings?: number | null
          username?: string | null
        }
        Update: {
          id?: number
          last_updated?: string | null
          total_winnings?: number | null
          username?: string | null
        }
        Relationships: []
      }
      futv_league_members: {
        Row: {
          bingo_card_id: string | null
          fixture_external_id: string | null
          id: string
          league_id: string | null
          nickname: string
        }
        Insert: {
          bingo_card_id?: string | null
          fixture_external_id?: string | null
          id?: string
          league_id?: string | null
          nickname: string
        }
        Update: {
          bingo_card_id?: string | null
          fixture_external_id?: string | null
          id?: string
          league_id?: string | null
          nickname?: string
        }
        Relationships: [
          {
            foreignKeyName: "futv_league_members_fixture_external_id_fkey"
            columns: ["fixture_external_id"]
            isOneToOne: false
            referencedRelation: "fixtures"
            referencedColumns: ["external_id"]
          },
          {
            foreignKeyName: "futv_league_members_fixture_external_id_fkey"
            columns: ["fixture_external_id"]
            isOneToOne: false
            referencedRelation: "possession_mvp"
            referencedColumns: ["fixture_id"]
          },
          {
            foreignKeyName: "futv_league_members_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "futv_leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      futv_leagues: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          join_code: string
          league_name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          join_code: string
          league_name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          join_code?: string
          league_name?: string
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
      live_event_log: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          message: string | null
          payload: Json | null
          type: string
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          message?: string | null
          payload?: Json | null
          type: string
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          message?: string | null
          payload?: Json | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_event_log_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "live_events"
            referencedColumns: ["id"]
          },
        ]
      }
      live_events: {
        Row: {
          created_at: string | null
          email_sent: boolean | null
          email_status: string | null
          event_title: string
          id: string
          live_time: string
          product_count: number | null
          reminder_scheduled: boolean | null
          status: string | null
          teaser_posted: boolean | null
          teaser_status: string | null
        }
        Insert: {
          created_at?: string | null
          email_sent?: boolean | null
          email_status?: string | null
          event_title: string
          id?: string
          live_time: string
          product_count?: number | null
          reminder_scheduled?: boolean | null
          status?: string | null
          teaser_posted?: boolean | null
          teaser_status?: string | null
        }
        Update: {
          created_at?: string | null
          email_sent?: boolean | null
          email_status?: string | null
          event_title?: string
          id?: string
          live_time?: string
          product_count?: number | null
          reminder_scheduled?: boolean | null
          status?: string | null
          teaser_posted?: boolean | null
          teaser_status?: string | null
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
      marketing_tasks: {
        Row: {
          category: string
          created_at: string | null
          deadline: string | null
          id: string
          last_update: string | null
          owner: string | null
          progress: number | null
          project_id: string
          status: string | null
          task: string
        }
        Insert: {
          category: string
          created_at?: string | null
          deadline?: string | null
          id?: string
          last_update?: string | null
          owner?: string | null
          progress?: number | null
          project_id: string
          status?: string | null
          task: string
        }
        Update: {
          category?: string
          created_at?: string | null
          deadline?: string | null
          id?: string
          last_update?: string | null
          owner?: string | null
          progress?: number | null
          project_id?: string
          status?: string | null
          task?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
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
      mux_leaderboard: {
        Row: {
          created_at: string | null
          id: string
          last_updated: string | null
          rank_position: number | null
          total_value: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_updated?: string | null
          rank_position?: number | null
          total_value?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_updated?: string | null
          rank_position?: number | null
          total_value?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mux_leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "mux_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mux_opinions: {
        Row: {
          category: string | null
          confidence_score: number | null
          created_at: string | null
          current_value: number | null
          id: string
          locked_at: string | null
          outcome: string | null
          statement: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          confidence_score?: number | null
          created_at?: string | null
          current_value?: number | null
          id?: string
          locked_at?: string | null
          outcome?: string | null
          statement: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          confidence_score?: number | null
          created_at?: string | null
          current_value?: number | null
          id?: string
          locked_at?: string | null
          outcome?: string | null
          statement?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mux_opinions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mux_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mux_sentiment_scores: {
        Row: {
          ai_sentiment: string | null
          created_at: string | null
          id: string
          opinion_id: string
          sentiment_value: number | null
          source: string | null
          updated_at: string | null
        }
        Insert: {
          ai_sentiment?: string | null
          created_at?: string | null
          id?: string
          opinion_id: string
          sentiment_value?: number | null
          source?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_sentiment?: string | null
          created_at?: string | null
          id?: string
          opinion_id?: string
          sentiment_value?: number | null
          source?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mux_sentiment_scores_opinion_id_fkey"
            columns: ["opinion_id"]
            isOneToOne: false
            referencedRelation: "mux_opinions"
            referencedColumns: ["id"]
          },
        ]
      }
      mux_transactions: {
        Row: {
          action: string
          created_at: string | null
          id: string
          opinion_id: string
          price: number
          quantity: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          opinion_id: string
          price: number
          quantity?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          opinion_id?: string
          price?: number
          quantity?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mux_transactions_opinion_id_fkey"
            columns: ["opinion_id"]
            isOneToOne: false
            referencedRelation: "mux_opinions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mux_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mux_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mux_users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          reputation_score: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id?: string
          reputation_score?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          reputation_score?: number | null
          updated_at?: string | null
          username?: string
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
          {
            foreignKeyName: "official_xi_fixture_id_fkey"
            columns: ["fixture_id"]
            isOneToOne: false
            referencedRelation: "possession_mvp"
            referencedColumns: ["fixture_id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          price: number | null
          product_id: string | null
          qty: number
          source: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          price?: number | null
          product_id?: string | null
          qty: number
          source?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          price?: number | null
          product_id?: string | null
          qty?: number
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
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
          player_name: string | null
          position: string | null
          rating: number
          starter: boolean | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          id?: number
          match_id: string
          player_id: string
          player_name?: string | null
          position?: string | null
          rating: number
          starter?: boolean | null
          timestamp: string
          user_id?: string | null
        }
        Update: {
          id?: number
          match_id?: string
          player_id?: string
          player_name?: string | null
          position?: string | null
          rating?: number
          starter?: boolean | null
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
      prd_items: {
        Row: {
          created_at: string | null
          feature_group: string
          id: string
          last_update: string | null
          owner: string | null
          progress: number | null
          project_id: string
          status: string | null
          task: string
        }
        Insert: {
          created_at?: string | null
          feature_group: string
          id?: string
          last_update?: string | null
          owner?: string | null
          progress?: number | null
          project_id: string
          status?: string | null
          task: string
        }
        Update: {
          created_at?: string | null
          feature_group?: string
          id?: string
          last_update?: string | null
          owner?: string | null
          progress?: number | null
          project_id?: string
          status?: string | null
          task?: string
        }
        Relationships: [
          {
            foreignKeyName: "prd_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      prd_subtasks: {
        Row: {
          blocking: boolean | null
          created_at: string | null
          description: string
          done_minutes: number | null
          estimate_minutes: number | null
          id: string
          last_update: string | null
          prd_item_id: string | null
          progress: number | null
          status: string | null
        }
        Insert: {
          blocking?: boolean | null
          created_at?: string | null
          description: string
          done_minutes?: number | null
          estimate_minutes?: number | null
          id?: string
          last_update?: string | null
          prd_item_id?: string | null
          progress?: number | null
          status?: string | null
        }
        Update: {
          blocking?: boolean | null
          created_at?: string | null
          description?: string
          done_minutes?: number | null
          estimate_minutes?: number | null
          id?: string
          last_update?: string | null
          prd_item_id?: string | null
          progress?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prd_subtasks_prd_item_id_fkey"
            columns: ["prd_item_id"]
            isOneToOne: false
            referencedRelation: "prd_items"
            referencedColumns: ["id"]
          },
        ]
      }
      prediction_baseline: {
        Row: {
          fraction: string
          scoreline: string
        }
        Insert: {
          fraction: string
          scoreline: string
        }
        Update: {
          fraction?: string
          scoreline?: string
        }
        Relationships: []
      }
      prediction_markets: {
        Row: {
          fixture_id: string
          id: number
          odds_decimal: number
          option_key: string
          question_key: string
          updated_at: string | null
        }
        Insert: {
          fixture_id: string
          id?: number
          odds_decimal: number
          option_key: string
          question_key: string
          updated_at?: string | null
        }
        Update: {
          fixture_id?: string
          id?: number
          odds_decimal?: number
          option_key?: string
          question_key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          affiliate_url: string | null
          created_at: string | null
          id: string
          image_url: string | null
          is_affiliate: boolean | null
          name: string
          price: number
          sku: string | null
          stock: number | null
        }
        Insert: {
          affiliate_url?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_affiliate?: boolean | null
          name: string
          price: number
          sku?: string | null
          stock?: number | null
        }
        Update: {
          affiliate_url?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_affiliate?: boolean | null
          name?: string
          price?: number
          sku?: string | null
          stock?: number | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          last_update: string | null
          lead_channel: string | null
          local_path: string | null
          marketing_status: string | null
          n8n_workflow: string | null
          name: string
          next_action: string | null
          priority: number | null
          progress: number | null
          repo_url: string | null
          status: string | null
          summary: string | null
          supabase_project: string | null
          supabase_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          last_update?: string | null
          lead_channel?: string | null
          local_path?: string | null
          marketing_status?: string | null
          n8n_workflow?: string | null
          name: string
          next_action?: string | null
          priority?: number | null
          progress?: number | null
          repo_url?: string | null
          status?: string | null
          summary?: string | null
          supabase_project?: string | null
          supabase_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          last_update?: string | null
          lead_channel?: string | null
          local_path?: string | null
          marketing_status?: string | null
          n8n_workflow?: string | null
          name?: string
          next_action?: string | null
          priority?: number | null
          progress?: number | null
          repo_url?: string | null
          status?: string | null
          summary?: string | null
          supabase_project?: string | null
          supabase_url?: string | null
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
      shots_on_target_pct: {
        Row: {
          pct: number
          shots: number
        }
        Insert: {
          pct: number
          shots: number
        }
        Update: {
          pct?: number
          shots?: number
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
      ytgrowth_action_plans: {
        Row: {
          actions: Json
          channel_id: string
          completed_at: string | null
          created_at: string
          current_value: number | null
          difficulty_level: string | null
          due_date: string | null
          effectiveness_rating: number | null
          estimated_impact: string | null
          id: string
          metadata: Json | null
          notes: string | null
          plan_title: string
          plan_type: string
          priority: string | null
          status: string | null
          success_criteria: string | null
          target_metric: string | null
          target_value: number | null
          time_commitment: string | null
          updated_at: string
        }
        Insert: {
          actions?: Json
          channel_id: string
          completed_at?: string | null
          created_at?: string
          current_value?: number | null
          difficulty_level?: string | null
          due_date?: string | null
          effectiveness_rating?: number | null
          estimated_impact?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          plan_title: string
          plan_type: string
          priority?: string | null
          status?: string | null
          success_criteria?: string | null
          target_metric?: string | null
          target_value?: number | null
          time_commitment?: string | null
          updated_at?: string
        }
        Update: {
          actions?: Json
          channel_id?: string
          completed_at?: string | null
          created_at?: string
          current_value?: number | null
          difficulty_level?: string | null
          due_date?: string | null
          effectiveness_rating?: number | null
          estimated_impact?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          plan_title?: string
          plan_type?: string
          priority?: string | null
          status?: string | null
          success_criteria?: string | null
          target_metric?: string | null
          target_value?: number | null
          time_commitment?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ytgrowth_action_plans_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "ytgrowth_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      ytgrowth_channels: {
        Row: {
          channel_handle: string | null
          channel_name: string
          created_at: string
          custom_url: string | null
          description: string | null
          id: string
          is_primary: boolean | null
          last_synced_at: string | null
          platform: string
          published_at: string | null
          subscriber_count: number | null
          sync_status: string | null
          thumbnail_url: string | null
          updated_at: string
          user_id: string
          video_count: number | null
          view_count: number | null
          youtube_channel_id: string
        }
        Insert: {
          channel_handle?: string | null
          channel_name: string
          created_at?: string
          custom_url?: string | null
          description?: string | null
          id?: string
          is_primary?: boolean | null
          last_synced_at?: string | null
          platform?: string
          published_at?: string | null
          subscriber_count?: number | null
          sync_status?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          user_id: string
          video_count?: number | null
          view_count?: number | null
          youtube_channel_id: string
        }
        Update: {
          channel_handle?: string | null
          channel_name?: string
          created_at?: string
          custom_url?: string | null
          description?: string | null
          id?: string
          is_primary?: boolean | null
          last_synced_at?: string | null
          platform?: string
          published_at?: string | null
          subscriber_count?: number | null
          sync_status?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          user_id?: string
          video_count?: number | null
          view_count?: number | null
          youtube_channel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ytgrowth_channels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ytgrowth_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ytgrowth_content_ideas: {
        Row: {
          ai_confidence_score: number | null
          category: string | null
          channel_id: string
          created_at: string
          description: string | null
          estimated_length_minutes: number | null
          id: string
          keywords: string[] | null
          metadata: Json | null
          notes: string | null
          priority: string | null
          published_video_id: string | null
          scheduled_date: string | null
          source: string | null
          status: string | null
          target_audience: string | null
          title: string
          trend_relevance_score: number | null
          updated_at: string
        }
        Insert: {
          ai_confidence_score?: number | null
          category?: string | null
          channel_id: string
          created_at?: string
          description?: string | null
          estimated_length_minutes?: number | null
          id?: string
          keywords?: string[] | null
          metadata?: Json | null
          notes?: string | null
          priority?: string | null
          published_video_id?: string | null
          scheduled_date?: string | null
          source?: string | null
          status?: string | null
          target_audience?: string | null
          title: string
          trend_relevance_score?: number | null
          updated_at?: string
        }
        Update: {
          ai_confidence_score?: number | null
          category?: string | null
          channel_id?: string
          created_at?: string
          description?: string | null
          estimated_length_minutes?: number | null
          id?: string
          keywords?: string[] | null
          metadata?: Json | null
          notes?: string | null
          priority?: string | null
          published_video_id?: string | null
          scheduled_date?: string | null
          source?: string | null
          status?: string | null
          target_audience?: string | null
          title?: string
          trend_relevance_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ytgrowth_content_ideas_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "ytgrowth_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      ytgrowth_metrics: {
        Row: {
          average_view_duration_seconds: number | null
          channel_id: string
          comment_count: number | null
          created_at: string
          ctr_percentage: number | null
          engagement_rate: number | null
          estimated_minutes_watched: number | null
          id: string
          impressions: number | null
          like_count: number | null
          metadata: Json | null
          metric_date: string
          share_count: number | null
          subscriber_change: number | null
          subscriber_count: number | null
          updated_at: string
          video_change: number | null
          video_count: number | null
          view_change: number | null
          view_count: number | null
        }
        Insert: {
          average_view_duration_seconds?: number | null
          channel_id: string
          comment_count?: number | null
          created_at?: string
          ctr_percentage?: number | null
          engagement_rate?: number | null
          estimated_minutes_watched?: number | null
          id?: string
          impressions?: number | null
          like_count?: number | null
          metadata?: Json | null
          metric_date: string
          share_count?: number | null
          subscriber_change?: number | null
          subscriber_count?: number | null
          updated_at?: string
          video_change?: number | null
          video_count?: number | null
          view_change?: number | null
          view_count?: number | null
        }
        Update: {
          average_view_duration_seconds?: number | null
          channel_id?: string
          comment_count?: number | null
          created_at?: string
          ctr_percentage?: number | null
          engagement_rate?: number | null
          estimated_minutes_watched?: number | null
          id?: string
          impressions?: number | null
          like_count?: number | null
          metadata?: Json | null
          metric_date?: string
          share_count?: number | null
          subscriber_change?: number | null
          subscriber_count?: number | null
          updated_at?: string
          video_change?: number | null
          video_count?: number | null
          view_change?: number | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ytgrowth_metrics_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "ytgrowth_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      ytgrowth_revenue_streams: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          notes: string | null
          revenue_date: string
          revenue_source: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          notes?: string | null
          revenue_date: string
          revenue_source: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          notes?: string | null
          revenue_date?: string
          revenue_source?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ytgrowth_revenue_streams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ytgrowth_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ytgrowth_sponsors: {
        Row: {
          brand_name: string
          brand_website: string | null
          contact_email: string | null
          contact_name: string | null
          contract_end_date: string | null
          contract_start_date: string | null
          created_at: string
          deal_status: string | null
          deal_value: number | null
          id: string
          industry: string | null
          notes: string | null
          typical_budget_range: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          brand_name: string
          brand_website?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string
          deal_status?: string | null
          deal_value?: number | null
          id?: string
          industry?: string | null
          notes?: string | null
          typical_budget_range?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          brand_name?: string
          brand_website?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string
          deal_status?: string | null
          deal_value?: number | null
          id?: string
          industry?: string | null
          notes?: string | null
          typical_budget_range?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ytgrowth_sponsors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ytgrowth_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ytgrowth_table_of_tables: {
        Row: {
          created_at: string
          id: string
          key_columns: string | null
          purpose: string | null
          status: string | null
          table_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          key_columns?: string | null
          purpose?: string | null
          status?: string | null
          table_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          key_columns?: string | null
          purpose?: string | null
          status?: string | null
          table_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      ytgrowth_users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          last_login_at: string | null
          preferences: Json | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          last_login_at?: string | null
          preferences?: Json | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          last_login_at?: string | null
          preferences?: Json | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ytgrowth_videos: {
        Row: {
          channel_id: string
          comment_count: number | null
          created_at: string
          engagement_rate: number | null
          id: string
          like_count: number | null
          platform_video_id: string
          published_at: string | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          channel_id: string
          comment_count?: number | null
          created_at?: string
          engagement_rate?: number | null
          id?: string
          like_count?: number | null
          platform_video_id: string
          published_at?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          channel_id?: string
          comment_count?: number | null
          created_at?: string
          engagement_rate?: number | null
          id?: string
          like_count?: number | null
          platform_video_id?: string
          published_at?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ytgrowth_videos_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "ytgrowth_channels"
            referencedColumns: ["id"]
          },
        ]
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
      match_player_ratings: {
        Row: {
          average_rating: number | null
          image_url: string | null
          is_motm: boolean | null
          match_id: string | null
          player_name: string | null
          position: string | null
          rating_rank: number | null
          starter: boolean | null
          votes: number | null
        }
        Relationships: []
      }
      motm_by_match: {
        Row: {
          avg_rating: number | null
          match_id: string | null
          player_id: string | null
          rank: number | null
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
      player_ratings_enriched: {
        Row: {
          id: number | null
          image_url: string | null
          match_id: string | null
          player_id: string | null
          player_name: string | null
          position: string | null
          rating: number | null
          starter: boolean | null
          timestamp: string | null
          user_id: string | null
        }
        Relationships: []
      }
      possession_mvp: {
        Row: {
          fixture_id: string | null
          fraction: string | null
          our_band_text: string | null
          our_expected: number | null
          our_high: number | null
          our_low: number | null
        }
        Relationships: []
      }
      prediction_adjusted_odds: {
        Row: {
          adj_num: number | null
          adjusted_fraction: string | null
          fixture_id: string | null
          scoreline: string | null
        }
        Relationships: []
      }
      prediction_baseline_full: {
        Row: {
          fraction: string | null
          scoreline: string | null
        }
        Relationships: []
      }
      shots_on_target_odds: {
        Row: {
          fraction: string | null
          pct: number | null
          shots: number | null
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
