/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  Pagination as FlowbitePagination,
  type PaginationProps,
} from "flowbite-react";
import React from "react";

// The props for our dynamic pagination component.
// ✨ NOTE: We're removing the `logic` prop as it's not needed.
// The core props `currentPage`, `totalPages`, etc., are the "logic".
export interface Props
  extends Omit<
    PaginationProps,
    "children" | "style" | "currentPage" | "totalPages" | "onPageChange"
  > {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    currentPage: number;
    totalPages: number;
    onPageChange: any;
  };
  style?: CSSObject;
}

export const defaultLogic = {
  currentPage: 1,
  totalPages: 20,
  // We provide a simple console warning for the demo state.
  onPageChange: (page: number) => {
    console.warn(
      `DynamicPagination: 'onPageChange' not provided. User tried to go to page ${page}.`
    );
  },
};

const Pagination: React.FC<Props> = ({
  geometric,
  style = {},
  logic = defaultLogic,
  ...props
}) => {
  // These styles will be applied to the root <nav> element.
  const componentCss: CSSObject = {
    // A good default for pagination alignment
    display: "flex",
    justifyContent: "center",
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  const { currentPage, totalPages, onPageChange } = logic;

  return (
    <FlowbitePagination
      // We pass our defaults, which will be overridden
      // by any matching props in the `...props` spread.
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      {...props}
      css={componentCss}
    />
  );
};

export default Pagination;
