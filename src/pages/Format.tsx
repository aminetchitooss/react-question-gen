import { useRef, useState } from "react";
import styled from "styled-components";
import { InfoModalHandle, InfoModal } from "../components/InfoModal";
// import { Quiz } from "../utils/colors";

const StyledDiv = styled.div`
  display: flex;
  align-items: flex-start;

  flex-direction: column;
  margin-top: 2rem;
  width: 100%;

  textarea {
    height: calc(100vh - 2rem - 124px - 2rem - 24px - 3rem - 48px - 2rem);
  }

  button {
    margin-bottom: 2rem;
  }
`;
// const vQuiz: Quiz = {} as Quiz;
export default function Format() {
  const [code, setcode] = useState("");

  const modalRef = useRef<InfoModalHandle>(null);

  const handleChange = (val) => {
    setcode(val.target.value);
  };

  // const handleClick = () => {
  //   // console.log(code);
  //   const listQstSeg = code.split("QST-");
  //   // for (let index = 0; index < listQstSeg.length; index++) {
  //   //   const qstFrame = listQstSeg[index];

  //   //   const tmpDoc = document.createElement("div");
  //   //   tmpDoc.innerHTML = qstFrame;

  //   //   const list = tmpDoc?.querySelectorAll("li p");
  //   //   if (list) {
  //   //     vQuiz._id= index + 1
  //   //     vQuiz.questions=[]
  //   //     for (let index = 0; index < list.length; index++) {
  //   //       const element = list[index];
  //   //       debugger;
  //   //       if (element?.querySelector("span")?.style.color == "rgb(112, 173, 71)") {
  //   //         // obj._id = index + 1;
  //   //         console.log(element);
  //   //       }else{
  //   //         vQuiz.questions.push({lib})
  //   //       }
  //   //     }
  //   //     listElements.push(obj);
  //   //   }
  //   // }
  // };

  const handleModal = () => {
    console.log("yep");
    modalRef.current?.openModal();
  };

  return (
    <StyledDiv>
      <label htmlFor="code">Code:</label>
      <textarea onChange={(val) => handleChange(val)} placeholder="Paste </> here" value={code} name="code" id="code" cols={30} rows={10} autoComplete="off"></textarea>
      <button onClick={handleModal} className="btn filled">
        Convert to json
      </button>
      <InfoModal message="This feature is not yet available" ref={modalRef} />
    </StyledDiv>
  );
}
