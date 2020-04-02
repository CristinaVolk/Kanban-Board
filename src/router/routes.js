import Login from '@/components/Login'
import Register from '@/components/Register'
import KanbanBoard from '@/components/KanbanBoard';

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
      path: '/board',
      component: KanbanBoard
    },
    {
      path: '*',
      redirect: '/board'
    }
  ]

export default routes