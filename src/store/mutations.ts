import { MutationTree } from "vuex";

const Mutations: MutationTree<any> = {
    // 校验
    EXAMINE_INFO(
        state: any,
        res: any
    ): void {
        if (res.data.msg !== undefined) {
            state.success = res.data.msg;
        }
        state.code = res.data.code;
    },
    // 注册
    REGISTER_INFO(
        state: any,
        res: any
    ): void {
        state.success = res.data.msg;
        state.code = res.data.code;
    },
    // 登录
    LOGIN_INFO(
        state: any,
        res: any
    ): void {
        state.loginList = res.data.data;
        state.success = res.data.msg;
        if (res.data.token !== undefined) {
            sessionStorage.setItem("TOKEN", res.data.token);
        }
    }
};
export default Mutations