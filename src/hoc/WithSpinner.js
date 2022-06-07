import Vue from "vue";
import LoadSpinner from "@/components/spinners/LoadSpinner";

const WithSpinner = (ComponentPayload) => {
  return Vue.component("WithSpinner", {
    functional: true,
    render(createElement, context) {
      if (context.props.status === "loading") {
        return createElement(LoadSpinner);
      } else {
        if (Array.isArray(ComponentPayload)) {
          ComponentPayload.forEach((Component) => {
            return createElement(Component, {
              on: { ...context.listeners },
            });
          });
        }
        return createElement(ComponentPayload, {
          on: { ...context.listeners },
        });
      }
    },
  });
};
export default WithSpinner;
