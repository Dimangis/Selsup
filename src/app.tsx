import ParamEditor from 'ParamEditor';
import { useState } from 'react';

// Пример данных параметров и модели
const params = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
};

export const App = () => {
  return (
    <div>
      <h1>TEST</h1>
      <ParamEditor params={params} model={model} />,
    </div>
  );
};
