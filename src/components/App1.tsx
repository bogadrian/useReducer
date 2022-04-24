import { useState, ReactChild, ChangeEvent, memo } from 'react';
import { Names1, Professions1, Experience1 } from './index';
import { randomColor } from '../utilis';
import '../App.css';

export type InitialState1 = {
  fields: {
    names: { name: string; surname: string };
    professions: string[];
    experience: { firstExperince: string; secondExperience: string };
  };
  currentStep: number;
};

export function App1() {
  const [formState, setFormState] = useState<InitialState1>({
    fields: {
      names: { name: '', surname: '' },
      professions: [],
      experience: { firstExperince: '', secondExperience: '' }
    },
    currentStep: 0
  });

  const handleChangeNames = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        names: { ...prev.fields.names, [e.target.name]: e.target.value }
      },
      currentState: 0
    }));
  };

  const handleChangeProfessions = (profession: string) => {
    setFormState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        professions: [...prev.fields.professions, profession]
      },
      currentState: 1
    }));
  };

  const handleChangeExperience = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        experience: {
          ...prev.fields.experience,
          [e.target.name]: e.target.value
        }
      },
      currentState: 2
    }));
  };

  const handleNext = () => {
    setFormState(prev => ({
      ...prev,
      currentStep:
        prev.currentStep < 2 ? prev.currentStep + 1 : prev.currentStep
    }));
  };

  const handlePrev = () => {
    setFormState(prev => ({
      ...prev,
      currentStep:
        prev.currentStep > 0 ? prev.currentStep - 1 : prev.currentStep
    }));
  };

  return (
    <div className="App" style={{ backgroundColor: randomColor() }}>
      <h3>App Component</h3>
      <div className="json">
        <span className="json-text">{JSON.stringify(formState, null, 2)}</span>
      </div>
      <>
        <Names1
          handleChangeNames={handleChangeNames}
          value={formState.fields.names}
        />
        <Professions1
          handleChangeProfessions={handleChangeProfessions}
          value={formState.fields.professions}
        />
        <Experience1
          handleChangeExperience={handleChangeExperience}
          value={formState.fields.experience}
        />
      </>
      <Stepper
        currentStep={formState.currentStep}
        handlePrev={handlePrev}
        handleNext={handleNext}
      >
        <Names1
          handleChangeNames={handleChangeNames}
          value={formState.fields.names}
        />
        <Professions1
          handleChangeProfessions={handleChangeProfessions}
          value={formState.fields.professions}
        />
        <Experience1
          handleChangeExperience={handleChangeExperience}
          value={formState.fields.experience}
        />
      </Stepper>
    </div>
  );
}

type StepperProps = {
  children: ReactChild[];
  currentStep: number;
  handlePrev: () => void;
  handleNext: () => void;
};

const Stepper: React.FC<StepperProps> = memo(
  ({ children, currentStep, handleNext, handlePrev }) => {
    return (
      <div className="Stepper" style={{ backgroundColor: randomColor() }}>
        <h1>Stepper Component</h1>
        {children[currentStep]}
        <div className="buttons">
          <button className="button" onClick={handlePrev}>
            Previous
          </button>
          <button className="button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    );
  }
);
