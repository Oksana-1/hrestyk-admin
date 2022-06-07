import Vue from "vue";

const WithVuexFetch = (Component, vuexFetch) => {
  const inheritedProps = Component.props || [];
  return Vue.component("WithVuexFetch", {
    props: { ...inheritedProps },
    data() {
      return {
        status: "initial",
      };
    },
    methods: {
      async init() {
        this.status = "loading";
        try {
          await this.$store.dispatch(vuexFetch);
        } catch (error) {
          console.error(error);
        } finally {
          this.status = "ready";
        }
      },
    },
    created() {
      this.init();
    },
    render(createElement) {
      return createElement(Component, {
        on: { ...this.$listeners },
        props: {
          ...this.$props,
          vuexStatus: this.status,
        },
      });
    },
  });
};
export default WithVuexFetch;
