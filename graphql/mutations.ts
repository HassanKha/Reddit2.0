import { gql } from "@apollo/client";

export const addpost = gql`
mutation Mymutation (
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
){
        insertPost(
    body: $body
    subreddit_id: $subreddit_id
    title: $title
    username: $username
    image: $image
  ){
    username
    body
    created_at
    id
    image
    title
    subreddit_id
  }
}
`
export const addsubreddit = gql`
mutation mymutation(
    $topic : String!
    ){
        insertSubreddit(topic: $topic){
            id
            topic
            created_at
        }
}
`