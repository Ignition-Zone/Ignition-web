/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useNode, useEditor } from "@craftjs/core";
import ReactDOM from "react-dom";
import { ArrowUpOutlined, CloseOutlined, DeleteOutlined, DragOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography, theme } from "antd";
import { css } from "@emotion/react";
import { HuosRemixIcon } from "@huos/icons";
import { InsertComponentModal } from './modal'

export interface RenderNodeWrapperProps {
  render: React.ReactElement;
}

export const CustomNodeRender: React.FC<RenderNodeWrapperProps> = ({
  render,
}) => {
  const { id, parent } = useNode((node) => ({
    parent: node.data.parent,
  }));
  const { query, isActive, isHovered, actions } = useEditor(
    (state, queryEditor) => {
      const [selectId] = state.events.selected;
      const [hoverId] = state.events.hovered;
      const [dragged] = state.events.dragged;
      return {
        isActive: queryEditor.getEvent("selected").contains(id),
        isHovered: queryEditor.getEvent("hovered").contains(id),
        isDragged: queryEditor.getEvent("dragged").contains(id),
        selectId,
        hoverId,
        dragged,
      };
    }
  );

  const {
    dom,
    name,
    isRootNode,
    moveable,
    connectors: { drag },
  } = useNode((node) => {
    return {
      isRootNode: query.node(id).isRoot(),
      dom: node.dom,
      parent: node.data.parent,
      moveable: query.node(node.id).isDraggable(),
      deletable: query.node(node.id).isDeletable(),
      name: node.data.displayName,
      isResize: node.data.custom.useResize || false,
    };
  });

  React.useEffect(() => {
    if (dom) {
      if (isActive) {
        dom.classList.add("editor-component-active");
      } else {
        dom.classList.remove("editor-component-active");
      }
    }
  }, [dom, isActive]);

  React.useEffect(() => {
    if (dom && !isRootNode) {
      if (isHovered && !isActive) {
        dom.classList.add("editor-component-hover");
      } else {
        dom.classList.remove("editor-component-hover");
      }
    }
  }, [dom, isHovered, isRootNode, isActive]);

  return (
    <>
      {render}
    </>
  );
};
