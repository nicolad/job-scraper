"use client";

import { useState } from "react";
import { DeleteButtonWrapper, DeleteButtonIcon, ConfirmDelete } from "./styles";
import { deleteItem } from "@/utils/server-actions";
import { FaTrash } from "react-icons/fa6";


export default function DeleteButton(item:any) {
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <DeleteButtonWrapper>
      {!popupVisible && (
        <DeleteButtonIcon onClick={handlePopup} title="Delete">
          <FaTrash />
        </DeleteButtonIcon>
      )}
      <ConfirmDelete visible={popupVisible}>
        <p>Are you sure?</p>
        <button
          onClick={() => {
            deleteItem(item.itemName);
            setPopupVisible(false);
          }}
        >
          Yes
        </button>
        <button onClick={handlePopup}>No</button>
      </ConfirmDelete>
    </DeleteButtonWrapper>
  )
}