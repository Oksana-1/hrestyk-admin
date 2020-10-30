export default {
    // called by Vue.use(PromisifyModal)
    install(Vue) {
        Vue.prototype.$promisifyModal = function () {
            console.log('Some logic goes here!');
        }
    }
}