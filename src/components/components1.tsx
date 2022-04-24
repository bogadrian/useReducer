import { memo, ChangeEvent, useRef } from 'react';
import { randomColor } from '../utilis';
import '../App';

//! Names Componnet
type NamesProps = {
  handleChangeNames: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: { name: string; surname: string };
};

export const Names1: React.FC<NamesProps> = memo(
  ({ handleChangeNames, value }) => {
    return (
      <div className="Component" style={{ backgroundColor: randomColor() }}>
        <h1>Names Component</h1>
        <input
          className="Input"
          name="name"
          defaultValue={value?.name}
          onChange={handleChangeNames}
        />
        <input
          className="Input"
          name="surname"
          defaultValue={value?.surname}
          onChange={handleChangeNames}
        />
      </div>
    );
  }
);

//! Professions Component

type ProfessionsProps = {
  handleChangeProfessions?: (profession: string) => void;
  value?: string[];
};
export const Professions1: React.FC<ProfessionsProps> = memo(
  ({ handleChangeProfessions }) => {
    const ref = useRef<HTMLInputElement>(null);

    const handleRefValue = () => {
      handleChangeProfessions?.(ref?.current?.value as string);
      if (ref && ref.current) {
        ref.current.value = '';
      }
    };

    return (
      <div className="Component" style={{ backgroundColor: randomColor() }}>
        <h1>Professions Component</h1>
        <input className="Input" name="professions" ref={ref} />
        <button className="button" onClick={handleRefValue}>
          Set Professions
        </button>
      </div>
    );
  }
);

//! Experince Component

type ExperienceProps = {
  handleChangeExperience?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: { firstExperince: string; secondExperience: string };
};
export const Experience1: React.FC<ExperienceProps> = memo(
  ({ handleChangeExperience, value }) => {
    return (
      <div className="Component" style={{ backgroundColor: randomColor() }}>
        <h1>Experience Component</h1>
        <input
          className="Input"
          name="firstExperince"
          defaultValue={value?.firstExperince}
          onChange={handleChangeExperience}
        />
        <input
          className="Input"
          name="secondExperience"
          defaultValue={value?.secondExperience}
          onChange={handleChangeExperience}
        />
      </div>
    );
  }
);
