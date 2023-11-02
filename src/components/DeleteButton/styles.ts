import { styled } from "@phntms/css-components";

import css from "./styles.module.css";

export const DeleteButtonWrapper = styled("div", {
  css: css.DeleteButtonWrapper,
});

export const DeleteButtonIcon = styled("a", {
  css: css.DeleteButtonIcon,
});
  
export const ConfirmDelete = styled("div", {
  css: css.ConfirmDelete,
  variants: {
    visible: {
      true: css.ConfirmDelete_visible,
    },
  },
});