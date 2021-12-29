import * as yup from "yup";

export type QuestionProps = {
  lib: string;
  index: number;
};

export type DetailData = {
  label: string;
  value: boolean;
};

export type QuestionForm = {
  lib: string;
  items: DetailData[];
  feedbacks: DetailData[];
};

export type Inputs = {
  title: string;
  description: string;
  questions: QuestionForm[];
};

export const schema = yup.object().shape({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  questions: yup
    .array()
    .min(1, "question at least one")
    .of(
      yup.object().shape({
        lib: yup.string().required("question is missing!"),
        items: yup
          ?.array()
          ?.min(1, "at least one answer")
          ?.of(
            yup?.object()?.shape({
              label: yup?.string()?.required("answer is missing!"),
              value: yup?.boolean()
            })
          ),
        feedbacks: yup
          .array()
          .length(2, "two feedback are required")
          .of(
            yup.object().shape({
              label: yup.string().required("feedback is missing!"),
              value: yup.boolean()
            })
          )
      })
    )
});

export const defaultValues = {
  title: "",
  description: "",

  questions: [
    {
      lib: "",
      items: [{ label: "", value: true }],
      feedbacks: [
        { label: "", value: true },
        { label: "", value: false }
      ]
    }
  ]
};
