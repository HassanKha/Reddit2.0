import { gql } from "@apollo/client";

export const GetAllPosts = gql`
  query MyQuery {
    getPostList {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        created_at
        id
        topic
      }
      comments {
        created_at
        id
        post_id
        text
        username
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GetPostListbytopic = gql`
  query MyQuery($topic: String!) {
    getPostListbytopic(topic: $topic) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        created_at
        id
        topic
      }
      comments {
        created_at
        id
        post_id
        text
        username
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GetSubredditListbytopic = gql`
  query MyQuery($topic: String!) {
    getSubredditListbytopic(topic: $topic) {
      created_at
      id
      topic
    }
  }
`;
