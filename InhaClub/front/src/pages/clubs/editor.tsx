import { useRef, useState, useMemo } from "react";
import React from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = (props:any) => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState("");

  const saveContents = (e:any) => {
    setContents(e);
    props.setContent(contents);
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          [],
        ],
      },
    }),
    []
  );


  return (
    <>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={saveContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    </>
  )
}

export default Editor;