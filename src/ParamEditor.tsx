import React from 'react';

// Интерфейсы
interface Param {
  id: number;
  name: string;
  type: string; // Пока поддерживаем только строковые значения
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: Map<number, string>;
}

// Компонент редактирования параметра
class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { model } = props;
    const paramValues = new Map<number, string>();

    // Заполнение значений параметров из переданной модели
    model.paramValues.forEach(paramValue => {
      paramValues.set(paramValue.paramId, paramValue.value);
    });

    this.state = {
      paramValues,
    };
  }

  // Обновление значения параметра
  handleParamChange = (paramId: number, value: string) => {
    this.setState(prevState => {
      const paramValues = new Map(prevState.paramValues);
      paramValues.set(paramId, value);
      return { paramValues };
    });
  };

  // Получение полной структуры Model с учетом редактированных параметров
  getModel = (): Model => {
    const { paramValues } = this.state;
    return {
      paramValues: Array.from(paramValues).map(([paramId, value]) => ({
        paramId,
        value,
      })),
    };
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map(param => (
          <div key={param.id}>
            <label htmlFor={`param_${param.id}`}>{param.name}</label>
            <input
              type="text"
              id={`param_${param.id}`}
              value={paramValues.get(param.id) || ''}
              onChange={e => this.handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
        <button onClick={() => console.log(this.getModel())}>Save</button>
      </div>
    );
  }
}

export default ParamEditor;
