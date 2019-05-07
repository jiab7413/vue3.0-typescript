export interface States {
    success: string,
    code: any,
    loginList: any[],
    registerList: any[]
}

const states: States = {
    code: null,
    success: '',
    loginList: [],
    registerList: []
};

export default states