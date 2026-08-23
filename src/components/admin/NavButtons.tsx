import { useState } from "react";

type PlanType = {
  id: "tag" | "category" | "questionnaire" | "question";
  label: string;
  positionClassName: string;
};

const selectedIndicatorClassName =
  "bg-linear-to-br from-light-green to-medium-green shadow-[0_0_18px_rgba(1,163,104,0.35),inset_0_0_10px_rgba(192,222,175,0.45)]";

const plans: PlanType[] = [
  {
    id: "tag",
    label: "TAGs",
    positionClassName: "translate-x-0",
  },
  {
    id: "category",
    label: "Categorias",
    positionClassName: "translate-x-full",
  },
  {
    id: "questionnaire",
    label: "Questionários",
    positionClassName: "translate-x-[200%]",
  },
  {
    id: "question",
    label: "Questões",
    positionClassName: "translate-x-[300%]",
  },
];

type RadioProps = {
  onselect: (value: "tag" | "category" | "questionnaire" | "question") => void;
};

export const Radio = ({ onselect }: RadioProps) => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
  const selectedPlanConfig =
    plans.find((plan) => plan.id === selectedPlan) ?? plans[0];

  return (
    <div className="relative flex w-fit overflow-hidden rounded-2xl border border-lighter-green bg-dark-green/90 shadow-[inset_1px_1px_4px_rgba(192,222,175,0.25),inset_-1px_-1px_6px_rgba(2,66,33,0.35),0_4px_12px_rgba(2,66,33,0.18)] backdrop-blur-md">
      {plans.map((plan) => (
        <label
          className="relative z-10 flex min-w-20 flex-1 cursor-pointer items-center justify-center px-6 py-3 text-sm font-semibold tracking-[0.3px] text-lighter-green transition-colors duration-300 hover:text-white has-checked:text-white"
          htmlFor={plan.id}
          key={plan.id}
        >
          <input
            checked={selectedPlan === plan.id}
            className="sr-only"
            id={plan.id}
            name="plan"
            type="radio"
            onChange={() => {
              setSelectedPlan(plan.id);
              onselect(plan.id);
            }}
          />
          {plan.label}
        </label>
      ))}

      <div
        className={`absolute inset-y-0 z-0 w-1/4 rounded-2xl transition-[transform,background,box-shadow] duration-500 ease-[cubic-bezier(0.37,1.95,0.66,0.56)] ${selectedIndicatorClassName} ${selectedPlanConfig.positionClassName}`}
      />
    </div>
  );
};
