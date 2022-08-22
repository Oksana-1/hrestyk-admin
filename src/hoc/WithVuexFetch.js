import Vue from "vue";
import LoadSpinner from "@/components/spinners/LoadSpinner";
import ApiError from "@/components/errors/ApiError";
import { errorHandleMixin } from "@/mixins/errorHandleMixin";

const WithVuexFetch = (Component, vuexFetch) => {
  const inheritedProps = Component.props || {};
  return Vue.component("WithVuexFetch", {
    props: { ...inheritedProps, vuexArgs: {} },
    mixins: [errorHandleMixin],
    data() {
      return {
        status: "initial",
      };
    },
    methods: {
      init: async function () {
        this.status = "loading";
        try {
          this.vuexArgs
            ? await this.$store.dispatch(vuexFetch, this.vuexArgs)
            : await this.$store.dispatch(vuexFetch);
        } catch (error) {
          await this.handleErrors(error);
        } finally {
          this.status = "ready";
        }
      },
    },
    created() {
      this.init();
    },
    render(createElement) {
      if (this.status === "loading") {
        return createElement(LoadSpinner);
      } else if (this.error) {
        return createElement(ApiError, {
          props: {
            error: this.error,
            vuexStatus: this.status,
          },
        });
      } else {
        return createElement(Component, {
          on: { ...this.$listeners },
          props: {
            ...this.$props,
            vuexStatus: this.status,
          },
        });
      }
    },
  });
};
export default WithVuexFetch;
