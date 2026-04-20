import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Who We Are",
    newTab: false,
    submenu: [
      {
        id: 11,
        title: "Who We Are",
        path: "/whoweare",
        newTab: false,
      },
      {
        id: 12,
        title: "Our History",
        path: "/history",
        newTab: false,
      },
      {
        id: 13,
        title: "Board of Directors",
        path: "/board",
        newTab: false,
      },
    ],
  },
  {
    id: 2,
    title: "What We Do",
    path: "/whatwedo",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "What We Do",
        path: "/whatwedo",
        newTab: false,
      },
      {
        id: 22,
        title: "Health",
        path: "/health",
        newTab: false,
      },
      {
        id: 22,
        title: "Education",
        path: "/education",
        newTab: false,
      },
      // {
      //   id: 23,
      //   title: "Agriculture",
      //   path: "/agriculture",
      //   newTab: false,
      // },
      {
        id: 24,
        title: "Capacity Development",
        path: "/capacity",
        newTab: false,
      },
      {
        id: 25,
        title: "Our Impact",
        path: "/ourimpact",
        newTab: false,
      },
      {
        id: 26,
        title: "Success Stories",
        path: "/success-stories",
        newTab: false,
      },
      {
        id: 27,
        title: "Value For Money",
        path: "/valueformoney",
        newTab: false,
      },
    ],
  },
  {
    id: 3,
    title: "Get Involved",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Get Involved",
        path: "/getinvolved",
        newTab: false,
      },
      // {
      //   id: 32,
      //   title: "Give",
      //   path: "/give",
      //   newTab: false,
      // },
      // {
      //   id: 33,
      //   title: "FundRaise",
      //   path: "/fundraise",
      //   newTab: false,
      // },
      {
        id: 34,
        title: "Join Us In The Field",
        path: "/joinus",
        newTab: false,
      },
      {
        id: 35,
        title: "Volunteer",
        path: "/volunteer",
        newTab: false,
      },
      {
        id: 36,
        title: "Student Ambassador Program",
        path: "/studentambassador",
        newTab: false,
      },
      {
        id: 37,
        title: "Job Placement",
        path: "/job-placement",
        newTab: false,
      },
    ],
  },
  // {
  //   id: 4,
  //   title: "Resources",
  //   newTab: false,
  //   submenu: [
  //     {
  //       id: 41,
  //       title: "Impact News and Events",
  //       path: "/blog",
  //       newTab: false,
  //     },
  //     {
  //       id: 42,
  //       title: "Mission Outreach",
  //       path: "/blog",
  //       newTab: false,
  //     },
  //     {
  //       id: 43,
  //       title: "Impact Data ",
  //       path: "/blog",
  //       newTab: false,
  //     },
  //     {
  //       id: 44,
  //       title: "Newsletter",
  //       path: "/signup",
  //       newTab: false,
  //     },
  //     {
  //       id: 45,
  //       title: "Upcoming Events",
  //       path: "/blog",
  //       newTab: false,
  //     },
  //     {
  //       id: 46,
  //       title: "Gallery",
  //       path: "/blog",
  //       newTab: false,
  //     },
  //     {
  //       id: 47,
  //       title: "Volunteer Engagement",
  //       path: "/signup",
  //       newTab: false,
  //     },
  //     {
  //       id: 48,
  //       title: "Impact Mission Kits",
  //       path: "/blog",
  //       newTab: false,
  //     },
  //   ],
  // },
];

export default menuData;
