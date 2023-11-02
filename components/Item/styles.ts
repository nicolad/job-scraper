import { styled } from "@phntms/css-components";

import css from "./styles.module.css";

export const ItemWrapper = styled("li", {
  css: css.ItemWrapper,
  variants: {
    status: {
      Done: css.ItemWrapper_Done,
      InProgress: css.ItemWrapper_InProgress,
      NotDone: css.ItemWrapper_NotDone,
    },
  },
});

export const InfoContainer = styled("div", {
  css: css.InfoContainer,
});

export const ItemLink = styled("a", {
  css: css.ItemLink,
});

export const ContentRow = styled("div", {
  css: css.ContentRow,
});

export const Upvote = styled("span", {
  css: css.Upvote,
  variants: {
    disabled: {
      true: css.Upvote_disabled,
    },
  },
});

export const InProgressIcon = styled("span", {
  css: css.InProgressIcon,
});

export const DoneIcon = styled("span", {
  css: css.DoneIcon,
});
