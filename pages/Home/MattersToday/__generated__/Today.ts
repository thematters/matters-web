/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Today
// ====================================================

export interface Today_viewer_recommendation_today_author {
  __typename: "User";
  userName: string;
}

export interface Today_viewer_recommendation_today_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface Today_viewer_recommendation_today {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: Today_viewer_recommendation_today_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: Today_viewer_recommendation_today_comments;
}

export interface Today_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * Matters Today
   */
  today: Today_viewer_recommendation_today | null;
}

export interface Today_viewer {
  __typename: "User";
  id: string;
  recommendation: Today_viewer_recommendation;
}

export interface Today {
  viewer: Today_viewer | null;
}
