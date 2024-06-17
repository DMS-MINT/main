
"use client";
import {
  selectLetterDetails,
  updateContent,
} from "@/lib/features/letter/letterSlice";
import { useAppDispatch } from "@/lib/hooks";

import { useAppSelector } from "@/lib/hooks";
import React, { useState, useRef, useEffect } from "react";

import "react-quill/dist/quill.snow.css";
function stripHTMLTags(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
const MyComponent = () => {
  const [text, setText] = useState("");
  const [isClient, setIsClient] = useState(false);
  const quillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function stripHTMLTags(str: string): string {
    return str.replace(/<[^>]*>/g, "");
  }

  const handleChange = (content: string) => {
    setText(content.toString());
    const plaintext = stripHTMLTags(content)
    dispatch(updateContent(plaintext));
    console.log("Edited content:", content.toString());
  };

  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strikethrough"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
    [{ font: [] }, { color: [] }],
    ["superscript", "subscript"],
    ["undo", "redo"],
  ];
  const modules = {
    toolbar: toolbarOptions,
  };

  const customButtonHandler = () => {
    console.log("Custom button clicked!");
  };

  const letterDetail = useAppSelector(selectLetterDetails);
  const dispatch = useAppDispatch();

  return (
    <>
      {isClient && (
        <ReactQuill
          // value={letterDetail.content || ""}
          onChange={handleChange}
          modules={modules}
          theme='snow'
          className='   w-[732px] h-[650px] ml-20  mt-4 mb-1 pb-16 bg-white'
        />
      )}
    </>
  );
};

export default MyComponent;

