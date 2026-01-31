import {
  House,
  SquareUser,
  History,
  ListVideo,
  ThumbsUp,
  SquarePlay,
} from "lucide-react";

export const primaryLinks = [
  {
    id: 1,
    to: "/home",
    title: "Home",
    icon: House,
  },
  {
    id: 2,
    to: "/dashboard",
    title: "Dashboard",
    icon: SquareUser,
  },
];

export const secondaryLinks = [
  {
    id: 3,
    to: "/watch-history",
    title: "Watch history",
    icon: History,
  },
  {
    id: 4,
    to: "/playlists",
    title: "Playlists",
    icon: ListVideo,
  },
  {
    id: 5,
    to: "/liked-videos",
    title: "Liked videos",
    icon: ThumbsUp,
  },
  {
    id: 6,
    to: "/your-videos",
    title: "Your videos",
    icon: SquarePlay,
  },
];
