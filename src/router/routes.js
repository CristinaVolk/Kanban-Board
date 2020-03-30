import Login from '@/components/Login'
import Register from '@/components/Register'
import KanbanBoard from '@/components/KanbanBoard';
import Backlog from '@/components/Backlog';

let routes = [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/backlog',
      component: Backlog
    },
    {
      path: '/board',
      component: KanbanBoard
    },
    {
      path: '*',
      redirect: '/board'
    }
  ]

export default routes