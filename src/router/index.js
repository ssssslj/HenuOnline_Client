import Vue from 'vue'
import Router from 'vue-router'
import News from '@/components/News'
import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/Content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'News',
      component: News
    },
    {
      path: '/Content',
      name: 'Content',
      component: Content
    },
  ]
})
