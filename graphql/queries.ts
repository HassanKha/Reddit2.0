import { gql } from "@apollo/client";

export const GetPostByPostID = gql`
  query MyQuery($id: ID!) {
    getPostByPostID(id: $id) {
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

export const GetVotingsbypost = gql`
  query MyQuery($post_id: ID!) {
    getVoteListbypost(post_id: $post_id) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`;

export const GetSubredditListLimit = gql`
  query MyQuery($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      created_at
      id
      topic
    }
  }
`;
