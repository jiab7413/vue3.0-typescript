import { GetterTree } from "vuex";
import { States } from './states'

const getters: GetterTree<States, any> = {
    // 校验
    success(
        state: any
    ): void {
        return state.success
    },
    code(
        state: any
    ): void {
        return state.code
    },
    // 登录
    loginList(
        state: any
    ): void {
        return state.loginList
    }
};
export default getters