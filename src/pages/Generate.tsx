import { useRef } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Inputs, schema, defaultValues } from "../utils/FormData";
import { yupResolver } from "@hookform/resolvers/yup";
import styled, { css } from "styled-components";
import Question from "../components/Question";

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

export default function Generate() {
  const methods = useForm<Inputs>({ defaultValues, resolver: yupResolver(schema), mode: "onChange" });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  const onSubmit = handleSubmit((values) => {
    console.log(JSON.stringify(values, null, 2));
  });

  const childRef: any = useRef();

  const handleAddNewQuestion = () => {
    append({ lib: "" });
    setTimeout(() => {
      if (childRef && childRef.current) {
        childRef.current.addAnswer();
      }
    }, 10);
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="title">Title* :</label>
        <input type="text" id="title" {...methods.register("title")} />
        {errors["title"] && <p className="error">{errors["title"].message}</p>}

        <label htmlFor="desc">Description* :</label>
        <textarea id="desc" cols={30} rows={10} {...methods.register("description")}></textarea>
        {errors["description"] && <p className="error">{errors["description"].message}</p>}

        <section>
          {fields.map((item, index) => (
            <div className="card" key={item.id}>
              <Question ref={childRef} lib={item.lib} index={index} />
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
      </form>
    </FormProvider>
  );
}
