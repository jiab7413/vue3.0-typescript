import { ActionTree } from "vuex";
import { States } from './states'
import axios from 'axios'

const actions: ActionTree<States, any> = {
    // 注册校验用户名
    EXAMINE_REGISTER_DATA({ commit, state: States}, data: any[]) {
        axios({
            method: 'post',
            url: '/v1/api/verification',
            params: data
        }).then((res: any) => {
            commit('EXAMINE_INFO', res);
        }).catch((error) => {
            console.log(error)
        })
    },
    // 注册接口
    SET_REGISTER_DATA({ commit, state: States}, data: any[]) {
        axios({
            method: 'post',
            url: '/v1/api/newlyAdded',
            params: data
        }).then((res: any) => {
            commit('REGISTER_INFO', res);
        }).catch((error) => {
            console.log(error)
        })
    },
    // 登录接口
    SEARCH_LOGIN_DATA({ commit, state: States}, data: any[]) {
        axios({
            method: 'post',
            url: '/v1/api/polling',
            params: data
        }).then((res: any) => {
            commit('LOGIN_INFO', res);
        }).catch((error) => {
            console.log(error)
        })
    },
};
export default actions
