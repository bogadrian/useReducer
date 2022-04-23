import { useReducer, ReactChild, ChangeEvent } from 'react';
import { Names, Professions, Experience } from './index';
import { randomColor } from '../utilis';
import '../App.css';

export type InitialState = {
  fields: {
    names: { name: string; surname: string };
    professions: string[];
    experience: { firstExperince: string; secondExperience: string };
  };
  currentStep: number;
};

const initialState = {
  fields: {
    names: { name: '', surname: '' },
    professions: [],
    experience: { firstExperince: '', secondExperience: '' }
  },
  currentStep: 0
};

type ActionType =
  | { type: 'names'; name: string; value: string }
  | { type: 'professions'; profession: string }
  | { type: 'experience'; name: string; value: string }
  | { type: 'next' }
  | { type: 'previous' };

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case 'names':
      return {
        ...state,
        fields: {
          ...state.fields,
          names: {
            ...state.fields.names,
            [action.name]: action.value
          }
        },
        currentState: 0
      };
    case 'professions':
      return {
        ...state,
        fields: {
          ...state.fields,
          professions: [...state.fields.professions, action.profession]
        },
        currentState: 1
      };
    case 'experience':
      return {
        ...state,
        fields: {
          ...state.fields,
          experience: {
            ...state.fields.experience,
            [action.name]: action.value
          }
        },
        currentState: 2
      };
    case 'next':
      return {
        ...state,
        currentStep:
          state.currentStep < 2 ? state.currentStep + 1 : state.currentStep
      };
    case 'previous':
      return {
        ...state,
        currentStep:
          state.currentStep > 0 ? state.currentStep - 1 : state.currentStep
      };
    default:
      throw new Error('error');
  }
};

export function App2() {
  const [formState, dispatch] = useReducer(reducer, initialState);

  const handleChangeNames = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: 'names', name, value });
  };

  const handleChangeProfessions = (profession: string) => {
    dispatch({ type: 'professions', profession });
  };

  const handleChangeExperience = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: 'experience', name, value });
  };

  const handleNext = () => {
    dispatch({ type: 'next' });
  };

  const handlePrev = () => {
    dispatch({ type: 'previous' });
  };

  return (
    <div className="App" style={{ backgroundColor: randomColor() }}>
      <h3>App Component</h3>
      <div className="json">
        <span className="json-text">{JSON.stringify(formState, null, 2)}</span>
      </div>
      <>
        <Names value={formState.fields.names} />
        <Professions value={formState.fields.professions} />
        <Experience value={formState.fields.experience} />
      </>
      <Stepper
        currentStep={formState.currentStep}
        handlePrev={handlePrev}
        handleNext={handleNext}
      >
        <Names
          handleChangeNames={handleChangeNames}
          value={formState.fields.names}
        />
        <Professions
          handleChangeProfessions={handleChangeProfessions}
          value={formState.fields.professions}
        />
        <Experience
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

const Stepper: React.FC<StepperProps> = ({
  children,
  currentStep,
  handleNext,
  handlePrev
}) => {
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
};
