import { useRef, useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Inputs, schema, defaultValues } from "../utils/FormData";
import { yupResolver } from "@hookform/resolvers/yup";
import styled, { css } from "styled-components";
import Question, { QuestionHandle } from "../components/Question";
import { InfoModal, InfoModalHandle } from "../components/InfoModal";

const StyledBtn = styled.button`
  ${({ unvalid }) =>
    unvalid &&
    css`
      background-color: rgba(0, 0, 0, 0.122);
      color: rgba(0, 0, 0, 0.259);
      border-color: transparent;
      cursor: not-allowed;
    `}
`;
const StyledModalBtn = styled.button`
  ${({ isCopied }) =>
    isCopied &&
    css`
      background-color: teal;
      border-color: teal;
      cursor: not-allowed;
    `}
`;

export default function Generate() {
  const [Values, setValues] = useState("{}");
  const [isCopied, setisCopied] = useState(false);
  const methods = useForm<Inputs>({ defaultValues, resolver: yupResolver(schema), mode: "onChange" });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  const onSubmit = handleSubmit((values) => {
    const val = JSON.stringify(values, null, 2);
    console.log(val);
    setValues(val);
    setisCopied(false);
    modalRef.current?.openModal();
  });

  const childRef = useRef<QuestionHandle>(null);
  const modalRef = useRef<InfoModalHandle>(null);

  const InputRef = useRef<HTMLTextAreaElement>(null);

  const handleAddNewQuestion = () => {
    append({ lib: "" });
    setTimeout(() => {
      childRef.current?.addAnswer();
    }, 10);
  };

  const copyToClipBoard = () => {
    InputRef.current?.select();
    document.execCommand("copy");
    setisCopied(true);
  };

  const closeModal = () => {
    modalRef.current?.closeModal();
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="title">Title* :</label>
        <input type="text" id="title" {...methods.register("title")} autoComplete="off" />
        {errors["title"] && <p className="error">{errors["title"].message}</p>}

        <label htmlFor="desc">Description* :</label>
        <textarea id="desc" cols={30} rows={10} {...methods.register("description")} autoComplete="off"></textarea>
        {errors["description"] && <p className="error">{errors["description"].message}</p>}

        <section>
          {fields.map((item, index) => (
            <div className="card" key={item.id}>
              <Question ref={childRef} index={index} />
              <button type="button" className="btn del end" onClick={() => remove(index)}>
                Delete question
              </button>
            </div>
          ))}

          <button type="button" className="btn" onClick={handleAddNewQuestion}>
            Add question
          </button>
        </section>
        {fields.length == 0 && <p className="error">You need to add at least one question</p>}

        <StyledBtn className="btn filled end" unvalid={!isValid}>
          Validate
        </StyledBtn>

        <InfoModal message="Congrats !!" ref={modalRef}>
          <textarea ref={InputRef} cols={30} rows={10} defaultValue={Values} autoComplete="off"></textarea>
          <div className="around">
            <button type="button" className="btn" onClick={closeModal}>
              Close
            </button>
            <StyledModalBtn type="button" className="btn filled" isCopied={isCopied} onClick={copyToClipBoard}>
              {isCopied ? "Copied" : "Copy to clipboard"}
            </StyledModalBtn>
          </div>
        </InfoModal>
      </form>
    </FormProvider>
  );
}
