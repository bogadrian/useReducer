import { useReducer, ReactChild, ChangeEvent } from 'react';
import { Names2, Professions2, Experience2 } from './index';
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

export type ActionType =
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

  return (
    <div className="App" style={{ backgroundColor: randomColor() }}>
      <h3>App Component</h3>
      <div className="json">
        <span className="json-text">{JSON.stringify(formState, null, 2)}</span>
      </div>
      <>
        <Names2 value={formState.fields.names} />
        <Professions2 value={formState.fields.professions} />
        <Experience2 value={formState.fields.experience} />
      </>
      <Stepper currentStep={formState.currentStep} dispatch={dispatch}>
        <Names2 dispatch={dispatch} value={formState.fields.names} />
        <Professions2
          dispatch={dispatch}
          value={formState.fields.professions}
        />
        <Experience2 dispatch={dispatch} value={formState.fields.experience} />
      </Stepper>
    </div>
  );
}

type StepperProps = {
  children: ReactChild[];
  currentStep: number;
  dispatch: ({ type }: { type: 'next' | 'previous' }) => void;
};

const Stepper: React.FC<StepperProps> = ({
  children,
  currentStep,
  dispatch
}) => {
  const handleNext = () => {
    dispatch({ type: 'next' });
  };

  const handlePrev = () => {
    dispatch({ type: 'previous' });
  };

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
