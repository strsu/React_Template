import React, { useState, useEffect, useRef } from 'react';

import '../../../global.css';

const FormInputBox = ({ items }) => {
  const [inputStates, setInputStates] = useState(
    Array.from({ length: items.input.length }, () => ({
      isTooltipVisible: false,
    }))
  );

  const inputRefs = Array.from({ length: items.input.length }, () =>
    useRef(null)
  );
  const tooltipRefs = Array.from({ length: items.input.length }, () =>
    useRef(null)
  );

  useEffect(() => {
    inputStates.forEach((state, index) => {
      if (
        state.isTooltipVisible &&
        inputRefs[index].current &&
        tooltipRefs[index].current
      ) {
        const inputRect = inputRefs[index].current.getBoundingClientRect();
        const tooltipRect = tooltipRefs[index].current.getBoundingClientRect();

        if (tooltipRect.right > window.innerWidth) {
          tooltipRefs[index].current.style.left = `${
            inputRect.left - tooltipRect.width
          }px`;
        }

        if (tooltipRect.bottom > window.innerHeight) {
          tooltipRefs[index].current.style.top = `${
            inputRect.top - tooltipRect.height
          }px`;
        }
      }
    });
  }, [inputStates]);

  const handleInputFocus = (index) => {
    const updatedInputStates = [...inputStates];
    updatedInputStates[index].isTooltipVisible = true;
    setInputStates(updatedInputStates);
  };

  const handleInputBlur = (index) => {
    const updatedInputStates = [...inputStates];
    updatedInputStates[index].isTooltipVisible = false;
    setInputStates(updatedInputStates);
  };

  return (
    <div className="form-input-box">
      <div>{items.title}</div>
      <div className="form-input-box-multi">
        {items?.input.map((data, index) => {
          return data.label ? (
            <div className="form-input-box-multi-item">
              {inputStates[index].isTooltipVisible && data.tooltip && (
                <span className="tooltip-input-text" ref={tooltipRefs[index]}>
                  {data.tooltip}
                </span>
              )}
              <input
                type={data.type}
                name={data.name}
                value={data.value}
                onChange={data.onChange}
                disabled={data?.disabled}
                onFocus={() => handleInputFocus(index)}
                onBlur={() => handleInputBlur(index)}
                ref={inputRefs[index]}
              />
              <div className="form-input-box-multi-item-placeholder">
                {data.label}
              </div>
            </div>
          ) : (
            <div>
              {inputStates[index].isTooltipVisible && data.tooltip && (
                <span className="tooltip-input-text" ref={tooltipRefs[index]}>
                  {data.tooltip}
                </span>
              )}
              <input
                type={data.type}
                name={data.name}
                value={data?.value}
                onChange={data.onChange}
                disabled={data?.disabled}
                onFocus={() => handleInputFocus(index)}
                onBlur={() => handleInputBlur(index)}
                ref={inputRefs[index]}
              />
            </div>
          );
        })}
      </div>
      {items.button && (
        <button className="button-area-style-1" onClick={items.button}>
          {items.button_text}
        </button>
      )}
    </div>
  );
};

export default FormInputBox;
