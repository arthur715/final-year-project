import Maze from "./Maze.vue"
import Home from "./pages/Home.vue"
import Level1Tutorial from "./pages/Level1Tutorial.vue"
import Level2Tutorial from "./pages/Level2Tutorial.vue"
import Level3Tutorial from "./pages/Level3Tutorial.vue"
import Level4Tutorial from "./pages/Level4Tutorial.vue"
import Level5Tutorial from "./pages/Level5Tutorial.vue"
import Level6Tutorial from "./pages/Level6Tutorial.vue"
import Level7Tutorial from "./pages/Level7Tutorial.vue"
import Level8Tutorial from "./pages/Level8Tutorial.vue"
import Level9Tutorial from "./pages/Level9Tutorial.vue"
import Level10Tutorial from "./pages/Level10Tutorial.vue"
import Summary from "./pages/Summary.vue"

export default[
  {
    path: '/',
    component: Home
  },
  {
    path: '/Maze',
    component: Maze
  },
  {
    path: '/Level-1-Tutorial',
    component: Level1Tutorial
  },
  {
    path: '/Level-2-Tutorial',
    component: Level2Tutorial
  },
  {
    path: '/Level-3-Tutorial',
    component: Level3Tutorial
  },
  {
    path: '/Level-4-Tutorial',
    component: Level4Tutorial
  },
  {
    path: '/Level-5-Tutorial',
    component: Level5Tutorial
  },
  {
    path: '/Level-6-Tutorial',
    component: Level6Tutorial
  },
  {
    path: '/Level-7-Tutorial',
    component: Level7Tutorial
  },
  {
    path: '/Level-8-Tutorial',
    component: Level8Tutorial
  },
  {
    path: '/Level-9-Tutorial',
    component: Level9Tutorial
  },
  {
    path: '/Level-10-Tutorial',
    component: Level10Tutorial
  },
  {
    path: '/Summary',
    component: Summary
  }

]