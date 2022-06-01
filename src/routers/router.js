import Vue from 'vue';
import Router from 'vue-router';
// import DataVisual from '../pages/DataVisual'
import OneMap from '../pages/OneMap'
import MoreScreen from './../components/MoreScreen'
import MapDataVisual from './../components/MapDataVisual'

Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    routes: [
        {
            path: '/',
            // component: DataVisual
            component: MapDataVisual
        },
        {
            path: '/onemap',
            component: OneMap
        },
        {
            path:'/onemap/one',
            component:MoreScreen
        }
    ],
    mode: 'history'
});