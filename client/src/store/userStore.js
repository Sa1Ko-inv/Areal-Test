class UserStore {
    constructor() {
        this.user = {
            status: "Работает" // Начальное значение статуса
        };
    }
}

export default new UserStore();