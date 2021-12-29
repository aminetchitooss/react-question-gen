import { forwardRef, useImperativeHandle } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { QuestionProps } from "../utils/FormData";
import addBtn from "../assets/Add.png";
import deleteBtn from "../assets/Delete.png";

export type QuestionHandle = {
  addAnswer: () => void;
};

const Question = forwardRef<QuestionHandle, QuestionProps>(({ index }: QuestionProps, ref) => {
  useImperativeHandle(ref, () => ({
    addAnswer() {
      handleAddNewAnswer();
    }
  }));

  const {
    register,
    control,
    formState: { errors }
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions[${index}].items`
  });

  const handleAddNewAnswer = () => {
    append({ label: "", value: true });
  };

  return (
    <section>
      <label>Question* :</label>
      <input {...register(`questions[${index}].lib`)} />
      {errors?.questions?.[index]?.lib && <p className="error">{(errors?.questions?.[index]?.lib as any).message}</p>}

      {fields.map((item, i) => (
        <div key={item.id} className="answers">
          <div className="block">
            <label>Answer* :</label>
            <input {...register(`questions[${index}].items[${i}].label`)} />
            {errors?.questions?.[index]?.items?.[i]?.label && <p className="error">{(errors?.questions?.[index]?.items?.[i]?.label as any).message}</p>}
          </div>
          <div>
            <label>Status* :</label>
            <select {...register(`questions[${index}].items[${i}].value`)}>
              <option value="true">Correct</option>
              <option value="false">Incorrect</option>
            </select>
          </div>
          <div className="action">
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(i)}>
                <img src={deleteBtn} alt="deleteBtn" />
              </button>
            )}
            {fields.length == i + 1 && (
              <button type="button" onClick={handleAddNewAnswer}>
                <img src={addBtn} alt="addBtn" />
              </button>
            )}
          </div>
        </div>
      ))}

      <label className="spacer">feedback for correct answer* :</label>
      <input type="text" {...register(`questions[${index}].feedbacks[0].label`)} />
      {errors?.questions?.[index]?.feedbacks?.[0]?.label && <p className="error">{(errors?.questions?.[index]?.feedbacks?.[0]?.label as any).message}</p>}

      <label>feedback for incorrect answer* :</label>
      <input type="text" {...register(`questions[${index}].feedbacks[1].label`)} />
      {errors?.questions?.[index]?.feedbacks?.[1]?.label && <p className="error">{(errors?.questions?.[index]?.feedbacks?.[1]?.label as any).message}</p>}

      <input type="text" className="hide" defaultValue="true" {...register(`questions[${index}].feedbacks[0].value`)} />
      <input type="text" className="hide" defaultValue="false" {...register(`questions[${index}].feedbacks[1].value`)} />
    </section>
  );
});

export default Question;
