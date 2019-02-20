/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeToday
// ====================================================

export interface HomeToday_viewer_recommendation_today_author {
  __typename: "User";
  userName: string;
  id: string;
  /**
   * Display name on profile
   */
  displayName: string;
  /**
   * URL for avatar
   */
  avatar: any | null;
}

export interface HomeToday_viewer_recommendation_today_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface HomeToday_viewer_recommendation_today {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: HomeToday_viewer_recommendation_today_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: HomeToday_viewer_recommendation_today_comments;
}

export interface HomeToday_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * Matters Today
   */
  today: HomeToday_viewer_recommendation_today | null;
}

export interface HomeToday_viewer {
  __typename: "User";
  id: string;
  recommendation: HomeToday_viewer_recommendation;
}

export interface HomeToday {
  viewer: HomeToday_viewer | null;
}
