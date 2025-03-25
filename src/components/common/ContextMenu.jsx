"use client";
import React, { useEffect, useRef } from "react";

const ContextMenu = ({ options, coordinates, contextMenu, setContextMenu }) => {
  const contextMenuRef = useRef(null);
  const handleClientClick = (e, callBack) => {
    e.stopPropagation();
    callBack();
  };

  useEffect(() => { 
    const handleOutsideClick = (e) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setContextMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleClientClick);
    };
  }, []);

  return (
    <div
      ref={contextMenuRef}
      style={{
        boxShadow:
          "0 2px 5px 0 rgba(var(11,20, 26),0 2px 0 rgba(11,20,26;),.16",
        top: coordinates.y,
        left: coordinates.x,
      }}
      className="bg-white shadow-2xl fixed py-5 z-[100] rounded-lg border border-gray-200"
    >
      <ul>
        {options.map(({ name, callBack }) => (
          <li
            className="hover:bg-gray-100 pl-5 pr-10 py-2 cursor-pointer"
            key={name}
            onClick={(e) => handleClientClick(e, callBack)}
          >
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
