import { gql } from "@apollo/client";


export const addvote = gql`
  mutation Mymutation($username: String!, $post_id: ID!, $upvote: Boolean!) {
    insertVote(username: $username, post_id: $post_id, upvote: $upvote) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`;



export const addcomment = gql`
mutation Mymutation(
  $post_id: ID! , $username: String! , $text:String!  ) {
  insertComment(
    post_id:$post_id, text:$text, username: $username
    ){
      created_at
    id
    post_id
    text
    username
    }
  
}
`


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