import { memo, ChangeEvent, useRef } from 'react';
import { randomColor } from '../utilis';

import '../App';

//! Names Componnet
type NamesProps = {
  dispatch?: ({
    type,
    name,
    value
  }: {
    type: 'names';
    name: string;
    value: string;
  }) => void;
  value?: { name: string; surname: string };
};

export const Names2: React.FC<NamesProps> = memo(({ dispatch, value }) => {
  return (
    <div className="Component" style={{ backgroundColor: randomColor() }}>
      <h1>Names Component</h1>
      <input
        className="Input"
        name="name"
        defaultValue={value?.name}
        onChange={e =>
          dispatch?.({
            type: 'names',
            name: e.target.name,
            value: e.target.value
          })
        }
      />
      <input
        className="Input"
        name="surname"
        defaultValue={value?.surname}
        onChange={e =>
          dispatch?.({
            type: 'names',
            name: e.target.name,
            value: e.target.value
          })
        }
      />
    </div>
  );
});

//! Professions Component

type ProfessionsProps = {
  dispatch?: ({
    type,
    profession
  }: {
    type: 'professions';
    profession: string;
  }) => void;
  value?: string[];
};
export const Professions2: React.FC<ProfessionsProps> = memo(({ dispatch }) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleRefValue = () => {
    if (ref && ref.current) {
      dispatch?.({ type: 'professions', profession: ref?.current?.value });
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
});

//! Experince Component

type ExperienceProps = {
  dispatch?: ({
    type,
    name,
    value
  }: {
    type: 'names';
    name: string;
    value: string;
  }) => void;
  value?: { firstExperince: string; secondExperience: string };
};
export const Experience2: React.FC<ExperienceProps> = memo(
  ({ dispatch, value }) => {
    const handleChangeExperience = (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      const value = e.target.value;
      dispatch?.({ type: 'names', name, value });
    };
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
