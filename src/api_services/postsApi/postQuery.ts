import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllPosts, getAPost, getCommentPostApi, getHashtag, getMyPost, getTrendingPost, viewAPost } from ".";

export const useGetAPost = (postId:string) => {
  return useQuery({
    queryKey: ["get-a-posts"],
    queryFn:() => getAPost(postId),
  });
};

export const useGetAllPosts = () => {
  return useInfiniteQuery({
    queryKey: ["get-all-posts"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getAllPosts(pageParam as any),
    getNextPageParam: (lastPage) => {
      // Use the metadata from the server response
      if (lastPage?.page >= lastPage.total) return undefined;
      return lastPage?.page + 1;
    },
  });
};

export const useViewAPost = (postId:string) => {
  return useQuery({
    queryKey: ["view-post", postId],
    queryFn: () => viewAPost(postId),
  });
};



export const useGetMyPosts = () => {
  return useQuery({
    queryKey: ["get-my-posts"],
    queryFn: getMyPost,
  });
};

export const useGetTrendingPost = () => {
  return useQuery({
    queryKey: ["get-trending-post"],
    queryFn: getTrendingPost,
  });
};


export const useGetHashtag = () => {
  return useQuery({
    queryKey: ["get-hashtag"],
    queryFn: getHashtag,
  });
};

export const useGetCommentPostApi = (postId: string) => {
  return useQuery({
    queryKey: ["get-comment", postId],
    queryFn:()=> getCommentPostApi(postId),
  });
};




