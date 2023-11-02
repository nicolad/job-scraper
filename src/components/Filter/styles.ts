import { styled } from "@phntms/css-components";

import css from "./styles.module.css";

export const FilterWrapper = styled("ul", {
  css: css.FilterWrapper,
});

export const FilterItem = styled("li", {
  css: css.FilterItem,
  variants: {
    active: {
      true: css.FilterItem_active,
    },
  },
});
