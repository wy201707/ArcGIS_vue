import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
 
    _defaultView: '',       //默认地图view
    _defaultMapTreeVisible: false,       //该数据供maptools控制maptree是否显示，默认false,即maptree某栏不显示
};
 
const getters = {
 
    _getDefaultView() {           
        return state._defaultView;
    },
    _getdefaultMapTreeVisible() {           
        return state._defaultMapTreeVisible;
    }
};
 
const mutations = {
 
    _setDefaultView(state,value) {
        state._defaultView = value;
    },
    _setDefaultMapTreeVisible(state,value) {
        state._defaultMapTreeVisible = value;
    },
};
 
const store = new Vuex.Store({
    state,
    getters,
    mutations
});

export default store
